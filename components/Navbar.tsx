"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import NavbarMascot from "./NavbarMascot";
import styles from "./Navbar.module.css";
const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Global", href: "#global-experience" },
  { label: "Contact", href: "#connect" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      const navbar = headerRef.current?.getBoundingClientRect();
      const surface = document.querySelector(".dark-editorial-flow")?.getBoundingClientRect();
      const sampleY = navbar ? navbar.top + navbar.height / 2 : 48;
      setDark(!!surface && surface.top <= sampleY && surface.bottom > sampleY);
      let current = "";
      for (const link of links) {
        const section = document.querySelector(link.href);
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * .35 && rect.bottom > 100) current = link.href;
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  const navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    setOpen(false);
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    window.history.pushState(null, "", href);
  };
  return (
    <header ref={headerRef} className={`navbar-wrap ${styles.entrance} ${styles.glass}`} data-scrolled={scrolled} data-theme={dark ? "dark" : "light"} onKeyDown={event => { if (event.key === "Escape") setOpen(false); }}>
      <nav className="navbar container" aria-label="Primary navigation">
        <div className={styles.identity}>
        <NavbarMascot />
        <a href="#top" className={styles.name} onClick={event => navigate(event, "#top")}>PATCHARAPON</a>
        </div>
        <div id="primary-nav-links" className={`nav-links ${styles.links}`} data-open={open}>
          {links.map((link) => (
            <a key={link.href} href={link.href} className={link.href === "#connect" ? styles.contact : undefined} aria-current={active === link.href ? "location" : undefined} onClick={event => navigate(event, link.href)}>
              {link.label}{link.href === "#connect" && <span aria-hidden="true"> ↗</span>}
            </a>
          ))}
        </div>
        <button className={styles.menu} type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="primary-nav-links" onClick={() => setOpen(!open)} onKeyDown={event => { if (event.key === "Escape") setOpen(false); }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={open ? "m6 6 12 12M18 6 6 18" : "M5 7h14M5 12h14M5 17h14"} /></svg>
        </button>
      </nav>
    </header>
  );
}
