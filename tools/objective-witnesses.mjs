import {witnesses} from "./witnesses.mjs";
const move=(unitId,x,y)=>({type:"move",unitId,x,y}),end={type:"end"};
const opening=witnesses.find(w=>w.id===1).path;
export const objectiveWitnesses=[
 {id:13,path:[...opening,end,move("R",3,6),end,move("R",3,5),end,move("R",3,4),end]},
 {id:14,path:[...opening,end,move("S",7,3),move("R",3,3),move("R",5,3),end,move("R",7,3),move("H",3,4),move("H",5,4),end,move("H",7,4)]},
 {id:15,path:[...opening,end,end,end]},
 {id:16,path:witnesses.find(w=>w.id===12).path}
];
