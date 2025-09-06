"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Smartphone, Globe } from "lucide-react";

export const AutoRedirectBrowser = () => {
  const [isFacebookWebView, setIsFacebookWebView] = useState(false);
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Detect Facebook WebView
    const userAgent = navigator.userAgent;
    const isFB = /FBAN|FBAV|FB_IAB|FB4A/i.test(userAgent);
    setIsFacebookWebView(isFB);

    // Show redirect modal if it's Facebook WebView and user hasn't dismissed it
    if (isFB && !localStorage.getItem('fb-auto-redirect-dismissed')) {
      setShowRedirectModal(true);
      
      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleRedirectToBrowser();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, []);

  const handleRedirectToBrowser = () => {
    const currentUrl = window.location.href;
    
    // Try different methods to open in external browser
    try {
      // Method 1: Direct window.open
      window.open(currentUrl, '_blank');
      
      // Method 2: Create a link and click it
      const link = document.createElement('a');
      link.href = currentUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Method 3: Try to trigger external app
      setTimeout(() => {
        window.location.href = currentUrl;
      }, 1000);
      
    } catch (error) {
      console.error('Error redirecting to browser:', error);
    }
  };

  // const handleDismiss = () => {
  //   setShowRedirectModal(false);
  //   localStorage.setItem('fb-auto-redirect-dismissed', 'true');
  // };

  const handleStayInApp = () => {
    setShowRedirectModal(false);
    localStorage.setItem('fb-auto-redirect-dismissed', 'true');
  };

  if (!showRedirectModal || !isFacebookWebView) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-auto shadow-2xl">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Globe className="w-8 h-8 text-blue-600" />
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Mở trong trình duyệt
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-4">
            Để có trải nghiệm tốt nhất, chúng tôi khuyến nghị mở trang này trong Safari hoặc Chrome.
          </p>
          
          {/* Countdown */}
          <div className="bg-blue-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800">
              Tự động mở trong trình duyệt sau:
            </p>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {countdown}s
            </div>
          </div>
          
          {/* Buttons */}
          <div className="space-y-2">
            <Button
              onClick={handleRedirectToBrowser}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <ExternalLink size={16} className="mr-2" />
              Mở ngay trong trình duyệt
            </Button>
            
            <Button
              onClick={handleStayInApp}
              variant="outline"
              className="w-full"
            >
              <Smartphone size={16} className="mr-2" />
              Ở lại trong Facebook
            </Button>
          </div>
          
          {/* Note */}
          <p className="text-xs text-gray-500 mt-3">
            Bạn có thể thay đổi lựa chọn này bất cứ lúc nào
          </p>
        </div>
      </div>
    </div>
  );
};
