import {newReplay,appendInput,evaluateRankedReplay} from "./replay.js";
import {rankingDefinition} from "./ranked.js";
// Inject transport callbacks only after the real API contract is approved.
// Retry starts a fresh fixed challenge; no undo, hints, elapsed time or invented rank.
export function createRankedCapture(callbacks={}){
 let replay=null;
 return {
  start(){replay=newReplay(16,"ranked");callbacks.start?.(structuredClone(replay));return structuredClone(replay);},
  record(input){if(!replay)throw new Error("Start required");if(replay.inputs.length>=rankingDefinition().maxActions)throw new Error("Ranked limit");const result=appendInput(replay,input);replay=result.replay;callbacks.input?.({index:replay.inputs.length-1,input:structuredClone(input)});return result;},
  finish(){const result=evaluateRankedReplay(replay);callbacks.finish?.({replay:structuredClone(replay),result});return result;},
  snapshot(){return replay?structuredClone(replay):null;}
 };
}
