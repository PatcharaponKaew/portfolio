"use client";

import Image, { type ImageProps } from "next/image";

// Keep image rendering unchanged; block only the browser's native drag preview.
export default function NonDraggableImage(props: ImageProps) {
  return <Image {...props} draggable={false} onDragStart={event => event.preventDefault()} />;
}
