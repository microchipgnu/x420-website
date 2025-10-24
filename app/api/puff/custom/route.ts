import { type NextRequest, NextResponse } from "next/server";
import { type Address, formatUnits, parseUnits } from "viem";
import { exact } from "x402/schemes";
import { processPriceToAtomicAmount } from "x402/shared";
import type { Network, PaymentPayload, PaymentRequirements, Price, Resource } from "x402/types";
import { settleResponseHeader } from "x402/types";
import { useFacilitator } from "x402/verify";
import { getX420SmartAccount } from "@/lib/cdp";
import { USDC_DECIMALS, USDC_TOKEN_ADDRESS, X420_DECIMALS, X420_TOKEN_ADDRESS } from "@/lib/constants";

const CDP_BASE_RPC_URL = process.env.CDP_BASE_RPC_URL;
const RESOURCE_WALLET_ADDRESS = process.env.RESOURCE_WALLET_ADDRESS as Address;

// Initialize facilitator

const x402Version = 1;

export const maxDuration = 120;

/**
 * Creates payment requirements for a given price and network
 */
function createExactPaymentRequirements(
  price: Price,
  network: Network,
  resource: Resource,
  description = ""
): PaymentRequirements {
  const atomicAmountForAsset = processPriceToAtomicAmount(price, network);
  if ("error" in atomicAmountForAsset) {
    throw new Error(atomicAmountForAsset.error);
  }
  const { maxAmountRequired, asset } = atomicAmountForAsset;

  return {
    scheme: "exact",
    network,
    maxAmountRequired,
    resource,
    description,
    mimeType: "application/json",
    payTo: RESOURCE_WALLET_ADDRESS,
    maxTimeoutSeconds: 120,
    asset: asset.address,
    extra:
      "eip712" in asset
        ? {
            name: asset.eip712.name,
            version: asset.eip712.version,
          }
        : undefined,
  };
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: this is a server route
export async function GET(req: NextRequest) {
  const { verify, settle } = useFacilitator({ url: "https://facilitator.payai.network" });
  // Extract custom amount from query parameters
  let customAmount: bigint | null = null;
  let amountString: string | undefined;

  console.log("[GET] Received request at", req.url);

  try {
    const { searchParams } = new URL(req.url);
    amountString = searchParams.get("amount") || undefined;

    if (amountString) {
      // Parse the amount string to USDC (6 decimals)
      // Handles strings like "10", "10.5", "0.5" etc.
      customAmount = parseUnits(amountString, USDC_DECIMALS);
      console.log("[GET] Using custom amount from query:", amountString, "USDC (atomic:", customAmount.toString(), ")");
    } else {
      console.log("[GET] No custom amount specified, using default $5 USDC.");
    }
  } catch (error) {
    console.error("[GET] Error parsing amount parameter:", error);
    return NextResponse.json({ message: "Invalid amount format" }, { status: 400 });
  }

  // Use custom amount if provided, otherwise default to $5 USDC
  const buyAmount = customAmount || parseUnits("5", USDC_DECIMALS);

  // Validate minimum amount (must be > 0)
  if (buyAmount <= 0n) {
    console.error("[GET] Invalid buyAmount, must be greater than 0:", buyAmount.toString());
    return NextResponse.json({ message: "Invalid amount: must be greater than 0" }, { status: 400 });
  }

  // Create payment requirements for dynamic pricing
  const resource = req.url as Resource;
  const priceString = `$${amountString || "5"}` as Price;

  let paymentRequirements: PaymentRequirements[];
  try {
    console.log("[GET] Creating payment requirements for price:", priceString);
    paymentRequirements = [
      createExactPaymentRequirements(
        priceString,
        "base",
        resource,
        `Buy ${amountString || "5"} USDC worth of X420 tokens`
      ),
    ];
    console.log("[GET] Payment requirements created:", paymentRequirements[0]);
  } catch (error) {
    console.error("[GET] Error creating payment requirements:", error);
    return NextResponse.json({ message: "Failed to create payment requirements" }, { status: 500 });
  }

  // Check for payment header
  const xPayment = req.headers.get("x-payment");

  if (!xPayment) {
    // Return x402 response with dynamic payment requirements
    console.log("[GET] No x-payment header found, returning accepts requirements.");
    return NextResponse.json(
      {
        x402Version,
        error: "X-PAYMENT header is required",
        accepts: paymentRequirements,
      },
      { status: 402 }
    );
  }

  // Decode and verify payment with facilitator
  let decodedPayment: PaymentPayload;
  try {
    console.log("[GET] Decoding x-payment...", xPayment);
    decodedPayment = exact.evm.decodePayment(xPayment);
    decodedPayment.x402Version = x402Version;
    console.log("[GET] Decoded payment:", decodedPayment);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Invalid or malformed payment header";
    console.error("[GET] Error decoding payment:", errorMessage);
    return NextResponse.json(
      {
        x402Version,
        error: errorMessage,
        accepts: paymentRequirements,
      },
      { status: 402 }
    );
  }

  // Verify payment with facilitator
  try {
    console.log("[GET] Verifying payment with facilitator...");
    const verificationResponse = await verify(decodedPayment, paymentRequirements[0]);
    console.log("[GET] Verification response:", verificationResponse);

    if (!verificationResponse.isValid) {
      console.warn("[GET] Payment verification failed:", verificationResponse.invalidReason);
      return NextResponse.json(
        {
          x402Version,
          error: verificationResponse.invalidReason,
          accepts: paymentRequirements,
          payer: verificationResponse.payer,
        },
        { status: 402 }
      );
    }

    // Settle the payment
    console.log("[GET] Payment verified. Settling payment...");
    const settleResponse = await settle(decodedPayment, paymentRequirements[0]);
    const settlementHeader = settleResponseHeader(settleResponse);
    console.log("[GET] Settlement response:", settleResponse, "Header:", settlementHeader);

    // Get payer address from verification response
    const payerAddress = verificationResponse.payer as Address;
    console.log("[GET] Payment verified and settled for payer:", payerAddress);

    console.log("[GET] Getting X420 smart account...");
    const x420SmartAccount = await getX420SmartAccount();

    console.log("[GET] Quoting swap for buyAmount:", buyAmount.toString(), "from USDC to X420");
    const swapQuote = await x420SmartAccount.quoteSwap({
      network: "base",
      fromToken: USDC_TOKEN_ADDRESS,
      fromAmount: buyAmount,
      toToken: X420_TOKEN_ADDRESS,
      slippageBps: 300, // 3% slippage
    });
    console.log("[GET] Swap quote:", swapQuote);

    if (!swapQuote.liquidityAvailable) {
      console.error("[GET] Swap liquidity not available");
      return NextResponse.json({ message: "Swap liquidity not available" }, { status: 400 });
    }

    console.log("[GET] Executing swap transaction...");
    const swapResult = await x420SmartAccount.swap({
      network: "base",
      fromToken: USDC_TOKEN_ADDRESS,
      fromAmount: buyAmount,
      toToken: X420_TOKEN_ADDRESS,
      paymasterUrl: CDP_BASE_RPC_URL,
      swapQuote,
    });
    console.log("[GET] swapResult:", swapResult);

    const receipt = await x420SmartAccount.waitForUserOperation({
      userOpHash: swapResult.userOpHash,
    });
    console.log("[GET] Swap userOp receipt:", receipt);

    const swapTransactionHash = receipt.status === "complete" ? receipt.transactionHash : null;

    console.log("[GET] swap tx hash:", swapTransactionHash);
    const quoteToAmount = swapQuote.toAmount;

    console.log("[GET] Transferring", quoteToAmount.toString(), "X420 tokens to payer:", payerAddress);
    const sendResult = await x420SmartAccount.transfer({
      amount: quoteToAmount,
      to: payerAddress,
      token: X420_TOKEN_ADDRESS,
      network: "base",
      paymasterUrl: CDP_BASE_RPC_URL,
    });
    console.log("[GET] sendResult:", sendResult);

    const sendReceipt = await x420SmartAccount.waitForUserOperation({
      userOpHash: sendResult.userOpHash,
    });
    console.log("[GET] Transfer userOp receipt:", sendReceipt);

    const sendTransactionHash = sendReceipt.status === "complete" ? sendReceipt.transactionHash : null;

    console.log("[GET] send tx hash:", sendTransactionHash);

    const response = NextResponse.json({
      message: "Puffed",
      swapTransactionHash,
      sendTransactionHash,
      x420TokensReceived: formatUnits(quoteToAmount, X420_DECIMALS),
      usdcAmountPaid: formatUnits(buyAmount, USDC_DECIMALS),
    });

    // Add settlement header to response
    response.headers.set("X-PAYMENT-RESPONSE", settlementHeader);

    console.log("[GET] Returning success response.");

    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Payment verification failed";
    console.error("[GET] Error during payment verification/process:", errorMessage, error);
    return NextResponse.json(
      {
        x402Version,
        error: errorMessage,
        accepts: paymentRequirements,
      },
      { status: 500 }
    );
  }
}
