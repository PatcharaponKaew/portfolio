"use client";

import { Mascot } from "page-mascot";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function NavbarMascot() {
  const reducedMotion = useReducedMotion();
  const directions = "/mascots/patcharapon-directions.webp";
  return <div className="brand navbar-mascot" onDragStart={event => event.preventDefault()}>
    {reducedMotion ? <span className="navbar-mascot-static" role="img" aria-label="Patcharapon mascot"
      style={{ backgroundImage: `url(${directions})` }} /> :
      <Mascot directions={directions} reactions="/mascots/patcharapon-reactions.webp" size={48}
        label="Patcharapon mascot" className="navbar-mascot-control" />}
  </div>;
}
