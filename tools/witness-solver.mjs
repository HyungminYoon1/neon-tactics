import {levels} from "../dist/src/levels.js";
import {createRun,applyAction,endTurn,moveCells,bodies,intentPlan,report} from "../dist/src/model.js";
const fingerprint=s=>JSON.stringify([s.turn,s.ap,s.units.map(u=>[u.x,u.y,u.hp,u.used]),s.enemies.map(u=>[u.id,u.x,u.y,u.hp,u.dir]),s.buildings.map(b=>b.hp),s.pending.map(e=>e.id)]);
const distance=(a,b)=>Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
function utility(s){
 const r=report(s),enemies=s.enemies.filter(e=>e.hp>0);
 const approach=s.units.filter(u=>u.hp>0).reduce((n,u)=>n+Math.min(10,...enemies.map(e=>distance(u,e))),0);
 return r.power*160+r.unitHp*75+r.kills*540-enemies.reduce((n,e)=>n+e.hp,0)*140-approach*9-s.actions*5-s.turn*18;
}
function commands(s){
 const out=[],targets=bodies(s).filter(b=>b.group!=="city");
 for(const u of s.units){if(u.hp<=0||u.used>=2||s.ap<=0)continue;for(const target of targets){if(target.id!==u.id)out.push({type:"skill",unitId:u.id,x:target.x,y:target.y});}for(const target of moveCells(s,u.id))out.push({type:"move",unitId:u.id,...target});}
 out.push({type:"end"});return out;
}
export function solve(id,width=70,maxExpanded=130000){
 let beam=[{s:createRun(id),path:[]}],expanded=0;const visited=new Map();visited.set(fingerprint(beam[0].s),utility(beam[0].s));
 for(let depth=0;depth<28&&expanded<maxExpanded;depth++){
  const pool=new Map();
  for(const entry of beam)for(const c of commands(entry.s)){
   expanded++;const result=c.type==="end"?endTurn(entry.s):applyAction(entry.s,c);if(!result.valid||result.state.status==="failed")continue;
   const s=result.state,path=[...entry.path,c];if(s.status==="won")return {id,path,report:report(s),expanded};
   const fp=fingerprint(s),score=utility(s);if((visited.get(fp)??-Infinity)>=score)continue;visited.set(fp,score);
   if(!pool.has(fp)||pool.get(fp).score<score)pool.set(fp,{s,path,score});
  }
  const candidates=[...pool.values()].sort((a,b)=>b.score-a.score).slice(0,width*3);
  for(const entry of candidates){const danger=intentPlan(entry.s);entry.score-=danger.cityLoss*160+danger.unitLoss*75;entry.score+=danger.enemyKills*260;}
  beam=candidates.sort((a,b)=>b.score-a.score).slice(0,width);if(!beam.length)break;
 }
 return {id,unsolved:true,expanded,best:beam[0]?report(beam[0].s):null};
}
if(process.argv[1]?.endsWith("witness-solver.mjs")){
 const ids=process.argv.slice(2).map(Number),selected=ids.length?levels.filter(l=>ids.includes(l.id)):levels;
 for(const level of selected)console.log(JSON.stringify(solve(level.id)));
}
