import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";

import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";
import SiteFooter from "@/components/layout/site-footer";

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
    default: "SIGNAL | Connected Technology",
    template: "%s | SIGNAL",
  },
  description:
    "Explore advanced communication devices, video monitoring, and network infrastructure. Discover the SIGNAL product catalog and partner-exclusive solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#0B0D0F] text-[#F3F4F2]">
        <Suspense fallback={<HeaderFallback />}>
          <SiteHeader />
        </Suspense>

        {children}

        <SiteFooter />
      </body>
    </html>
  );
}

function HeaderFallback() {
  return (
    <header className="h-[89px] border-b border-white/10 bg-[#0B0D0F]" />
  );
}
