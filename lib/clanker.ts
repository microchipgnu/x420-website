import { FEE_CONFIGS, POOL_POSITIONS, WETH_ADDRESSES } from "clanker-sdk";
import { Clanker } from "clanker-sdk/v4";
import { type Address, createWalletClient, http, type PublicClient } from "viem";
import { toAccount } from "viem/accounts";
import { base } from "viem/chains";
import type { CdpSmartAccount } from "@/lib/types";
import { publicClient } from "@/lib/viem";

const CDP_BASE_RPC_URL = process.env.CDP_BASE_RPC_URL;

export const deployClankerToken = async ({
  x420SmartAccount,
  deployerAddress,
}: {
  x420SmartAccount: CdpSmartAccount;
  deployerAddress: Address;
}) => {
  const x420Account = x420SmartAccount.owners[0];

  const walletClient = createWalletClient({
    account: toAccount(x420Account),
    chain: base,
    transport: http(CDP_BASE_RPC_URL),
  });

  const clanker = new Clanker({
    wallet: walletClient,
    publicClient: publicClient as PublicClient,
  });

  // Deploy the token
  const { waitForTransaction } = await clanker.deploy({
    name: "x3OH3",
    symbol: "X3OH3",
    tokenAdmin: deployerAddress,
    image: "blob:https://web.telegram.org/560e6207-337a-4a5c-b0ed-93407eb1624f",
    metadata: {
      description: "x402 right now",
    },
    context: {
      interface: "Clanker SDK",
    },
    pool: {
      pairedToken: WETH_ADDRESSES[base.id],
      positions: POOL_POSITIONS.Standard, // POOL_POSITIONS.Project
    },
    fees: FEE_CONFIGS.Dynamic3,
    rewards: {
      recipients: [
        {
          recipient: deployerAddress,
          admin: deployerAddress,
          // In bps. 80% of reward
          bps: 8000,
          token: "Paired",
        },
        {
          recipient: x420SmartAccount.address,
          admin: x420SmartAccount.address,
          // In bps. 20% of reward
          bps: 2000,
          token: "Paired",
        },
      ],
    },
    chainId: base.id,
    vanity: true,
    sniperFees: {
      startingFee: 666_777, // 66.6777%
      endingFee: 41_673, // 4.1673%
      secondsToDecay: 15, // 15 seconds
    },
  });

  if (!waitForTransaction) {
    throw new Error("waitForTransaction is undefined");
  }

  const { address } = await waitForTransaction();

  console.log(`Token deployed at: ${address}`);
  console.log(`View on Clanker World: https://clanker.world/clanker/${address}`);
};
