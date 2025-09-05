"use client";

import { AdSenseAd } from "./index";
import { ADSENSE_CONFIG, shouldShowAds } from "@/configs/adsense";

interface InArticleAdProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function InArticleAd({
  className = "",
  style,
}: InArticleAdProps) {
  if (!shouldShowAds()) {
    return null;
  }

  return (
    <div className={`my-8 text-center ${className}`} style={style}>
      <div className="bg-gray-50 rounded-lg p-4">
        <AdSenseAd
          adSlot={ADSENSE_CONFIG.AD_SLOTS.IN_ARTICLE}
          adFormat="auto"
          className="text-center"
          style={{ minHeight: "250px" }}
        />
      </div>
    </div>
  );
}
