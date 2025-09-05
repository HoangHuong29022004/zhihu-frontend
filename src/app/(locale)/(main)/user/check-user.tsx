"use client";
import { toast } from "@/hooks/use-toast";
import { getProfile } from "@/services/auth-service";
import { useAuthStore } from "@/stores/auth-store";
import {
  clearAllCookies,
  getAccessToken,
  isSuccessResponse,
  setAccessToken,
  setRefreshToken,
} from "@/utils/api-handler";
import { setAuthCookies } from "@/utils/auth-hanlder";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const FETCH_INTERVAL = 3 * 60 * 1000; // 5 phút

const GetUserProfile = () => {
  const token = getAccessToken();
  const router = useRouter();
  const { logout: handleLogoutAuthStore, setUser } = useAuthStore();

  const fetchProfile = async () => {
    const res = await getProfile(token ?? "");
    if (res && isSuccessResponse(res?.statusCode, res?.success)) {
      const accessToken = res.data.accessToken;
      const refreshToken = res.data.refreshToken;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      setAuthCookies({
        accessToken,
        refreshToken,
      });

      setUser(res?.data);

      // Lưu thời điểm fetch vào localStorage
      localStorage.setItem("userProfileLastFetched", Date.now().toString());
    } else if (!res || res?.statusCode === 401) {
      handleLogoutAuthStore();
      clearAllCookies();
      toast({
        variant: "destructive",
        title: "Đăng nhập hết hạn hoặc chưa đăng nhập!",
        description: "Vui lòng đăng nhập lại!",
      });
      router.push("/login");
    } else {
      toast({
        variant: "destructive",
        title: "Opps! Có lỗi xảy ra!",
        description: "Vui lòng đăng nhập lại!",
      });
      router.push("/login");
    }
  };

  useEffect(() => {
    const lastFetched = localStorage.getItem("userProfileLastFetched");
    const now = Date.now();

    if (!lastFetched || now - parseInt(lastFetched) > FETCH_INTERVAL) {
      fetchProfile();
    }
    // Nếu chưa đủ 5 phút thì không fetch lại
  }, []);
  return <div></div>;
};

export default GetUserProfile;
