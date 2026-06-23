import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
  title: "Jus & Lay Law Conglomerate | Premium Legal Advisory & Elite Counsel",
  description: "Supreme corporate counsel, banking litigation defense, commercial advice, and nationwide trials before the High Courts & Supreme Court of Pakistan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#070e1b] text-white">
        {children}
      </body>
    </html>
  );
}
