import { type NextRequest, NextResponse } from "next/server";
import { getX420SmartAccount } from "@/lib/cdp";
import { deployClankerToken } from "@/lib/clanker";

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const { name, symbol, image, description } = await req.json();
    console.log("Clank route received request with name:", name, "symbol:", symbol, "image:", image);

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
      success: true,
      message: "Clank route simulated successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in clank route:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
