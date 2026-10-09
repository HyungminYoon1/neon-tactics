import {levels,getLevel} from "./levels.js";
import {createRun,previewAction,previewTurn,intentPlan,bodies,report,objectiveText} from "./model.js";
import {newReplay,replayRun,appendInput,MAX_INPUTS} from "./replay.js";
import {browserStorage,loadSave,rememberRun,persistSave,clearSave,emptySave,SAVE_KEY} from "./storage.js";
import {createRankedCapture} from "./ranking.js";
import {rankingDefinition} from "./ranked.js";
import {mountRanking} from "./ranking-client.js";
import {paint,iso,cellAt} from "./render.js";
const $=id=>document.getElementById(id),board=$("board"),ctx=board.getContext("2d"),motion=matchMedia("(prefers-reduced-motion: reduce)");
const storage=browserStorage();let loaded=loadSave(storage),save=loaded.save,replay=null,started=false,capture=null,zoom=1;
let resultDismissed=false;
let state=createRun(1),selected="R",mode="move",cursor={...state.units[0]},aiming=false,preview=null,plan=intentPlan(state),past=[],events=[],frame=0,effect=0,focusReturn=null,hinted=false,down=null;
const active=u=>u.hp>0&&!u.escaped;
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
 preview=aiming?previewAction(state,command):null;const displayed=preview?.valid?preview.state:state;plan=displayed.status==="playing"?intentPlan(displayed):{plans:[],cityLoss:0,unitLoss:0,enemyKills:0};
 text("cursor-label",(cursor.x+1)+"열 / "+(cursor.y+1)+"행");board.dataset.cursorX=String(cursor.x);board.dataset.cursorY=String(cursor.y);
 const capped=replay?.inputs.length>=MAX_INPUTS;
 $("confirm").disabled=!started||capped||!preview?.valid;$("touch-confirm").disabled=$("confirm").disabled;text("target-title",preview?.valid?"명령 결과":"목표");
 $("end-turn").disabled=!started||capped||state.status!=="playing"||Boolean(preview?.valid);$("cancel").disabled=!aiming;
 const next=preview?.valid?preview.state:state,future=next.status==="playing"?previewTurn(next).state:next;
 text("turn-preview",objectiveText(future)+" · "+(future.status!=="playing"?future.reason:future.turn+"턴 / 명령 "+future.ap));
 document.querySelector(".forecast-head h3").textContent=preview?.valid?"명령 확인 후 적 턴":"적 턴 예상";
 if(preview?.valid){
  const changes=preview.events.filter(e=>e.kind==="hit").map(e=>e.id+" −"+e.amount+" ("+(causeNames[e.cause]??e.cause)+")");
  const movements=preview.events.filter(e=>["move","push","swap"].includes(e.kind)).map(e=>e.id+" → "+(e.to.x+1)+"/"+(e.to.y+1));
  text("target-copy",[...movements,...changes,...preview.events.filter(e=>e.kind==="escape").map(e=>e.id+" 탈출"),preview.state.status!=="playing"?preview.state.reason:"적 턴: 시설 −"+plan.cityLoss+", 기체 −"+plan.unitLoss+", 적 "+plan.enemyKills+" 제거"].join(" · "));
 }else text("target-copy",preview?.reason??"목표 칸 선택");
 renderForecast();draw();
}
function renderForecast(){
 const counts=$("forecast-numbers");counts.replaceChildren();for(const [value,label,cls]of[[plan.cityLoss,"시설 피해",plan.cityLoss?"":"safe"],[plan.unitLoss,"기체 피해",plan.unitLoss?"":"safe"],[plan.enemyKills,"적 제거","safe"]]){const d=node("div",value,cls);d.append(node("small",label));counts.append(d);}
 const list=$("intents");list.replaceChildren();plan.plans.forEach((p,i)=>{const row=node("div",undefined,"intent");row.append(node("span",i+1,"number"),node("b",p.enemyId+" "+(p.kind==="blast"?"십자":p.kind==="bomb"?"폭탄":"광선")),node("span",p.hits.length?p.hits.join("+")+" −"+p.damage:"빈 궤적"));list.append(row);});
}
function update(){
 globalThis.dispatchEvent(new Event("ranking-state-change"));
 const level=getLevel(state.levelId),summary=report(state);text("level-title",level.name);text("sector",String(level.id).padStart(2,"0"));text("difficulty",level.grade);text("brief",level.brief);text("objective",objectiveText(state));text("campaign-count",String(level.id).padStart(2,"0")+" / "+levels.length);text("turn",state.turn+" / "+level.maxTurns+"턴");text("phase",state.status==="playing"?"명령 선택":state.status==="won"?"성공":"실패");text("ap","● ".repeat(state.ap)+"○ ".repeat(3-state.ap));text("run-mode",replay?.mode==="ranked"?"최상위 도전":hinted?"도움 사용":"독립 연습");
 $("power").replaceChildren(document.createTextNode(String(summary.power)),node("span","/12"));text("power-required","KEEP ≥ "+level.minCityHp+" / 12");const power=$("power-bar");power.replaceChildren();for(let i=0;i<12;i++)power.append(node("i",undefined,i>=summary.power?"lost":""));
 const units=$("units");units.replaceChildren();for(const u of state.units){
  const b=node("button",undefined,"unit "+u.id+(u.id===selected?" selected":"")+(!active(u)?" dead":""));b.type="button";b.dataset.unit=u.id;b.setAttribute("aria-pressed",String(u.id===selected));b.disabled=!started||!active(u)||state.status!=="playing";
  const detail=node("div"),hp=node("div",undefined,"hp");for(let i=0;i<u.maxHp;i++)hp.append(node("i",undefined,i>=u.hp?"lost":""));detail.append(node("b",u.name),node("small",skillNames[u.role]),hp);b.append(node("span",u.id,"badge"),detail,node("span",u.used+"/2","used"));b.setAttribute("aria-label",u.name+" HP "+u.hp+"/"+u.maxHp+" · "+skillNames[u.role]+" · 행동 "+u.used+"/2");b.addEventListener("click",()=>selectUnit(u.id));units.append(b);
 }
 const unit=state.units.find(u=>u.id===selected);text("skill-label",skillNames[unit?.role??"ram"]+" / 1 명령");$("move-mode").setAttribute("aria-pressed",String(mode==="move"));$("skill-mode").setAttribute("aria-pressed",String(mode==="skill"));$("undo").disabled=!started||!past.length||replay?.mode==="ranked";$("end-turn").disabled=state.status!=="playing";$("move-mode").disabled=!started||state.status!=="playing";$("skill-mode").disabled=!started||state.status!=="playing";$("hint").disabled=!started||hinted||state.status!=="playing"||replay?.mode==="ranked";
 const nextWave=level.waves.find(w=>w.turn>state.turn);text("next-wave",nextWave?nextWave.turn+"턴 · "+nextWave.enemies.length+"기 · 점선 칸이 차 있으면 근처 진입":state.pending.length?state.pending.length+"기 진입 대기":"없음");
 board.setAttribute("aria-label",level.name+". "+state.turn+"턴, 명령 "+state.ap+", 시설 전력 "+summary.power+"/"+level.minCityHp+" 필요. 선택 기체 "+selected+". 1/2/3 선택, 방향키 목표, Q 이동, E 기술, Enter 확인.");
 $("result-overlay").hidden=state.status==="playing"||resultDismissed;if(state.status!=="playing"){
  text("result-kicker",state.status==="won"?summary.grade+(hinted?" · 도움 사용":" · 독립 기록"):"실패");text("result-title",state.status==="won"?"임무 완료":"임무 실패");text("result-copy",state.reason);const list=$("result-numbers");list.replaceChildren();for(const [value,label]of[[summary.score,"점수"],[summary.power+"/12","전력"],[summary.kills+"/"+summary.total,"제거"]]){const n=node("div",value);n.append(node("small",label));list.append(n);}$("result-next").hidden=state.status!=="won"||state.levelId===levels.length;
 }
 tutorial();updatePreview();
}
function saveCurrent(){
 if(!started)return;
 if(replay.mode==="ranked"){text("save-status","기록 도전 · 자동 저장 없음");return;}
 save=rememberRun(save,replay);const result=persistSave(storage,save);
 text("save-status",result.ok?(result.summaryOk?"이 기기에 저장됨":"저장됨 · 갤러리 동기화 실패"):"저장 불가 · 현재 탭에서만 유지");$("restore").disabled=!result.ok;$("welcome-restore").hidden=!result.ok;
}
function adopt(command){
 if(!started)return;
 try{const out=replay.mode==="ranked"?capture.record(command):appendInput(replay,command);stopEffects();state=out.state;replay=out.replay;hinted=out.assisted;past=out.history;events=out.events;aiming=false;preview=null;if(!state.units.some(u=>u.id===selected&&active(u)))selected=state.units.find(active)?.id??"R";
  if(state.status==="won"&&replay.mode==="ranked")capture.finish();saveCurrent();update();status(state.status!=="playing"?state.reason:command.type==="undo"?"되돌림":"명령 실행");animateHits();
 }catch{status(replay.inputs.length>=MAX_INPUTS?"입력 한도입니다. 새로 시작하세요.":"실행할 수 없는 명령입니다.");}
}
function confirm(){if(preview?.valid)adopt({type:mode,unitId:selected,x:cursor.x,y:cursor.y});else status(preview?.reason??"목표 선택");}
function undo(){adopt({type:"undo"});}
$("result-close").addEventListener("click",()=>{resultDismissed=true;$("result-overlay").hidden=true;board.focus({preventScroll:true});});
function choose(id,runMode="practice"){
 stopEffects();capture=runMode==="ranked"?createRankedCapture():null;replay=capture?capture.start():newReplay(id,runMode);state=createRun(id);resultDismissed=false;started=true;selected="R";mode="move";cursor={...state.units[0]};aiming=false;past=[];events=[];hinted=runMode==="tutorial";$("hint-copy").hidden=true;board.dataset.mode=runMode;for(const d of document.querySelectorAll("dialog[open]"))d.close();saveCurrent();update();status(getLevel(id).brief);board.focus({preventScroll:true});
}
function selectUnit(id){const unit=state.units.find(u=>u.id===id&&active(u));if(!unit)return;selected=id;cursor={x:unit.x,y:unit.y};aiming=false;mode="move";update();scrollCursor();board.focus({preventScroll:true});}
function scrollCursor(){const p=iso(cursor.x,cursor.y),rect=board.getBoundingClientRect(),container=document.querySelector(".board-scroll"),x=p.x/1100*rect.width,y=p.y/600*rect.height;if(x<container.scrollLeft+30||x>container.scrollLeft+container.clientWidth-30)container.scrollLeft=Math.max(0,x-container.clientWidth/2);if(y<container.scrollTop+30||y>container.scrollTop+container.clientHeight-30)container.scrollTop=Math.max(0,y-container.clientHeight/2);}
function moveCursor(command){if(!started||state.status!=="playing")return;const d={left:[-1,0],right:[1,0],up:[0,-1],down:[0,1]}[command];cursor={x:Math.max(0,Math.min(7,cursor.x+d[0])),y:Math.max(0,Math.min(7,cursor.y+d[1]))};aiming=true;updatePreview();scrollCursor();}
function pointerCell(event){
 const r=board.getBoundingClientRect(),px=(event.clientX-r.left)/r.width*1100,py=(event.clientY-r.top)/r.height*600;
 const hit=bodies(state).filter(a=>a.group!=="city").map(a=>{const p=iso(a.x,a.y);return {a,n:Math.hypot((px-p.x)*1.1,py-(p.y-18))};}).filter(a=>a.n<25).sort((a,b)=>a.n-b.n)[0];
 const p=hit?{x:hit.a.x,y:hit.a.y}:cellAt(px,py);return p.x>=0&&p.x<8&&p.y>=0&&p.y<8?p:null;
}
function target(event){if(!started||state.status!=="playing")return;const p=pointerCell(event);if(!p)return;const friendly=state.units.find(u=>active(u)&&u.x===p.x&&u.y===p.y);if(friendly&&mode==="move"){selectUnit(friendly.id);return;}cursor=p;aiming=true;updatePreview();board.focus({preventScroll:true});}
board.addEventListener("pointerdown",e=>{if(e.button===0){const c=document.querySelector(".board-scroll");down={x:e.clientX,y:e.clientY,left:c.scrollLeft,top:c.scrollTop};}});
board.addEventListener("pointermove",e=>{if(down&&e.pointerType==="mouse"&&zoom>1&&e.buttons===1){const c=document.querySelector(".board-scroll");c.scrollLeft=down.left+down.x-e.clientX;c.scrollTop=down.top+down.y-e.clientY;}});
board.addEventListener("pointerup",e=>{if(down&&Math.hypot(e.clientX-down.x,e.clientY-down.y)<10)target(e);down=null;});
board.addEventListener("pointercancel",()=>{down=null;});globalThis.addEventListener("pointerup",()=>{down=null;});
$("move-mode").addEventListener("click",()=>{mode="move";aiming=false;update();board.focus({preventScroll:true});});$("skill-mode").addEventListener("click",()=>{mode="skill";aiming=false;update();board.focus({preventScroll:true});});$("confirm").addEventListener("click",confirm);$("touch-confirm").addEventListener("click",confirm);
$("cancel").addEventListener("click",()=>{cursor={...state.units.find(u=>u.id===selected)};aiming=false;mode="move";update();status("목표 지정을 취소했습니다.");});
function finishTurn(){if(preview?.valid){status("명령을 확인하거나 취소하세요.");return;}aiming=false;adopt({type:"end"});}
$("undo").addEventListener("click",undo);$("end-turn").addEventListener("click",finishTurn);$("restart").addEventListener("click",()=>choose(state.levelId,replay?.mode??"practice"));$("result-restart").addEventListener("click",()=>choose(state.levelId,replay?.mode??"practice"));$("result-next").addEventListener("click",()=>choose(Math.min(levels.length,state.levelId+1)));
$("hint").addEventListener("click",()=>{adopt({type:"hint"});if(hinted){$("hint-copy").hidden=false;text("hint-copy",getLevel(state.levelId).hint);}});
function showDialog(name){stopEffects();focusReturn=document.activeElement;if(name==="campaign-dialog"){
 const list=$("level-list");list.replaceChildren();for(const level of levels){const best=save.bests[level.id],b=node("button",undefined,"level-choice"+(level.id===state.levelId?" current":"")+(best?.independent?" won":""));b.type="button";b.dataset.level=String(level.id);b.append(node("span",String(level.id).padStart(2,"0")+" · v"+level.campaign),node("b",level.name),node("small",level.grade+(best?.independent?" · 독립 "+replayRun(best.independent).summary.score:"")+(best?.assisted?" · 도움 "+replayRun(best.assisted).summary.score:"")));b.addEventListener("click",()=>choose(level.id));list.append(b);}
 }$(name).showModal();}
