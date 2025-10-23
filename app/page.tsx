import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Calm Your Requests - Rate Limiting Protocol",
  description:
    "A credible protocol for autonomous agents and web services to negotiate graceful throttling and cooldown periods using HTTP 420.",
  keywords: [
    "x420",
    "HTTP 420",
    "rate limiting",
    "autonomous systems",
    "AI agents",
    "calm protocol",
    "x402",
  ],
  authors: [{ name: "Calm Your Requests" }],
  openGraph: {
    title: "Calm Your Requests",
    description: "Rate limiting for AI agents via HTTP 420.",
    url: "https://x420.dev",
    siteName: "Calm Your Requests",
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
    title: "Calm Your Requests",
    description: "Rate limiting for AI agents via HTTP 420.",
    images: ["/cover.png"],
  },
  alternates: {
    canonical: "https://x420.dev",
  },
};

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden border-primary border-b-4">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="flex flex-col items-center gap-12 text-center">
            <div className="w-full max-w-2xl">
              <Image
                alt="Calm Your Requests"
                height={900}
                priority
                src="/cover.png"
                width={1200}
              />
            </div>
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center justify-center gap-6">
                <Button
                  asChild
                  className="hover:-translate-y-1 transform rounded-xl border-3 border-primary bg-primary px-10 py-5 font-bold text-2xl text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-110 hover:bg-transparent hover:text-primary hover:shadow-primary/50 hover:shadow-xl active:scale-95"
                  type="button"
                >
                  <Link href="/api/puff">Puff</Link>
                </Button>
                <Button
                  className="cursor-not-allowed rounded-xl border-3 border-muted bg-muted px-10 py-5 font-bold text-2xl text-muted-foreground opacity-50 shadow-lg transition-all duration-300"
                  disabled
                  type="button"
                >
                  Pass
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-12">
        {/* Overview */}
        <section className="mb-16">
          <p className="mb-6 text-foreground/90 text-xl leading-relaxed">
            Just as x402 standardized payments for autonomous agents via HTTP
            402,{" "}
            <span className="font-bold text-primary">Calm Your Requests</span>{" "}
            repurposes HTTP <span className="font-bold text-primary">420</span>{" "}
            ("
            <span className="font-semibold text-accent">Enhance Your Calm</span>
            ") to create a credible protocol for graceful rate limiting and
            throttling. This standard enables AI agents and web services to
            negotiate cooldown periods automatically.
          </p>
          <Card className="border-2 border-accent/50 bg-gradient-to-br from-accent/15 to-secondary/15 p-6">
            <p className="text-base italic">
              <span className="font-bold text-accent text-lg">Fun Fact:</span>{" "}
              Twitter introduced the nonstandard HTTP{" "}
              <span className="font-bold font-mono text-primary">420</span>{" "}
              response in its early API. The phrase comes from the 1993 film{" "}
              <span className="italic">Demolition Man</span>.
            </p>
          </Card>
        </section>

        <Separator className="my-12 bg-primary/40" />

        {/* How it Works */}
        <section className="mb-16">
          <h2 className="mb-6 font-bold text-3xl">How It Works</h2>
          <p className="mb-8 text-lg leading-relaxed">
            When a client exceeds rate limits, the server responds with HTTP{" "}
            <span className="font-bold font-mono text-primary">420</span>{" "}
            including structured calm instructions:
          </p>

          <Card className="mb-8 border-2 border-primary/50 bg-card">
            <pre className="overflow-x-auto p-4 font-mono text-foreground text-sm">
              {`HTTP/1.1 420 Enhance Your Calm
Content-Type: application/calm+json
Retry-After: 60

{
  "retry_after": 60,
  "token": "abcd1234efgh5678",
  "pow_challenge": null,
  "alternativePayment": {
    "amount": "0.01",
    "currency": "USD"
  }
}`}
            </pre>
          </Card>

          <p className="mb-6 text-lg leading-relaxed">
            The client waits or pays, then re-requests with the calm token:
          </p>

          <Card className="border-2 border-primary/50 bg-card">
            <pre className="overflow-x-auto p-4 font-mono text-foreground text-sm">
              {`GET /api/resource HTTP/1.1
Host: example.com
Calm-Token: abcd1234efgh5678`}
            </pre>
          </Card>
        </section>

        {/* Closing */}
        <Card className="border-4 border-primary/50 bg-gradient-to-br from-primary/15 via-accent/15 to-secondary/15 p-8">
          <p className="text-balance text-center font-medium text-lg leading-relaxed">
            <span className="font-bold text-primary">Calm Your Requests</span>{" "}
            complements x402 by adding a time-based negotiation layer. Together,
            they let agents choose whether to spend currency or time. Sometimes
            the optimal solution is to{" "}
            <span className="font-semibold text-accent">enhance your calm</span>
            .
          </p>
          <div className="mt-6 text-center font-bold text-5xl text-primary opacity-50">
            420
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-primary/50 border-t-2 bg-muted/30 py-8">
        <div className="container mx-auto max-w-4xl px-4">
          <p className="text-center text-muted-foreground text-sm">
            <span className="font-bold text-primary">Calm Your Requests</span> •
            HTTP <span className="font-bold font-mono">420</span> "
            <span className="font-semibold text-accent">Enhance Your Calm</span>
            " • Complementary to x402
          </p>
        </div>
      </footer>
    </div>
  );
}
