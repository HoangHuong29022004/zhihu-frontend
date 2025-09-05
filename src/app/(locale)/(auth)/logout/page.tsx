"use client";
import { DotLoader } from "@/components/common/utils/loading";
import { sLogout } from "@/services/auth-service";
import { useAuthStore } from "@/stores/auth-store";
import {
  clearAllCookies,
  getRefreshToken,
  isSuccessResponse,
} from "@/utils/api-handler";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";

const LogoutPageClient = () => {
  const { logout: handleLogoutAuthStore } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const refetchTokenUrl = searchParams.get("refetchToken");

  const handleLogout = async () => {
    try {
      if (refetchTokenUrl !== getRefreshToken()) {
        clearAllCookies();
        router.push("/");
      } else {
        const res = await sLogout();
        if (res && isSuccessResponse(res?.statusCode)) {
          clearAllCookies();
          handleLogoutAuthStore();
          router.push("/login");
        }
      }
    } catch (error) {
      console.log("Logout failed: ", error);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);
  return <div></div>;
};

const LogoutPage = () => {
  return (
    <Suspense fallback={<DotLoader />}>
      <LogoutPageClient />
    </Suspense>
  );
};

export default LogoutPage;
