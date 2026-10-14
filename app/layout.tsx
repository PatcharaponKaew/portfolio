import type { Metadata } from "next";
import "./globals.css";
import NativeDragProtection from "@/components/NativeDragProtection";

export const metadata: Metadata = {
  title: "Patcharapon Kaewnoen | Business × Technology",
  description:
    "Personal portfolio of Patcharapon Kaewnoen — building solutions at the intersection of business, technology, and people.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><NativeDragProtection />{children}</body>
    </html>
  );
}
