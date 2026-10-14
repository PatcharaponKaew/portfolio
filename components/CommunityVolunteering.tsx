import Image from "./NonDraggableImage";
import type { CSSProperties } from "react";
import { communityMemories } from "@/data/communityMemories";

export default function CommunityVolunteering() {
  return <section id="community" className="community-volunteering section-shell">
    <div className="container community-heading">
      <p className="section-kicker">06 — COMMUNITY &amp; VOLUNTEERING</p>
      <h2>Beyond the work.</h2>
      <p>Moments of giving back, learning, and growing with others.</p>
    </div>
    <div className="community-marquee" role="region" aria-label="Community and volunteering memories">
      <div className="community-film">
        {[0, 1].map(copy => <div key={copy} className="community-film-group" aria-hidden={copy === 1 ? true : undefined}>
          {communityMemories.map(memory => <figure key={memory.id} className={`memory-polaroid ${memory.size}`} style={{ "--memory-rotation": `${memory.rotation}deg` } as CSSProperties}>
            <div className="memory-photo">
              {memory.photo ? <Image src={memory.photo} alt={memory.caption} fill sizes="(max-width: 720px) 42vw, 280px" /> : <div className="memory-photo-pending"><span>PHOTO TO COME</span><small>Community memories</small></div>}
            </div>
            <figcaption>{memory.caption}</figcaption>
          </figure>)}
        </div>)}
      </div>
    </div>
  </section>;
}
