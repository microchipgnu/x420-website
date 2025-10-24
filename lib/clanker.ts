// import { Clanker } from "clanker-sdk/v4";
// import type {
//   CustomSource,
//   SerializeTransactionFn,
//   SignableMessage,
//   TransactionSerializable,
//   TypedData,
//   TypedDataDefinition,
// } from "viem";
// import { createWalletClient, http } from "viem";
// import { toAccount } from "viem/accounts";
// import { base } from "viem/chains";
// import type { CdpSmartAccount } from "@/lib/types";
// import { publicClient } from "@/lib/viem";

// const CDP_BASE_RPC_URL = process.env.CDP_BASE_RPC_URL;

// /**
//  * Converts a CDP smart account to a viem CustomSource account
//  * Smart accounts use user operations instead of traditional transactions,
//  * so we delegate signing to the owner EOA and intercept transaction execution
//  */
// const convertToAccount = (smartAccount: CdpSmartAccount): CustomSource => {
//   const owner = smartAccount.owners[0];

//   const account: CustomSource = {
//     address: smartAccount.address,

//     // Delegate message signing to the owner EOA
//     signMessage: async ({ message }: { message: SignableMessage }) => {
//       const signature = await owner.signMessage({ message });
//       return signature;
//     },

//     // Delegate typed data signing to the owner EOA
//     signTypedData: async <
//       const typedData extends TypedData | Record<string, unknown>,
//       primaryType extends keyof typedData | "EIP712Domain" = keyof typedData,
//     >(
//       typedDataDefinition: TypedDataDefinition<typedData, primaryType>
//     ) => {
//       const signature = await owner.signTypedData(typedDataDefinition);
//       return signature;
//     },

//     // For transactions, we need to convert to user operations
//     // Note: This signs with the owner but execution should use sendUserOperation
//     signTransaction: async (
//       transaction: TransactionSerializable,
//       _options?: {
//         serializer?: SerializeTransactionFn<TransactionSerializable>;
//       }
//     ) => {
//       // For smart accounts, we can't directly sign transactions
//       // Instead, we should use sendUserOperation for execution
//       // But for compatibility with viem's Account interface, we delegate to owner
//       const signature = await owner.signTransaction(transaction);
//       return signature;
//     },
//   };

//   return account;
// };

// export const deployClankerToken = async ({
//   smartAccount,
// }: {
//   smartAccount: CdpSmartAccount;
// }) => {
//   const convertedAccount = convertToAccount(smartAccount);
//   const account = toAccount(convertedAccount);

//   // Create a wallet client with the custom account
//   const wallet = createWalletClient({
//     account,
//     chain: base,
//     transport: http(CDP_BASE_RPC_URL),
//   });

//   const clanker = new Clanker({ wallet, publicClient });

//   console.log("\n🚀 Deploying V4 Token\n");

//   const { txHash, waitForTransaction, error } = await clanker.deploy({
//     name: "My Token",
//     symbol: "TKN",
//     image: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
//     tokenAdmin: account.address,
//     chainId: base.id,
//     metadata: {
//       description: "My really cool token",
//     },
//     context: {
//       interface: "Clanker SDK",
//     },
//     vanity: true,
//   });
//   if (error) {
//     console.error(error);
//     throw error;
//   }

//   console.log("🕑 Deploying...");
//   console.log(`🕓 ${base.blockExplorers.default.url}/tx/${txHash}`);
//   const { address: tokenAddress } = await waitForTransaction();

//   console.log(
//     `✅ Done (${base.blockExplorers.default.url}/address/${tokenAddress})`
//   );
// };
