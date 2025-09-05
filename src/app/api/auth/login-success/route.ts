import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // https://www.npmjs.com/package/jsonwebtoken

export async function POST(req: NextRequest) {
  try {
    // Get body from UI (login form)
    const cookieStore = await cookies();

    const { accessToken, refetchToken } = await req.json();

    // Handle refetchToken vào cookies
    const decodeAccessToken = jwt.decode(accessToken) as { exp: number }; // as is Typescript syntax
    const decodeRefetchToken = jwt.decode(refetchToken) as { exp: number };

    // Chuyển đổi Unix timestamp (giây) thành đối tượng Date (mili giây)
    const accessTokenExpires = new Date(decodeAccessToken.exp * 1000);
    const refetchTokenExpires = new Date(decodeRefetchToken.exp * 1000);
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
      value: refetchToken,
      path: "/",
      httpOnly: true,
      secure: isSecure,
      expires: refetchTokenExpires,
    });

    // Return the same data from backend response
    return NextResponse.json(
      {
        data: "Set token to cookies successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Set token failed!, ${error}` },
      { status: 500 }
    );
  }
}
