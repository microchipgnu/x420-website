import { createPublicClient, http } from "viem";
import { base } from "viem/chains";

const CDP_BASE_RPC_URL = process.env.CDP_BASE_RPC_URL;

export const publicClient = createPublicClient({
  chain: base,
  transport: http(CDP_BASE_RPC_URL),
});

export const getExplorerUrl = (
  hex: string,
  options?: { type: "tx" | "address" }
): string => {
  const linkType = options?.type || "tx";
  return `${base.blockExplorers.default.url}/${linkType}/${hex}`;
};
