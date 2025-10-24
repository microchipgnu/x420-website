import { CdpClient } from "@coinbase/cdp-sdk";
import {
  type Address,
  encodeFunctionData,
  erc20Abi,
  maxUint256,
  parseUnits,
} from "viem";
import { PERMIT2_ADDRESS } from "@/lib/constants";
import type { CdpSmartAccount } from "@/lib/types";

const CDP_API_KEY_ID = process.env.CDP_API_KEY_ID;
const CDP_API_KEY_SECRET = process.env.CDP_API_KEY_SECRET;
const CDP_WALLET_SECRET = process.env.CDP_WALLET_SECRET;
const CDP_BASE_RPC_URL = process.env.CDP_BASE_RPC_URL;

export const cdp = new CdpClient({
  apiKeyId: CDP_API_KEY_ID,
  apiKeySecret: CDP_API_KEY_SECRET,
  walletSecret: CDP_WALLET_SECRET,
});

export const getX420SmartAccount = async () => {
  const resourceWallet = await cdp.evm.getOrCreateAccount({
    name: "x420-main",
  });

  const resourceSmartAccount = await cdp.evm.getOrCreateSmartAccount({
    owner: resourceWallet,
    name: "x420-main",
  });

  return resourceSmartAccount;
};

export const approvePermit2 = async ({
  smartAccount,
  tokenAddress,
}: {
  smartAccount: Awaited<ReturnType<typeof getX420SmartAccount>>;
  tokenAddress: Address;
}) => {
  const data = encodeFunctionData({
    abi: erc20Abi,
    functionName: "approve",
    args: [PERMIT2_ADDRESS, maxUint256],
  });

  const userOpResult = await smartAccount.sendUserOperation({
    network: "base",
    calls: [{ to: tokenAddress, data, value: 0n }],
    paymasterUrl: CDP_BASE_RPC_URL,
  });

  const receipt = await smartAccount.waitForUserOperation({
    userOpHash: userOpResult.userOpHash,
  });

  const txHash = receipt.status === "complete" ? receipt.transactionHash : null;

  console.log("approvePermit2 tx hash", txHash);

  return txHash;
};

export const transferWrapper = async ({
  smartAccount,
  payload,
}: {
  smartAccount: CdpSmartAccount;
  payload: Parameters<CdpSmartAccount["transfer"]>[0];
}): Promise<string | null> => {
  const transferResult = await smartAccount.transfer(payload);

  const receipt = await smartAccount.waitForUserOperation({
    userOpHash: transferResult.userOpHash,
  });

  const txHash = receipt.status === "complete" ? receipt.transactionHash : null;

  console.log("transfer tx hash", txHash);

  return txHash;
};

export const transferTokenWrapper = async ({
  smartAccount,
  transferData,
}: {
  smartAccount: CdpSmartAccount;
  transferData: {
    to: Address;
    tokenAddress: Address;
    tokenDecimals: number;
    amount: bigint | string;
  };
}): Promise<string | null> => {
  const { to, tokenAddress, tokenDecimals, amount } = transferData;
  const amountValue =
    typeof amount === "string" ? parseUnits(amount, tokenDecimals) : amount;

  const transferCallData = encodeFunctionData({
    abi: erc20Abi,
    functionName: "transfer",
    args: [to, amountValue],
  });

  const userOpResult = await smartAccount.sendUserOperation({
    network: "base",
    calls: [{ to: tokenAddress, data: transferCallData, value: 0n }],
    paymasterUrl: CDP_BASE_RPC_URL,
  });

  const receipt = await smartAccount.waitForUserOperation({
    userOpHash: userOpResult.userOpHash,
  });

  const txHash = receipt.status === "complete" ? receipt.transactionHash : null;

  if (!txHash) {
    throw new Error("transferTokenWrapper failed");
  }

  return txHash;
};

// const x420SmartAccount = await getX420SmartAccount();
// // transfer .0001 WETH to wallet
// const wethTransferTxHash = await transferTokenWrapper({
//   smartAccount: x420SmartAccount,
//   transferData: {
//     to: x420SmartAccount.owners[0].address,
//     tokenAddress: WETH_TOKEN_ADDRESS,
//     tokenDecimals: 18,
//     amount: parseEther("3"),
//   },
// });

// if (wethTransferTxHash) {
//   console.log("wethTransferTxUrl", getExplorerUrl(wethTransferTxHash));
// }
