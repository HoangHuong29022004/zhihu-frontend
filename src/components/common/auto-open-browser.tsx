"use client";

import { useEffect, useState } from "react";

export const AutoOpenBrowser = () => {
  const [showRedirectNotice, setShowRedirectNotice] = useState(false);
  const [isFBWebView, setIsFBWebView] = useState(false);

  useEffect(() => {
    // Detect Facebook WebView with more comprehensive detection
    const userAgent = navigator.userAgent;
    const isFB = /FBAN|FBAV|FB_IAB|FB4A|Instagram|Twitter|Line|WhatsApp|Telegram|WeChat/i.test(userAgent);
    const isInApp = /wv|WebView/i.test(userAgent);
    
    if (isFB || isInApp) {
      setIsFBWebView(true);
      
      // Check if user has already dismissed auto-redirect
      const hasDismissed = localStorage.getItem('fb-auto-open-dismissed');
      
      if (!hasDismissed) {
        // Show notice immediately
        setShowRedirectNotice(true);
      }
    }
  }, []);

  const attemptRedirect = () => {
    const currentUrl = window.location.href;
    
    // Single method: Try to open in external browser using intent URL (Android)
    try {
      const intentUrl = `intent://${currentUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
      window.location.href = intentUrl;
    } catch (error) {
      console.log('Intent method failed:', error);
    }
    
    // Fallback: Try window.open
    setTimeout(() => {
      try {
        window.open(currentUrl, '_blank', 'noopener,noreferrer');
      } catch (error) {
        console.log('Window.open method failed:', error);
      }
    }, 500);
  };

  const handleDismiss = () => {
    localStorage.setItem('fb-auto-open-dismissed', 'true');
    setShowRedirectNotice(false);
  };

  const handleRedirect = () => {
    attemptRedirect();
    setShowRedirectNotice(false);
  };

  if (!isFBWebView || !showRedirectNotice) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
        <div className="mb-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Mở trong trình duyệt
          </h3>
          <p className="text-gray-600 text-sm">
            Để có trải nghiệm tốt nhất, vui lòng mở trang này trong trình duyệt ngoài.
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={handleRedirect}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Mở trong trình duyệt
          </button>
          <button
            onClick={handleDismiss}
            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm"
          >
            Tiếp tục ở đây
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-4">
          Bạn có thể tắt thông báo này trong cài đặt
        </p>
      </div>
    </div>
  );
};