import {getLevel} from "./levels.js";
import {bodies,moveCells} from "./model.js";
export const iso=(x,y)=>({x:550+(x-y)*47,y:100+(x+y)*27});
export function cellAt(x,y){const a=(x-550)/47,b=(y-100)/27;return {x:Math.round((a+b)/2),y:Math.round((b-a)/2)};}
const colors={R:"#a5efd0",H:"#8fbafa",S:"#efa7db"};
function diamond(ctx,p,w=45,h=25){ctx.beginPath();ctx.moveTo(p.x,p.y-h);ctx.lineTo(p.x+w,p.y);ctx.lineTo(p.x,p.y+h);ctx.lineTo(p.x-w,p.y);ctx.closePath();}
function cube(ctx,p,w,h,depth,top,left,right){
 ctx.fillStyle=left;ctx.beginPath();ctx.moveTo(p.x-w,p.y);ctx.lineTo(p.x,p.y+h);ctx.lineTo(p.x,p.y+h-depth);ctx.lineTo(p.x-w,p.y-depth);ctx.closePath();ctx.fill();
 ctx.fillStyle=right;ctx.beginPath();ctx.moveTo(p.x,p.y+h);ctx.lineTo(p.x+w,p.y);ctx.lineTo(p.x+w,p.y-depth);ctx.lineTo(p.x,p.y+h-depth);ctx.closePath();ctx.fill();
 ctx.fillStyle=top;diamond(ctx,{x:p.x,y:p.y-depth},w,h);ctx.fill();ctx.strokeStyle="#9b91b830";ctx.lineWidth=1;ctx.stroke();
}
function hp(ctx,p,actor,color){ctx.fillStyle="#111425";ctx.fillRect(p.x-15,p.y-47,30,5);ctx.fillStyle=color;ctx.fillRect(p.x-15,p.y-47,30*actor.hp/actor.maxHp,5);}
function robot(ctx,p,actor,ghost=false){
 if(actor.group==="convoy"){
  ctx.save();ctx.globalAlpha=ghost?.5:1;cube(ctx,p,23,13,21,"#e7d494","#8d7649","#584c39");ctx.fillStyle="#29293b";ctx.fillRect(p.x-15,p.y-19,30,6);ctx.fillStyle="#ffe5a0";ctx.font="bold 11px monospace";ctx.textAlign="center";ctx.fillText("V",p.x,p.y+27);if(!ghost)hp(ctx,p,actor,"#e9d49a");ctx.restore();return;
 }
 const enemy=actor.group==="enemy",color=enemy?"#ff8794":colors[actor.id];ctx.save();ctx.globalAlpha=ghost?.5:1;
 ctx.fillStyle="#02071980";ctx.beginPath();ctx.ellipse(p.x+4,p.y+9,23,10,0,0,Math.PI*2);ctx.fill();ctx.shadowBlur=ghost?15:8;ctx.shadowColor=color;
 if(enemy){
  ctx.strokeStyle="#a55d80";ctx.lineWidth=5;for(const [x,y]of[[-21,12],[-25,-6],[21,12],[25,-6]]){ctx.beginPath();ctx.moveTo(p.x+x*.5,p.y-12);ctx.lineTo(p.x+x,p.y+y);ctx.stroke();}
  cube(ctx,p,18,10,26,actor.kind==="bomb"?"#ed7084":actor.kind==="blast"?"#b385b5":"#905c8d","#65395f","#4e3558");
  ctx.fillStyle="#141827";ctx.fillRect(p.x-10,p.y-29,20,8);ctx.fillStyle=color;ctx.fillRect(p.x-7,p.y-27,14,3);
  if(actor.kind==="bomb"){ctx.fillStyle="#ffc1ce";ctx.beginPath();ctx.arc(p.x,p.y-33,6,0,Math.PI*2);ctx.fill();}
  else{const d=[{x:1,y:0},{x:0,y:1},{x:-1,y:0},{x:0,y:-1}][actor.dir];ctx.strokeStyle="#eec5df";ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(p.x,p.y-21);ctx.lineTo(p.x+(d.x-d.y)*19,p.y-21+(d.x+d.y)*10);ctx.stroke();}
 }else if(actor.role==="ram"){
  ctx.fillStyle="#243d49";ctx.fillRect(p.x-22,p.y-9,14,20);ctx.fillRect(p.x+9,p.y-9,14,20);cube(ctx,{x:p.x,y:p.y-4},22,12,29,"#9baea5","#4f7773","#34585a");cube(ctx,{x:p.x,y:p.y-29},12,7,10,"#c7d4c4","#80a59d","#607e7e");ctx.fillStyle="#142638";ctx.fillRect(p.x-8,p.y-38,16,4);ctx.fillStyle=color;ctx.fillRect(p.x-6,p.y-37,12,2);ctx.strokeStyle="#b8d4c4";ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(p.x-18,p.y-16);ctx.lineTo(p.x-27,p.y-9);ctx.moveTo(p.x+18,p.y-16);ctx.lineTo(p.x+27,p.y-9);ctx.stroke();
 }else if(actor.role==="hook"){
  cube(ctx,p,14,8,31,"#aec2dd","#5778a1","#3e567f");ctx.strokeStyle="#a8caef";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(p.x-9,p.y+3);ctx.lineTo(p.x-15,p.y+15);ctx.moveTo(p.x+9,p.y+3);ctx.lineTo(p.x+15,p.y+15);ctx.moveTo(p.x,p.y-31);ctx.lineTo(p.x+5,p.y-47);ctx.stroke();ctx.strokeStyle=color;ctx.beginPath();ctx.moveTo(p.x+12,p.y-16);ctx.lineTo(p.x+25,p.y-24);ctx.arc(p.x+27,p.y-26,5,0,Math.PI*1.4);ctx.stroke();ctx.fillStyle="#203452";ctx.fillRect(p.x-8,p.y-27,16,5);ctx.fillStyle=color;ctx.fillRect(p.x-6,p.y-25,12,2);
 }else{
  ctx.strokeStyle=color;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(p.x,p.y+6,22,10,0,0,Math.PI*2);ctx.stroke();cube(ctx,{x:p.x,y:p.y-10},15,9,25,"#dac4d7","#947490","#6a547c");ctx.fillStyle="#181b31";ctx.fillRect(p.x-10,p.y-35,20,7);ctx.fillStyle=color;ctx.fillRect(p.x-7,p.y-33,14,3);ctx.beginPath();ctx.moveTo(p.x,p.y-50);ctx.lineTo(p.x-9,p.y-39);ctx.lineTo(p.x+9,p.y-39);ctx.closePath();ctx.fill();
 }
 ctx.shadowBlur=0;ctx.fillStyle=enemy?"#ffd0d8":color;ctx.font="bold 10px monospace";ctx.textAlign="center";ctx.fillText(actor.id,p.x,p.y+27);if(!ghost)hp(ctx,p,actor,color);ctx.restore();
}
export function paint(ctx,{state,selected,mode,cursor,preview,plan,events=[],effect=0}){
 const level=getLevel(state.levelId);ctx.clearRect(0,0,1100,600);ctx.fillStyle="#141626";ctx.fillRect(0,0,1100,600);
 const halo=ctx.createRadialGradient(560,320,20,560,320,530);halo.addColorStop(0,"#413447");halo.addColorStop(1,"#101627");ctx.fillStyle=halo;ctx.fillRect(0,0,1100,600);
 ctx.strokeStyle="#8ba6c613";ctx.lineWidth=1;for(let i=0;i<86;i++){const x=(i*137)%1100,y=(i*79)%600;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-5,y+18);ctx.stroke();}
 const tiles=[];for(let y=0;y<8;y++)for(let x=0;x<8;x++)tiles.push({x,y});tiles.sort((a,b)=>a.x+a.y-b.x-b.y||a.x-b.x);
 for(const tile of tiles){const p=iso(tile.x,tile.y),wet=level.water.some(w=>w.x===tile.x&&w.y===tile.y);ctx.fillStyle=wet?"#13334a":(tile.x+tile.y)%2?"#313745":"#353b48";diamond(ctx,p);ctx.fill();ctx.strokeStyle="#7a7c9550";ctx.stroke();
  if(wet){ctx.strokeStyle="#75b9d05c";ctx.beginPath();ctx.moveTo(p.x-25,p.y+2);ctx.lineTo(p.x+3,p.y+8);ctx.moveTo(p.x-10,p.y-6);ctx.lineTo(p.x+24,p.y);ctx.stroke();}
  else{ctx.strokeStyle="#9dabc215";ctx.beginPath();ctx.moveTo(p.x-30,p.y-2);ctx.lineTo(p.x,p.y+14);ctx.stroke();ctx.fillStyle="#7d869455";ctx.fillRect(p.x-2,p.y-14,4,1);}
 }
 // Raised foundation and wet pavement reflect the two real squad/hostile colors.
 const a=iso(0,7),b=iso(7,7),c=iso(7,0);ctx.fillStyle="#181c30";ctx.beginPath();ctx.moveTo(a.x-46,a.y);ctx.lineTo(b.x,b.y+26);ctx.lineTo(b.x,b.y+42);ctx.lineTo(a.x-46,a.y+16);ctx.closePath();ctx.fill();ctx.fillStyle="#111b2c";ctx.beginPath();ctx.moveTo(b.x,b.y+26);ctx.lineTo(c.x+46,c.y);ctx.lineTo(c.x+46,c.y+16);ctx.lineTo(b.x,b.y+42);ctx.closePath();ctx.fill();
 const shows=preview?.valid?preview.state:state;
 const objective=level.objective;
 const markers=objective?.route??objective?.exits??objective?.pads??[];
 for(let i=0;i<markers.length;i++){const tile=markers[i],p=iso(tile.x,tile.y);ctx.strokeStyle="#e9d49a";ctx.lineWidth=3;diamond(ctx,p,37,20);ctx.stroke();ctx.fillStyle="#ffe5a0";ctx.font="bold 10px monospace";ctx.textAlign="center";ctx.fillText(objective.type==="escort"?(i===markers.length-1?"EXIT":"V"+i):objective.type==="escape"?"EXIT":tile.unitId??"HOLD",p.x,p.y+17);}
 if(mode==="move")for(const tile of moveCells(state,selected)){const p=iso(tile.x,tile.y);ctx.fillStyle="#77ecd01d";diamond(ctx,p,41,23);ctx.fill();ctx.strokeStyle="#79f6d477";ctx.stroke();}
 const plans=plan?.plans??[];for(let i=0;i<plans.length;i++)for(const tile of plans[i].cells){const p=iso(tile.x,tile.y);ctx.fillStyle="#fa777c16";diamond(ctx,p,40,22);ctx.fill();ctx.strokeStyle="#e784985a";ctx.setLineDash([4,4]);ctx.stroke();ctx.setLineDash([]);}
 for(const wave of level.waves.filter(w=>w.turn===state.turn+1))for(const e of wave.enemies){const p=iso(e.x,e.y);ctx.strokeStyle="#e9d49a66";ctx.lineWidth=2;ctx.setLineDash([3,6]);diamond(ctx,p,30,17);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle="#e9d49a";ctx.font="8px monospace";ctx.textAlign="center";ctx.fillText("IN",p.x,p.y+3);}
 for(const tile of tiles)if(level.blocks.some(w=>w.x===tile.x&&w.y===tile.y)){const p=iso(tile.x,tile.y);cube(ctx,p,42,24,30,"#525266","#363748","#262c40");ctx.strokeStyle="#b3a99166";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(p.x-22,p.y-30);ctx.lineTo(p.x-8,p.y-22);ctx.moveTo(p.x-10,p.y-37);ctx.lineTo(p.x+4,p.y-29);ctx.stroke();}
 for(const city of state.buildings){const p=iso(city.x,city.y),height=city.id==="C1"?92:city.id==="C2"?66:77;if(city.hp<=0){cube(ctx,p,31,18,13,"#625665","#3c3548","#302c42");continue;}
  ctx.fillStyle="#040a2070";ctx.beginPath();ctx.ellipse(p.x+12,p.y+10,36,18,0,0,Math.PI*2);ctx.fill();cube(ctx,p,32,18,height,city.id==="C1"?"#7c7189":"#746b80","#494256","#353a4e");cube(ctx,{x:p.x,y:p.y-height},21,12,8,"#9992a5","#5d5069","#4e4a62");
  for(let row=0;row<height-18;row+=15){ctx.fillStyle=city.id==="C2"?"#76b2caaa":"#dec49b99";ctx.fillRect(p.x-22,p.y-height+14+row,8,4);ctx.fillRect(p.x-10,p.y-height+20+row,7,4);ctx.fillStyle="#8dc1cdbb";ctx.fillRect(p.x+9,p.y-height+20+row,8,4);}
  ctx.strokeStyle="#e5bce7";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(p.x,p.y-height-10);ctx.lineTo(p.x,p.y-height-29);ctx.stroke();ctx.fillStyle="#f09ecb";ctx.beginPath();ctx.arc(p.x,p.y-height-30,3,0,Math.PI*2);ctx.fill();ctx.font="10px monospace";ctx.textAlign="center";ctx.fillStyle="#dcc5e0";ctx.fillText(city.id+" "+city.hp+"/4",p.x,p.y+31);
 }
 for(const actor of bodies(state).filter(a=>a.group!=="city").sort((a,b)=>a.x+a.y-b.x-b.y)){
  const p=iso(actor.x,actor.y);if(actor.id===selected){ctx.strokeStyle="#79f6d4";ctx.lineWidth=3;diamond(ctx,{x:p.x,y:p.y+4},37,21);ctx.stroke();}robot(ctx,p,actor);
 }
 if(preview?.valid)for(const body of bodies(shows).filter(b=>b.group!=="city")){
  const original=bodies(state).find(b=>b.id===body.id);if(!original||body.x===original.x&&body.y===original.y)continue;const from=iso(original.x,original.y),to=iso(body.x,body.y);ctx.strokeStyle="#8eecdc";ctx.lineWidth=2;ctx.setLineDash([5,6]);ctx.beginPath();ctx.moveTo(from.x,from.y-12);ctx.lineTo(to.x,to.y-12);ctx.stroke();ctx.setLineDash([]);robot(ctx,to,body,true);
 }
 for(let i=0;i<plans.length;i++){
  const plan=plans[i],enemy=shows.enemies.find(e=>e.id===plan.enemyId&&e.hp>0);if(!enemy||!plan.cells.length)continue;const start=iso(enemy.x,enemy.y);ctx.strokeStyle="#f188a46e";ctx.lineWidth=2;ctx.setLineDash([7,7]);ctx.beginPath();ctx.moveTo(start.x,start.y-17);for(const tile of plan.cells){const p=iso(tile.x,tile.y);ctx.lineTo(p.x,p.y-9);}ctx.stroke();ctx.setLineDash([]);ctx.fillStyle="#e9a0b0";ctx.font="bold 11px monospace";ctx.textAlign="center";ctx.fillText(String(i+1),start.x+27,start.y-30);
 }
 if(cursor&&state.status==="playing"){const p=iso(cursor.x,cursor.y);ctx.strokeStyle=preview?.valid?mode==="skill"?"#f088c6":"#79f6d4":"#a6a1b8";ctx.lineWidth=2;diamond(ctx,p,43,24);ctx.stroke();ctx.fillStyle=ctx.strokeStyle;ctx.font="9px monospace";ctx.textAlign="center";ctx.fillText((cursor.x+1)+"/"+(cursor.y+1),p.x,p.y+5);}
 if(effect>0){ctx.save();ctx.globalAlpha=effect;for(const event of events){if(event.kind!=="hit"&&event.kind!=="death"&&event.kind!=="explosion")continue;const p=iso(event.x,event.y);ctx.strokeStyle=event.kind==="explosion"?"#ef9cca":"#f4d8a5";ctx.lineWidth=3;for(let k=0;k<8;k++){const angle=k*Math.PI/4,r=25+(1-effect)*20;ctx.beginPath();ctx.moveTo(p.x+Math.cos(angle)*r,p.y-15+Math.sin(angle)*r*.6);ctx.lineTo(p.x+Math.cos(angle)*(r+13),p.y-15+Math.sin(angle)*(r+13)*.6);ctx.stroke();}if(event.kind==="hit"){ctx.fillStyle="#fff1cb";ctx.font="bold 18px monospace";ctx.textAlign="center";ctx.fillText("−"+event.amount,p.x,p.y-62);}}ctx.restore();}
 ctx.textAlign="left";ctx.fillStyle="#a999b8";ctx.font="11px monospace";ctx.fillText("SECTOR "+String(state.levelId).padStart(2,"0")+" / "+level.grade,35,41);
 ctx.fillStyle="#85799388";ctx.font="9px monospace";ctx.textAlign="center";for(let x=0;x<8;x++){const p=iso(x,8);ctx.fillText(x+1,p.x,p.y+28);}
 ctx.textAlign="right";ctx.fillStyle="#92bead";ctx.fillText("3 UNITS / 3 COMMANDS",1065,575);
}
