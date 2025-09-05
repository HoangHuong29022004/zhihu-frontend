// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_ENDPOINT } from "@/data/constants/api-endpoints";
import jwt from "jsonwebtoken"; // https://www.npmjs.com/package/jsonwebtoken

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refetchTokenCookies = cookieStore.get("refetchToken")?.value;

    if (!refetchTokenCookies) {
      return NextResponse.json(
        { message: `RefetchToken is invalid!` },
        { status: 400 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_ENV_NODE === "development"
        ? process.env.NEXT_PUBLIC_API_URL_DEV
        : process.env.NEXT_PUBLIC_API_URL_PRO;

    const bResponse = await fetch(
      `${baseUrl}${API_ENDPOINT.AUTH_REFETCH_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refetchToken: refetchTokenCookies }),
      }
    );

    // Handle error here
    if (!bResponse.ok) {
      const errorData = await bResponse.json();
      return NextResponse.json(errorData, { status: bResponse.status });
    }

    // Change json to object
    const responseData = await bResponse.json();

    // Handle refetchToken vào cookies
    const { accessToken } = responseData.data;
    const decodeAccessToken = jwt.decode(accessToken) as { exp: number }; // as is Typescript syntax

    // Chuyển đổi Unix timestamp (giây) thành đối tượng Date (mili giây)
    const accessTokenExpires = new Date(decodeAccessToken.exp * 1000);
    const isSecure = process.env.NODE_ENV === "production"; // secure = true only in production

    // Set accessToken vào cookies
    cookieStore.set({
      name: "accessToken",
      value: accessToken,
      path: "/",
      httpOnly: true,
      secure: isSecure,
      expires: accessTokenExpires,
    });

    // Return the same data from backend response
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Login failed!, ${error}` },
      { status: 500 }
    );
  }
}
