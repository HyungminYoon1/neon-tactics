import test from "node:test";
import assert from "node:assert/strict";
import {createRun,applyAction} from "../dist/src/model.js";
import {newReplay,appendInput,replayRun,canonicalInput} from "../dist/src/replay.js";
import {createRankedCapture} from "../dist/src/ranking.js";
import {emptySave,rememberRun,persistSave,loadSave,SAVE_KEY,MAX_SAVE_BYTES} from "../dist/src/storage.js";
import {PROGRESS_KEY} from "../dist/src/progress.js";
import {witnesses} from "../tools/witnesses.mjs";
const opening=witnesses.find(w=>w.id===1).path;
const solved=()=>({...newReplay(1),inputs:structuredClone(opening)});

test("edge: coordinate type and nonfinite commands preserve AP and actors",()=>{
 const s=createRun(1),before=structuredClone(s);
 for(const x of [-1,8,0.5,NaN,Infinity,-Infinity,"3",null,[],{}]){
  const c={type:"skill",unitId:"R",x,y:4};
  assert.throws(()=>canonicalInput(c));
  const out=applyAction(s,c);assert.equal(out.valid,false);assert.deepEqual(out.state,before);assert.deepEqual(s,before);
 }
});
test("edge: undo from a real victory restores planning and replay branch",()=>{
 const won=replayRun(solved());assert.equal(won.state.status,"won");
 const undone=appendInput(won.replay,{type:"undo"});assert.equal(undone.state.status,"playing");assert.equal(undone.state.ap,1);
 const redone=appendInput(undone.replay,opening.at(-1));assert.deepEqual(redone.state,won.state);assert.equal(redone.summary.score,5900);
 assert.throws(()=>appendInput(won.replay,{type:"hint"}));assert.deepEqual(won.state,replayRun(solved()).state);
});
test("edge: rejected ranked input and mutated snapshots never alter captured log",()=>{
 const capture=createRankedCapture(),start=capture.start();start.inputs.push({type:"end"});
 assert.equal(capture.snapshot().inputs.length,0);
 const before=capture.snapshot();assert.throws(()=>capture.record({type:"undo"}));assert.deepEqual(capture.snapshot(),before);
 capture.record({type:"skill",unitId:"S",x:3,y:1});
 const view=capture.snapshot();view.inputs[0].x=99;assert.equal(capture.snapshot().inputs[0].x,3);
 capture.start();assert.equal(capture.snapshot().inputs.length,0);
});
test("edge: illegal replay after valid prefix does not mutate caller or saved best",()=>{
 const log=solved(),before=structuredClone(log),save=rememberRun(emptySave(),log),best=structuredClone(save);
 assert.throws(()=>replayRun({...log,inputs:[...log.inputs,{type:"end"}]}));assert.deepEqual(log,before);assert.deepEqual(save,best);
});
test("edge: corrupt oversized private loads preserve bytes and sibling keys",()=>{
 for(const raw of ["{"," ".repeat(MAX_SAVE_BYTES+1)]){
  const values=new Map([[SAVE_KEY,raw],["parcel-panic-save-v2","keep"]]);
  assert.equal(loadSave({getItem:k=>values.get(k)??null}).ok,false);
  assert.equal(values.get(SAVE_KEY),raw);assert.equal(values.get("parcel-panic-save-v2"),"keep");
 }
});
test("edge: private write must confirm readback before publishing progress",()=>{
 const save=rememberRun(emptySave(),solved()),before=structuredClone(save);
 for(const getItem of [()=>null,()=>"older",()=>{throw Error("read denied");}]){
  const writes=[],storage={setItem:(k)=>writes.push(k),getItem};
  assert.equal(persistSave(storage,save).ok,false,"unconfirmed private write must fail");
  assert.deepEqual(writes,[SAVE_KEY]);assert(!writes.includes(PROGRESS_KEY));
 }
 assert.deepEqual(save,before);
});
