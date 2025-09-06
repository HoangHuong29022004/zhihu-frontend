"use client";

import { useEffect, useState } from "react";

export const FacebookDebug = () => {
  const [debugInfo, setDebugInfo] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isFB = /FBAN|FBAV|FB_IAB|FB4A/i.test(userAgent);
    
    if (isFB) {
      const info = {
        userAgent,
        isFacebookWebView: isFB,
        currentUrl: window.location.href,
        timestamp: new Date().toISOString(),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        navigator: {
          platform: navigator.platform,
          language: navigator.language,
          cookieEnabled: navigator.cookieEnabled,
          onLine: navigator.onLine
        },
        window: {
          location: window.location.href,
          origin: window.location.origin,
          protocol: window.location.protocol,
          host: window.location.host
        },
        document: {
          readyState: document.readyState,
          title: document.title,
          domain: document.domain
        }
      };
      
      setDebugInfo(info);
      
      // Log to console for debugging
      console.log('Facebook WebView Debug Info:', info);
    }
  }, []);

  if (!debugInfo) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h4 className="font-bold mb-2">Facebook WebView Debug</h4>
      <div className="space-y-1">
        <div><strong>URL:</strong> {debugInfo.currentUrl}</div>
        <div><strong>Viewport:</strong> {debugInfo.viewport.width}x{debugInfo.viewport.height}</div>
        <div><strong>Platform:</strong> {debugInfo.navigator.platform}</div>
        <div><strong>Language:</strong> {debugInfo.navigator.language}</div>
        <div><strong>Online:</strong> {debugInfo.navigator.onLine ? 'Yes' : 'No'}</div>
        <div><strong>Ready State:</strong> {debugInfo.document.readyState}</div>
      </div>
    </div>
  );
};
