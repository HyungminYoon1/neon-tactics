import test from "node:test";
import assert from "node:assert/strict";
import {levels,getLevel} from "../dist/src/levels.js";
import {createRun,applyAction,endTurn,previewAction,intentPlan,moveCells,bodies,report,HISTORY_LIMIT,MAX_ENTITIES} from "../dist/src/model.js";
import {witnesses} from "../tools/witnesses.mjs";
const positions=s=>{const b=bodies(s),set=new Set(b.map(a=>a.x+","+a.y));assert.equal(set.size,b.length);assert.ok(b.every(a=>a.x>=0&&a.x<8&&a.y>=0&&a.y<8&&a.hp>0));assert.ok(s.ap>=0&&s.ap<=3);assert.ok(s.units.every(u=>u.used>=0&&u.used<=2));};
for(const w of witnesses)test("mission "+w.id+" actual command witness protects city and eliminates every wave",()=>{
 let s=createRun(w.id),initial=JSON.stringify(s);
 for(const c of w.path){
  const prior=JSON.stringify(s),preview=c.type==="end"?intentPlan(s):previewAction(s,c),actual=c.type==="end"?endTurn(s):applyAction(s,c);
  assert.equal(actual.valid,true,actual.reason);assert.equal(JSON.stringify(s),prior);
  if(c.type!=="end"){assert.deepEqual(preview.state,actual.state);assert.deepEqual(preview.events,actual.events);}else{
   assert.deepEqual(actual.events.filter(e=>e.kind!=="spawn"),preview.events);
   for(const b of [...s.units,...s.buildings,...s.enemies]){const predicted=[...preview.state.units,...preview.state.buildings,...preview.state.enemies].find(x=>x.id===b.id),result=[...actual.state.units,...actual.state.buildings,...actual.state.enemies].find(x=>x.id===b.id);assert.equal(result.hp,predicted.hp);assert.equal(result.x,predicted.x);assert.equal(result.y,predicted.y);}
  }
  s=actual.state;positions(s);
 }
 assert.equal(s.status,"won",s.reason);assert.deepEqual(report(s),w.expected);assert.equal(report(s).kills,report(s).total);assert.ok(report(s).power>=getLevel(w.id).minCityHp);assert.ok(s.turn<=getLevel(w.id).maxTurns);assert.equal(s.pending.length,0);
 assert.equal(JSON.stringify(createRun(w.id)),initial);assert.equal(endTurn(s).valid,false);
});
test("campaign has 12 finite missions, six advanced combinations, 3 distinct unit abilities",()=>{
 assert.equal(levels.length,12);assert.equal(HISTORY_LIMIT,32);for(const l of levels){assert.equal(new Set(l.units.map(u=>u.role)).size,3);assert.ok(l.waves.reduce((n,w)=>n+w.enemies.length,0)+l.units.length+l.buildings.length<=MAX_ENTITIES);assert.ok(l.maxTurns<=6);assert.ok(l.minCityHp<=12);}
 assert.ok(levels.slice(6).every(l=>l.grade==="MASTER"&&l.minCityHp===10&&l.waves.length===3));assert.ok(levels.some(l=>l.waves.flatMap(w=>w.enemies).some(e=>e.kind==="blast")));assert.equal(new Set(levels.map(l=>l.waves[0].enemies[0].dir)).size,4);
});
test("invalid/blocked/range/unknown commands preserve AP, actors and state",()=>{
 const s=createRun(1),snapshot=JSON.stringify(s);for(const c of [{type:"__proto__",unitId:"R",x:3,y:4},{type:"skill",unitId:"?",x:3,y:4},{type:"move",unitId:"R",x:-1,y:3},{type:"move",unitId:"R",x:3,y:2},{type:"skill",unitId:"R",x:1,y:1},{type:"skill",unitId:"S",x:3,y:7}]){
  const result=applyAction(s,c);assert.equal(result.valid,false);assert.deepEqual(result.state,s);assert.equal(JSON.stringify(s),snapshot);
 }assert.throws(()=>createRun(99));
});
test("legal movement follows a two-step empty dry path and cannot pass occupied cells or water",()=>{
 const s=createRun(1),cells=moveCells(s,"H");assert.ok(cells.length>0);assert.ok(!cells.some(p=>p.x===1&&p.y===2));assert.ok(!cells.some(p=>p.x===3&&p.y===4));for(const p of cells){assert.ok(Math.abs(p.x-1)+Math.abs(p.y-4)<=2);assert.equal(applyAction(s,{type:"move",unitId:"H",...p}).valid,true);}
});
test("wall impact is independently 1 skill damage plus 2 collision damage",()=>{
 const s=createRun(1),out=applyAction(s,{type:"skill",unitId:"R",x:3,y:4});assert.equal(out.valid,true);assert.equal(out.state.enemies.find(e=>e.id==="E1").hp,0);assert.deepEqual(out.events.filter(e=>e.kind==="hit").map(e=>[e.id,e.amount,e.cause]),[["E1",1,"ram"],["E1",2,"wall-impact"]]);assert.equal(out.state.ap,2);
});
test("hook drops an enemy into water; swap changes both positions without changing its attack direction",()=>{
 const s=createRun(1),hook=applyAction(s,{type:"skill",unitId:"H",x:1,y:1});assert.equal(hook.state.enemies.find(e=>e.id==="E2").hp,0);assert.ok(hook.events.some(e=>e.cause==="water"));
 s.enemies.find(e=>e.id==="E3").hp=3;const swap=applyAction(s,{type:"skill",unitId:"S",x:6,y:3}),enemy=swap.state.enemies.find(e=>e.id==="E3"),unit=swap.state.units.find(e=>e.id==="S");assert.deepEqual([unit.x,unit.y,enemy.x,enemy.y,enemy.dir,enemy.hp],[6,3,6,5,1,2]);
});
test("two actions per unit and three shared AP are real limits; unused AP may be yielded",()=>{
 let s=createRun(1);s.enemies.find(e=>e.id==="E3").hp=4;s=applyAction(s,{type:"skill",unitId:"S",x:6,y:3}).state;s=applyAction(s,{type:"skill",unitId:"S",x:6,y:5}).state;
 assert.equal(s.units.find(u=>u.id==="S").used,2);assert.equal(s.ap,1);assert.equal(applyAction(s,{type:"skill",unitId:"S",x:6,y:3}).valid,false);const next=endTurn(s).state;if(next.status==="playing"){assert.equal(next.ap,3);assert.ok(next.units.every(u=>u.used===0));}
});
test("blocked push train transfers impact; removed obstacle occupant frees the preceding actor",()=>{
 const s=createRun(1);s.enemies=s.enemies.filter(e=>e.id!=="E3");s.enemies[1]={...s.enemies[1],x:3,y:3,hp:3,maxHp:3};let out=applyAction(s,{type:"skill",unitId:"R",x:3,y:4});assert.equal(out.state.enemies[0].hp,1);assert.equal(out.state.enemies[1].hp,1);positions(out.state);
 s.enemies[1].hp=1;out=applyAction(s,{type:"skill",unitId:"R",x:3,y:4});assert.ok(out.state.enemies.every(e=>e.hp<=0));positions(out.state);
});
function chainFixture(){
 const s=createRun(1);s.enemies=[{id:"E1",x:3,y:4,dir:0,hp:1,maxHp:1,kind:"bomb",range:4,damage:1},{id:"E2",x:4,y:4,dir:0,hp:1,maxHp:1,kind:"bomb",range:4,damage:1},{id:"E3",x:5,y:4,dir:2,hp:1,maxHp:1,kind:"beam",range:4,damage:2}];return s;
}
test("bomb death chains once per bomb and damages nearby friendly unit independently",()=>{
 const s=chainFixture(),out=applyAction(s,{type:"skill",unitId:"R",x:3,y:4});assert.equal(out.state.enemies.filter(e=>e.hp>0).length,0);assert.equal(out.state.units.find(u=>u.id==="R").hp,3);assert.equal(new Set(out.state.exploded).size,2);assert.equal(out.events.filter(e=>e.kind==="explosion").length,2);
});
test("ordered enemy friendly fire cancels dead shooters; exact forecast includes chain and unit damage",()=>{
 const s=chainFixture(),forecast=intentPlan(s),actual=endTurn(s);assert.equal(forecast.enemyKills,3);assert.equal(forecast.unitLoss,1);assert.equal(forecast.cityLoss,0);assert.deepEqual(forecast.plans.map(p=>p.enemyId),["E1"]);assert.deepEqual(forecast.plans[0].hits,["E2"]);assert.deepEqual(actual.events,forecast.events);assert.equal(actual.state.status,"won");
});
test("doing nothing on master mission loses real city/units; failure score is zero",()=>{
 let s=createRun(12);for(let i=0;i<7&&s.status==="playing";i++)s=endTurn(s).state;assert.equal(s.status,"failed");assert.equal(report(s).score,0);assert.ok(/전력|정지|작전 시간/.test(s.reason));
});
test("restoring a planning snapshot restores turn/AP/positions and deterministic replay",()=>{
 let s=createRun(7),snapshot=structuredClone(s),c=witnesses.find(w=>w.id===7).path[0];const a=applyAction(s,c),b=applyAction(snapshot,c);assert.deepEqual(a,b);assert.equal(s.turn,snapshot.turn);assert.equal(s.ap,3);assert.deepEqual(s,snapshot);
});
