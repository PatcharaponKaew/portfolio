"use client";

import { experiences } from "@/data/experience";
import Image from "./NonDraggableImage";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

// Measured visible artwork bounds in the original supplied images.
const logoArtwork: Record<string, { width: number; height: number; bounds: number[]; background: string }> = {
  "/images/experience/rewastec.png": { width: 447, height: 447, bounds: [40, 175, 372, 273], background: "#ffffff" },
  "/images/experience/hokkaido.png": { width: 447, height: 447, bounds: [30, 39, 416, 409], background: "#007f2d" },
  "/images/experience/thaibev.png": { width: 340, height: 148, bounds: [0, 1, 340, 145], background: "#ffffff" },
  "/images/experience/thaivivat.png": { width: 512, height: 512, bounds: [94, 120, 418, 392], background: "#009640" },
};

function logoStyle(path: string): CSSProperties {
  const { width, height, bounds: [left, top, right, bottom], background } = logoArtwork[path];
  const inkWidth = right - left;
  return {
    background,
    "--logo-width-ratio": width / inkWidth,
    "--logo-height-ratio": height / inkWidth,
    "--logo-center-x": (left + right) / 2 / inkWidth,
    "--logo-center-y": (top + bottom) / 2 / inkWidth,
  } as CSSProperties;
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !window.IntersectionObserver) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const items = Array.from(section.querySelectorAll<HTMLElement>(".timeline-item"));
    if (preference.matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        (entry.target as HTMLElement).dataset.visible = entry.isIntersecting ? "true" : "false";
      });
    }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(item => {
      item.dataset.visible = "false";
      observer.observe(item);
    });
    const finish = () => {
      if (!preference.matches) return;
      items.forEach(item => { item.dataset.visible = "true"; });
      observer.disconnect();
    };
    preference.addEventListener("change", finish);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", finish);
      items.forEach(item => { delete item.dataset.visible; });
    };
  }, []);
  return (
    <section id="experience" ref={sectionRef} className="experience section-shell">
      <div className="container">
        <div className="section-heading-row">
          <h2>Where I Turned Knowledge Into Real-World Impact.</h2>
          <p>
            How I applied engineering, data, and business thinking across research and industry.
          </p>
        </div>

        <div className="timeline">
          {experiences.map((item, index) => (
            <article className="timeline-item" key={`${item.organization}-${item.year}`}>
              <div className="timeline-year">{item.year}<span className="experience-category">{["Business & Strategy", "Research & Innovation", "Engineering Application", "Data Foundation"][index]}</span></div>
              <div className="timeline-marker" aria-hidden="true">
                <span />
              </div>
              <div className="timeline-card">
                <div className="experience-logo" style={logoStyle(item.logo)}>
                  <Image src={item.logo} alt={`${item.organization} logo`} width={88} height={88} />
                </div>
                <div className="experience-copy">
                <div className="timeline-card-topline">
                    <p>{item.organization}</p>
                </div>
                <h3>{item.role}</h3>
                {item.location && <p className="location"><svg aria-hidden="true" width="14" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>{item.location}</p>}
                {item.impact && <p className="impact">{item.impact}</p>}
                {item.responsibilities && <ul className="experience-responsibilities">
                  {item.responsibilities.map(responsibility => <li key={responsibility}>{responsibility}</li>)}
                </ul>}
                {item.tags.length > 0 && <div className="tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
