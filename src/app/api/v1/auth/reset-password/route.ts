import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const code = searchParams.get("code");

  const baseUrl =
    process.env.NEXT_PUBLIC_ENV_NODE === "development"
      ? process.env.NEXT_PUBLIC_CLIENT_URL_DEV
      : process.env.NEXT_PUBLIC_CLIENT_URL_PRO;

  // Redirect đến FE route
  return NextResponse.redirect(
    `${baseUrl}/new-password?userId=${userId}&code=${code}`
  );
}
