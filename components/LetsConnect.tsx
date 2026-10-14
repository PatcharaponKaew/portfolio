import { profile } from "@/data/profile";
import { contact } from "@/data/contact";

function Icon({ type }: { type: "email" | "linkedin" | "cv" }) {
 return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{type === "email" ? <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></> : type === "linkedin" ? <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7m0-10v.1M11 17v-7m0 3c0-4 6-4 6 0v4"/></> : <><path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4"/></>}</svg>;
}
export default function LetsConnect() {
 const actions = [
  { label:"Email Me", type:"email" as const, href:contact.email ? `mailto:${contact.email}` : null, primary:true },
  { label:"LinkedIn", type:"linkedin" as const, href:contact.linkedin, primary:false },
  { label:"Download CV", type:"cv" as const, href:contact.cv, primary:false },
 ];
 return <section id="connect" className="lets-connect section-shell"><div className="container">
  <div className="connect-layout"><div className="connect-content">
   <p className="section-kicker">07 — LET’S CONNECT</p>
   <h2>Let’s Build<br/>Something Meaningful.</h2>
   <p className="connect-support">I’m open to opportunities where business, technology, and people come together to create meaningful impact.</p>
   <div className="connect-actions">{actions.map(action => {const content=<><Icon type={action.type}/><span>{action.label}</span><span className="connect-arrow" aria-hidden="true">↗</span></>;const style=`connect-cta${action.primary ? " primary" : ""}`;return action.href ? <a key={action.type} className={style} href={action.href} download={action.type === "cv" ? true : undefined} target={action.type === "linkedin" ? "_blank" : undefined} rel={action.type === "linkedin" ? "noopener noreferrer" : undefined}>{content}</a> : <button key={action.type} className={style} type="button" disabled title="Contact link to be added">{content}</button>;})}</div>
   <p className="connect-closing">Engineering mindset. Business curiosity. People-first impact.</p>
  </div><div className="connect-visual" aria-hidden="true"><div className="connect-glow"/><svg viewBox="0 0 400 440" fill="none"><ellipse cx="205" cy="220" rx="138" ry="164" transform="rotate(-28 205 220)"/><ellipse cx="205" cy="220" rx="86" ry="164" transform="rotate(32 205 220)"/><path d="M45 296c80-123 214-133 322-82"/><circle cx="279" cy="146" r="5"/></svg></div></div>
  <footer className="portfolio-footer"><span>{profile.name}</span><span>{profile.location}</span><span>© {profile.copyrightYear}</span></footer>
 </div></section>;
}
