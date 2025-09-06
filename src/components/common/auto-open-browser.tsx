"use client";

import { useEffect, useState } from "react";

export const AutoOpenBrowser = () => {
  const [showRedirectNotice, setShowRedirectNotice] = useState(false);
  const [isFBWebView, setIsFBWebView] = useState(false);

  useEffect(() => {
    // Detect Facebook WebView
    const userAgent = navigator.userAgent;
    const isFB = /FBAN|FBAV|FB_IAB|FB4A/i.test(userAgent);
    
    if (isFB) {
      setIsFBWebView(true);
      
      // Check if user has already dismissed auto-redirect
      const hasDismissed = localStorage.getItem('fb-auto-open-dismissed');
      
      if (!hasDismissed) {
        // Show notice immediately for Facebook WebView users
        setShowRedirectNotice(true);
      }
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('fb-auto-open-dismissed', 'true');
    setShowRedirectNotice(false);
  };

  const handleRedirect = () => {
    // Redirect to our dedicated redirect page
    const currentUrl = window.location.href;
    window.location.href = `/redirect?url=${encodeURIComponent(currentUrl)}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Đã copy link! Bây giờ mở Chrome/Safari và paste link vào.');
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Đã copy link! Bây giờ mở Chrome/Safari và paste link vào.');
    }
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
          <p className="text-gray-600 text-sm mb-3">
            Facebook app có thể gây ra lỗi hiển thị. Để có trải nghiệm tốt nhất:
          </p>
          <div className="text-left text-xs text-gray-500 space-y-1">
            <p>• Bấm nút &quot;Mở trong trình duyệt&quot; bên dưới</p>
            <p>• Hoặc copy link và mở trong Chrome/Safari</p>
            <p>• Hoặc bấm menu Facebook → &quot;Mở trong trình duyệt&quot;</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={handleRedirect}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Mở trong trình duyệt
          </button>
          <button
            onClick={handleCopyLink}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            Copy Link
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