$("campaign").addEventListener("click",()=>showDialog("campaign-dialog"));$("help").addEventListener("click",()=>showDialog("help-dialog"));for(const b of document.querySelectorAll("[data-close]"))b.addEventListener("click",()=>$(b.dataset.close).close());for(const dialog of document.querySelectorAll("dialog"))dialog.addEventListener("close",()=>{(focusReturn??board).focus({preventScroll:true});});for(const b of document.querySelectorAll("[data-cursor]"))b.addEventListener("click",()=>moveCursor(b.dataset.cursor));
document.addEventListener("keydown",e=>{
 if(document.querySelector("dialog[open]")||!started||e.target!==board&&e.target!==document.body)return;const moves={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"up",ArrowDown:"down"};if(moves[e.code]){e.preventDefault();moveCursor(moves[e.code]);return;}if(e.repeat)return;
 if(["Digit1","Digit2","Digit3"].includes(e.code)){e.preventDefault();selectUnit(["R","H","S"][Number(e.code.at(-1))-1]);}else if(e.code==="KeyQ"||e.code==="KeyE"){e.preventDefault();mode=e.code==="KeyQ"?"move":"skill";aiming=false;update();}else if(e.code==="Enter"||e.code==="Space"){e.preventDefault();confirm();}else if(e.code==="KeyZ"){e.preventDefault();undo();}else if(e.code==="KeyT"){e.preventDefault();finishTurn();}else if(e.code==="Escape"){mode="move";aiming=false;cursor={...state.units.find(u=>u.id===selected)};update();}
});
document.addEventListener("visibilitychange",()=>{if(document.hidden)stopEffects();});globalThis.addEventListener("blur",stopEffects);globalThis.addEventListener("pagehide",()=>{cancelAnimationFrame(frame);frame=0;down=null;effect=0;});motion.addEventListener("change",stopEffects);
function tutorial(){
 $("tutorial").hidden=replay?.mode!=="tutorial";if(replay?.mode!=="tutorial")return;const living=id=>state.enemies.some(e=>e.id===id&&e.hp>0);
 text("tutorial-step",state.status==="won"?"입문 완료 · 임무에서 독립 기록을 시작하세요.":state.status==="failed"?"다시 시작해 공격선을 바꿔 보세요.":living("E1")?"1/3 · R → 기술 → 4열 5행 E1 → 확인. 벽 충돌 피해를 확인하세요.":living("E2")?"2/3 · H → 기술 → 2열 2행 E2 → 확인. 물로 끌어당깁니다.":"3/3 · S → 기술 → 7열 4행 E3 → 확인. 교환하며 피해 1을 줍니다.");
}
function restore(){
 loaded=loadSave(storage);if(!loaded.save.current){status("복원할 저장이 없습니다.");return;}save=loaded.save;stopEffects();replay=structuredClone(save.current);
 // A restored ranked run is local practice; future server start tokens are never restored.
 if(replay.mode==="ranked")replay.mode="practice";const out=replayRun(replay);state=out.state;hinted=out.assisted;past=out.history;events=[];capture=null;started=true;selected=state.units.find(active)?.id??"R";cursor={...state.units.find(u=>u.id===selected)};mode="move";aiming=false;board.dataset.mode=replay.mode;$("hint-copy").hidden=true;for(const d of document.querySelectorAll("dialog[open]"))d.close();update();text("save-status","저장 복원됨");status("저장한 명령까지 복원했습니다.");board.focus({preventScroll:true});
}
function setZoom(value){zoom=Math.max(1,Math.min(2.5,value));const container=document.querySelector(".board-scroll");document.querySelector(".board-stage").style.width=Math.floor(container.clientWidth*zoom)+"px";text("zoom-label",Math.round(zoom*100)+"%");$("zoom-out").disabled=zoom===1;$("zoom-in").disabled=zoom===2.5;if(zoom===1){container.scrollLeft=0;container.scrollTop=0;}else scrollCursor();}
for(const id of ["welcome-tutorial","start-tutorial"])$(id).addEventListener("click",()=>choose(1,"tutorial"));
$("welcome-master").addEventListener("click",()=>choose(16));$("start-ranked").addEventListener("click",()=>rankingAdapter.start());
for(const id of ["welcome-restore","restore"])$(id).addEventListener("click",restore);
$("clear-records").addEventListener("click",()=>showDialog("clear-dialog"));
$("confirm-clear").addEventListener("click",()=>{const result=clearSave(storage);save=emptySave();started=false;replay=null;capture=null;state=createRun(1);past=[];events=[];hinted=false;aiming=false;selected="R";cursor={...state.units[0]};$("hint-copy").hidden=true;$("restore").disabled=true;$("welcome-restore").hidden=true;text("save-status",result.ok?(result.summaryOk?"기록 삭제됨":"기록 삭제됨 · 갤러리 삭제 실패"):"기기 기록을 삭제하지 못했습니다.");$("clear-dialog").close();update();showDialog("welcome-dialog");});
$("welcome-dialog").addEventListener("cancel",e=>{if(!started)e.preventDefault();});
$("zoom-fit").addEventListener("click",()=>setZoom(1));$("zoom-in").addEventListener("click",()=>setZoom(zoom+.5));$("zoom-out").addEventListener("click",()=>setZoom(zoom-.5));
for(const b of document.querySelectorAll("[data-pan]"))b.addEventListener("click",()=>{const d={left:[-100,0],right:[100,0],up:[0,-100],down:[0,100]}[b.dataset.pan];document.querySelector(".board-scroll").scrollBy({left:d[0],top:d[1]});});
new ResizeObserver(()=>setZoom(zoom)).observe(document.querySelector(".board-scroll"));
globalThis.addEventListener("storage",e=>{if(e.key!==SAVE_KEY)return;loaded=loadSave(storage);save=loaded.save;started=false;$("welcome-restore").hidden=!save.current;$("restore").disabled=!save.current;update();text("save-status","다른 탭에서 기록이 변경되었습니다.");if(!$("welcome-dialog").open)showDialog("welcome-dialog");});
export const rankingAdapter=Object.freeze({
 start(){choose(16,"ranked");},
 getActions(){return replay?.mode==="ranked"?replay.inputs.map(c=>c.type==="end"?{type:"endTurn"}:{...c}):[];},
 isComplete(){return replay?.mode==="ranked"&&state.status==="won";},
 getDefinition:rankingDefinition
});
$("welcome-restore").hidden=!save.current;$("restore").disabled=!save.current;text("save-status",loaded.ok?"기기 자동 저장":"저장을 읽을 수 없습니다.");update();setZoom(1);showDialog("welcome-dialog");
mountRanking({root:$("public-ranking"),adapter:rankingAdapter,apiBase:"https://web-lab-ranking.hyeongmin92.workers.dev"});
