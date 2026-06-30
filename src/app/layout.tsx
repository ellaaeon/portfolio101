import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Danniela Adizas | Full-Stack Developer",
  description:
    "Interactive portfolio — full-stack developer specializing in web, mobile, and AI-powered applications.",
  keywords: [
    "Danniela Adizas",
    "Full-Stack Developer",
    "React",
    "Next.js",
    ".NET",
    "Laravel",
    "Portfolio",
  ],
  authors: [{ name: "Danniela Adizas" }],
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
  openGraph: {
    title: "Danniela Adizas | Full-Stack Developer",
    description:
      "Interactive portfolio — full-stack developer specializing in web, mobile, and AI-powered applications.",
    url: "https://adizasportfolio.vercel.app",
    siteName: "Danniela Adizas Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="font-sans">{children}</body>
    </html>
  );
}
