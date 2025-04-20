import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    items: [
      { id: 1, name: "テスト1" },
      { id: 2, name: "テスト2" },
    ],
    message: "Success",
  });
}
