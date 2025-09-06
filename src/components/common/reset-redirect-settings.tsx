"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export const ResetRedirectSettings = () => {
  const handleReset = () => {
    // Reset all Facebook WebView related settings
    localStorage.removeItem('fb-auto-redirect-dismissed');
    localStorage.removeItem('fb-force-redirect-dismissed');
    localStorage.removeItem('fb-webview-banner-dismissed');
    localStorage.removeItem('fb-webview-notice-dismissed');
    
    alert('Đã reset cài đặt! Trang sẽ reload để áp dụng thay đổi.');
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button
        onClick={handleReset}
        size="sm"
        variant="outline"
        className="bg-white/90 backdrop-blur-sm shadow-lg"
        title="Reset Facebook WebView settings"
      >
        <RotateCcw size={16} />
      </Button>
    </div>
  );
};
