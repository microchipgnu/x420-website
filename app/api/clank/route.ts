import { NextResponse } from "next/server";

export function GET() {
  try {
    console.log("Clank route simulated successfully");

    return NextResponse.json({
      success: true,
      message: "Clank route simulated successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in clank route:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
