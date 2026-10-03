"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { caseStudies } from "@/data/caseStudies";

const AUTOPLAY_MS = 6500;
const DRAG_THRESHOLD = 50;

function mod(value: number, length: number) {
  return ((value % length) + length) % length;
}

export default function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerStart = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => mod(current + 1, caseStudies.length));
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  const visibleCards = useMemo(() => {
    return [-1, 0, 1].map((offset) => ({
      offset,
      item: caseStudies[mod(activeIndex + offset, caseStudies.length)],
      index: mod(activeIndex + offset, caseStudies.length),
    }));
  }, [activeIndex]);

  const move = (direction: number) => {
    setActiveIndex((current) => mod(current + direction, caseStudies.length));
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const delta = event.clientX - pointerStart.current;
    if (Math.abs(delta) >= DRAG_THRESHOLD) move(delta < 0 ? 1 : -1);
    pointerStart.current = null;
  };

  return (
    <section id="case-studies" className="case-studies section-shell">
      <div className="container">
        <div className="case-heading-row">
          <div>
            <div className="section-kicker light">03 — SELECTED CASE STUDIES</div>
            <h2>How I Turn Problems Into Impact.</h2>
          </div>
          <p>
            A selection of work combining business thinking, technology, data, and real-world execution.
          </p>
        </div>

        <div
          className="carousel-shell"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            className="carousel-track"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (pointerStart.current = null)}
          >
            {visibleCards.map(({ item, offset, index }) => (
              <article
                className={`case-card ${offset === 0 ? "active" : "side"}`}
                key={`${item.id}-${offset}`}
                onClick={() => setActiveIndex(index)}
                aria-current={offset === 0 ? "true" : undefined}
              >
                <div className="case-card-index">{String(index + 1).padStart(2, "0")}</div>
                <div className="case-card-content">
                  <p className="case-category">{item.category}</p>
                  <h3>{item.title}</h3>
                  <h4>{item.subtitle}</h4>
                  <p>{item.description}</p>
                  <div className="case-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="case-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>

          <div className="carousel-controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous case study">←</button>
            <div className="carousel-dots" aria-label="Case study position">
              {caseStudies.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Show ${item.title}`}
                  className={index === activeIndex ? "active" : ""}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
            <button type="button" onClick={() => move(1)} aria-label="Next case study">→</button>
          </div>
          <p className="carousel-hint">Drag or swipe to explore — autoplay pauses while you interact.</p>
        </div>
      </div>
    </section>
  );
}
