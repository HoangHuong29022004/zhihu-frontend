"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { LoadingSpinner } from "@/components/common/utils/loading";
import { setRefreshToken } from "@/utils/api-handler";
import { setTokenLoginSuccess } from "@/services/auth-service";

export default function AuthSuccessPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const setTokenToCookies = async (
    accessToken: string,
    refetchToken: string
  ) => {
    try {
      const res = await setTokenLoginSuccess({
        accessToken,
        refetchToken,
      });
      console.log(res);
    } catch (error) {
      console.log("Error when setting token!", error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("accessToken");
    const refetchToken = queryParams.get("refetchToken");
    const userString = queryParams.get("user");

    if (accessToken && refetchToken && userString) {
      try {
        const user = JSON.parse(decodeURIComponent(userString));
        setAccessToken(accessToken);
        setRefreshToken(refetchToken);
        setUser(user);
        setTokenToCookies(accessToken, refetchToken);

        router.push("/");
        // window.location.href = "/";
      } catch (error) {
        console.error("Lỗi khi parse user:", error);
      }
    }
  }, [router, setAccessToken, setUser]);

  return (
    <div className="flex items-center gap-2">
      <LoadingSpinner type="button" variant="primary" />
      <p>Hệ thống đang xác thực...</p>
    </div>
  );
}
