import { destinationAssets } from "@/data/destinationAssets";
import Image from "./NonDraggableImage";
import { globalExperiences } from "@/data/globalExperiences";

type Destination = (typeof globalExperiences)[number];

// TODO: real flight / gate / seat / terminal details have not been supplied.
// Keep the approved template with explicit empty values, not invented itineraries.
function Plane() {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12c0-.8-.7-1.5-1.5-1.5H15L8 2H5l4 8.5H4L2 8H0l1.5 4L0 16h2l2-2.5h5L5 22h3l7-8.5h5.5c.8 0 1.5-.7 1.5-1.5Z" /></svg>;
}

function DetailIcon({ pin = false }: { pin?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">{pin ? <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></> : <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6m10-6v6M3 11h18m-11 5 2 2 4-4"/></>}</svg>;
}

function Flag({code}:{code:string}) {
  return <svg className="pass-flag" viewBox="0 0 60 40" role="img" aria-label={`${code} flag`}>
    <rect width="60" height="40" rx="2" fill="white" />
    {code === "US" && <>{Array.from({length:7},(_,i)=><rect key={i} x="0" y={i*40/13*2} width="60" height={40/13} fill="#b22234"/>)}<rect width="26" height="22" fill="#3c3b6e"/>{Array.from({length:20},(_,i)=><circle key={i} cx={3+(i%5)*5} cy={3+Math.floor(i/5)*5} r="1" fill="white"/>)}</>}
    {code === "TH" && <><rect width="60" height="40" fill="#a51931"/><rect y="7" width="60" height="26" fill="white"/><rect y="13" width="60" height="14" fill="#2d2a4a"/></>}
    {code === "ID" && <path d="M0 0h60v20H0Z" fill="#ef3340" />}
    {code === "JP" && <circle cx="30" cy="20" r="11" fill="#bc002d" />}
    {code === "TW" && <><path d="M0 0h60v40H0Z" fill="#fe0000" /><path d="M0 0h30v20H0Z" fill="#000095" /><g fill="white"><circle cx="15" cy="10" r="4" />{Array.from({length:12},(_,i)=><path key={i} d="M14 4l1-2 1 2Z" transform={`rotate(${i*30} 15 10)`}/>)}</g></>}
    {code === "SG" && <><path d="M0 0h60v20H0Z" fill="#ef3340" /><circle cx="12" cy="10" r="7" fill="white" /><circle cx="15" cy="8" r="6" fill="#ef3340" />{[[21,5],[25,8],[24,13],[19,13],[17,8]].map(([x,y],i)=><path key={i} d="M0-2 .6-.6 2-.6 .9.4 1.3 2 0 1-1.3 2-.9.4-2-.6-.6-.6Z" transform={`translate(${x} ${y})`} fill="white"/>)}</>}
    {code === "PH" && <><path d="M0 0h60v20H0Z" fill="#0038a8" /><path d="M0 20h60v20H0Z" fill="#ce1126" /><path d="M0 0 30 20 0 40Z" fill="white" /><circle cx="11" cy="20" r="4" fill="#fcd116" /><g stroke="#fcd116" strokeWidth="2">{Array.from({length:8},(_,i)=><path key={i} d="M11 13v-2" transform={`rotate(${i*45} 11 20)`}/>)}</g>{[[4,5],[4,35],[23,20]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="1.5" fill="#fcd116" />)}</>}
    {code === "KR" && <><circle cx="30" cy="20" r="9" fill="#cd2e3a" /><path d="M21 20a9 9 0 0 0 18 0c-3 5-6-5-9 0s-6 5-9 0Z" fill="#0047a0" />{[[8,8,-35],[46,8,35],[8,29,35],[46,29,-35]].map(([x,y,r],i)=><g key={i} transform={`translate(${x} ${y}) rotate(${r} 3 2)`} stroke="#171717" strokeWidth="1.5"><path d="M0 0h8M0 3h8M0 6h8" />{i>0 && <path d="M4-1v8" stroke="white" strokeWidth="1.4"/>}</g>)}</>}
  </svg>;
}

