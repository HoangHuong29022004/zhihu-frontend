"use client";

import { AdSenseAd } from "./index";
import { ADSENSE_CONFIG, shouldShowAds } from "@/configs/adsense";

export default function HeaderAd() {
  console.log("Check shouldShowAds(): ", shouldShowAds());
  if (!shouldShowAds()) {
    return null;
  }

  return (
    <div className="w-full bg-gray-50 py-2">
      <div className="container mx-auto px-4">
        <AdSenseAd
          adSlot={ADSENSE_CONFIG.AD_SLOTS.HEADER}
          adFormat="auto"
          className="text-center"
          style={{ minHeight: "90px" }}
        />
      </div>
    </div>
  );
}
