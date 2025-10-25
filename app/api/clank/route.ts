import { type NextRequest, NextResponse } from "next/server";
import { getX420SmartAccount } from "@/lib/cdp";
import { deployClankerToken } from "@/lib/clanker";

export const maxDuration = 120;

export async function GET(req: NextRequest) {
  try {
    const name = req.nextUrl.searchParams.get("name");
    const symbol = req.nextUrl.searchParams.get("symbol");
    const image = req.nextUrl.searchParams.get("image");
    const description = req.nextUrl.searchParams.get("description") || "";

    console.log("Clank route received request with name:", name, "symbol:", symbol, "image:", image);

    if (!name || !symbol || !image) {
      return NextResponse.json(
        { error: "Missing required parameters: name, symbol, and image are required" },
        { status: 400 },
      );
    }

    const x420SmartAccount = await getX420SmartAccount();
    const clankerAddress = await deployClankerToken({
      x420SmartAccount,
      deployerAddress: x420SmartAccount.owners[0].address,
      clankerInfo: { name, symbol, image, description },
    });

    if (!clankerAddress) {
      throw new Error("Failed to deploy clanker");
    }
    console.log("Clanker deployed:", clankerAddress);

    return NextResponse.json({
      clankerAddress,
    });
  } catch (error) {
    console.error("Error in clank route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
