import {RULES_VERSION,getLevel} from "./levels.js";
import {createRun,applyAction,endTurn,report,HISTORY_LIMIT} from "./model.js";
export const MAX_INPUTS=128;
const keys=(value,allowed)=>value&&typeof value==="object"&&!Array.isArray(value)&&Object.keys(value).every(k=>allowed.includes(k));
export function newReplay(levelId,mode="practice"){
 getLevel(levelId);if(!["practice","tutorial","ranked"].includes(mode)||mode==="ranked"&&levelId!==16||mode==="tutorial"&&levelId!==1)throw new Error("Invalid mode");
 return {rules:RULES_VERSION,levelId,mode,inputs:[]};
}
export function canonicalInput(input){
 if(!keys(input,["type","unitId","x","y"]))throw new Error("Invalid input");
 if(["end","undo","hint"].includes(input.type)&&Object.keys(input).length===1)return {type:input.type};
 if(!["move","skill"].includes(input.type)||!["R","H","S"].includes(input.unitId)||!Number.isInteger(input.x)||!Number.isInteger(input.y)||input.x<0||input.x>7||input.y<0||input.y>7)throw new Error("Invalid command");
 return {type:input.type,unitId:input.unitId,x:input.x,y:input.y};
}
export function replayRun(replay){
 if(!keys(replay,["rules","levelId","mode","inputs"])||Object.keys(replay).length!==4||replay.rules!==RULES_VERSION||!Array.isArray(replay.inputs)||replay.inputs.length>MAX_INPUTS)throw new Error("Replay version or bounds");
 const clean=newReplay(replay.levelId,replay.mode);let state=createRun(clean.levelId),assisted=clean.mode==="tutorial",history=[],events=[];
 for(const raw of replay.inputs){
  const input=canonicalInput(raw);
  if(clean.mode==="ranked"&&["hint","undo"].includes(input.type))throw new Error("Ranked assistance disabled");
  if(input.type==="hint"){if(assisted||state.status!=="playing")throw new Error("Invalid hint");assisted=true;}
  else if(input.type==="undo"){if(!history.length)throw new Error("Empty history");state=history.pop();events=[];}
  else{
   const out=input.type==="end"?endTurn(state):applyAction(state,input);if(!out.valid)throw new Error("Illegal replay input");
   history.push(state);if(history.length>HISTORY_LIMIT)history.shift();state=out.state;events=out.events;
  }
  clean.inputs.push(input);
 }
 return {replay:clean,state,assisted,history,events,summary:report(state)};
}
export function appendInput(replay,input){return replayRun({...replay,inputs:[...replay.inputs,canonicalInput(input)]});}
// Server integration can call this function without DOM, storage, clock or transport.
export function evaluateRankedReplay(replay){
 if(replay?.levelId!==16||replay?.mode!=="ranked")throw new Error("Fixed master challenge required");
 const result=replayRun(replay);if(!result.summary.won||result.assisted)throw new Error("Independent completion required");
 return {rules:RULES_VERSION,challenge:"neon-master-16-v2",...result.summary};
}
