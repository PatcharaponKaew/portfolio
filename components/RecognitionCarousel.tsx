"use client";
import { useEffect, useRef } from "react";
import type { Recognition } from "@/data/recognitions";

function AwardMark({ result }: { result: string }) {
 const gold = /1st Prize|1st Place|Gold Medal/.test(result);
 const silver = /Silver Medal/.test(result) && !gold;
 const podium = /Runner-up/.test(result);
 const tone = gold ? "gold" : silver ? "silver" : podium ? "podium" : "special";
 return <span className={`award-mark ${tone}`}>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
   {gold ? <><path d="M7 3h10v6a5 5 0 0 1-10 0V3ZM7 5H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4M12 14v5m-4 2h8m-10-2h12"/></> : <><circle cx="12" cy="9" r="6"/><path d="m8 14-1 8 5-3 5 3-1-8"/><path d="m12 5 1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4Z"/></>}
  </svg>
  <span>{gold ? "WINNER / GOLD" : silver ? "SILVER MEDAL" : podium ? "PODIUM" : "SPECIAL AWARD"}</span>
 </span>;
}

export default function RecognitionCarousel({ title, items, variant = "awards" }: { title:string; items:Recognition[]; variant?: "awards" | "honors" }) {
 const track = useRef<HTMLDivElement>(null);
 const drag = useRef<{ id:number; x:number; y:number; scroll:number; last:number; time:number; velocity:number; moved:boolean } | null>(null);
 const frame = useRef(0);
 const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 useEffect(()=>()=>{cancelAnimationFrame(frame.current); if(wheelTimer.current) clearTimeout(wheelTimer.current);},[]);
 const settle=(velocity=0, requested?:number)=>{
  const el=track.current; if(!el)return;
  cancelAnimationFrame(frame.current);
  const first=el.children[0] as HTMLElement | undefined; if(!first)return;
  const step=first.offsetWidth+(parseFloat(getComputedStyle(el).gap)||14);
  const max=el.scrollWidth-el.clientWidth;
  const from=el.scrollLeft;
  const target=Math.max(0,Math.min(max,Math.round(((requested ?? from)+Math.max(-step*.6,Math.min(step*.6,velocity*180)))/step)*step));
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){el.scrollLeft=target;return;}
  const start=performance.now();
  const tick=(now:number)=>{const t=Math.min(1,(now-start)/520);el.scrollLeft=from+(target-from)*(1-Math.pow(1-t,3));if(t<1)frame.current=requestAnimationFrame(tick);};
  frame.current=requestAnimationFrame(tick);
 };
 const finish=()=>{const d=drag.current;if(!d)return;drag.current=null;track.current?.classList.remove('dragging');if(d.moved)settle(performance.now()-d.time<100?d.velocity:0);};
 return <section className={`recognition-list recognition-${variant}`}><h4>{title}</h4><div ref={track} className="recognition-track" role="region" aria-label={title} tabIndex={0}
 onKeyDown={e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();const el=track.current!;settle(0,el.scrollLeft+(e.key==='ArrowRight'?1:-1)*((el.children[0] as HTMLElement).offsetWidth+14));}}}
 onWheel={e=>{if(Math.abs(e.deltaX)<Math.abs(e.deltaY)&&!e.shiftKey)return;cancelAnimationFrame(frame.current);if(wheelTimer.current)clearTimeout(wheelTimer.current);wheelTimer.current=setTimeout(()=>settle(),160);}}
 onPointerDown={e=>{if(e.button!==0||!e.isPrimary)return;cancelAnimationFrame(frame.current);if(wheelTimer.current)clearTimeout(wheelTimer.current);drag.current={id:e.pointerId,x:e.clientX,y:e.clientY,scroll:e.currentTarget.scrollLeft,last:e.clientX,time:performance.now(),velocity:0,moved:false};}}
 onPointerMove={e=>{const d=drag.current;if(!d||d.id!==e.pointerId)return;const dx=e.clientX-d.x;if(!d.moved&&Math.abs(e.clientY-d.y)>Math.abs(dx)&&Math.abs(e.clientY-d.y)>5){drag.current=null;return;}if(!d.moved&&Math.abs(dx)<4)return;d.moved=true;e.currentTarget.setPointerCapture(e.pointerId);e.currentTarget.classList.add('dragging');e.preventDefault();const now=performance.now();if(now>d.time)d.velocity=(d.last-e.clientX)/(now-d.time);d.last=e.clientX;d.time=now;e.currentTarget.scrollLeft=d.scroll-dx;}}
 onPointerLeave={()=>{if(!drag.current?.moved)drag.current=null;}}
 onPointerUp={finish} onPointerCancel={finish} onLostPointerCapture={finish}>
 {items.map((item,i)=><article className={`recognition-card${variant === "awards" ? " has-award-mark" : ""}`} key={item.result+item.name}><div className="recognition-image"><span>{String(i+1).padStart(2,'0')}</span><small>Image to be added</small></div><div className="recognition-copy">{variant === "awards" && <AwardMark result={item.result}/>}<h5>{item.result}</h5>{item.name&&<p>{item.name}</p>}{variant !== "awards" && item.detail&&<p className="recognition-detail">{item.detail}</p>}{variant !== "awards" && item.date&&<time>{item.date}</time>}</div></article>)}
 </div></section>;
}
