import test from "node:test";
import assert from "node:assert/strict";
import {createRun,applyAction,endTurn,previewAction,previewTurn,report,bodies} from "../dist/src/model.js";
import {getLevel} from "../dist/src/levels.js";
import {witnesses} from "../tools/witnesses.mjs";
import {objectiveWitnesses} from "../tools/objective-witnesses.mjs";
const execute=(s,c)=>{const out=c.type==="end"?endTurn(s):applyAction(s,c);assert.equal(out.valid,true,out.reason);return out.state;};
const cleared=id=>witnesses[0].path.reduce(execute,createRun(id));
const idle=s=>{for(let i=0;i<6&&s.status==="playing";i++)s=execute(s,{type:"end"});return s;};
for(const witness of objectiveWitnesses)test("objective "+witness.id+" has legal deterministic witness and complete preview",()=>{
 let s=createRun(witness.id);
 for(const c of witness.path){const before=structuredClone(s),preview=c.type==="end"?previewTurn(s):previewAction(s,c),out=c.type==="end"?endTurn(s):applyAction(s,c);assert.equal(out.valid,true,out.reason);assert.deepEqual(preview.state,out.state);assert.deepEqual(preview.events,out.events);assert.deepEqual(s,before);s=out.state;assert.equal(new Set(bodies(s).map(b=>b.x+","+b.y)).size,bodies(s).length);}
 assert.equal(s.status,"won",s.reason);assert.ok(report(s).score>0);
 if(witness.id===13){assert.equal(s.routeIndex,3);assert.equal(s.convoy.hp,3);}
 if(witness.id===14){assert.ok(s.units.every(u=>u.escaped));assert.equal(bodies(s).filter(b=>b.group==="unit").length,0);}
 if(witness.id===15)assert.equal(s.held,3);
 if(witness.id===16){assert.equal(s.held,4);assert.equal(s.skills,10);assert.equal(report(s).power,12);assert.ok(s.units.every(u=>u.hp>0));assert.equal(s.turn,5);}
});
test("escort: eliminating enemies alone cannot win; abandoned convoy misses deadline",()=>{const s=cleared(13);assert.equal(s.status,"playing");const failed=idle(s);assert.equal(failed.status,"failed");assert.equal(failed.routeIndex,0);assert.equal(report(failed).score,0);});
test("escort: attacks hit convoy, blocking stalls route, no convoy swapping",()=>{
 let s=createRun(13);s.enemies=[{id:"E1",x:2,y:4,dir:1,hp:3,maxHp:3,kind:"beam",range:4,damage:3}];const p=previewTurn(s),out=endTurn(s);assert.equal(out.state.convoy.hp,0);assert.equal(out.state.status,"failed");assert.deepEqual(p,out);
 s=cleared(13);s.units[0].x=3;s.units[0].y=6;s.units[1].x=2;s.units[1].y=5;assert.equal(endTurn(s).state.routeIndex,0);
 s.units[2].x=3;s.units[2].y=5;assert.equal(applyAction(s,{type:"skill",unitId:"S",x:2,y:6}).valid,false);
});
test("escape: enemy elimination alone and missing one evacuee fail",()=>{
 assert.equal(idle(cleared(14)).status,"failed");const w=objectiveWitnesses.find(w=>w.id===14);let s=w.path.slice(0,-1).reduce(execute,createRun(14));assert.equal(s.units.filter(u=>u.escaped).length,2);assert.equal(idle(s).status,"failed");assert.equal(applyAction(s,{type:"move",unitId:"R",x:6,y:3}).valid,false);
});
test("escape: loss of any unit fails even when city survives",()=>{const s=createRun(14);s.units[0].hp=1;const out=endTurn(s);assert.equal(out.state.units[0].hp,0);assert.equal(out.state.status,"failed");assert.equal(out.state.reason,"기체 손실");});
test("hold: consecutive occupancy resets on departure and two late turns do not suffice",()=>{
 let s=execute(cleared(15),{type:"end"});assert.equal(s.held,1);s=execute(s,{type:"move",unitId:"R",x:2,y:5});s=execute(s,{type:"end"});assert.equal(s.held,0);s=execute(s,{type:"move",unitId:"R",x:3,y:5});s=execute(s,{type:"end"});assert.equal(s.held,1);s=execute(s,{type:"end"});assert.equal(s.status,"failed");assert.equal(s.held,2);
});
test("master: v1 remains unchanged; city/all-alive/skill cap/hold are enforced",()=>{
 assert.equal(getLevel(12).minCityHp,10);assert.equal(getLevel(12).skillLimit,undefined);assert.equal(getLevel(16).skillLimit,10);
 let s=createRun(16);assert.equal(idle(s).status,"failed");
 s.skills=10;const before=structuredClone(s);assert.equal(applyAction(s,{type:"skill",unitId:"S",x:3,y:1}).valid,false);assert.deepEqual(s,before);
 s=createRun(16);s.enemies=[];s.units[0].hp=0;assert.equal(endTurn(s).state.reason,"기체 손실");
 s=createRun(16);s.buildings[0].hp=3;assert.equal(endTurn(s).state.status,"failed");
 const path=objectiveWitnesses.find(w=>w.id===16).path;let index=path.findIndex(c=>c.type==="end");s=path.slice(0,index).reduce(execute,createRun(16));s.units[0].x=6;s.units[0].y=4;assert.equal(endTurn(s).state.held,0);
});
