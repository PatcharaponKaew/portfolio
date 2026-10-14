"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useRef, useState } from "react";
import { globalExperiences } from "@/data/globalExperiences";
import ExperienceJourney from "./ExperienceJourney";
import BoardingPass from "./BoardingPass";

export default function GlobalExperience() {
  const track = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ id: number; x: number; y: number; scroll: number; lastX: number; time: number; velocity: number; start: number } | null>(null);
  const animation = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressClick = useRef(false);
  const moved = useRef(false);
  const [opened, setOpened] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [previewCountry, setPreviewCountry] = useState<number | null>(null);
  const [mapTarget, setMapTarget] = useState<number | null>(null);
  const [globeTurning, setGlobeTurning] = useState(false);
  const previousRegion = useRef(false);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [interaction, setInteraction] = useState(false);
  const reducedMotion = useReducedMotion();
  const pauseInteraction = () => {
    setInteraction(true);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setInteraction(false), 3500);
  };
  useEffect(() => () => {
    cancelAnimationFrame(animation.current);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (wheelTimer.current) clearTimeout(wheelTimer.current);
  }, []);
  useEffect(() => {
    setRevealed(false);
    if (opened === null) return;
    const timer = window.setTimeout(() => setRevealed(true), reducedMotion ? 0 : window.matchMedia("(max-width: 720px)").matches ? 350 : 850);
    return () => window.clearTimeout(timer);
  }, [opened, reducedMotion]);
  useEffect(() => {
    if (opened !== null || interaction || hovered || focused || dragging || reducedMotion) return;
    const timer = window.setTimeout(() => select((active + 1) % globalExperiences.length, false), 8500);
    return () => window.clearTimeout(timer);
  }, [opened, active, interaction, hovered, focused, dragging, reducedMotion]);

  const mapItem = mapTarget === null ? null : globalExperiences[mapTarget];
  const usaView = mapItem?.code === "US";
  const mapX = usaView ? 2040 : mapItem ? ((mapItem.longitude < 0 ? mapItem.longitude + 360 : mapItem.longitude) - 90) * 12 : 360;
  const mapY = usaView ? 64 : mapItem ? (50 - mapItem.latitude) * 8 : 240;
  const zoom = mapItem ? (usaView ? .78 : 1.22) : 1;
  const panX = mapItem ? 360 - mapX * zoom : 0;
  const panY = mapItem ? 240 - mapY * zoom : 0;
  useEffect(() => {
    if (previousRegion.current === usaView) return;
    previousRegion.current = usaView;
    setGlobeTurning(true);
    const timer = window.setTimeout(() => setGlobeTurning(false), 900);
    return () => window.clearTimeout(timer);
  }, [usaView]);

  const nearest = () => {
    const element = track.current;
    if (!element) return 0;
    const center = element.scrollLeft + element.clientWidth / 2;
    const cards = Array.from(element.children) as HTMLElement[];
    return cards.reduce((best, card, index) =>
      Math.abs(card.offsetLeft + card.offsetWidth / 2 - center) <
      Math.abs(cards[best].offsetLeft + cards[best].offsetWidth / 2 - center) ? index : best, 0);
  };

  const animateTo = (index: number, velocity = 0) => {
    const element = track.current;
    if (!element) return;
    cancelAnimationFrame(animation.current);
    const card = element.children[index] as HTMLElement | undefined;
    if (!card) return;
    const target = Math.max(0, Math.min(element.scrollWidth - element.clientWidth, card.offsetLeft + card.offsetWidth / 2 - element.clientWidth / 2));
    const from = element.scrollLeft;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { element.scrollLeft = target; setActive(index); updateCards(); return; }
    const started = performance.now();
    const duration = 560;
    // A bounded Hermite curve preserves a little release velocity and settles exactly at center.
    const distance = target - from;
    const tangent = Math.sign(velocity) === Math.sign(distance) ? Math.min(Math.abs(velocity) * duration, Math.abs(distance) * 2.5) * Math.sign(distance) : distance * 2.5;
    const frame = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      const t2 = t*t, t3 = t2*t;
      element.scrollLeft = from + (-2*t3 + 3*t2)*distance + (t3 - 2*t2 + t)*tangent;
      if (t < 1) animation.current = requestAnimationFrame(frame);
      else { element.scrollLeft = target; setActive(index); }
    };
    animation.current = requestAnimationFrame(frame);
  };
  const select = (index: number, manual = true) => {
    if (manual) { setMapTarget(index); pauseInteraction(); }
    setOpened(null);
    animateTo(index);
  };
  const finishDrag = () => {
    const gesture = pointer.current;
    if (!gesture) return;
    pointer.current = null;
    setDragging(false);
    pauseInteraction();
    if (!moved.current || !track.current) return;
    suppressClick.current = true;
    const element = track.current;
    const displacement = element.scrollLeft - gesture.scroll;
    const width = (element.children[gesture.start] as HTMLElement).offsetWidth;
    const velocity = performance.now() - gesture.time < 100 ? gesture.velocity : 0;
    let index = nearest();
    if (Math.abs(displacement) > width * .22 || Math.abs(velocity) > .35) {
      index = Math.max(0, Math.min(globalExperiences.length - 1, gesture.start + Math.sign(Math.abs(velocity) > .35 ? velocity : displacement)));
    }
    setMapTarget(index); setOpened(null);
    animateTo(index, velocity);
  };
  const updateCards = () => {
    const element = track.current;
    if (!element) return;
    const center = element.scrollLeft + element.clientWidth / 2;
    Array.from(element.children).forEach(child => {
      const card = child as HTMLElement;
      const proximity = Math.max(0, 1 - Math.abs(card.offsetLeft + card.offsetWidth/2 - center) / card.offsetWidth);
      card.style.setProperty("--drag-scale", String(.91 + proximity * .09));
      card.style.setProperty("--drag-opacity", String(.7 + proximity * .3));
    });
    setActive(nearest());
  };
  useEffect(() => {
    animateTo(0);
    updateCards();
    const resize = () => { animateTo(nearest()); updateCards(); };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <section id="global-experience" className="global-experience section-shell"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onClick={() => pauseInteraction()} onTouchStart={() => pauseInteraction()}
      onKeyDown={() => pauseInteraction()}>
      <div className="container global-heading">
        <div className="section-kicker">04 — GLOBAL EXPERIENCE</div>
        <h2>Across Borders. Beyond Boundaries.</h2>
        <p>Academic, research, and professional experiences across Asia and the United States.</p>
      </div>
      <div className="container asia-map-panel">
        <div className="asia-map-caption"><span>{globalExperiences.length === 8 ? "EIGHT" : globalExperiences.length} DESTINATIONS / ONE JOURNEY</span><span>{usaView ? "NORTH AMERICA" : "ASIA"}</span></div>
        <div className={`journey-map-viewport${globeTurning ? " globe-turning" : ""}`}><svg className="asia-map" viewBox="0 0 720 480" role="group" aria-label="Interactive map of Asia and the United States">
          <g className="journey-map-pan" style={{ transform: `matrix(${zoom}, 0, 0, ${zoom}, ${panX}, ${panY})` }}>
          <image href="/images/journey-world-clean.svg" x="-1080" y="-320" width="4320" height="1760" />
          {globalExperiences.map((item, index) => {
            const x = ((item.longitude < 0 ? item.longitude + 360 : item.longitude) - 90) * 12;
            const y = (50 - item.latitude) * 8;
            const left = item.code === "KR" || item.code === "TH";
            return (
              <g key={item.code} style={{ opacity: mapTarget !== null && mapTarget !== index ? .6 : 1 }} className={`map-destination${mapTarget === index ? " active" : ""}${previewCountry === index ? " preview" : ""}`} onMouseEnter={() => setPreviewCountry(index)} onMouseLeave={() => setPreviewCountry(null)} onFocus={() => setPreviewCountry(index)} onBlur={() => setPreviewCountry(null)} role="button" tabIndex={(usaView ? item.code === "US" : item.code !== "US") ? 0 : -1}
                aria-hidden={usaView ? item.code !== "US" : item.code === "US"} aria-label={`Explore ${item.country}`} aria-pressed={mapTarget === index} onClick={() => select(index)}
                onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); select(index); } }}>
                <circle className="map-halo" cx={x} cy={y} r="15" />
                <circle className="map-pin" cx={x} cy={y} r="5" />
                <text x={x + (left ? -20 : 20)} y={y + 5} textAnchor={left ? "end" : "start"}>{item.code === "US" ? "Gatlinburg, Tennessee" : item.country}</text>
              </g>
            );
          })}
          {usaView && <g className="map-region-labels" aria-hidden="true"><text x="1920" y="-96">CANADA</text><text x="1896" y="208">MEXICO</text><text x="1870" y="64">UNITED STATES</text></g>}
          </g>
        </svg>
        {mapTarget !== null && <button type="button" className="usa-offmap asia-return" aria-label="Return to Asia overview" onClick={() => { pauseInteraction(); setMapTarget(null); }}>← Asia</button>}
        {!usaView && <button type="button" className="usa-offmap" onClick={() => select(4)} aria-label="Explore United States">USA →</button>}
        </div>
        <p className="asia-map-selection">{mapTarget === null ? "Asia · All destinations" : <>{globalExperiences[mapTarget].city} <span> / {globalExperiences[mapTarget].code}</span></>}</p>
      </div>
      <div ref={track} className={`country-track${dragging ? " is-dragging" : ""}`}
        role="region" aria-label="Global experiences by country" aria-roledescription="carousel" tabIndex={0}
        onScroll={updateCards}
        onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}
        onWheel={event => {
          if (Math.abs(event.deltaX) < Math.abs(event.deltaY) && !event.shiftKey) return;
          cancelAnimationFrame(animation.current); pauseInteraction();
          if (wheelTimer.current) clearTimeout(wheelTimer.current);
          wheelTimer.current = setTimeout(() => select(nearest()), 140);
        }}
        onKeyDown={event => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault(); select(Math.max(0, Math.min(globalExperiences.length - 1, active + (event.key === "ArrowLeft" ? -1 : 1))));
          }
        }}
        onPointerDown={event => {
          if (event.button !== 0 || !event.isPrimary) return;
          cancelAnimationFrame(animation.current); pauseInteraction();
          if (wheelTimer.current) clearTimeout(wheelTimer.current);
          suppressClick.current = false; moved.current = false; setDragging(true);
          pointer.current = { id:event.pointerId, x:event.clientX, y:event.clientY, scroll:event.currentTarget.scrollLeft, lastX:event.clientX, time:performance.now(), velocity:0, start:nearest() };
        }}
        onPointerMove={event => {
          const gesture = pointer.current;
          if (!gesture || gesture.id !== event.pointerId) return;
          const dx = event.clientX - gesture.x;
          if (!moved.current && Math.abs(event.clientY - gesture.y) > Math.abs(dx) && Math.abs(event.clientY - gesture.y) > 5) { pointer.current = null; setDragging(false); return; }
          if (!moved.current && Math.abs(dx) < 4) return;
          moved.current = true; setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId); event.preventDefault();
          const now = performance.now(), dt = now - gesture.time;
          if (dt > 0) gesture.velocity = gesture.velocity * .3 + ((gesture.lastX - event.clientX)/dt) * .7;
          gesture.lastX = event.clientX; gesture.time = now;
          event.currentTarget.scrollLeft = gesture.scroll - dx;
        }}
        onPointerLeave={() => { if (!moved.current) { pointer.current=null; setDragging(false); } }}
        onPointerUp={finishDrag} onPointerCancel={finishDrag} onLostPointerCapture={finishDrag}>
        {globalExperiences.map((item, index) => (
          <BoardingPass key={item.code} item={item} index={index} active={active === index} opened={opened === index} onToggle={() => { if (suppressClick.current) return; pauseInteraction(); setMapTarget(index); animateTo(index); setOpened(current => current === index ? null : index); }} />
        ))}
      </div>
      <ExperienceJourney index={opened} revealed={revealed} />
      <div className="container country-controls">
        <button type="button" aria-label="Previous country" disabled={active === 0} onClick={() => select(active - 1)}>←</button>
        <div className="country-dots">
          {globalExperiences.map((item, index) => <button key={item.code} type="button" aria-label={`Show ${item.country}`} aria-pressed={active === index} onClick={() => select(index)} />)}
        </div>
        <button type="button" aria-label="Next country" disabled={active === globalExperiences.length - 1} onClick={() => select(active + 1)}>→</button>
      </div>

    </section>
  );
}

