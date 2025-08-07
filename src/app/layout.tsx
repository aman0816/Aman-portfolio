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
  title: "Aman Kant Ranjan - Front End Developer",
  description: "Professional portfolio of Aman Kant Ranjan, a Front End Developer specializing in React, Next.js, TypeScript, and modern web technologies. View projects, skills, and get in touch.",
  keywords: [
    "Front End Developer",
    "React Developer",
    "Angular",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Portfolio",
    "Web Development",
    "UI/UX"
  ],
  authors: [{ name: "Aman Kant Ranjan" }],
  creator: "Aman Kant Ranjan",
  publisher: "Aman Kant Ranjan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://johndoe-portfolio.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Aman Kant Ranjan - Front End Developer",
    description: "Professional portfolio showcasing front-end development projects",
    url: 'https://amankantranjan-portfolio.com',
    siteName: 'Aman Kant Ranjan Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aman Kant Ranjan Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Aman Kant Ranjan - Front End Developer",
    description: "Professional portfolio showcasing front-end development projects",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
