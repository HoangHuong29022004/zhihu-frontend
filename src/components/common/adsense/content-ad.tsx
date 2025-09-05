"use client";

import { AdSenseAd } from "./index";
import { ADSENSE_CONFIG, shouldShowAds } from "@/configs/adsense";

interface ContentAdProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function ContentAd({ className = "", style }: ContentAdProps) {
  if (!shouldShowAds()) {
    return null;
  }

  return (
    <div className={`my-6 text-center ${className}`} style={style}>
      <AdSenseAd
        adSlot={ADSENSE_CONFIG.AD_SLOTS.CONTENT}
        adFormat="auto"
        className="text-center"
        style={{ minHeight: "250px" }}
      />
    </div>
  );
}
