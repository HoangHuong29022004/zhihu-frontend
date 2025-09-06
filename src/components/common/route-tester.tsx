"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, TestTube } from "lucide-react";

export const RouteTester = () => {
  const [testUrl, setTestUrl] = useState("");
  const [testResults, setTestResults] = useState<Array<{
    route: string;
    status: number | string;
    statusText: string;
    responseTime: number;
    success: boolean;
    timestamp: string;
  }>>([]);

  const testRoutes = [
    "/",
    "/comic/test-comic",
    "/comic/test-comic/chapter-1",
    "/comic/suong-mu-ruc-ro/suong-mu-ruc-ro.chuong-2-hop-lop",
    "/truyen/test-truyen",
    "/chuong/1",
  ];

  const testRoute = async (route: string) => {
    const startTime = Date.now();
    try {
      const response = await fetch(route, {
        method: 'HEAD',
        mode: 'same-origin'
      });
      const endTime = Date.now();
      
      const result = {
        route,
        status: response.status,
        statusText: response.statusText,
        responseTime: endTime - startTime,
        success: response.ok,
        timestamp: new Date().toISOString()
      };
      
      setTestResults(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results
    } catch (error) {
      const result = {
        route,
        status: 'ERROR',
        statusText: error instanceof Error ? error.message : 'Unknown error',
        responseTime: Date.now() - startTime,
        success: false,
        timestamp: new Date().toISOString()
      };
      
      setTestResults(prev => [result, ...prev.slice(0, 9)]);
    }
  };

  const testCustomUrl = () => {
    if (testUrl) {
      testRoute(testUrl);
    }
  };

  const openInNewTab = (route: string) => {
    window.open(route, '_blank');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube size={20} />
          Route Tester
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Custom URL Test */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Test Custom URL:</label>
          <div className="flex gap-2">
            <input
              value={testUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTestUrl(e.target.value)}
              placeholder="/comic/test-comic/chapter-1"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={testCustomUrl} size="sm">
              Test
            </Button>
          </div>
        </div>

        {/* Quick Test Buttons */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Quick Tests:</label>
          <div className="grid grid-cols-2 gap-2">
            {testRoutes.map((route) => (
              <div key={route} className="flex gap-1">
                <Button
                  onClick={() => testRoute(route)}
                  size="sm"
                  variant="outline"
                  className="flex-1 text-xs"
                >
                  Test
                </Button>
                <Button
                  onClick={() => openInNewTab(route)}
                  size="sm"
                  variant="ghost"
                  className="px-2"
                >
                  <ExternalLink size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        {testResults.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Test Results:</label>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs"
                >
                  <div className="flex-1">
                    <div className="font-mono">{result.route}</div>
                    <div className="text-gray-600">
                      {result.status} - {result.responseTime}ms
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={result.success ? "default" : "destructive"}
                    >
                      {result.success ? "OK" : "FAIL"}
                    </Badge>
                    <Button
                      onClick={() => openInNewTab(result.route)}
                      size="sm"
                      variant="ghost"
                      className="px-2"
                    >
                      <ExternalLink size={12} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
          <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded">
            <strong>Instructions:</strong>
            <br />• Click &quot;Test&quot; to check if route responds
            <br />• Click external link icon to open in new tab
            <br />• Green badge = route works, Red badge = route fails
            <br />• Use this to test Facebook WebView routing issues
          </div>
      </CardContent>
    </Card>
  );
};
