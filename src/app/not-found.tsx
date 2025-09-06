"use client";

import { useEffect, useState } from "react";
import { ErrorPageBase } from "@/components/common/utils/no-data";
import { Button } from "@/components/ui/button";
import { ExternalLink, RefreshCw } from "lucide-react";

export default function NotFound() {
  const [isFacebookWebView, setIsFacebookWebView] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // Detect Facebook WebView
    const userAgent = navigator.userAgent;
    const isFB = /FBAN|FBAV|FB_IAB|FB4A/i.test(userAgent);
    setIsFacebookWebView(isFB);
    setCurrentUrl(window.location.href);
  }, []);

  const handleOpenInBrowser = () => {
    // Try multiple redirect methods
    try {
      // Method 1: Direct window.open (most reliable)
      window.open(currentUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Method 2: Direct location change
      try {
        window.location.href = currentUrl;
      } catch {
        // Method 3: Create link and click
        try {
          const link = document.createElement('a');
          link.href = currentUrl;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch {
          // Method 4: Last resort - reload page
          try {
            window.location.reload();
          } catch {
            // Silent fail
          }
        }
      }
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center dark:text-gray-300 p-4">
      <ErrorPageBase
        statusCode="404"
        title="Trang không tồn tại!"
        description="Opps!. Rất tiếc trang này không tồn tại! Hãy thử lại sau nhé!"
      />
      
      {/* Facebook WebView specific help */}
      {isFacebookWebView && (
        <div className="mt-8 max-w-md mx-auto bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Đang sử dụng Facebook App?
          </h3>
          <p className="text-blue-700 text-sm mb-4">
            Facebook app có thể gây ra lỗi này. Hãy thử mở trong trình duyệt để có trải nghiệm tốt hơn.
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={handleOpenInBrowser} size="sm">
              <ExternalLink size={16} className="mr-2" />
              Mở trong trình duyệt
            </Button>
            <Button onClick={handleRefresh} size="sm" variant="outline">
              <RefreshCw size={16} className="mr-2" />
              Thử lại
            </Button>
          </div>
        </div>
      )}

      {/* Debug info for developers */}
      <div className="mt-4 text-xs text-gray-500 max-w-md">
        <details>
          <summary className="cursor-pointer hover:text-gray-700">
            Debug Info (Click to expand)
          </summary>
          <div className="mt-2 p-2 bg-gray-100 rounded text-left font-mono">
            <div><strong>URL:</strong> {currentUrl}</div>
            <div><strong>User Agent:</strong> {typeof window !== 'undefined' ? navigator.userAgent : 'N/A'}</div>
            <div><strong>Facebook WebView:</strong> {isFacebookWebView ? 'YES' : 'NO'}</div>
            <div><strong>Timestamp:</strong> {new Date().toISOString()}</div>
          </div>
        </details>
      </div>
    </div>
  );
}
