import { facilitator } from "@coinbase/x402";
import type { Address } from "viem";
import { paymentMiddleware } from "x402-next";

// const NEXT_PUBLIC_FACILITATOR_URL = process.env.NEXT_PUBLIC_FACILITATOR_URL;
const RESOURCE_WALLET_ADDRESS = process.env.RESOURCE_WALLET_ADDRESS;
const CDP_CLIENT_API_KEY = process.env.CDP_CLIENT_API_KEY;

export const proxy = paymentMiddleware(
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
    "/api/puff/5": {
      price: "$5",
      network: "base",
      config: {
        description: "Buy $5 USDC of x420 token",
        discoverable: true,
        resource: "https://x420.dev/api/puff/5",
        mimeType: "application/json",
        maxTimeoutSeconds: 120,
      },
    },
    // "/api/clank": {
    //   price: "$1",
    //   network: "base",
    //   config: {
    //     description: "Deploy a clanker token",
    //     discoverable: true,
    //     resource: "https://x420.dev/api/clank",
    //     mimeType: "application/json",
    //     maxTimeoutSeconds: 120,
    //     outputSchema: {
    //       input: {
    //         type: "http",
    //         method: "GET",
    //         queryParams: {
    //           name: {
    //             type: "string",
    //             description: "Token name",
    //             required: true,
    //           },
    //           symbol: {
    //             type: "string",
    //             description: "Token symbol",
    //             required: true,
    //           },
    //           image: {
    //             type: "string",
    //             description: "Image URL (JPEG/PNG) i.e. https://example.com/image.png",
    //             required: true,
    //           },
    //           description: {
    //             type: "string",
    //             description: "Token description (optional)",
    //             required: false,
    //           },
    //         },
    //       },
    //       output: {
    //         success: "boolean",
    //         message: "string",
    //         timestamp: "string",
    //       },
    //     },
    //   },
    // },
  },
  facilitator,
  // {
  //   url: NEXT_PUBLIC_FACILITATOR_URL as Resource,
  // },
  {
    appName: "x420",
    appLogo: "/logo-200x200.png",
    cdpClientKey: CDP_CLIENT_API_KEY,
  },
);

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/api/puff", "/api/puff/5", "/api/clank"],
};
