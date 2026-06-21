import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CyberShield Password Analyzer — Test & Strengthen Your Password",
  description:
    "Analyze your password strength instantly with CyberShield. Get a security score, crack time estimate, and personalized recommendations to create unbreakable passwords.",
  keywords: ["password analyzer", "password strength", "cybersecurity", "password checker", "strong password"],
  authors: [{ name: "Arnav Singh Rawat", url: "mailto:arnav.singh.rawat07@gmail.com" }],
  openGraph: {
    title: "CyberShield Password Analyzer",
    description: "Instantly analyze your password strength and get security recommendations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-slate-950 text-white">{children}</body>
    </html>
  );
}
