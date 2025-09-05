"use client";

import { AdSenseAd } from "./index";
import { ADSENSE_CONFIG, shouldShowAds } from "@/configs/adsense";

export default function SidebarAd() {
  if (!shouldShowAds()) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Quảng cáo</h3>
      <AdSenseAd
        adSlot={ADSENSE_CONFIG.AD_SLOTS.SIDEBAR}
        adFormat="auto"
        className="text-center"
        style={{ minHeight: "250px" }}
      />
    </div>
  );
}