export default function BoardingPass({item,index,active,opened,onToggle}:{item:Destination;index:number;active:boolean;opened:boolean;onToggle:()=>void}) {
  const ticket = { flight:"—", date:("date" in item ? item.date : item.year) ?? "—", gate:"—", seat:"—", terminal:"—" };
  const photo = destinationAssets[item.code];
  const x=(item.longitude-90)*12, y=(50-item.latitude)*8;
  return (
    <article className={`country-card boarding-pass${active?" active":""}${opened?" is-open":""}`} aria-current={active?"true":undefined} aria-label={`${item.country}: ${item.institution}`}>
      <button type="button" className="pass-open-button" aria-expanded={opened} aria-controls="experience-journey" aria-label={`${opened ? "Close" : "Open"} ${item.country} experience`} onClick={onToggle}/><span className="pass-tear-line" aria-hidden="true"/><div className="pass-photo">
        {!photo.src ? <div className="pass-photo-placeholder"><strong>{item.country.toUpperCase()}</strong><small>Experience photo to be added</small></div> : <Image src={photo.src!} alt={photo.alt} fill sizes="(max-width: 720px) 28vw, 260px" draggable={false} />}
        <span>{item.city.split(',')[0]}<br/>{item.country}</span>
      </div>
      <div className="pass-main">
        <p className="pass-eyebrow">GLOBAL EXPERIENCE</p>
        <div className="pass-country"><h3>{item.country}</h3><Flag code={item.code}/></div>
        <p className="pass-category">{item.code==='TH'?'REGIONAL LEADERSHIP & SUSTAINABLE BUSINESS':item.code==='ID'?'INNOVATION EXPERIENCE':(item.code==='PH'||item.code==='US')?'PROFESSIONAL EXPERIENCE':item.code==='JP'?'RESEARCH EXPERIENCE':'ACADEMIC EXPERIENCE'}</p>
        <h4>{item.institution}</h4>
        <p className="pass-type">{item.type}{item.code === "ID" && <strong className="pass-medal">Silver Medal</strong>}</p>
        <div className="pass-meta"><div><DetailIcon/><strong>{item.year??'—'}</strong><span>YEAR</span></div><div><DetailIcon pin/><strong>{item.city}</strong><span>LOCATION</span></div></div>
        <p className="pass-description">{item.description}</p>
        {item.code !== "US" && <svg className="pass-destination-map" viewBox={`${Math.max(0,x-90)} ${Math.max(0,y-90)} 180 180`} aria-hidden="true"><image href="/images/journey-world-clean.svg" x="-1080" y="-320" width="4320" height="1760"/><circle cx={x} cy={y} r="5" fill="#071838"/></svg>}
        <div className="pass-stamp" aria-hidden="true"><Plane/><span>{item.city.split(',')[0]}<br/>{item.code}</span></div>
      </div>
      <div className="pass-stub">
        <div className="pass-plane"><Plane/></div>
        <div className="pass-route"><div><small>FROM</small><strong>{item.code === "TH" ? "—" : "BKK"}</strong><span>{item.code === "TH" ? "—" : "BANGKOK"}</span></div><span className="pass-route-line"/><div><small>TO</small><strong>{item.airport ?? "—"}</strong><span>{item.destination ?? "—"}</span></div></div>
        <div className="pass-stub-meta"><div><small>FLIGHT</small><strong>{ticket.flight}</strong></div><div><small>DATE</small><strong>{ticket.date}</strong></div></div>
        <div className="pass-travel-details"><div><small>GATE</small><strong>{ticket.gate}</strong></div><div><small>SEAT</small><strong>{ticket.seat}</strong></div><div><small>TERMINAL</small><strong>{ticket.terminal}</strong></div></div>
        <svg className="pass-barcode" viewBox="0 0 240 45" preserveAspectRatio="none" aria-hidden="true">{Array.from({length:75},(_,i)=><rect key={i} x={i*3.2} y="0" width={[1,2,1.6,2.5,.8][i%5]} height="45" fill="currentColor" />)}</svg>
        <div className="pass-footer"><p className="pass-stub-city">{item.city}</p><svg viewBox="0 0 120 45" aria-hidden="true" className="pass-skyline"><g fill="currentColor"><path d="M0 42h120v3H0Zm12-2V18h7v22m14 0V12h7v28m14 0V18h7v22M8 12q28-10 58 0v5H8ZM75 40V29h8v11m22 0V25h7v15"/></g><g fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="94" cy="20" r="17"/><path d="M94 3v34M77 20h34M82 8l24 24M82 32l24-24m-16 8 4 4 4-4m-4 4-5 22m5-22 5 22"/></g></svg></div>
      </div>
    </article>
  );
}
