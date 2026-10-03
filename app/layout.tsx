import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Patcharapon Kaewnoen | Business × Technology",
  description:
    "Personal portfolio of Patcharapon Kaewnoen — building solutions at the intersection of business, technology, and people.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
