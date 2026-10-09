import {levels,getLevel} from "./levels.js";
import {createRun,applyAction,previewAction,endTurn,intentPlan,bodies,report,HISTORY_LIMIT} from "./model.js";
import {paint,iso,cellAt} from "./render.js";
const $=id=>document.getElementById(id),board=$("board"),ctx=board.getContext("2d"),records=new Map(),motion=matchMedia("(prefers-reduced-motion: reduce)");
let state=createRun(7),selected="R",mode="move",cursor={...state.units[0]},aiming=false,preview=null,plan=intentPlan(state),past=[],events=[],frame=0,effect=0,focusReturn=null,hinted=false,down=null;
const text=(id,value)=>{$(id).textContent=value;},status=message=>text("status",message),node=(tag,value,cls)=>{const n=document.createElement(tag);if(value!==undefined)n.textContent=value;if(cls)n.className=cls;return n;};
const skillNames={ram:"밀치기 / 직선 2칸",hook:"끌기 / 직선 4칸",swap:"교환 / 거리 4칸"},causeNames={"wall-impact":"벽 충돌",water:"수중 제거",chain:"연쇄 폭발",collision:"충돌",phase:"교환","enemy-fire":"적 공격",ram:"밀치기",hook:"끌기"};
function draw(){paint(ctx,{state,selected,mode,cursor,preview,plan,events,effect});}
function stopEffects(){cancelAnimationFrame(frame);frame=0;effect=0;down=null;draw();}
function animateHits(){
 cancelAnimationFrame(frame);if(motion.matches){effect=0;draw();return;}let start=0;effect=1;
 function animate(time){if(!start)start=time;effect=Math.max(0,1-(time-start)/430);draw();if(effect>0)frame=requestAnimationFrame(animate);else frame=0;}frame=requestAnimationFrame(animate);
}
function updatePreview(){
 const command={type:mode==="move"?"move":"skill",unitId:selected,x:cursor.x,y:cursor.y};
 preview=aiming?previewAction(state,command):null;plan=preview?.valid&&preview.forecast?preview.forecast:intentPlan(state);
 text("cursor-label",(cursor.x+1)+"열 / "+(cursor.y+1)+"행");board.dataset.cursorX=String(cursor.x);board.dataset.cursorY=String(cursor.y);
 $("confirm").disabled=!preview?.valid;$("touch-confirm").disabled=!preview?.valid;text("target-title",preview?.valid?"READY / "+(mode==="move"?"MOVE":"SKILL"):"TARGET PREVIEW");
 $("end-turn").disabled=state.status!=="playing"||Boolean(preview?.valid);
 document.querySelector(".forecast-head h3").textContent=preview?.valid?"명령 확인 후 적 턴":"적 턴 예상";
 if(preview?.valid){
  const changes=preview.events.filter(e=>e.kind==="hit").map(e=>e.id+" −"+e.amount+" ("+(causeNames[e.cause]??e.cause)+")");
  const movements=preview.events.filter(e=>["move","push","swap"].includes(e.kind)).map(e=>e.id+" → "+(e.to.x+1)+"/"+(e.to.y+1));
  text("target-copy",[...movements,...changes,"적 턴: 시설 −"+plan.cityLoss+", 기체 −"+plan.unitLoss+", 적 "+plan.enemyKills+" 제거"].join(" · "));
 }else text("target-copy",preview?.reason??"목표 칸을 선택하면 피해와 바뀐 공격선을 미리 볼 수 있습니다.");
 renderForecast();draw();
}
function renderForecast(){
 const counts=$("forecast-numbers");counts.replaceChildren();for(const [value,label,cls]of[[plan.cityLoss,"CITY DAMAGE",plan.cityLoss?"":"safe"],[plan.unitLoss,"UNIT DAMAGE",plan.unitLoss?"":"safe"],[plan.enemyKills,"FRIENDLY FIRE","safe"]]){const d=node("div",value,cls);d.append(node("small",label));counts.append(d);}
 const list=$("intents");list.replaceChildren();plan.plans.forEach((p,i)=>{const row=node("div",undefined,"intent");row.append(node("span",i+1,"number"),node("b",p.enemyId+" "+(p.kind==="blast"?"십자":p.kind==="bomb"?"폭탄":"광선")),node("span",p.hits.length?p.hits.join("+")+" −"+p.damage:"빈 궤적"));list.append(row);});
}
function update(){
 const level=getLevel(state.levelId),summary=report(state);text("level-title",level.name);text("sector",String(level.id).padStart(2,"0"));text("difficulty",level.grade);text("brief",level.brief);text("campaign-count",String(level.id).padStart(2,"0")+" / 12");text("turn","TURN "+String(state.turn).padStart(2,"0")+" / "+String(level.maxTurns).padStart(2,"0"));text("phase",state.status==="playing"?"YOUR TURN":state.status==="won"?"CITY SECURED":"OPERATION FAILED");text("ap","● ".repeat(state.ap)+"○ ".repeat(3-state.ap));
 $("power").replaceChildren(document.createTextNode(String(summary.power)),node("span","/12"));text("power-required","KEEP ≥ "+level.minCityHp+" / 12");const power=$("power-bar");power.replaceChildren();for(let i=0;i<12;i++)power.append(node("i",undefined,i>=summary.power?"lost":""));
 const units=$("units");units.replaceChildren();for(const u of state.units){
  const b=node("button",undefined,"unit "+u.id+(u.id===selected?" selected":"")+(u.hp<=0?" dead":""));b.type="button";b.dataset.unit=u.id;b.setAttribute("aria-pressed",String(u.id===selected));b.disabled=u.hp<=0||state.status!=="playing";
  const detail=node("div"),hp=node("div",undefined,"hp");for(let i=0;i<u.maxHp;i++)hp.append(node("i",undefined,i>=u.hp?"lost":""));detail.append(node("b",u.name),node("small",skillNames[u.role]),hp);b.append(node("span",u.id,"badge"),detail,node("span",u.used+"/2","used"));b.setAttribute("aria-label",u.name+" HP "+u.hp+"/"+u.maxHp+" · "+skillNames[u.role]+" · 행동 "+u.used+"/2");b.addEventListener("click",()=>selectUnit(u.id));units.append(b);
 }
 const unit=state.units.find(u=>u.id===selected);text("skill-label",skillNames[unit?.role??"ram"]+" / 1 명령");$("move-mode").setAttribute("aria-pressed",String(mode==="move"));$("skill-mode").setAttribute("aria-pressed",String(mode==="skill"));$("undo").disabled=!past.length;$("end-turn").disabled=state.status!=="playing";$("move-mode").disabled=state.status!=="playing";$("skill-mode").disabled=state.status!=="playing";$("hint").disabled=hinted;
 const nextWave=level.waves.find(w=>w.turn>state.turn);text("next-wave",nextWave?"TURN "+nextWave.turn+" / "+nextWave.enemies.length+"기 · 점선 칸 진입 예정. 차 있으면 근처 빈 칸.":state.pending.length?state.pending.length+"기 진입 대기":"추가 진입 없음. 남은 적을 제거하세요.");
 board.setAttribute("aria-label",level.name+". "+state.turn+"턴, 명령 "+state.ap+", 시설 전력 "+summary.power+"/"+level.minCityHp+" 필요. 선택 기체 "+selected+". 1/2/3 선택, 방향키 목표, Q 이동, E 기술, Enter 확인.");
 $("result-overlay").hidden=state.status==="playing";if(state.status!=="playing"){
  text("result-kicker",state.status==="won"?"FUTURE SECURED / "+summary.grade+(hinted?" / HINTED":""):"FUTURE LOST");text("result-title",state.status==="won"?"도시는 살아남았습니다":"다른 미래를 선택하세요");text("result-copy",state.reason);const list=$("result-numbers");list.replaceChildren();for(const [value,label]of[[summary.score,"POINTS"],[summary.power+"/12","CITY"],[summary.kills+"/"+summary.total,"HOSTILES"]]){const n=node("div",value);n.append(node("small",label));list.append(n);}$("result-next").hidden=state.status!=="won"||state.levelId===12;
 }
 updatePreview();
}
function remember(){past.push(structuredClone(state));if(past.length>HISTORY_LIMIT)past.shift();}
function adopt(out){
 if(!out.valid){status(out.reason);return;}remember();stopEffects();state=out.state;events=out.events;aiming=false;preview=null;if(!state.units.some(u=>u.id===selected&&u.hp>0))selected=state.units.find(u=>u.hp>0)?.id??"R";
 if(state.status==="won"&&!hinted)records.set(state.levelId,Math.max(records.get(state.levelId)??0,report(state).score));
 update();status(state.status!=="playing"?state.reason:events.filter(e=>e.kind==="hit").map(e=>e.id+" −"+e.amount+" "+(causeNames[e.cause]??e.cause)).join(" · ")||"명령을 실행했습니다. 공격 예고가 새 위치를 반영합니다.");animateHits();
}
function confirm(){if(preview?.valid)adopt(applyAction(state,{type:mode==="move"?"move":"skill",unitId:selected,x:cursor.x,y:cursor.y}));else status(preview?.reason??"목표를 선택하세요.");}
function undo(){if(!past.length)return;stopEffects();state=past.pop();events=[];aiming=false;if(!state.units.some(u=>u.id===selected&&u.hp>0))selected=state.units.find(u=>u.hp>0)?.id??"R";update();status("직전 명령/적 턴을 되돌렸습니다. 같은 상태에서 다른 선택을 할 수 있습니다.");}
function choose(id){stopEffects();state=createRun(id);selected="R";mode="move";cursor={...state.units[0]};aiming=false;past=[];events=[];hinted=false;$("hint-copy").hidden=true;update();status("새 작전입니다. 기체마다 다른 기술과 적의 공격 순서를 읽어보세요.");}
function selectUnit(id){const unit=state.units.find(u=>u.id===id&&u.hp>0);if(!unit)return;selected=id;cursor={x:unit.x,y:unit.y};aiming=false;mode="move";update();scrollCursor();board.focus({preventScroll:true});}
function scrollCursor(){const p=iso(cursor.x,cursor.y),rect=board.getBoundingClientRect(),container=document.querySelector(".board-scroll"),x=p.x/1100*rect.width;if(x<container.scrollLeft+40||x>container.scrollLeft+container.clientWidth-40)container.scrollTo({left:Math.max(0,x-container.clientWidth/2),behavior:"instant"});}
function moveCursor(command){const d={left:[-1,0],right:[1,0],up:[0,-1],down:[0,1]}[command];cursor={x:Math.max(0,Math.min(7,cursor.x+d[0])),y:Math.max(0,Math.min(7,cursor.y+d[1]))};aiming=true;updatePreview();scrollCursor();}
function pointerCell(event){
 const r=board.getBoundingClientRect(),px=(event.clientX-r.left)/r.width*1100,py=(event.clientY-r.top)/r.height*600;
 const hit=bodies(state).filter(a=>a.group!=="city").map(a=>{const p=iso(a.x,a.y);return {a,n:Math.hypot((px-p.x)*1.1,py-(p.y-18))};}).filter(a=>a.n<25).sort((a,b)=>a.n-b.n)[0];
 const p=hit?{x:hit.a.x,y:hit.a.y}:cellAt(px,py);return p.x>=0&&p.x<8&&p.y>=0&&p.y<8?p:null;
}
function target(event){if(state.status!=="playing")return;const p=pointerCell(event);if(!p)return;const friendly=state.units.find(u=>u.hp>0&&u.x===p.x&&u.y===p.y);if(friendly&&mode==="move"){selectUnit(friendly.id);return;}cursor=p;aiming=true;updatePreview();board.focus({preventScroll:true});}
board.addEventListener("pointerdown",e=>{if(e.button===0)down={x:e.clientX,y:e.clientY};});
board.addEventListener("pointerup",e=>{if(down&&Math.hypot(e.clientX-down.x,e.clientY-down.y)<10)target(e);down=null;});
board.addEventListener("pointercancel",()=>{down=null;});globalThis.addEventListener("pointerup",()=>{down=null;});
$("move-mode").addEventListener("click",()=>{mode="move";aiming=false;update();board.focus({preventScroll:true});});$("skill-mode").addEventListener("click",()=>{mode="skill";aiming=false;update();board.focus({preventScroll:true});});$("confirm").addEventListener("click",confirm);$("touch-confirm").addEventListener("click",confirm);
$("cancel").addEventListener("click",()=>{cursor={...state.units.find(u=>u.id===selected)};aiming=false;mode="move";update();status("목표 지정을 취소했습니다.");});
function finishTurn(){if(preview?.valid){status("선택한 명령을 확인하거나 목표 지정을 취소한 뒤 적 턴을 실행하세요.");return;}aiming=false;adopt(endTurn(state));}
$("undo").addEventListener("click",undo);$("end-turn").addEventListener("click",finishTurn);$("restart").addEventListener("click",()=>choose(state.levelId));$("result-restart").addEventListener("click",()=>choose(state.levelId));$("result-next").addEventListener("click",()=>choose(Math.min(12,state.levelId+1)));
$("hint").addEventListener("click",()=>{hinted=true;$("hint-copy").hidden=false;text("hint-copy",getLevel(state.levelId).hint);update();status("조언을 사용한 성공은 독립 최고 기록에 넣지 않습니다.");});
function showDialog(name){stopEffects();focusReturn=document.activeElement;if(name==="campaign-dialog"){
 const list=$("level-list");list.replaceChildren();for(const level of levels){const b=node("button",undefined,"level-choice"+(level.id===state.levelId?" current":"")+(records.has(level.id)?" won":""));b.type="button";b.dataset.level=String(level.id);b.append(node("span","OPERATION "+String(level.id).padStart(2,"0")),node("b",level.name),node("small",level.grade+" · KEEP ≥ "+level.minCityHp+(records.has(level.id)?" · "+records.get(level.id)+" PT":"")));b.addEventListener("click",()=>{choose(level.id);focusReturn=board;$("campaign-dialog").close();board.focus({preventScroll:true});});list.append(b);}
 }$(name).showModal();}
