import type { Address } from "viem";
import { paymentMiddleware, type Resource } from "x402-next";

const NEXT_PUBLIC_FACILITATOR_URL = process.env.NEXT_PUBLIC_FACILITATOR_URL;
const RESOURCE_WALLET_ADDRESS = process.env.RESOURCE_WALLET_ADDRESS;
const CDP_CLIENT_KEY = process.env.CDP_CLIENT_KEY;

export const middleware = paymentMiddleware(
  RESOURCE_WALLET_ADDRESS as Address,
  {
    "/api/puff": {
      price: "$1",
      network: "base",
      config: {
        description: "Buy $1 USDC of x420 token",
        discoverable: true,
        resource: "https://x420.dev/api/puff",
        mimeType: "application/json",
        maxTimeoutSeconds: 120,
      },
    },
  },
  {
    url: NEXT_PUBLIC_FACILITATOR_URL as Resource,
  },
  {
    appName: "x420.dev",
    appLogo: "/favicon-32x32.png",
    cdpClientKey: CDP_CLIENT_KEY,
  }
);

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/api/puff"],
};
