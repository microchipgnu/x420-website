import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "x420 Token - Calm Your Requests",
  description:
    "Token launched on x402, the internet-native payment protocol. No utility, no financial advice, just calm your requests with x420.",
  keywords: [
    "x420",
    "HTTP 420",
    "rate limiting",
    "autonomous systems",
    "AI agents",
    "calm protocol",
    "x402",
  ],
  metadataBase: new URL("https://x420.dev"),
  openGraph: {
    title: "x420 Token - Calm Your Requests",
    description:
      "Token launched on x402, the internet-native payment protocol. No utility, no financial advice, just calm your requests with x420.",
    url: "https://x420.dev",
    siteName: "x420 Token - Calm Your Requests",
    images: [
      {
        url: "/cover.png",
        width: 1200,
        height: 630,
        alt: "Calm Your Requests",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "x420 Token - Calm Your Requests",
    description:
      "Token launched on x402, the internet-native payment protocol. No utility, no financial advice, just calm your requests with x420.",
    images: ["/cover.png"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
