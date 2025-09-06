"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, 
  Bug, 
  Smartphone, 
  EyeOff,
  RefreshCw,
  Download
} from "lucide-react";
import { isFacebookWebView, isFacebookInAppBrowser } from "@/utils/facebook-webview";

interface DebugInfo {
  timestamp: string;
  userAgent: string;
  url: string;
  isFacebookWebView: boolean;
  isFacebookInAppBrowser: boolean;
  screenSize: string;
  viewportSize: string;
  platform: string;
  language: string;
  timezone: string;
  cookies: string;
  localStorage: string;
  sessionStorage: string;
  networkInfo?: {
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
  };
  errors: string[];
}

export const MobileDebugPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  // Capture errors
  useEffect(() => {
    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args) => {
      const errorMsg = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ');
      setErrors(prev => [...prev, `ERROR: ${errorMsg}`]);
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      const warnMsg = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ');
      setErrors(prev => [...prev, `WARN: ${warnMsg}`]);
      originalWarn.apply(console, args);
    };

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  const collectDebugInfo = (): DebugInfo => {
    const now = new Date();
    const info: DebugInfo = {
      timestamp: now.toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      isFacebookWebView: isFacebookWebView(),
      isFacebookInAppBrowser: isFacebookInAppBrowser(),
      screenSize: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      platform: navigator.platform,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      cookies: document.cookie,
      localStorage: JSON.stringify(localStorage),
      sessionStorage: JSON.stringify(sessionStorage),
      errors: [...errors]
    };

    // Try to get network info if available
    if ('connection' in navigator) {
      const connection = (navigator as unknown as { connection?: { effectiveType?: string; downlink?: number; rtt?: number } }).connection;
      info.networkInfo = {
        effectiveType: connection?.effectiveType,
        downlink: connection?.downlink,
        rtt: connection?.rtt
      };
    }

    return info;
  };

  const refreshDebugInfo = () => {
    const info = collectDebugInfo();
    setDebugInfo(info);
  };

  const copyDebugInfo = async () => {
    if (!debugInfo) return;
    
    const debugText = `=== MOBILE DEBUG INFO ===
Timestamp: ${debugInfo.timestamp}
URL: ${debugInfo.url}
User Agent: ${debugInfo.userAgent}
Platform: ${debugInfo.platform}
Language: ${debugInfo.language}
Timezone: ${debugInfo.timezone}
Screen Size: ${debugInfo.screenSize}
Viewport Size: ${debugInfo.viewportSize}
Is Facebook WebView: ${debugInfo.isFacebookWebView}
Is Facebook In-App Browser: ${debugInfo.isFacebookInAppBrowser}
Network Info: ${JSON.stringify(debugInfo.networkInfo, null, 2)}
Cookies: ${debugInfo.cookies}
Local Storage: ${debugInfo.localStorage}
Session Storage: ${debugInfo.sessionStorage}
Errors: ${debugInfo.errors.join('\n')}
=== END DEBUG INFO ===`;

    try {
      await navigator.clipboard.writeText(debugText);
      alert('Debug info copied to clipboard!');
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = debugText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Debug info copied to clipboard!');
    }
  };

  const downloadDebugInfo = () => {
    if (!debugInfo) return;
    
    const debugText = `=== MOBILE DEBUG INFO ===
Timestamp: ${debugInfo.timestamp}
URL: ${debugInfo.url}
User Agent: ${debugInfo.userAgent}
Platform: ${debugInfo.platform}
Language: ${debugInfo.language}
Timezone: ${debugInfo.timezone}
Screen Size: ${debugInfo.screenSize}
Viewport Size: ${debugInfo.viewportSize}
Is Facebook WebView: ${debugInfo.isFacebookWebView}
Is Facebook In-App Browser: ${debugInfo.isFacebookInAppBrowser}
Network Info: ${JSON.stringify(debugInfo.networkInfo, null, 2)}
Cookies: ${debugInfo.cookies}
Local Storage: ${debugInfo.localStorage}
Session Storage: ${debugInfo.sessionStorage}
Errors: ${debugInfo.errors.join('\n')}
=== END DEBUG INFO ===`;

    const blob = new Blob([debugText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debug-info-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Auto-refresh debug info when visible
  useEffect(() => {
    if (isVisible) {
      refreshDebugInfo();
      const interval = setInterval(refreshDebugInfo, 5000); // Refresh every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Show debug panel on triple tap
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
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <Card className="max-w-4xl mx-auto mt-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Smartphone size={20} />
              Mobile Debug Panel
            </CardTitle>
            <div className="flex gap-2">
              <Button
                onClick={refreshDebugInfo}
                size="sm"
                variant="outline"
              >
                <RefreshCw size={16} />
              </Button>
              <Button
                onClick={() => setIsVisible(false)}
                size="sm"
                variant="outline"
              >
                <EyeOff size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {debugInfo && (
            <>
              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Badge variant={debugInfo.isFacebookWebView ? "destructive" : "default"}>
                    Facebook WebView: {debugInfo.isFacebookWebView ? "YES" : "NO"}
                  </Badge>
                  <Badge variant={debugInfo.isFacebookInAppBrowser ? "destructive" : "default"}>
                    In-App Browser: {debugInfo.isFacebookInAppBrowser ? "YES" : "NO"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>Screen:</strong> {debugInfo.screenSize}
                  </div>
                  <div className="text-sm">
                    <strong>Viewport:</strong> {debugInfo.viewportSize}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-wrap">
                <Button onClick={copyDebugInfo} size="sm">
                  <Copy size={16} className="mr-2" />
                  Copy Debug Info
                </Button>
                <Button onClick={downloadDebugInfo} size="sm" variant="outline">
                  <Download size={16} className="mr-2" />
                  Download
                </Button>
              </div>

              {/* Detailed Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">User Agent</h4>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono break-all">
                    {debugInfo.userAgent}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">URL</h4>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono break-all">
                    {debugInfo.url}
                  </div>
                </div>

                {debugInfo.networkInfo && (
                  <div>
                    <h4 className="font-semibold mb-2">Network Info</h4>
                    <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                      {JSON.stringify(debugInfo.networkInfo, null, 2)}
                    </div>
                  </div>
                )}

                {debugInfo.errors.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Errors ({debugInfo.errors.length})</h4>
                    <div className="bg-red-50 p-2 rounded text-xs font-mono max-h-32 overflow-y-auto">
                      {debugInfo.errors.map((error, index) => (
                        <div key={index} className="text-red-600">
                          {error}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-2">Local Storage</h4>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono max-h-32 overflow-y-auto">
                    {debugInfo.localStorage}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Cookies</h4>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono break-all">
                    {debugInfo.cookies || "No cookies"}
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
