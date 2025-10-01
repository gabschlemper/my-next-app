import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header, Footer } from "@/components/layout/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitHub Portfolio Demo | Next.js 14 + TypeScript",
  description: "A comprehensive GitHub portfolio application demonstrating Next.js 14 data fetching strategies, TypeScript, accessibility best practices, and modern React patterns.",
  keywords: ["Next.js", "TypeScript", "GitHub API", "React", "Accessibility", "SWR", "Portfolio"],
  authors: [{ name: "Frontend Developer" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex flex-col bg-gray-50 dark:bg-gray-900`}
      >
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
