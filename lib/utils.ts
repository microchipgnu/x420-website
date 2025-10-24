import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// x402 Payment Types
export type X402Authorization = {
  from: string;
  to: string;
  value: string;
  validAfter: string;
  validBefore: string;
  nonce: string;
};

export type X402Payment = {
  x402Version: number;
  scheme: string;
  network: string;
  payload: {
    signature: string;
    authorization: X402Authorization;
  };
};

export type X402PaymentResponse = {
  success: boolean;
  transaction: string;
  network: string;
  payer: string;
};

// x402 Utility Functions
export function decodeX402Payment(base64EncodedPayment: string): X402Payment {
  const decoded = JSON.parse(Buffer.from(base64EncodedPayment, "base64").toString());
  return decoded;
}

export function decodeX402PaymentResponse(base64EncodedResponse: string): X402PaymentResponse {
  const decoded = JSON.parse(Buffer.from(base64EncodedResponse, "base64").toString());
  return decoded;
}
