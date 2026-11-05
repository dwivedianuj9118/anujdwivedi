import type { Metadata } from "next";
import "./globals.css";
import { Syne, DM_Sans } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});
export const metadata: Metadata = {
  title: "Anuj Dwivedi · Senior Backend Engineer",
  description: "Senior backend engineer in Laravel and Node.js: payment middleware at 25K+ transactions a day, a 10M+ install app backend, LLM integrations, and laravel/ai contributions.",
};


export default function RootLayout({
                                     children,
                                   }: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>{children}</body>
      </html>
  );
}
