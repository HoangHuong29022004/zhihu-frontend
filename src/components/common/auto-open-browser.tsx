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
      const hasRedirected = sessionStorage.getItem('fb-redirect-attempted');
      
      if (!hasDismissed && !hasRedirected) {
        // Auto attempt redirect immediately
        attemptRedirect();
        
        // Show notice after 1 second
        setTimeout(() => {
          setShowRedirectNotice(true);
        }, 1000);
      }
    }
  }, []);

  const attemptRedirect = () => {
    const currentUrl = window.location.href;
    
    // Method 1: Try to force external browser with multiple schemes
    try {
      // Try Chrome first
      const chromeUrl = `googlechrome://navigate?url=${encodeURIComponent(currentUrl)}`;
      window.location.href = chromeUrl;
    } catch {
      // Silent fail
    }
    
    // Method 1.5: Try immediate window.open
    try {
      window.open(currentUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Silent fail
    }
    
    // Method 2: Try Firefox
    setTimeout(() => {
      try {
        const firefoxUrl = `firefox://open-url?url=${encodeURIComponent(currentUrl)}`;
        window.location.href = firefoxUrl;
      } catch {
        // Silent fail
      }
    }, 200);
    
    // Method 3: Try Opera
    setTimeout(() => {
      try {
        const operaUrl = `opera://open-url?url=${encodeURIComponent(currentUrl)}`;
        window.location.href = operaUrl;
      } catch {
        // Silent fail
      }
    }, 400);
    
    // Method 4: Try Samsung Browser
    setTimeout(() => {
      try {
        const samsungUrl = `samsungbrowser://navigate?url=${encodeURIComponent(currentUrl)}`;
        window.location.href = samsungUrl;
      } catch {
        // Silent fail
      }
    }, 600);
    
    // Method 5: Try Edge
    setTimeout(() => {
      try {
        const edgeUrl = `microsoft-edge://${currentUrl}`;
        window.location.href = edgeUrl;
      } catch {
        // Silent fail
      }
    }, 800);
    
    // Method 6: Try to trigger external app with iframe
    setTimeout(() => {
      try {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = currentUrl;
        document.body.appendChild(iframe);
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      } catch {
        // Silent fail
      }
    }, 1000);
    
    // Method 7: Try to trigger external app with form
    setTimeout(() => {
      try {
        const form = document.createElement('form');
        form.method = 'GET';
        form.action = currentUrl;
        form.target = '_blank';
        form.style.display = 'none';
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      } catch {
        // Silent fail
      }
    }, 1200);
    
    // Method 8: Try to trigger external app with link click
    setTimeout(() => {
      try {
        const link = document.createElement('a');
        link.href = currentUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.style.display = 'none';
        document.body.appendChild(link);
        
        // Simulate user click with different events
        const events = ['click', 'mousedown', 'mouseup', 'touchstart', 'touchend'];
        events.forEach(eventType => {
          const event = new Event(eventType, { bubbles: true, cancelable: true });
          link.dispatchEvent(event);
        });
        
        document.body.removeChild(link);
      } catch {
        // Silent fail
      }
    }, 1400);
    
    // Method 9: Try to trigger external app with location change
    setTimeout(() => {
      try {
        // Try to change location to trigger external app
        window.location.href = currentUrl;
      } catch {
        // Silent fail
      }
    }, 1600);
    
    // Method 10: Try to trigger external app with window.open
    setTimeout(() => {
      try {
        window.open(currentUrl, '_blank', 'noopener,noreferrer');
      } catch {
        // Silent fail
      }
    }, 1800);
    
    // Method 11: Try to trigger external app with location.replace
    setTimeout(() => {
      try {
        window.location.replace(currentUrl);
      } catch {
        // Silent fail
      }
    }, 2000);
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