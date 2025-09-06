"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, X } from "lucide-react";

export const FacebookWebViewNotice = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFacebookWebView, setIsFacebookWebView] = useState(false);

  useEffect(() => {
    // Detect Facebook WebView
    const userAgent = navigator.userAgent;
    const isFB = /FBAN|FBAV|FB_IAB|FB4A/i.test(userAgent);
    setIsFacebookWebView(isFB);

    // Show notice if it's Facebook WebView and user hasn't dismissed it
    if (isFB && !localStorage.getItem('fb-webview-notice-dismissed')) {
      setIsVisible(true);
    }
  }, []);

  const handleOpenInBrowser = () => {
    const currentUrl = window.location.href;
    window.open(currentUrl, '_blank');
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('fb-webview-notice-dismissed', 'true');
  };

  if (!isVisible || !isFacebookWebView) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">
            Để có trải nghiệm tốt nhất, hãy mở trong trình duyệt
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleOpenInBrowser}
            size="sm"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <ExternalLink size={16} className="mr-1" />
            Mở trong trình duyệt
          </Button>
          <Button
            onClick={handleDismiss}
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <X size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
