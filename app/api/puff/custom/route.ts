import { type NextRequest, NextResponse } from "next/server";
import { type Address, formatUnits, parseUnits } from "viem";
import { getX420SmartAccount } from "@/lib/cdp";
import {
  USDC_DECIMALS,
  USDC_TOKEN_ADDRESS,
  X420_DECIMALS,
  X420_TOKEN_ADDRESS,
} from "@/lib/constants";
import { decodeX402PaymentResponse } from "@/lib/utils";

const CDP_BASE_RPC_URL = process.env.CDP_BASE_RPC_URL;
const RESOURCE_WALLET_ADDRESS = process.env.RESOURCE_WALLET_ADDRESS as Address;

export const maxDuration = 120;

export async function GET(req: NextRequest) {
  // Extract custom amount from query parameters
  let customAmount: bigint | null = null;
  let amountString: string | undefined;

  try {
    const { searchParams } = new URL(req.url);
    amountString = searchParams.get("amount") || undefined;

    if (amountString) {
      // Parse the amount string to USDC (6 decimals)
      // Handles strings like "10", "10.5", "0.5" etc.
      customAmount = parseUnits(amountString, USDC_DECIMALS);
      console.log("Using custom amount from query:", amountString, "USDC");
    }
  } catch (error) {
    console.error("Error parsing amount parameter:", error);
    return NextResponse.json(
      { message: "Invalid amount format" },
      { status: 400 }
    );
  }

  // Use custom amount if provided, otherwise default to $5 USDC
  const buyAmount = customAmount || parseUnits("5", USDC_DECIMALS);

  // Validate minimum amount (must be > 0)
  if (buyAmount <= 0n) {
    return NextResponse.json(
      { message: "Invalid amount: must be greater than 0" },
      { status: 400 }
    );
  }

  // Check for payment - this route handles its own payment verification
  const xPaymentResponse = req.headers.get("x-payment-response");

  if (!xPaymentResponse) {
    // Return x402 response with dynamic payment requirements
    return NextResponse.json(
      {
        x402Version: 1,
        error: "Payment required",
        accepts: [
          {
            scheme: "exact",
            network: "base",
            maxAmountRequired: buyAmount.toString(),
            resource: req.url,
            description: `Buy ${amountString || "5"} USDC worth of X420 tokens`,
            mimeType: "application/json",
            payTo: RESOURCE_WALLET_ADDRESS,
            maxTimeoutSeconds: 120,
            asset: USDC_TOKEN_ADDRESS,
            extra: {
              customAmount: amountString || "5",
            },
            outputSchema: {
              input: {
                type: "http",
                method: "GET",
                queryParams: {
                  amount: {
                    type: "string",
                    required: false,
                    description:
                      "Amount in USDC to spend (e.g., '10', '10.5'). Defaults to '5' if not provided.",
                  },
                },
                headerFields: {
                  "X-PAYMENT-RESPONSE": {
                    type: "string",
                    required: true,
                    description:
                      "x402 payment response header containing payment proof",
                  },
                },
              },
              output: {
                message: "string",
                swapTransactionHash: "string",
                sendTransactionHash: "string",
                x420TokensReceived: "string",
                usdcAmountPaid: "string",
              },
            },
          },
        ],
      },
      { status: 402 }
    );
  }

  const xPaymentResponseDecoded = decodeX402PaymentResponse(xPaymentResponse);
  const payerAddress = xPaymentResponseDecoded.payer as Address;

  const x420SmartAccount = await getX420SmartAccount();

  const swapQuote = await x420SmartAccount.quoteSwap({
    network: "base",
    fromToken: USDC_TOKEN_ADDRESS,
    fromAmount: buyAmount,
    toToken: X420_TOKEN_ADDRESS,
    slippageBps: 300, // 3% slippage
  });

  if (!swapQuote.liquidityAvailable) {
    console.error("Swap liquidity not available");
    return NextResponse.json(
      { message: "Swap liquidity not available" },
      { status: 400 }
    );
  }

  const swapResult = await x420SmartAccount.swap({
    network: "base",
    fromToken: USDC_TOKEN_ADDRESS,
    fromAmount: buyAmount,
    toToken: X420_TOKEN_ADDRESS,
    paymasterUrl: CDP_BASE_RPC_URL,
    swapQuote,
  });

  const receipt = await x420SmartAccount.waitForUserOperation({
    userOpHash: swapResult.userOpHash,
  });

  const swapTransactionHash =
    receipt.status === "complete" ? receipt.transactionHash : null;

  console.log("swap tx hash", swapTransactionHash);
  const quoteToAmount = swapQuote.toAmount;

  const sendResult = await x420SmartAccount.transfer({
    amount: quoteToAmount,
    to: payerAddress,
    token: X420_TOKEN_ADDRESS,
    network: "base",
    paymasterUrl: CDP_BASE_RPC_URL,
  });

  const sendReceipt = await x420SmartAccount.waitForUserOperation({
    userOpHash: sendResult.userOpHash,
  });

  const sendTransactionHash =
    sendReceipt.status === "complete" ? sendReceipt.transactionHash : null;

  console.log("send tx hash", sendTransactionHash);

  return NextResponse.json({
    message: "Puffed",
    swapTransactionHash,
    sendTransactionHash,
    x420TokensReceived: formatUnits(quoteToAmount, X420_DECIMALS),
    usdcAmountPaid: formatUnits(buyAmount, USDC_DECIMALS),
  });
}
