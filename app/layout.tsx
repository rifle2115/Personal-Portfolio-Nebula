import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NebulaBackground from "@/components/NebulaBackground";
import LoadingScreen from "@/components/LoadingScreen";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
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
        <LoadingScreen />
        
        {/* Interactive Nebula Canvas Background */}
        <NebulaBackground />

        <div className="vignette-overlay pointer-events-none"></div>

        <Navbar />
        <div className="overflow-x-hidden w-full min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
