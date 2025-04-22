import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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
  title: {
    default: "chihabhajji.vercel.app",
    template: "%s | Chihab Hajji portfolio",
  },
  description:
    "Passionate FullStack Developer experienced in delivering impactful SaaS products across various industries.",
  openGraph: {
    title: "chihabhajji.vercel.app",
    description:
      "Passionate FullStack Developer experienced in delivering impactful SaaS products across various industries.",
    url: "https://chihabhajji.vercel.app",
    siteName: "chihabhajji.vercel.app",
    images: [
      {
        url: "https://chihabhajji.vercel.app/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <Analytics />
    </html>
  );
}
