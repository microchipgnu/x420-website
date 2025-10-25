import { type NextRequest, NextResponse } from "next/server";
import { DEPLOYMENT_URL } from "vercel-url";
import { parseUnits } from "viem";
import { toAccount } from "viem/accounts";
import { decodeXPaymentResponse, wrapFetchWithPayment } from "x402-fetch";
import { getX420Account } from "@/lib/cdp";
import { USDC_DECIMALS } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export const executeResourceRequest = async ({ url, maxAmount }: { url: string; maxAmount: bigint }) => {
  try {
    const serverAccount = await getX420Account();
    const viemAccount = toAccount(serverAccount);

    const fetchWithPayment = wrapFetchWithPayment(fetch, viemAccount, maxAmount);
    const response = await fetchWithPayment(url, { method: "GET" });
    const paymentResponse = response.headers.get("x-payment-response");
    if (!paymentResponse) {
      throw new Error("No payment response found");
    }
    return decodeXPaymentResponse(paymentResponse);
  } catch (error) {
    console.error("Error in executeResourceRequest:", error);
    throw error;
  }
};

export async function GET(request: NextRequest) {
  try {
    // Verify the request is from Vercel Cron (optional but recommended)
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = `${DEPLOYMENT_URL}/api/puff`;
    const maxAmount = parseUnits("1", USDC_DECIMALS);

    const result = await executeResourceRequest({ url, maxAmount });
    console.log("Cron job result:", result);

    return NextResponse.json({
      success: true,
      result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
