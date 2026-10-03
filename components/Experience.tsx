import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="experience section-shell">
      <div className="container">
        <div className="section-kicker">02 — EXPERIENCE</div>
        <div className="section-heading-row">
          <h2>Where I Turned Knowledge Into Real-World Impact.</h2>
          <p>
            A reverse-chronological view of how I applied engineering, data, and business thinking across research and industry.
          </p>
        </div>

        <div className="timeline">
          {experiences.map((item, index) => (
            <article className="timeline-item" key={`${item.organization}-${item.year}`}>
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-marker" aria-hidden="true">
                <span />
              </div>
              <div className="timeline-card">
                <div className="timeline-card-topline">
                  <p>{item.organization}</p>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{item.role}</h3>
                <p className="location">{item.location}</p>
                <p className="impact">{item.impact}</p>
                <div className="tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
