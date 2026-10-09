import test from "node:test";
import assert from "node:assert/strict";
import {rankingDefinition,replayRanked,RULES_VERSION,CHALLENGE_ID} from "../dist/src/ranked.js";
import {objectiveWitnesses} from "../tools/objective-witnesses.mjs";
const actions=objectiveWitnesses.find(w=>w.id===16).path.map(c=>c.type==="end"?{type:"endTurn"}:{...c});
test("ranked public contract reconstructs actual fixed challenge with bounded plain result",()=>{
 const def=rankingDefinition();assert.deepEqual([def.game,def.levelId,def.maxActions,def.rulesVersion,def.challengeId],["neon-tactics",16,20,RULES_VERSION,CHALLENGE_ID]);
 const result=replayRanked(actions);assert.equal(result.won,true);assert.equal(result.score,4280);assert.deepEqual(result.tieBreak,[5,12,0,6]);assert.equal(result.summary.held,4);assert.equal(result.summary.skills,10);
 assert.ok(new TextEncoder().encode(JSON.stringify(actions)).length<=49152);assert.ok(Number.isSafeInteger(result.score)&&result.score>=0);assert.ok(result.tieBreak.every(n=>Number.isSafeInteger(n)&&n>=0));assert.equal(replayRanked([]).won,false);assert.equal(replayRanked([]).score,0);
});
test("ranked rejects unknown/oversized/malformed/illegal/budget-exceeding and terminal commands",()=>{
 for(const bad of [null,{},Array(21).fill({type:"endTurn"}),[{type:"hint"}],[{type:"undo"}],[{type:"end"}],[{type:"start",score:9999}],[{type:"endTurn",state:{status:"won"}}],[{type:"move",unitId:"R",x:1,y:1,score:1}],[{type:"move",unitId:"R",x:5,y:3}],[{type:"skill",unitId:"S",x:3,y:1},{type:"skill",unitId:"S",x:4,y:4},{type:"skill",unitId:"S",x:3,y:1}],actions.concat({type:"endTurn"})])assert.throws(()=>replayRanked(bad));
 const prefix=actions.slice(0,3);assert.throws(()=>replayRanked([...prefix,{type:"move",unitId:"R",x:6,y:4}]));
 assert.equal(replayRanked([{type:"endTurn"}]).won,false);
});