$("campaign").addEventListener("click",()=>showDialog("campaign-dialog"));$("help").addEventListener("click",()=>showDialog("help-dialog"));for(const b of document.querySelectorAll("[data-close]"))b.addEventListener("click",()=>$(b.dataset.close).close());for(const dialog of document.querySelectorAll("dialog"))dialog.addEventListener("close",()=>{(focusReturn??board).focus({preventScroll:true});});for(const b of document.querySelectorAll("[data-cursor]"))b.addEventListener("click",()=>moveCursor(b.dataset.cursor));
document.addEventListener("keydown",e=>{
 if(document.querySelector("dialog[open]")||e.target!==board&&e.target!==document.body)return;const moves={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"up",ArrowDown:"down"};if(moves[e.code]){e.preventDefault();moveCursor(moves[e.code]);return;}if(e.repeat)return;
 if(["Digit1","Digit2","Digit3"].includes(e.code)){e.preventDefault();selectUnit(["R","H","S"][Number(e.code.at(-1))-1]);}else if(e.code==="KeyQ"||e.code==="KeyE"){e.preventDefault();mode=e.code==="KeyQ"?"move":"skill";aiming=false;update();}else if(e.code==="Enter"||e.code==="Space"){e.preventDefault();confirm();}else if(e.code==="KeyZ"){e.preventDefault();undo();}else if(e.code==="KeyT"){e.preventDefault();finishTurn();}else if(e.code==="Escape"){mode="move";aiming=false;cursor={...state.units.find(u=>u.id===selected)};update();}
});
document.addEventListener("visibilitychange",()=>{if(document.hidden)stopEffects();});globalThis.addEventListener("blur",stopEffects);globalThis.addEventListener("pagehide",()=>{cancelAnimationFrame(frame);frame=0;down=null;effect=0;});motion.addEventListener("change",stopEffects);
update();draw();
