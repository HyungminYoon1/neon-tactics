import {levels} from "./levels.js";
import {replayRun} from "./replay.js";
import {writeProgress,clearProgress} from "./progress.js";
export const SAVE_KEY="neon-tactics-save-v2",MAX_SAVE_BYTES=131072;
export const emptySave=()=>({version:2,current:null,bests:{}});
export function validateSave(data){
 if(!data||data.version!==2||Object.keys(data).length!==3||Object.keys(data).some(k=>!["version","current","bests"].includes(k))||!data.bests||typeof data.bests!=="object"||Array.isArray(data.bests)||Object.keys(data.bests).length>levels.length)throw new Error("Save schema");
 const result=emptySave();result.current=data.current===null?null:replayRun(data.current).replay;
 for(const [id,entry] of Object.entries(data.bests)){
  if(!levels.some(l=>String(l.id)===id)||!entry||typeof entry!=="object"||Array.isArray(entry)||Object.keys(entry).some(k=>!["independent","assisted"].includes(k)))throw new Error("Best schema");
  const value={};for(const [kind,replay] of Object.entries(entry)){
   const run=replayRun(replay);if(String(run.state.levelId)!==id||!run.summary.won||run.assisted!==(kind==="assisted"))throw new Error("Unverified best");
   value[kind]=run.replay;
  }result.bests[id]=value;
 }return result;
}
export function decodeSave(raw){if(typeof raw!=="string"||new TextEncoder().encode(raw).length>MAX_SAVE_BYTES)throw new Error("Save bounds");return validateSave(JSON.parse(raw));}
export function rememberRun(save,replay){
 const run=replayRun(replay),next=structuredClone(save);next.current=run.replay;
 if(run.summary.won){const id=String(run.state.levelId),kind=run.assisted?"assisted":"independent",old=next.bests[id]?.[kind];
  if(!old||replayRun(old).summary.score<run.summary.score){next.bests[id]??={};next.bests[id][kind]=run.replay;}
 }return next;
}
export function independentCount(save){return Object.values(save.bests).filter(e=>e.independent).length;}
export function browserStorage(){try{return globalThis.localStorage;}catch{return null;}}
export function loadSave(storage){try{const raw=storage?.getItem(SAVE_KEY);return {save:raw==null?emptySave():decodeSave(raw),ok:!!storage,exists:raw!=null};}catch{return {save:emptySave(),ok:false,exists:false};}}
export function persistSave(storage,save){
 try{const clean=validateSave(save),raw=JSON.stringify(clean);if(new TextEncoder().encode(raw).length>MAX_SAVE_BYTES)throw new Error("Save bounds");storage.setItem(SAVE_KEY,raw);
  const count=independentCount(clean);return {ok:true,summaryOk:count?writeProgress(storage,count,levels.length):true};
 }catch{return {ok:false,summaryOk:false};}
}
export function clearSave(storage){try{storage.removeItem(SAVE_KEY);return {ok:true,summaryOk:clearProgress(storage)};}catch{return {ok:false,summaryOk:false};}}
