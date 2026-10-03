import Image from "next/image";

export default function Hero() {
  return (
    <section id="top" className="hero section-shell">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">PATCHARAPON KAEWNOEN</p>
          <h1>
            Building solutions at the intersection of
            <span> Business, Technology, and People.</span>
          </h1>
          <div className="hero-meta">
            <p>Electrical Engineering @ KMUTT</p>
            <p>Bangkok, Thailand</p>
          </div>
          <a className="primary-cta" href="#case-studies">
            Discover My Impact <span aria-hidden="true">→</span>
          </a>
          <div className="hero-signals" aria-label="Profile highlights">
            <span>Engineering × Business</span>
            <span>20+ Awards & Recognitions</span>
            <span>Global Experience</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Portrait of Patcharapon Kaewnoen">
          <div className="portrait-frame">
            <Image
              src="/images/patcharapon-hero.jpeg"
              alt="Patcharapon Kaewnoen"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 44vw"
              className="portrait-image"
            />
          </div>
          <span className="portrait-note">Business × Technology × People</span>
        </div>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to About Me">
        Scroll <span>↓</span>
      </a>
    </section>
  );
}
