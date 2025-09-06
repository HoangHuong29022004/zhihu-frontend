"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Smartphone } from "lucide-react";
import { 
  isFacebookWebView, 
  openInExternalBrowser, 
  hasDismissedFacebookBanner,
  dismissFacebookBanner 
} from "@/utils/facebook-webview";

export const FacebookWebViewDetector = () => {
  const [isFBWebView, setIsFBWebView] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Detect Facebook WebView
    const isFB = isFacebookWebView();
    setIsFBWebView(isFB);
    
    // Show banner if it's Facebook WebView and user hasn't dismissed it
    if (isFB && !hasDismissedFacebookBanner()) {
      setShowBanner(true);
    }
  }, []);

  const handleOpenInBrowser = () => {
    openInExternalBrowser();
  };

  const handleDismissBanner = () => {
    setShowBanner(false);
    dismissFacebookBanner();
  };

  if (!isFBWebView || !showBanner) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Smartphone size={20} />
          <span className="text-sm font-medium">
            Để có trải nghiệm tốt nhất, hãy mở trong trình duyệt
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleOpenInBrowser}
            size="sm"
            variant="secondary"
            className="bg-white text-pink-600 hover:bg-gray-100"
          >
            <ExternalLink size={16} className="mr-1" />
            Mở trong trình duyệt
          </Button>
          <Button
            onClick={handleDismissBanner}
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            ✕
          </Button>
        </div>
      </div>
    </div>
  );
};
