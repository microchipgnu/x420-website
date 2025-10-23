import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calm Your Agent - Rate Limiting Protocol",
  description: "A credible protocol for autonomous agents and web services to negotiate graceful throttling and cooldown periods using HTTP 420.",
  keywords: ["x420", "HTTP 420", "rate limiting", "autonomous systems", "AI agents", "calm protocol", "x402"],
  authors: [{ name: "Calm Your Agent" }],
  openGraph: {
    title: "Calm Your Agent",
    description: "Rate limiting for AI agents via HTTP 420.",
    url: "https://x420.dev",
    siteName: "Calm Your Agent",
    images: [
      {
        url: "/cover.png",
        width: 1200,
        height: 630,
        alt: "Calm Your Agent",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calm Your Agent",
    description: "Rate limiting for AI agents via HTTP 420.",
    images: ["/cover.png"],
  },
  alternates: {
    canonical: "https://x420.dev",
  },
}

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b-4 border-primary relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
          <div className="flex flex-col items-center text-center gap-12">
            <div className="w-full max-w-2xl">
              <Image
                src="/cover.png"
                alt="Calm Your Agent"
                width={1200}
                height={900}
                className="w-full h-auto"
                priority
              />
            </div>
            <div className="space-y-6 max-w-3xl">
              <Badge className="bg-primary text-primary-foreground text-sm px-5 py-2 font-semibold">
                Open Standard Proposal
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                Calm Your Agent
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Rate limiting for AI agents via HTTP <span className="text-primary font-bold">420</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Overview */}
        <section className="mb-16">
          <p className="text-xl leading-relaxed text-foreground/90 mb-6">
            Just as x402 standardized payments for autonomous agents via HTTP 402, <span className="text-primary font-bold">Calm Your Agent</span> repurposes HTTP <span className="text-primary font-bold">420</span> ("<span className="text-accent font-semibold">Enhance Your Calm</span>") to create a credible protocol for graceful rate limiting and throttling. This standard enables AI agents and web services to negotiate cooldown periods automatically.
          </p>
          <Card className="p-6 bg-gradient-to-br from-accent/15 to-secondary/15 border-2 border-accent/50">
            <p className="text-base italic">
              <span className="text-accent font-bold text-lg">Fun Fact:</span> Twitter introduced the nonstandard HTTP <span className="font-mono font-bold text-primary">420</span> response in its early API. The phrase comes from the 1993 film <span className="italic">Demolition Man</span>.
            </p>
          </Card>
        </section>

        <Separator className="my-12 bg-primary/40" />

        {/* How it Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">
            How It Works
          </h2>
          <p className="text-lg leading-relaxed mb-8">
            When a client exceeds rate limits, the server responds with HTTP <span className="font-mono font-bold text-primary">420</span> including structured calm instructions:
          </p>

          <Card className="bg-card border-2 border-primary/50 mb-8">
            <pre className="p-4 overflow-x-auto text-sm font-mono text-foreground">
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

          <p className="text-lg leading-relaxed mb-6">
            The client waits or pays, then re-requests with the calm token:
          </p>

          <Card className="bg-card border-2 border-primary/50">
            <pre className="p-4 overflow-x-auto text-sm font-mono text-foreground">
              {`GET /api/resource HTTP/1.1
Host: example.com
Calm-Token: abcd1234efgh5678`}
            </pre>
          </Card>
        </section>

        <Separator className="my-12 bg-primary/40" />

        {/* Benefits */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">
            Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-2 border-primary/50 bg-gradient-to-br from-primary/10 to-transparent">
              <h3 className="text-xl font-semibold mb-3">Standardization</h3>
              <p className="text-muted-foreground">
                Universal language for rate limiting across all services
              </p>
            </Card>
            <Card className="p-6 border-2 border-accent/50 bg-gradient-to-br from-accent/10 to-transparent">
              <h3 className="text-xl font-semibold mb-3">Flexibility</h3>
              <p className="text-muted-foreground">
                Pay with time (wait) or money (via x402) to bypass limits
              </p>
            </Card>
            <Card className="p-6 border-2 border-secondary/50 bg-gradient-to-br from-secondary/10 to-transparent">
              <h3 className="text-xl font-semibold mb-3">Graceful</h3>
              <p className="text-muted-foreground">
                Automated handling without alienating clients
              </p>
            </Card>
            <Card className="p-6 border-2 border-primary/50 bg-gradient-to-br from-primary/10 to-transparent">
              <h3 className="text-xl font-semibold mb-3">Mindful</h3>
              <p className="text-muted-foreground">
                Machine-readable calm instructions for stable interactions
              </p>
            </Card>
          </div>
        </section>

        {/* Closing */}
        <Card className="p-8 bg-gradient-to-br from-primary/15 via-accent/15 to-secondary/15 border-4 border-primary/50">
          <p className="text-lg leading-relaxed text-center text-balance font-medium">
            <span className="text-primary font-bold">Calm Your Agent</span> complements x402 by adding a time-based negotiation layer. Together, they let agents choose whether to spend currency or time. Sometimes the optimal solution is to{" "}
            <span className="text-accent font-semibold">enhance your calm</span>.
          </p>
          <div className="text-center mt-6 text-5xl font-bold text-primary opacity-50">420</div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-primary/50 mt-16 py-8 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-center text-muted-foreground text-sm">
            <span className="text-primary font-bold">Calm Your Agent</span> • HTTP{" "}
            <span className="font-mono font-bold">420</span> "
            <span className="text-accent font-semibold">Enhance Your Calm</span>" • Complementary to x402
          </p>
        </div>
      </footer>
    </div>
  )
}
