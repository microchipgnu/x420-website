import { facilitator } from "@coinbase/x402";
import type { Address } from "viem";
import { paymentMiddleware } from "x402-next";

// const NEXT_PUBLIC_FACILITATOR_URL = process.env.NEXT_PUBLIC_FACILITATOR_URL;
const RESOURCE_WALLET_ADDRESS = process.env.RESOURCE_WALLET_ADDRESS;
const CDP_CLIENT_API_KEY = process.env.CDP_CLIENT_API_KEY;

// type X402Response = {
//   x402Version: number;
//   error?: string;
//   accepts?: Array<Accepts>;
//   payer?: string;
// };

// type Accepts = {
//   scheme: "exact";
//   network: "base";
//   maxAmountRequired: string;
//   resource: string;
//   description: string;
//   mimeType: string;
//   payTo: string;
//   maxTimeoutSeconds: number;
//   asset: string;

//   // Optionally, schema describing the input and output expectations for the paid endpoint.
//   outputSchema?: {
//     input: {
//       type: "http";
//       method: "GET" | "POST";
//       bodyType?: "json" | "form-data" | "multipart-form-data" | "text" | "binary";
//       queryParams?: Record<string, FieldDef>;
//       bodyFields?: Record<string, FieldDef>;
//       headerFields?: Record<string, FieldDef>;
//     };
//     output?: Record<string, any>;
//   };

//   // Optionally, additional custom data the provider wants to include.
//   extra?: Record<string, any>;
// };

// type FieldDef = {
//   type?: string;
//   required?: boolean | string[];
//   description?: string;
//   enum?: string[];
//   properties?: Record<string, FieldDef>; // for nested objects
// };

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
    "/api/clank": {
      price: "$1",
      network: "base",
      config: {
        description: "Deploy a clanker token",
        discoverable: true,
        resource: "https://x420.dev/api/clank",
        inputSchema: {
          bodyType: "json",
          bodyFields: {
            Name: {
              type: "string",
              description: "Token name",
              required: true,
            },
            Symbol: {
              type: "string",
              description: "Token symbol",
              required: true,
            },
            Image: {
              type: "string",
              description: "Image URL (JPEG/PNG) i.e. https://example.com/image.png",
              required: true,
            },
          },
        },
      },
    },
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
  matcher: ["/api/puff", "/api/puff/5"],
};
