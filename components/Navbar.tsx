"use client";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Case Studies", href: "#case-studies" },
];

export default function Navbar() {
  return (
    <header className="navbar-wrap">
      <nav className="navbar container" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Back to top">
          PK
        </a>
        <div className="nav-links">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
