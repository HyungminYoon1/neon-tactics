import test from "node:test";
import assert from "node:assert/strict";
import {RULES_VERSION,levels} from "../dist/src/levels.js";
import {createRun} from "../dist/src/model.js";
import {newReplay,replayRun,appendInput,evaluateRankedReplay,MAX_INPUTS} from "../dist/src/replay.js";
import {createRankedCapture} from "../dist/src/ranking.js";
import {emptySave,rememberRun,decodeSave,validateSave,persistSave,loadSave,clearSave,SAVE_KEY,MAX_SAVE_BYTES,independentCount} from "../dist/src/storage.js";
import {APP_IDS,PROGRESS_KEY,readSummary,writeProgress} from "../dist/src/progress.js";
import {witnesses} from "../tools/witnesses.mjs";
import {objectiveWitnesses} from "../tools/objective-witnesses.mjs";
const solved=(id,mode="practice")=>({...newReplay(id,mode),inputs:(id<=12?witnesses:objectiveWitnesses).find(w=>w.id===id).path});
const memory=()=>{const values=new Map();return {getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,String(v)),removeItem:k=>values.delete(k),values};};
test("save restores each accepted action/end/undo via replay, including objective state",()=>{
 for(const id of [1,13,14,15,16]){let log=newReplay(id);for(const input of solved(id).inputs){const out=appendInput(log,input);log=out.replay;const saved=rememberRun(emptySave(),log);const decoded=decodeSave(JSON.stringify(saved));assert.deepEqual(replayRun(decoded.current).state,out.state);assert.deepEqual(replayRun(decoded.current).history,out.history);}}
 let log=newReplay(1),out=appendInput(log,solved(1).inputs[0]);out=appendInput(out.replay,{type:"undo"});assert.deepEqual(out.state,createRun(1));assert.equal(out.replay.inputs.length,2);
});
test("hint stays assisted across undo and reload; tutorial never contributes independent completion",()=>{
 let out=appendInput(newReplay(1),solved(1).inputs[0]);out=appendInput(out.replay,{type:"hint"});out=appendInput(out.replay,{type:"undo"});assert.equal(out.assisted,true);
 for(const c of solved(1).inputs)out=appendInput(out.replay,c);
 let save=rememberRun(emptySave(),out.replay);assert.equal(independentCount(save),0);assert.ok(save.bests[1].assisted);assert.equal(replayRun(decodeSave(JSON.stringify(save)).current).assisted,true);
 save=rememberRun(save,solved(1,"tutorial"));assert.equal(independentCount(save),0);save=rememberRun(save,solved(1));assert.equal(independentCount(save),1);assert.ok(save.bests[1].assisted&&save.bests[1].independent);
});
test("current failure and retries preserve actual completed independent best",()=>{
 let save=rememberRun(emptySave(),solved(1));save=rememberRun(save,newReplay(16));assert.equal(save.current.levelId,16);assert.equal(independentCount(save),1);assert.equal(replayRun(save.bests[1].independent).summary.score,5900);
});
test("reject stale, malformed, oversized, extra data and fabricated scores atomically",()=>{
 const save=rememberRun(emptySave(),solved(1));
 for(const value of [null,{},[],{...save,version:1},{...save,bests:4},{...save,bests:{1:4}},{...save,current:{...save.current,rules:"old"}},{...save,current:{...save.current,score:99999}},{...save,bests:{1:{independent:newReplay(1)}}},{...save,bests:{1:{independent:solved(1,"tutorial")}}},{...save,bests:{2:{independent:solved(1)}}}])assert.throws(()=>validateSave(value));
 assert.throws(()=>decodeSave("{"));assert.throws(()=>decodeSave(" ".repeat(MAX_SAVE_BYTES+1)));assert.throws(()=>decodeSave('"'+"가".repeat(MAX_SAVE_BYTES/2)+'"'));
 const invalids=[{type:"skill",unitId:"R",x:8,y:0},{type:"move",unitId:"R",x:1.2,y:2},{type:"move",unitId:"R",x:3,y:2},{type:"end",score:99},{type:"undo"},{type:"win"}];
 for(const input of invalids)assert.throws(()=>appendInput(newReplay(1),input));assert.throws(()=>replayRun({...newReplay(1),inputs:Array(MAX_INPUTS+1).fill({type:"end"})}));
 assert.throws(()=>appendInput(solved(1),{type:"end"}));assert.throws(()=>newReplay(1,"ranked"));assert.throws(()=>newReplay(16,"tutorial"));
});
test("128 actual input limit remains legal until exact boundary",()=>{
 let log=newReplay(1);for(let i=0;i<64;i++){log=appendInput(log,solved(1).inputs[0]).replay;log=appendInput(log,{type:"undo"}).replay;}assert.equal(log.inputs.length,128);assert.deepEqual(replayRun(log).state,createRun(1));assert.throws(()=>appendInput(log,solved(1).inputs[0]));
});
test("ranked capture uses fixed actual start/actions; no hint, undo, injected scores or clock",()=>{
 const calls=[],capture=createRankedCapture({start:r=>calls.push(["start",r]),input:c=>calls.push(["input",c]),finish:r=>calls.push(["finish",r])});
 assert.throws(()=>capture.record({type:"end"}));const start=capture.start();assert.equal(start.levelId,16);assert.equal(start.rules,RULES_VERSION);assert.throws(()=>capture.record({type:"hint"}));assert.throws(()=>capture.record({type:"undo"}));assert.throws(()=>capture.finish());
 for(const c of solved(16).inputs)capture.record(c);const result=capture.finish();assert.equal(result.score,4280);assert.deepEqual(evaluateRankedReplay(capture.snapshot()),result);assert.equal(calls.filter(c=>c[0]==="input").length,solved(16).inputs.length);
 assert.throws(()=>evaluateRankedReplay(solved(16)));assert.throws(()=>evaluateRankedReplay({...solved(16,"ranked"),elapsed:1}));assert.throws(()=>evaluateRankedReplay({...solved(16,"ranked"),inputs:[...solved(16).inputs,{type:"undo"}]}));
 capture.start();assert.equal(capture.snapshot().inputs.length,0);assert.equal(capture.snapshot().levelId,16);
});
test("durable independent completion alone updates gallery; blocked save cannot claim durable progress",()=>{
 const storage=memory();persistSave(storage,emptySave());assert.equal(storage.getItem(PROGRESS_KEY),null);
 persistSave(storage,rememberRun(emptySave(),newReplay(1)));assert.equal(storage.getItem(PROGRESS_KEY),null);
 persistSave(storage,rememberRun(emptySave(),solved(1,"tutorial")));assert.equal(storage.getItem(PROGRESS_KEY),null);
 const save=rememberRun(emptySave(),solved(1));assert.equal(persistSave(storage,save).ok,true);const summary=readSummary(storage.getItem(PROGRESS_KEY));assert.equal(summary.apps["neon-tactics"].completed,1);assert.equal(summary.apps["neon-tactics"].total,16);assert.deepEqual(Object.keys(summary.apps["neon-tactics"]).sort(),["completed","total","updatedAt"]);
 const raw=storage.getItem(PROGRESS_KEY);persistSave(storage,save);assert.equal(storage.getItem(PROGRESS_KEY),raw);
 const denied={getItem(){throw Error("denied");},setItem(){throw Error("quota");},removeItem(){throw Error("denied");}};
 assert.equal(persistSave(denied,save).ok,false);assert.equal(loadSave(denied).ok,false);assert.equal(clearSave(denied).ok,false);assert.equal(persistSave(null,save).ok,false);
});
test("all 32 independent/assisted achievement slots fit the documented save ceiling",()=>{
 let save=emptySave();for(const level of levels){save=rememberRun(save,solved(level.id));const assisted={...solved(level.id),inputs:[{type:"hint"},...solved(level.id).inputs]};save=rememberRun(save,assisted);}
 const bytes=new TextEncoder().encode(JSON.stringify(save)).length;assert.ok(bytes<MAX_SAVE_BYTES);assert.equal(independentCount(decodeSave(JSON.stringify(save))),16);
});
test("aggregate allowlist, byte bounds and schema fail closed; clearing preserves other applications",()=>{
 assert.equal(APP_IDS.length,15);const storage=memory(),other={completed:3,total:8,updatedAt:"2026-10-09T00:00:00.000Z"};storage.setItem(PROGRESS_KEY,JSON.stringify({version:1,apps:{"parcel-panic":other}}));
 const save=rememberRun(emptySave(),solved(1));persistSave(storage,save);storage.setItem("unrelated","keep");assert.equal(clearSave(storage).ok,true);assert.equal(storage.getItem(SAVE_KEY),null);assert.deepEqual(readSummary(storage.getItem(PROGRESS_KEY)).apps,{"parcel-panic":other});assert.equal(storage.getItem("unrelated"),"keep");
 for(const value of [{version:1,apps:3},{version:1,apps:{unknown:other}},{version:1,apps:{"neon-tactics":{...other,total:1001}}},{version:1,apps:{"neon-tactics":{...other,completed:9}}},{version:1,apps:{"neon-tactics":{...other,updatedAt:"2026-02-30T00:00:00.000Z"}}},{version:1,apps:{"neon-tactics":{...other,name:"private"}}}])assert.throws(()=>readSummary(JSON.stringify(value)));
 assert.throws(()=>readSummary(" ".repeat(8193)));storage.setItem(PROGRESS_KEY,"invalid");assert.equal(writeProgress(storage,1,16),false);assert.equal(storage.getItem(PROGRESS_KEY),"invalid");assert.equal(clearSave(storage).summaryOk,false);
});
