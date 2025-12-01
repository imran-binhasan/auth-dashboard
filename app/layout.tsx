import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    default: "Auth Dashboard | Next.js",
    template: "%s | Auth Dashboard",
  },
  description: "Secure authentication system built with Next.js App Router, featuring HttpOnly cookies, middleware protection, and Server Actions.",
  keywords: ["Next.js", "Authentication", "Dashboard", "TypeScript", "Server Actions"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    title: "Authenticated Dashboard",
    description: "Secure authentication system with Next.js",
    type: "website",
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
    </html>
  );
}