export const PROGRESS_KEY="web-lab-progress-v1";
export const APP_IDS=Object.freeze(["data-mirage","echo-vault","light-route","logic-foundry","neon-tactics","orbit-courier","packet-journey","parcel-panic","pixel-kitchen","pocket-city","route-race","sense-lab","swarm-garden","think-forge","traffic-lab"]);
const OWN="neon-tactics",MAX_BYTES=8192;
export function readSummary(raw){
 if(raw===null)return {version:1,apps:{}};
 if(typeof raw!=="string"||new TextEncoder().encode(raw).length>MAX_BYTES)throw new Error("Summary bounds");
 const data=JSON.parse(raw);
 if(!data||data.version!==1||!data.apps||typeof data.apps!=="object"||Array.isArray(data.apps)||Object.keys(data).some(k=>!["version","apps"].includes(k))||Object.keys(data.apps).length>15)throw new Error("Summary schema");
 const apps={};
 for(const [id,item] of Object.entries(data.apps)){
  if(!APP_IDS.includes(id)||!item||Object.keys(item).length!==3||!Number.isInteger(item.completed)||!Number.isInteger(item.total)||item.completed<0||item.completed>item.total||item.total>1000||typeof item.updatedAt!=="string"||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(item.updatedAt)||!Number.isFinite(Date.parse(item.updatedAt))||new Date(item.updatedAt).toISOString()!==item.updatedAt)throw new Error("Summary entry");
  apps[id]={completed:item.completed,total:item.total,updatedAt:item.updatedAt};
 }
 return {version:1,apps};
}
export function writeProgress(storage,completed,total,now=new Date()){
 try{
  if(!Number.isInteger(completed)||!Number.isInteger(total)||completed<1||completed>total||total>1000)return false;
  const data=readSummary(storage.getItem(PROGRESS_KEY)),old=data.apps[OWN];
  if(old?.completed===completed&&old?.total===total)return true;
  data.apps[OWN]={completed,total,updatedAt:now.toISOString()};
  const raw=JSON.stringify(data);readSummary(raw);storage.setItem(PROGRESS_KEY,raw);return true;
 }catch{return false;}
}
export function clearProgress(storage){
 try{const data=readSummary(storage.getItem(PROGRESS_KEY));delete data.apps[OWN];storage.setItem(PROGRESS_KEY,JSON.stringify(data));return true;}catch{return false;}
}
