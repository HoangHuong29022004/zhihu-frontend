"use client";

import { useEffect, useState } from "react";
import { shouldShowAds, getCurrentEnvironment } from "@/configs/adsense";

export const useAdSense = () => {
  const [isAdSenseLoaded, setIsAdSenseLoaded] = useState(false);
  const [currentEnv, setCurrentEnv] = useState<string>("LOCAL");

  useEffect(() => {
    // Kiểm tra môi trường hiện tại
    setCurrentEnv(getCurrentEnvironment());

    // Kiểm tra xem AdSense script đã được load chưa
    const checkAdSenseLoaded = () => {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        setIsAdSenseLoaded(true);
      }
    };

    // Kiểm tra ngay lập tức
    checkAdSenseLoaded();

    // Kiểm tra định kỳ
    const interval = setInterval(checkAdSenseLoaded, 1000);

    return () => clearInterval(interval);
  }, []);

  const showAds = shouldShowAds();
  const isProduction = currentEnv === "PRODUCTION";
  const isDemo = currentEnv === "DEMO";
  const isLocal = currentEnv === "LOCAL";

  return {
    showAds,
    isAdSenseLoaded,
    currentEnv,
    isProduction,
    isDemo,
    isLocal,
  };
};
