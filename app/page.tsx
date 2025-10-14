import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b-4 border-primary bg-card relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-[200px] font-bold text-primary">420</div>
          <div className="absolute bottom-10 right-10 text-[200px] font-bold text-secondary">420</div>
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl relative z-10">
          <Badge className="mb-4 bg-accent text-accent-foreground text-base px-4 py-1.5 font-semibold">
            🌿 Open Standard Proposal
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            <span className="text-primary">x420</span>: An Open Standard for Enhanced Calm in Autonomous Systems
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A <span className="text-primary font-semibold">credible protocol</span> for autonomous agents and web
            services to negotiate graceful throttling and cooldown periods
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Abstract */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            Abstract
            <span className="text-2xl">📜</span>
          </h2>
          <p className="text-lg leading-relaxed text-foreground/90">
            <span className="text-primary font-bold">x420</span> is a proposed open industry standard that applies the
            lessons of x402 (internet-native payments via HTTP 402) to the realm of rate limiting and system calmness.
            By repurposing the unofficial HTTP <span className="text-primary font-bold">420</span> status code ("
            <span className="text-accent font-semibold">Enhance Your Calm</span>"), x420 establishes a credible protocol
            for autonomous agents and web services to negotiate graceful throttling and cooldown periods. This standard
            aims to complement machine-to-machine payment protocols like x402 by introducing a "calm layer" in network
            interactions.
          </p>
        </section>

        <Separator className="my-12 bg-primary/20" />

        {/* Introduction */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            Introduction and Motivation
            <span className="text-2xl">🤔</span>
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              The HTTP 402 status code ("Payment Required") was long reserved in the web protocol for future use in
              digital cash or micropayment systems. For decades it remained mostly unused, but in 2025 Coinbase and
              others finally activated it through the x402 standard, enabling web services and AI agents to autonomously
              pay for API calls and digital resources.
            </p>
            <p>
              However, while x402 addresses the exchange of value between agents and services, it does not tackle a
              related growing concern: the pace and intensity of autonomous interactions. As AI agents proliferate,
              capable of firing off requests at superhuman speeds, systems are at risk of overload from well-intentioned
              bots making too many requests in a short time.
            </p>
            <Card className="p-6 bg-gradient-to-br from-accent/20 to-secondary/20 border-2 border-accent/40">
              <p className="text-base italic mb-2">
                <span className="text-accent font-bold text-lg">Fun Fact:</span> Twitter infamously introduced a
                nonstandard HTTP <span className="font-mono font-bold text-primary">420</span> "
                <span className="text-accent font-semibold">Enhance Your Calm</span>" response in its early API to tell
                clients to slow down when being rate-limited.
              </p>
              <p className="text-sm text-muted-foreground">
                The phrase itself comes from the 1993 film <span className="italic">Demolition Man</span>. 🎬
              </p>
            </Card>
            <p>
              The motivation behind <span className="text-primary font-bold">x420</span> is to standardize the way
              services convey the need for clients to back off, and to enable clients to automatically comply in a
              graceful, verifiable manner.
            </p>
          </div>
        </section>

        <Separator className="my-12 bg-primary/20" />

        {/* How it Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            How x420 Works
            <span className="text-2xl">⚙️</span>
          </h2>
          <p className="text-lg leading-relaxed mb-8">
            At its core, <span className="text-primary font-bold">x420</span> defines a simple HTTP-based handshake that
            allows servers to signal a client to slow down and the client to respond appropriately:
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6 bg-primary/5 py-4 rounded-r-lg">
              <h3 className="text-xl font-semibold mb-2">1. Client Request 📤</h3>
              <p className="text-muted-foreground">
                An AI agent or client application attempts to access a resource or API endpoint at full speed.
              </p>
            </div>

            <div className="border-l-4 border-accent pl-6 bg-accent/5 py-4 rounded-r-lg">
              <h3 className="text-xl font-semibold mb-2">
                2. <span className="text-primary font-mono">420</span> Calm Request (Server Response) 🛑
              </h3>
              <p className="text-muted-foreground mb-4">
                The server detects the client's request rate is too high and responds with HTTP{" "}
                <span className="font-mono font-bold text-primary">420</span> –{" "}
                <span className="text-accent font-semibold">Enhance Your Calm</span>, along with a structured Calm
                Instruction payload:
              </p>
              <Card className="bg-card border-2 border-primary/30">
                <pre className="p-4 overflow-x-auto text-sm font-mono">
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
            </div>

            <div className="border-l-4 border-secondary pl-6 bg-secondary/5 py-4 rounded-r-lg">
              <h3 className="text-xl font-semibold mb-2">3. Client Compliance 🧘</h3>
              <p className="text-muted-foreground">
                A well-behaved client implementing <span className="text-primary font-bold">x420</span> will parse the{" "}
                <span className="font-mono font-bold">420</span> response and take action – either waiting the specified
                time or solving a proof-of-work challenge.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6 bg-primary/5 py-4 rounded-r-lg">
              <h3 className="text-xl font-semibold mb-2">4. Client Re-Request 🔄</h3>
              <p className="text-muted-foreground mb-4">
                After fulfilling the calm requirement, the client reattempts the original request with the necessary
                calm proof:
              </p>
              <Card className="bg-card border-2 border-primary/30">
                <pre className="p-4 overflow-x-auto text-sm font-mono">
                  {`GET /api/resource HTTP/1.1
Host: example.com
Calm-Token: abcd1234efgh5678`}
                </pre>
              </Card>
            </div>

            <div className="border-l-4 border-accent pl-6 bg-accent/5 py-4 rounded-r-lg">
              <h3 className="text-xl font-semibold mb-2">5. Server Verification ✅</h3>
              <p className="text-muted-foreground">
                The server verifies the calm credentials and serves the requested resource with HTTP{" "}
                <span className="font-mono font-bold text-accent">200 OK</span>.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-12 bg-primary/20" />

        {/* Benefits */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            Enabling Frictionless Throttling
            <span className="text-2xl">✨</span>
          </h2>
          <p className="text-lg leading-relaxed mb-8">
            Just as x402 removes account and billing friction by enabling on-demand payments,{" "}
            <span className="text-primary font-bold">x420</span> removes the friction and ambiguity from rate limiting.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/50 transition-colors">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-accent text-2xl">✓</span> Standardization
              </h3>
              <p className="text-muted-foreground">
                Universal language for rate limiting across all services, similar to how x402 provides universal payment
                requests.
              </p>
            </Card>

            <Card className="p-6 border-2 border-secondary/30 bg-gradient-to-br from-secondary/5 to-transparent hover:border-secondary/50 transition-colors">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-accent text-2xl">✓</span> Graceful Degradation
              </h3>
              <p className="text-muted-foreground">
                Services can enforce limits without alienating clients through controlled back-off signals.
              </p>
            </Card>

            <Card className="p-6 border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent hover:border-accent/50 transition-colors">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-accent text-2xl">✓</span> Actionable Feedback
              </h3>
              <p className="text-muted-foreground">
                Machine-readable instructions that clients can automatically understand and respond to.
              </p>
            </Card>

            <Card className="p-6 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/50 transition-colors">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-accent text-2xl">✓</span> Fairness & Flexibility
              </h3>
              <p className="text-muted-foreground">
                Creates a market for rate limits – pay with time (waiting) or pay with money to bypass.
              </p>
            </Card>
          </div>
        </section>

        <Separator className="my-12 bg-primary/20" />

        {/* Integration Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            Integration Examples
            <span className="text-2xl">💻</span>
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Server-Side Integration</h3>
              <p className="text-muted-foreground mb-4">
                Implementing <span className="text-primary font-bold">x420</span> can be as straightforward as adding
                middleware to existing frameworks:
              </p>
              <Card className="bg-card border-2 border-primary/30">
                <pre className="p-4 overflow-x-auto text-sm font-mono">
                  {`// Node.js/Express example
app.use(calmMiddleware({ 
  maxRequests: 100, 
  perMinutes: 1 
}));

// Middleware automatically returns 420 when exceeded
// with appropriate calm instructions`}
                </pre>
              </Card>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Client-Side Integration</h3>
              <p className="text-muted-foreground mb-4">
                Clients add logic to handle HTTP <span className="font-mono font-bold text-primary">420</span> responses
                automatically:
              </p>
              <Card className="bg-card border-2 border-accent/30">
                <pre className="p-4 overflow-x-auto text-sm font-mono">
                  {`response = requests.get(url)
if response.status_code == 420:
    instructions = response.json()
    wait = instructions.get("retry_after")
    token = instructions.get("token")
    time.sleep(wait)  # Enhance your calm
    headers = {"Calm-Token": token}
    response = requests.get(url, headers=headers)`}
                </pre>
              </Card>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Combined x402 + x420 Agent</h3>
              <p className="text-muted-foreground mb-4">
                AI agents can use both protocols for optimal autonomy – choosing to pay with money or time:
              </p>
              <Card className="bg-gradient-to-br from-accent/20 to-secondary/20 border-2 border-accent/40 p-6">
                <p className="text-base">
                  If a <span className="font-mono font-bold text-primary">420</span> response includes a payment
                  alternative, the agent can decide: Is speed worth $0.05? If yes, initiate x402 payment. If no, wait
                  the specified time. This creates a dual-mode service access model. 💰⏰
                </p>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="my-12 bg-primary/20" />

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            Use Cases and Applications
            <span className="text-2xl">🎯</span>
          </h2>

          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-primary bg-primary/5">
              <h3 className="text-xl font-semibold mb-3">🤖 Autonomous Crawlers & Data Agents</h3>
              <p className="text-muted-foreground">
                Web crawlers can automatically respect site pace limits, avoiding IP bans through polite, regulated
                scraping conversations.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-accent bg-accent/5">
              <h3 className="text-xl font-semibold mb-3">🔌 API Rate Limit Management</h3>
              <p className="text-muted-foreground">
                APIs can seamlessly manage overuse with client libraries handling waiting or puzzle solving under the
                hood, improving developer experience.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-secondary bg-secondary/5">
              <h3 className="text-xl font-semibold mb-3">🐝 AI Agent Swarms</h3>
              <p className="text-muted-foreground">
                Prevent thundering-herd problems by distributing tokens with staggered wait times, achieving
                decentralized load leveling.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-primary bg-primary/5">
              <h3 className="text-xl font-semibold mb-3">🛡️ Preventing Denial-of-Service</h3>
              <p className="text-muted-foreground">
                Add computational challenges to slow potential attacks while legitimate clients solve reasonable puzzles
                and continue.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-accent bg-accent/5">
              <h3 className="text-xl font-semibold mb-3">🧘 Mindful User Experience</h3>
              <p className="text-muted-foreground">
                Browsers can display gentle "please wait" messages instead of raw errors, promoting a standardized
                mindful UX.
              </p>
            </Card>
          </div>
        </section>

        <Separator className="my-12 bg-primary/20" />

        {/* Key Takeaways */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            Key Takeaways
            <span className="text-2xl">🔑</span>
          </h2>

          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              <strong className="text-primary">Complementary to x402:</strong> x420 extends the vision of autonomous
              commerce by adding a time-based negotiation layer alongside x402's value-based negotiation. Together,
              these standards let agents decide whether to spend currency or time to get what they need.
            </p>
            <p>
              <strong className="text-primary">Improved Stability:</strong> Widespread adoption could lead to a more
              stable internet under heavy load, with built-in mechanisms to smooth out usage patterns rather than
              oscillating between overload and hard failure.
            </p>
            <p>
              <strong className="text-primary">Standardizing a Joke into Utility:</strong> What began as a
              tongue-in-cheek HTTP code can be reimagined as a serious tool. By formally standardizing HTTP{" "}
              <span className="font-mono font-bold">420</span> for calm enforcement, we give developers a shared
              reference point.
            </p>
            <p>
              <strong className="text-primary">Mindful Computing Ethos:</strong> x420 injects the concept of mindfulness
              into machine interactions – an acknowledgment that faster isn't always better if it leads to instability.
              Sometimes the optimal solution is to pause and "
              <span className="text-accent font-semibold">enhance your calm</span>."
            </p>
          </div>
        </section>

        {/* Closing */}
        <Card className="p-8 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 border-4 border-primary/40 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-6xl opacity-20">🌿</div>
          <p className="text-lg leading-relaxed text-center text-balance font-medium relative z-10">
            Whether you choose to wait or to pay, to compute or to chill, the{" "}
            <span className="text-primary font-bold">x420</span> protocol will ensure that the choice is gracefully
            handled. By <span className="text-accent font-semibold">enhancing your calm</span> – and your clients' – you
            just might enhance the entire web's ability to thrive in the agent era.
          </p>
          <div className="text-center mt-6 text-5xl font-bold text-primary opacity-30">420</div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-primary/30 mt-16 py-8 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-center text-muted-foreground text-sm">
            <span className="text-primary font-bold">x420</span> Open Standard Proposal • Inspired by HTTP{" "}
            <span className="font-mono font-bold">420</span> "
            <span className="text-accent font-semibold">Enhance Your Calm</span>" • Complementary to x402
          </p>
        </div>
      </footer>
    </div>
  )
}
