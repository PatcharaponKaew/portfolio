"use client";

import Image from "./NonDraggableImage";
import { useEffect, useRef, useState } from "react";
import type { CaseStudy } from "@/data/caseStudies";

export default function CaseGallery({ item, onClose }: { item: CaseStudy; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const startX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const images = item.gallery || [];
  const move = (delta: number) => { if (images.length) setIndex(current => (current + delta + images.length) % images.length); };

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if(element && !element.open) element.showModal();
    return () => {
      if(element?.open) element.close();
      previousFocus?.focus({ preventScroll:true });
      document.body.style.overflow = oldOverflow;
    };
  }, []);

  return (
    <dialog ref={dialog} className="project-gallery" aria-labelledby="gallery-title"
      onCancel={onClose}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}>
      <div className="gallery-panel">
        <header className="gallery-header">
          <h2 id="gallery-title">{item.title}</h2>
          <button type="button" onClick={onClose} aria-label="Close project details" autoFocus>×</button>
        </header>
        {images.length > 0 ? <>
        <div className="gallery-image"
          onPointerDown={event => {
            if (!event.isPrimary || event.button !== 0) return;
            startX.current = event.clientX;
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerUp={event => {
            if (startX.current !== null) {
              const delta = event.clientX - startX.current;
              if (Math.abs(delta) > 50) move(delta < 0 ? 1 : -1);
            }
            startX.current = null;
          }}
          onPointerCancel={() => { startX.current = null; }}
          onLostPointerCapture={() => { startX.current = null; }}>
          <Image key={images[index].src} src={images[index].src} alt={images[index].alt} fill
            sizes="(max-width: 720px) 94vw, 1100px" draggable={false} />
        </div>
        <div className="gallery-navigation">
          <button type="button" onClick={() => move(-1)} aria-label="Previous project image">←</button>
          <p aria-live="polite">{index + 1} / {images.length} · {images[index].caption}</p>
          <button type="button" onClick={() => move(1)} aria-label="Next project image">→</button>
        </div>
        <div className="gallery-thumbnails">
          {images.map((image, position) => (
            <button key={image.src} type="button" aria-label={`View ${image.caption}`} aria-pressed={index === position}
              onClick={() => setIndex(position)}>
              <Image src={image.src} alt="" width={100} height={75} draggable={false} />
            </button>
          ))}
        </div>
        </> : <div className="gallery-image"><div className="case-image-placeholder"><span>{item.category}</span><strong>{item.title}</strong><small>Project image coming soon</small></div></div>}
        {item.details && (
          <div className="project-explanation">
            <p className="project-intro">{item.subtitle}</p>
            {item.details.map(section => (
              <section className="project-detail-section" key={section.heading}>
                <h3>{section.heading}</h3>
                <p>{section.text}</p>
              </section>
            ))}
          </div>
        )}
      </div>
    </dialog>
  );
}
