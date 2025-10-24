import type { cdp } from "@/lib/cdp";

export type CdpSmartAccount = Awaited<
  ReturnType<typeof cdp.evm.getOrCreateSmartAccount>
>;
