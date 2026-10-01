import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], variable: "--f" });

export const metadata: Metadata = {
  title: "Design Your Workspace!",
  description: "Build your Bali office setup visually, then rent it.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.variable}`}>{children}</body>
    </html>
  );
}
