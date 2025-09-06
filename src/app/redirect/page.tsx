"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function RedirectContent() {
  const [status, setStatus] = useState("Đang chuyển hướng...");
  const [countdown, setCountdown] = useState(5);
  const searchParams = useSearchParams();
  const targetUrl = searchParams.get("url") || "/";

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isFB = /FBAN|FBAV|FB_IAB|FB4A/i.test(userAgent);
    
    if (isFB) {
      setStatus("Đang mở trong trình duyệt ngoài...");
      
      // Aggressive redirect attempts with deep links
      const redirectMethods = [
        () => {
          // Method 1: Try Chrome deep link
          const chromeUrl = `googlechrome://navigate?url=${encodeURIComponent(targetUrl)}`;
          window.location.href = chromeUrl;
          setStatus("Đang thử mở Chrome...");
          return true;
        },
        () => {
          // Method 2: Try Safari deep link (iOS)
          const safariUrl = `x-web-search://?${encodeURIComponent(targetUrl)}`;
          window.location.href = safariUrl;
          setStatus("Đang thử mở Safari...");
          return true;
        },
        () => {
          // Method 3: Try Firefox deep link
          const firefoxUrl = `firefox://open-url?url=${encodeURIComponent(targetUrl)}`;
          window.location.href = firefoxUrl;
          setStatus("Đang thử mở Firefox...");
          return true;
        },
        () => {
          // Method 4: Direct window.open
          const newWindow = window.open(targetUrl, '_blank', 'noopener,noreferrer');
          if (newWindow && !newWindow.closed) {
            setStatus("Đã mở trong trình duyệt ngoài!");
            return true;
          }
          return false;
        },
        () => {
          // Method 5: Create and click link
          const link = document.createElement('a');
          link.href = targetUrl;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.style.display = 'none';
          document.body.appendChild(link);
          
          // Simulate user click
          const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
          });
          link.dispatchEvent(clickEvent);
          
          setTimeout(() => {
            document.body.removeChild(link);
          }, 100);
          
          setStatus("Đã thử mở trong trình duyệt ngoài!");
          return true;
        },
        () => {
          // Method 6: Direct location change
          window.location.href = targetUrl;
          return true;
        }
      ];

      // Try each method with delay
      redirectMethods.forEach((method, index) => {
        setTimeout(() => {
          if (index === 0 || !document.hidden) {
            method();
          }
        }, index * 500);
      });

      // Countdown and fallback
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            // Final fallback - show instructions
            setStatus("Không thể tự động mở. Vui lòng copy link bên dưới:");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    } else {
      // Not Facebook WebView, redirect normally
      window.location.href = targetUrl;
    }
  }, [targetUrl]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setStatus("Đã copy link! Mở Chrome/Safari và paste vào.");
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = targetUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setStatus("Đã copy link! Mở Chrome/Safari và paste vào.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Mở trong trình duyệt
          </h1>
          <p className="text-gray-600 mb-4">
            {status}
          </p>
        </div>

        {countdown > 0 && (
          <div className="mb-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {countdown}
            </div>
            <p className="text-sm text-gray-500">
              Tự động chuyển hướng sau {countdown} giây
            </p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={handleCopyLink}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Copy Link
          </button>
          
          <button
            onClick={() => window.location.href = targetUrl}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Thử lại
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm"
          >
            Quay lại
          </button>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">
            Hướng dẫn:
          </h3>
          <div className="text-sm text-yellow-700 text-left space-y-1">
            <p>1. Bấm &quot;Copy Link&quot;</p>
            <p>2. Mở Chrome hoặc Safari</p>
            <p>3. Paste link vào thanh địa chỉ</p>
            <p>4. Hoặc bấm menu Facebook → &quot;Mở trong trình duyệt&quot;</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RedirectPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Đang tải...
          </h1>
        </div>
      </div>
    }>
      <RedirectContent />
    </Suspense>
  );
}
