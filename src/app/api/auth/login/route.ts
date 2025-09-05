// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_ENDPOINT } from "@/data/constants/api-endpoints";
import jwt from "jsonwebtoken"; // https://www.npmjs.com/package/jsonwebtoken

export async function POST(req: NextRequest) {
  try {
    // Get body from UI (login form)
    const cookieStore = await cookies();
    const { email, password } = await req.json();

    const baseUrl =
      process.env.NEXT_PUBLIC_ENV_NODE === "development"
        ? process.env.NEXT_PUBLIC_API_URL_DEV
        : process.env.NEXT_PUBLIC_API_URL_PRO;

    const bResponse = await fetch(`${baseUrl}${API_ENDPOINT.AUTH_LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Handle error here
    if (!bResponse.ok) {
      const errorData = await bResponse.json();
      return NextResponse.json(errorData, { status: bResponse.status });
    }

    // Change json to object
    const responseData = await bResponse.json();

    console.log("responseData.data: ", responseData.data);

    // Handle refetchToken vào cookies
    const { refreshToken, accessToken } = responseData.data;
    const decodeAccessToken = jwt.decode(accessToken) as { exp: number }; // as is Typescript syntax
    // const decodeRefetchToken = jwt.decode(refreshToken) as { exp: number };

    // Chuyển đổi Unix timestamp (giây) thành đối tượng Date (mili giây)
    const accessTokenExpires = new Date(decodeAccessToken.exp * 1000);
    // const refetchTokenExpires = new Date(decodeRefetchToken.exp * 1000);
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

    // Set refetchToken vào cookies
    cookieStore.set({
      name: "refetchToken",
      value: refreshToken,
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
