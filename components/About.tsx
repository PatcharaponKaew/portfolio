"use client";

import { useEffect, useRef } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lines = Array.from(section.querySelectorAll<HTMLElement>(".about-poem-line"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const top = section.getBoundingClientRect().top;
      const viewport = window.innerHeight;
      // Staggered scroll ranges drive a small upward overshoot, then settle.
      // Reversing scroll retraces the same movement without time delays.
      lines.forEach((line, index) => {
        const progress = motion.matches ? 1 : Math.max(0, Math.min(1,
          (viewport * .95 - top - index * viewport * .10) / (viewport * .58)
        ));
        const eased = progress * progress * (3 - 2 * progress);
        const back = 1 + 2.2 * Math.pow(progress - 1, 3) + 1.2 * Math.pow(progress - 1, 2);
        line.style.setProperty("--line-opacity", String(Math.min(1, eased * 2.5)));
        line.style.setProperty("--line-rise", `${(1 - back) * 44}px`);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about about-editorial section-shell" aria-label="About me" onCopy={event => event.preventDefault()}>
      <div className="container about-editorial-content">
        <p className="about-poem">
          <span className="about-poem-line about-reveal"><span className="about-navy">Engineering</span> taught me to solve,</span>{" "}
          <span className="about-poem-line about-reveal"><span className="about-navy">Experience</span> taught me to evolve.</span>{" "}
          <span className="about-poem-line about-reveal">Now I bring ideas and people together,</span>{" "}
          <span className="about-poem-line about-reveal"><span className="about-cobalt">to build solutions</span>{" "}<span className="about-navy">that make things better.</span></span>
        </p>
        <div className="about-signature about-reveal">
          <div className="about-divider" aria-hidden="true" />
          <div className="about-keywords-window">
            <div className="about-keywords-track">
              {[0, 1].map((copy) => (
                <p className="about-keywords" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                  <span>ANALYTICAL THINKING</span><span aria-hidden="true">•</span>
                  <span>INNOVATION</span><span aria-hidden="true">•</span>
                  <span>HUMAN-CENTERED SOLUTIONS</span><span aria-hidden="true">•</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


