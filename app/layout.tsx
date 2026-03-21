import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elvis Bibu | Machine Learning Engineer",
  description: "Portfolio of Elvis Bibu — Machine Learning Engineer focused on building intelligent systems and scalable AI solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground relative`}
      >
        {/* Animated deep space background effects */}
        <div className="fixed inset-0 stars-bg z-[-2] pointer-events-none"></div>
        <div className="fixed inset-0 bg-background/80 z-[-1] pointer-events-none"></div>

        <div className="nebula-glow pointer-events-none"></div>
        <div className="vignette-overlay pointer-events-none"></div>

        <Navbar />
        <div className="overflow-x-hidden w-full min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
