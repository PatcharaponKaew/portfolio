"use client";

import { useEffect, useRef, useState } from "react";
import CaseGallery from "./CaseGallery";
import { caseStudies } from "@/data/caseStudies";
import Image from "./NonDraggableImage";
import styles from "./Projects.module.css";

const order = ["insurtech", "coffee", "jobfinity", "light-pipe", "carbon-credit", "beeeco", "pv-fault", "telesorting", "floating-buoy"];
const projects = order.map(id => caseStudies.find(project => project.id === id)!);
const visualOrder = ["pv-fault", "insurtech", "light-pipe", "beeeco", "carbon-credit", "coffee", "jobfinity", "telesorting", "floating-buoy"];
const displayProjects = visualOrder.map(id => projects.find(project => project.id === id)!);
const icons = ["M12 3 4 7v5c0 5 8 9 8 9s8-4 8-9V7Z", "M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2", "M4 7h16v13H4ZM8 7V4h8v3", "M9 18h6m-5 3h4M8 14a6 6 0 1 1 8 0l-1 3H9Z", "M5 19C3 7 12 3 21 3c0 10-4 18-16 16Zm0 0L16 8", "M5 7 12 3l7 4v10l-7 4-7-4Z", "M3 5h18v14H3ZM3 12h18M12 5v14", "M3 20V9l6 3V7l6 3V4h6v16Z", "M3 17q3-4 6 0t6 0 6 0M12 3v10M8 9h8"];

export default function CaseStudies() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const dragged = useRef(false);
  const drag = useRef<{ id: number; x: number } | null>(null);
  const resumeAt = useRef(0);
  const loopPosition = useRef(0);
  useEffect(() => {
    const viewport = gridRef.current;
    if (!viewport || selected) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const initialPeriod = viewport.querySelector<HTMLElement>(`.${styles.grid}`)?.getBoundingClientRect().width ?? 0;
    if (!viewport.scrollLeft && initialPeriod) viewport.scrollLeft = initialPeriod;
    let frame = 0;
    let last = 0;
    loopPosition.current = viewport.scrollLeft;
    const tick = (now: number) => {
      const delta = last ? Math.min(now - last, 40) : 0;
      last = now;
      const period = viewport.querySelector<HTMLElement>(`.${styles.grid}`)?.getBoundingClientRect().width ?? 0;
      const bounds = viewport.getBoundingClientRect();
      if (!drag.current && now > resumeAt.current && !preference.matches && bounds.bottom > 0 && bounds.top < window.innerHeight && period) {
        loopPosition.current += delta * .025;
        if (loopPosition.current >= period * 2) loopPosition.current -= period;
        viewport.scrollLeft = loopPosition.current;
      } else loopPosition.current = viewport.scrollLeft;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [selected]);
  const move = (direction: number) => {
    const grid = gridRef.current;
    if (!grid) return;
    grid.scrollBy({ left: direction * grid.clientWidth * .75, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const cards = Array.from(gridRef.current?.querySelectorAll<HTMLElement>("article") ?? []);
    // Reveal the ribbon on vertical entry, rather than fading identical copies
    // independently when horizontal scrolling crosses a loop boundary.
    const observer = new IntersectionObserver(([entry]) => {
      cards.forEach(card => { card.dataset.visible = String(entry.isIntersecting); });
    }, { threshold: 0 });
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="case-studies" className="case-studies section-shell">
      <div className="container">
        <div className="case-heading-row">
          <div><div className="section-kicker light">PROJECTS</div><h2>How I Turn Problems Into Impact.</h2></div>
          <p>A selection of work combining business thinking, technology, data, and real-world execution.<span className={styles.demoNote}>Card visuals are AI-generated concept illustrations.</span></p>
        </div>
        <div className={styles.frame}>
        <div ref={gridRef} className={styles.viewport} role="region" aria-label="Projects, two-row horizontal grid" tabIndex={0}
        onPointerDown={event => {
          if (!event.isPrimary || event.button !== 0) return;
          dragged.current = false;
          resumeAt.current = Infinity;
          if (event.pointerType !== "mouse") return;
          drag.current = { id: event.pointerId, x: event.clientX };
          event.currentTarget.dataset.dragging = "true";
        }}
        onPointerMove={event => {
          const gesture = drag.current;
          if (!gesture || gesture.id !== event.pointerId) return;
          if (Math.abs(gesture.x - event.clientX) > 3) {
            dragged.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
          }
          event.currentTarget.scrollLeft += gesture.x - event.clientX;
          gesture.x = event.clientX;
        }}
        onPointerUp={event => { drag.current = null; delete event.currentTarget.dataset.dragging; resumeAt.current = performance.now() + 1200; }}
        onPointerCancel={event => { drag.current = null; delete event.currentTarget.dataset.dragging; resumeAt.current = performance.now() + 1200; }}
        onLostPointerCapture={event => { drag.current = null; delete event.currentTarget.dataset.dragging; resumeAt.current = performance.now() + 1200; }}
        onWheel={() => { resumeAt.current = performance.now() + 1800; }}
        onScroll={event => {
          const viewport = event.currentTarget;
          const period = viewport.querySelector<HTMLElement>(`.${styles.grid}`)?.getBoundingClientRect().width ?? 0;
          if (!period) return;
          // Recenter between identical copies before native scrolling hits an end.
          if (viewport.scrollLeft < period * .5) {
            viewport.scrollLeft += period;
            loopPosition.current = viewport.scrollLeft;
          } else if (viewport.scrollLeft >= period * 2) {
            viewport.scrollLeft -= period;
            loopPosition.current = viewport.scrollLeft;
          }
        }}
        onKeyDown={event => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); resumeAt.current = performance.now() + 1800; move(event.key === "ArrowRight" ? 1 : -1); }
        }}>
          <div className={styles.track}>
          {[0, 1, 2].map(copy => <div className={styles.grid} key={copy} aria-hidden={copy !== 1 ? true : undefined}>
          {displayProjects.map(project => {
            const featured = project.id === "pv-fault";
            return <article key={project.id} data-project={project.id} className={`${styles.card} ${featured ? styles.featured : ""}`}>
              <div className={styles.media}><Image src={`/images/project-demos/${project.id}.png`} alt={`AI-generated concept illustration for ${project.title}`} fill sizes="(max-width: 700px) 90vw, 55vw" /></div>
              <div className={styles.copy}><p className={styles.category}>{project.category}</p><h3>{project.title}</h3></div>
              <button type="button" className={styles.cardLink} aria-label={`View ${project.title} details`} tabIndex={copy !== 1 ? -1 : 0} onClick={() => { if (!dragged.current) setSelected(project); }} />
            </article>;
          })}
          </div>)}
          </div>
        </div>
        </div>
      </div>
      {selected && <CaseGallery item={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
