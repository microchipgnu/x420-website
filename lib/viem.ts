import { createPublicClient, http } from "viem";
import { base } from "viem/chains";

const CDP_BASE_RPC_URL = process.env.CDP_BASE_RPC_URL as string;

export const publicClient = createPublicClient({
  chain: base,
  transport: http(CDP_BASE_RPC_URL),
});
