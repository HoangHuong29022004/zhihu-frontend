// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_ENDPOINT } from "@/data/constants/api-endpoints";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const { accessToken } = await req.json();
    const baseUrl =
      process.env.NEXT_PUBLIC_ENV_NODE === "development"
        ? process.env.NEXT_PUBLIC_API_URL_DEV
        : process.env.NEXT_PUBLIC_API_URL_PRO;

    const bResponse = await fetch(`${baseUrl}${API_ENDPOINT.AUTH_LOGOUT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({}),
    });

    // Handle error heer
    if (!bResponse.ok) {
      const errorData = await bResponse.json();
      return NextResponse.json(errorData, { status: bResponse.status });
    }

    // Lấy danh sách tất cả các cookie
    const allCookies = cookieStore.getAll();

    // Lặp qua từng cookie và xóa
    allCookies.forEach((cookie) => {
      cookieStore.delete(cookie.name);
    });

    // Change json to object
    const responseData = await bResponse.json();

    // Return the same data from backend response
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Login failed!, ${error}` },
      { status: 500 }
    );
  }
}
