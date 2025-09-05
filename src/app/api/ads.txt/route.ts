import { NextResponse } from "next/server";

export async function GET() {
  // Thay thế bằng thông tin thật từ Google AdSense
  const adsTxtContent = `google.com, pub-9429981491740615, DIRECT, f08c47fec0942fa0`;

  return new NextResponse(adsTxtContent, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600", // Cache 1 giờ
    },
  });
}
