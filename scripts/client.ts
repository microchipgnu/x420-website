import axios from "axios";
import { config } from "dotenv";
import { createSigner } from "x402/types";
import { decodeXPaymentResponse, withPaymentInterceptor } from "x402-axios";
import { cdp } from "@/lib/cdp";

config();

const apiKeyId = process.env.CDP_API_KEY_ID as string;
const apiKeySecret = process.env.CDP_API_KEY_SECRET as string;
const walletSecret = process.env.CDP_WALLET_SECRET as string;
const baseURL = process.env.RESOURCE_SERVER_URL || "http://localhost:3000";
const amount = process.env.AMOUNT || "0.01"; // Default to $10 USDC
const endpointPath = `/api/puff/custom?amount=${amount}`;

if (!(apiKeyId && apiKeySecret && walletSecret)) {
  console.error("Missing required environment variables:");
  console.error("- CDP_API_KEY_ID");
  console.error("- CDP_API_KEY_SECRET");
  console.error("- CDP_WALLET_SECRET");
  process.exit(1);
}

/**
 * This example shows how to use the x402-fetch package with CDP Client to make a request to a resource server that requires a payment.
 *
 * To run this example, you need to set the following environment variables:
 * - CDP_API_KEY_ID: Your CDP API key ID
 * - CDP_API_KEY_SECRET: Your CDP API key secret
 * - CDP_WALLET_SECRET: Your CDP wallet secret
 * - RESOURCE_SERVER_URL: Optional - The URL of the resource server (defaults to http://localhost:3000)
 * - AMOUNT: Optional - The amount in USDC to spend (defaults to "10")
 *
 * Examples:
 * - AMOUNT=5 npm run client
 * - AMOUNT=25.5 npm run client
 * - RESOURCE_SERVER_URL=https://x420.dev AMOUNT=10 npm run client
 */

async function main(): Promise<void> {
  console.log(`🚀 Making request to: ${baseURL}${endpointPath}`);
  console.log(`💰 Amount: $${amount} USDC\n`);

  const privateKey = await cdp.evm.exportAccount({
    name: "x420-main",
  });

  const signer = await createSigner("base", `0x${privateKey}`);

  try {
    const api = withPaymentInterceptor(
      axios.create({
        baseURL,
      }),
      signer
    );

    api
      .get(endpointPath)
      .then((response) => {
        console.log(response.data);

        const paymentResponse = decodeXPaymentResponse(response.headers["x-payment-response"]);
        console.log(paymentResponse);
      })
      .catch((error) => {
        console.error(error.response?.data);
      });
  } catch (error: unknown) {
    console.error("❌ Error:");
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
