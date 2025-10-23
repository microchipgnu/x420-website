import type { Address } from "viem";
import { paymentMiddleware, type Resource } from "x402-next";

const NEXT_PUBLIC_FACILITATOR_URL = process.env
  .NEXT_PUBLIC_FACILITATOR_URL as Resource;
const RESOURCE_WALLET_ADDRESS = process.env.RESOURCE_WALLET_ADDRESS as Address;

export const middleware = paymentMiddleware(
  RESOURCE_WALLET_ADDRESS,
  {
    "/api/puff": {
      price: "$1",
      network: "base",
      config: {
        description: "Pay $1 USDC to buy discounted x420",
      },
    },
  },
  {
    url: NEXT_PUBLIC_FACILITATOR_URL,
  },
  {
    appName: "Calm Your Agent",
    appLogo: "/logo.png",
    cdpClientKey: process.env.CDP_CLIENT_KEY as string,
  }
);

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/api/puff"],
};
