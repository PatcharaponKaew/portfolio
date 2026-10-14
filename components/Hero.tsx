"use client";

import { profile } from "@/data/profile";
import Image from "./NonDraggableImage";
import { useEffect, useRef, type PointerEvent } from "react";
import styles from "./Hero.module.css";

const identityWords = ["ENGINEERING", "BUSINESS", "INNOVATION", "RESEARCH", "IMPACT"];

function HeroStatistics() {
  const strip = useRef<HTMLDListElement>(null);
  useEffect(() => {
    const element = strip.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const counters = Array.from(element.querySelectorAll<HTMLElement>("[data-count]"));
    let frame = 0;
    let counterVisible = false;
    const finish = () => {
      cancelAnimationFrame(frame);
      counters.forEach(counter => { counter.textContent = counter.dataset.final!; });
    };
    const observer = new IntersectionObserver(entries => {
      const visible = entries.some(entry => entry.isIntersecting);
      if (visible === counterVisible) return;
      counterVisible = visible;
      cancelAnimationFrame(frame);
      if (media.matches) { finish(); return; }
      if (!visible) {
        counters.forEach(counter => { counter.textContent = counter.dataset.decimals === "2" ? "0.00" : `0${counter.dataset.suffix || ""}`; });
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 1000);
        const eased = 1 - Math.pow(1 - progress, 3);
        counters.forEach(counter => {
          const value = Number(counter.dataset.count) * eased;
          counter.textContent = counter.dataset.decimals === "2" ? value.toFixed(2) : `${Math.round(value)}${counter.dataset.suffix || ""}`;
        });
        if (progress < 1) frame = requestAnimationFrame(tick);
        else finish();
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: .25 });
    observer.observe(element);
    const onPreferenceChange = () => { if (media.matches) finish(); };
    media.addEventListener("change", onPreferenceChange);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); media.removeEventListener("change", onPreferenceChange); };
  }, []);
  return <dl ref={strip} className={styles.statistics} aria-label="Academic and international achievements">
    <div><dt aria-label="3.95"><span aria-hidden="true" data-count="3.95" data-decimals="2" data-final="3.95">3.95</span></dt><dd>GPAX / 4.00</dd></div>
    <div><dt aria-label="20 plus"><span aria-hidden="true" data-count="20" data-suffix="+" data-final="20+">20+</span></dt><dd>AWARDS &amp; RECOGNITIONS</dd></div>
    <div><dt aria-label="8"><span aria-hidden="true" data-count="8" data-final="8">8</span></dt><dd>COUNTRIES</dd></div>
  </dl>;
}

