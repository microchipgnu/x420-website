import { type NextRequest, NextResponse } from "next/server";
import { type Address, formatUnits, parseUnits } from "viem";
import { getX420SmartAccount } from "@/lib/cdp";
import { USDC_DECIMALS, USDC_TOKEN_ADDRESS, X420_DECIMALS, X420_TOKEN_ADDRESS } from "@/lib/constants";
import { decodeX402PaymentResponse } from "@/lib/utils";

const CDP_BASE_RPC_URL = process.env.CDP_BASE_RPC_URL;

export const maxDuration = 120;

const BUY_AMOUNT = parseUnits("1", USDC_DECIMALS);

export async function GET(req: NextRequest) {
  const xPaymentResponse = req.headers.get("x-payment-response");

  if (!xPaymentResponse) {
    return NextResponse.json({ message: "Missing payment response header" }, { status: 400 });
  }

  const xPaymentResponseDecoded = decodeX402PaymentResponse(xPaymentResponse);
  const payerAddress = xPaymentResponseDecoded.payer as Address;

  const x420SmartAccount = await getX420SmartAccount();

  const swapQuote = await x420SmartAccount.quoteSwap({
    network: "base",
    fromToken: USDC_TOKEN_ADDRESS,
    fromAmount: BUY_AMOUNT,
    toToken: X420_TOKEN_ADDRESS,
    slippageBps: 300, // 3% slippage
  });

  if (!swapQuote.liquidityAvailable) {
    console.error("Swap liquidity not available");
    return NextResponse.json({ message: "Swap liquidity not available" }, { status: 400 });
  }

  const swapResult = await x420SmartAccount.swap({
    network: "base",
    fromToken: USDC_TOKEN_ADDRESS,
    fromAmount: BUY_AMOUNT,
    toToken: X420_TOKEN_ADDRESS,
    paymasterUrl: CDP_BASE_RPC_URL,
    swapQuote,
  });

  const receipt = await x420SmartAccount.waitForUserOperation({
    userOpHash: swapResult.userOpHash,
  });

  const swapTransactionHash = receipt.status === "complete" ? receipt.transactionHash : null;

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

  const sendTransactionHash = sendReceipt.status === "complete" ? sendReceipt.transactionHash : null;

  console.log("send tx hash", sendTransactionHash);

  return NextResponse.json({
    message: "Puffed",
    swapTransactionHash,
    sendTransactionHash,
    x420TokensReceived: formatUnits(quoteToAmount, X420_DECIMALS),
  });
}
