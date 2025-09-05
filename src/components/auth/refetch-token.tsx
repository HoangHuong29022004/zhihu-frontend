/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  getAccessToken,
  getRefreshToken,
  isSuccessResponse,
  setAccessToken,
} from "@/utils/api-handler";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import jwt from "jsonwebtoken"; // https://www.npmjs.com/package/jsonwebtoken
import { sLogout, sRefetchToken } from "@/services/auth-service";
import { useAuthStore } from "@/stores/auth-store";

const UN_AUTH_PATHS = [
  "/login",
  "/register",
  "/verify",
  "/login-success",
  "/refetch-token",
  "/logout",
];

// Testing only
// const ACCESS_TOKEN_BUFFER = 6; // Buffer 6 giây trước khi access token hết hạn (cho test 30s)
// const REFRESH_TOKEN_BUFFER = 15; // Buffer 15 giây trước khi refresh token hết hạn (cho test 2m)

// Reality
const ACCESS_TOKEN_BUFFER = 120; // 2 phút trước khi access token hết hạn (30m)
const REFRESH_TOKEN_BUFFER = 3600; // 1 giờ trước khi refresh token hết hạn (7d)
const INTERVAL_TIMEOUT = (ACCESS_TOKEN_BUFFER / 2) * 1000; // 60 giây

const RefetchToken = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { logout: handleLogoutAuthStore } = useAuthStore();

  useEffect(() => {
    // check unauthenticated paths
    if (UN_AUTH_PATHS.includes(pathName)) return;
    let interval: any = null;

    // check token
    const checkRefetchToken = async () => {
      // get from store (local storage)
      const accessToken = getAccessToken();
      const refetchToken = getRefreshToken();

      // do not login the return
      if (!accessToken || !refetchToken) return;

      // user has been login the decode token
      const decodeAccessToken = jwt.decode(accessToken) as {
        exp: number;
        iat: number;
      };
      const decodeRefetchToken = jwt.decode(refetchToken) as {
        exp: number;
        iat: number;
      };
      const now = Math.round(new Date().getTime() / 1000);

      const handleLogout = async () => {
        try {
          await sLogout();
          handleLogoutAuthStore();
          router.push("/login");
          clearInterval(interval);
        } catch (error: any) {
          console.log("Có lỗi khi logout:", error);
        }
      };

      // Khi refetchToken hết hạn
      if (decodeRefetchToken.exp - REFRESH_TOKEN_BUFFER <= now) {
        await handleLogout();
      } else if (decodeAccessToken.exp - ACCESS_TOKEN_BUFFER <= now) {
        // Khi accessToken hết hạn
        try {
          const res = await sRefetchToken();
          if (res && isSuccessResponse(res?.statusCode)) {
            // refetch token thanh cong
            setAccessToken(res.data.accessToken);
          } else {
            // co loi thi logout
            await handleLogout();
          }
        } catch (error) {
          // co loi thi logout
          console.log("Error when refetch token:", error);
          await handleLogout();
        }
      }
    };

    // Phải gọi hàm vì interval sẽ chạy sau thời gian INTERVAL_TIMEOUT
    checkRefetchToken();
    interval = setInterval(checkRefetchToken, INTERVAL_TIMEOUT);
  }, [pathName]);

  return null;
};

export default RefetchToken;
