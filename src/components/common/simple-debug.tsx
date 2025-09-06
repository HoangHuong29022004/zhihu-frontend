"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Bug } from "lucide-react";

export const SimpleDebug = () => {
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const info = {
      userAgent: navigator.userAgent,
      url: window.location.href,
      isFacebookWebView: /FBAN|FBAV|FB_IAB|FB4A/i.test(navigator.userAgent),
      timestamp: new Date().toISOString(),
      screenSize: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    };

    const debugText = `=== DEBUG INFO ===
Time: ${info.timestamp}
URL: ${info.url}
User Agent: ${info.userAgent}
Is Facebook WebView: ${info.isFacebookWebView}
Screen: ${info.screenSize}
Viewport: ${info.viewportSize}
=== END ===`;

    setDebugInfo(debugText);
  }, []);

  const copyDebugInfo = async () => {
    try {
      await navigator.clipboard.writeText(debugInfo);
      alert('Debug info copied!');
    } catch (err) {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = debugInfo;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Debug info copied!');
    }
  };

  // Show on triple tap
  useEffect(() => {
    let tapCount = 0;
    let tapTimer: NodeJS.Timeout;

    const handleTap = () => {
      tapCount++;
      if (tapCount === 3) {
        setIsVisible(true);
        tapCount = 0;
      }
      
      clearTimeout(tapTimer);
      tapTimer = setTimeout(() => {
        tapCount = 0;
      }, 1000);
    };

    document.addEventListener('touchstart', handleTap);
    return () => {
      document.removeEventListener('touchstart', handleTap);
      clearTimeout(tapTimer);
    };
  }, []);

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          size="sm"
          variant="outline"
          className="bg-white/90 backdrop-blur-sm shadow-lg"
        >
          <Bug size={16} />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg p-4 max-w-md mx-auto mt-20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">Debug Info</h3>
          <Button
            onClick={() => setIsVisible(false)}
            size="sm"
            variant="outline"
          >
            ✕
          </Button>
        </div>
        
        <div className="bg-gray-100 p-3 rounded text-xs font-mono mb-4 max-h-64 overflow-y-auto">
          <pre>{debugInfo}</pre>
        </div>
        
        <Button onClick={copyDebugInfo} size="sm" className="w-full">
          <Copy size={16} className="mr-2" />
          Copy Debug Info
        </Button>
      </div>
    </div>
  );
};
