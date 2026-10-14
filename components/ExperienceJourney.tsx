import { useEffect, useState } from "react";
import { experienceJourneys } from "@/data/experienceJourneys";
import { destinationAssets } from "@/data/destinationAssets";
import { globalExperiences } from "@/data/globalExperiences";

export default function ExperienceJourney({ index, revealed }: { index: number | null; revealed: boolean }) {
  const [lastIndex, setLastIndex] = useState(0);
  useEffect(() => { if(index !== null) setLastIndex(index); },[index]);
  const item = globalExperiences[index ?? lastIndex];
  const detail = experienceJourneys[item.code];
  const photo = destinationAssets[item.code];
  return <div id="experience-journey" className={`experience-journey container${revealed ? " revealed" : ""}`} inert={!revealed} aria-hidden={!revealed}>
    <div className="journey-clip"><div className="journey-content">
      <figure className="journey-photo">{!photo.src ? <div className="journey-photo-placeholder">Experience photo to be added</div> : <img draggable={false} onDragStart={event => event.preventDefault()} src={photo.src!} alt={photo.alt} loading="lazy" decoding="async" width={975} height={1614} />}<figcaption>Destination photo · Experience photo to be added</figcaption></figure>
      <header><p className="section-kicker">THE EXPERIENCE</p><h3>{item.institution}</h3><p>{item.city} · {item.year ?? "Year to be confirmed"}</p></header>
      <section><h4>01 — WHAT I EXPERIENCED</h4><p>{detail.experienced}</p></section>
      <section><h4>02 — WHAT I WORKED ON</h4><p>{detail.worked}</p></section>
      <section><h4>03 — WHAT I GAINED</h4><ul>{detail.gained.map(value => <li key={value}>{value}</li>)}</ul></section>
      <section><h4>04 — KEY TAKEAWAY</h4><p>{detail.takeaway}</p><small>Draft reflection — to be refined by Patcharapon.</small></section>
    </div></div>
  </div>;
}
