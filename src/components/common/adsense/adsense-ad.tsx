"use client";

import { useEffect } from "react";
import { AdSenseAdUnit } from "@/types/adsense";

export default function AdSenseAd({
  adSlot,
  adFormat = "auto",
  style,
  className,
  fullWidthResponsive = true,
}: AdSenseAdUnit) {
  useEffect(() => {
    try {
      // Debug logging
      console.log("AdSense Ad Component:", {
        adSlot,
        adFormat,
        fullWidthResponsive,
        windowAdsbygoogle:
          typeof window !== "undefined" ? !!window.adsbygoogle : "SSR",
      });

      // Push the command to Google AdSense
      if (typeof window !== "undefined" && window.adsbygoogle) {
        window.adsbygoogle.push({});
        console.log("AdSense push command executed for slot:", adSlot);
      } else {
        console.warn("AdSense script not loaded yet or not available");
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, [adSlot, adFormat, fullWidthResponsive]);

  return (
    <div className={`adsense-container ${className || ""}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9429981491740615" // Thay bằng client ID thật
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
    </div>
  );
}
