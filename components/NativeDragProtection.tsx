"use client";

import { useEffect } from "react";

export default function NativeDragProtection() {
  useEffect(() => {
    // Native HTML drag events are independent from carousel pointer/touch gestures.
    const preventNativeDrag = (event: DragEvent) => event.preventDefault();
    const protectImages = (root: ParentNode) => {
      root.querySelectorAll("img, svg image").forEach(image => image.setAttribute("draggable", "false"));
    };
    protectImages(document);
    const observer = new MutationObserver(records => {
      for (const record of records) for (const node of record.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches("img, svg image")) node.setAttribute("draggable", "false");
        protectImages(node);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("dragstart", preventNativeDrag, true);
    return () => {
      observer.disconnect();
      document.removeEventListener("dragstart", preventNativeDrag, true);
    };
  }, []);
  return null;
}
