const highlights = [
  {
    value: "3.95 / 4.00",
    label: "Academic Excellence",
    detail: "Top of the Class",
  },
  {
    value: "5 Countries",
    label: "Global Experience",
    detail: "Academic & Professional Exposure",
  },
  {
    value: "20+",
    label: "Awards & Recognitions",
    detail: "Innovation • Leadership • Engineering",
  },
  {
    value: "Real-World Impact",
    label: "People • Community • Sustainability",
    detail: "Solutions designed for practical use",
  },
];

export default function About() {
  return (
    <section id="about" className="about section-shell">
      <div className="container">
        <div className="section-kicker">01 — ABOUT ME</div>
        <div className="about-grid">
          <div className="about-story">
            <h2>
              From Engineering
              <br />
              to Business Impact.
            </h2>
            <div className="statement">
              <p>
                I started with engineering, where I learned to break down complex problems and turn ideas into practical solutions.
              </p>
              <p>
                Through industry projects, innovation competitions, and international experiences, I discovered that I am most interested in problems where technology, business, and people come together.
              </p>
              <p>
                I enjoy using data and analytical thinking to understand challenges, while considering customer needs and real-world feasibility.
              </p>
              <p>
                My goal is to create solutions that not only work technically, but also deliver meaningful value to businesses, people, and society.
              </p>
            </div>
          </div>

          <div className="highlight-grid">
            {highlights.map((item) => (
              <article className="highlight-card" key={item.value}>
                <strong>{item.value}</strong>
                <h3>{item.label}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
