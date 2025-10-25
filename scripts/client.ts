import { toAccount } from "viem/accounts";
import { decodeXPaymentResponse, wrapFetchWithPayment } from "x402-fetch";
import { getX420Account } from "@/lib/cdp";

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
    const decodedPaymentResponse = decodeXPaymentResponse(paymentResponse);
    const body = await response.json();
    console.log("body", body);
    return decodedPaymentResponse;
  } catch (error) {
    console.error("Error:", error);
  }
};