export default function Hero() {
  const hero = useRef<HTMLElement>(null);
  const portrait = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hide = () => { glow.current?.style.setProperty("opacity", "0"); };
    const follow = (event: globalThis.PointerEvent) => {
      const bounds = hero.current?.getBoundingClientRect();
      if (!bounds || bounds.bottom <= event.clientY || event.pointerType !== "mouse" || preference.matches) { hide(); return; }
      glow.current?.style.setProperty("--glow-x", `${event.clientX}px`);
      glow.current?.style.setProperty("--glow-y", `${event.clientY}px`);
      glow.current?.style.setProperty("opacity", "1");
    };
    window.addEventListener("pointermove", follow, { passive: true });
    window.addEventListener("scroll", hide, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    preference.addEventListener("change", hide);
    return () => {
      window.removeEventListener("pointermove", follow);
      window.removeEventListener("scroll", hide);
      document.documentElement.removeEventListener("pointerleave", hide);
      preference.removeEventListener("change", hide);
    };
  }, []);
  useEffect(() => {
    const section = hero.current;
    const image = portrait.current;
    if (!section || !image) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height)));
      image.style.setProperty("--portrait-scroll-y", `${preference.matches ? 0 : progress * 28}px`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
    };
  }, []);
  const motionEnabled = (event: PointerEvent<HTMLElement>) => event.pointerType === "mouse"
    && window.matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)").matches
    && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const resetPortrait = () => {
    portrait.current?.style.removeProperty("--portrait-x");
    portrait.current?.style.removeProperty("--portrait-y");
  };
  const movePortrait = (event: PointerEvent<HTMLElement>) => {
    if (!motionEnabled(event)) { resetPortrait(); return; }
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    portrait.current?.style.setProperty("--portrait-x", `${x * 14}px`);
    // Downward-only travel keeps the cutout grounded at the clipped Hero edge.
    portrait.current?.style.setProperty("--portrait-y", `${(y + 1) * 3}px`);
  };
  const moveCTA = (event: PointerEvent<HTMLAnchorElement>) => {
    if (!motionEnabled(event)) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    event.currentTarget.style.setProperty("--cta-x", `${x * 4}px`);
    event.currentTarget.style.setProperty("--cta-y", `${y * 3}px`);
  };
  return (
    <>
    <div ref={glow} className={styles.glow} aria-hidden="true" />
    <section id="top" ref={hero} className={`hero section-shell ${styles.heroRoot}`} onPointerMove={movePortrait} onPointerLeave={resetPortrait}>
      <div className={`container hero-grid ${styles.grid}`}>
        <div className={`hero-copy ${styles.copy}`} onCopy={event => event.preventDefault()}>
          <p className={styles.eyebrow}><span className={styles.headingAccent} aria-hidden="true" />ENGINEERING MINDSET. REAL-WORLD IMPACT.</p>
          <h1>
            <span>PATCHARAPON</span>
            <span>KAEWNOEN</span>
          </h1>
          <p className="hero-tagline">
            <span className={styles.taglineIntro}>Building solutions at the intersection of</span>{" "}<span className={styles.taglineFocus}><span className="hero-keyword">Business</span>, <span className="hero-keyword">Technology</span>, and <span className="hero-keyword">People</span>.</span>
          </p>
          <div className={`hero-meta ${styles.meta}`}>
            <p><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m2 9 10-5 10 5-10 5-10-5Zm4 2v6c4 3 8 3 12 0v-6M22 9v7" /></svg>{profile.university}</p>
            <p><svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>{profile.location}</p>
          </div>
          <a className={`primary-cta ${styles.cta}`} href="#case-studies"
            onPointerMove={moveCTA}
            onPointerLeave={event => { event.currentTarget.style.removeProperty("--cta-x"); event.currentTarget.style.removeProperty("--cta-y"); }}
            onClick={event => {
              const target = document.getElementById("case-studies");
              if (!target || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              target.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
              window.history.pushState(null, "", "#case-studies");
            }}>
            Discover My Impact <span className={styles.ctaIcon} aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          </a>
          <HeroStatistics />
        </div>

        <div className={`hero-visual ${styles.visual}`}>
          <div className={styles.stage}>
            <svg className={styles.geometry} viewBox="0 0 600 680" fill="none" aria-hidden="true">
              <circle cx="310" cy="330" r="268" stroke="currentColor" strokeWidth=".7" />
              <circle cx="310" cy="330" r="230" stroke="currentColor" strokeWidth=".5" />
              <path d="M40 575h520M80 560v30m420-30v30" stroke="currentColor" strokeWidth=".6" />
              <circle className={styles.orbitDot} cx="150" cy="115" r="4" />
              <circle className={styles.orbitDot} cx="578" cy="330" r="3" />
            </svg>
            <div className={styles.marquee} aria-hidden="true">
              {[0, 1, 2].map(row => (
                <div className={styles.row} key={row}>
                  <div className={styles.track}>
                    {[0, 1].map(copy => (
                      <div className={styles.sequence} key={copy}>
                        {identityWords.map(word => (
                          <span className={word === "IMPACT" ? styles.accent : undefined} key={word}>
                            {word}<span className={styles.separator}>•</span>
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          <div ref={portrait} className={styles.portrait}>
            <div className={styles.portraitReveal}>
            <Image
              src="/images/patcharapon-hero-cutout.png"
              alt={profile.name}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 44vw"
              className={styles.image}
            />
            </div>
          </div>
          </div>
        </div>
      </div>

    </section>
    </>
  );
}
