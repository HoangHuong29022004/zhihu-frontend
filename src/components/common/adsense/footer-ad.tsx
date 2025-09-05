"use client";

import { AdSenseAd } from "./index";
import { ADSENSE_CONFIG, shouldShowAds } from "@/configs/adsense";

export default function FooterAd() {
  if (!shouldShowAds()) {
    return null;
  }

  return (
    <div className="w-full bg-gray-50 py-4 mt-8">
      <div className="container mx-auto px-4">
        <AdSenseAd
          adSlot={ADSENSE_CONFIG.AD_SLOTS.FOOTER}
          adFormat="auto"
          className="text-center"
          style={{ minHeight: "90px" }}
        />
      </div>
    </div>
  );
}
