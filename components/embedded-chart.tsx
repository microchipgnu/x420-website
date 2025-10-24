import { cn } from "@/lib/utils";

// show only the chart, hide info panel
const X420_DEXSCREENER_EMBED_URL =
  "https://dexscreener.com/base/0x9461ebccb508dcde49e54073bb587fb78e44ccdbcdbfe113c7c77d112e12c370?embed=1&theme=dark&loadChartSettings=0&trades=0&tabs=1&info=0&chartLeftToolbar=0&chartDefaultOnMobile=1";

const X420_GECKOTERMINAL_EMBED_URL =
  "https://www.geckoterminal.com/base/pools/0x68e284f21d04d4d62398c290ec3ef41c97f80b07?embed=1&info=0&swaps=0&light_chart=0&chart_type=market_cap&resolution=1h&bg_color=0f172a";

export function EmbeddedChart({
  type = "dexscreener",
  className,
}: {
  type?: "dexscreener" | "geckoterminal";
  className?: string;
}) {
  return (
    <section aria-label="chart" className={cn("space-y-4", className)}>
      <div className="overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-primary/10 shadow-xl">
        <div className="relative h-0 pb-[125%] sm:pb-[80%]">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            src={
              type === "dexscreener"
                ? X420_DEXSCREENER_EMBED_URL
                : X420_GECKOTERMINAL_EMBED_URL
            }
            title="chart"
          />
        </div>
      </div>
    </section>
  );
}
