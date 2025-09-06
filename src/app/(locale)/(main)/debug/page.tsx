import { RouteTester } from "@/components/common/route-tester";
import { SimpleDebug } from "@/components/common/simple-debug";

export default function DebugPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Debug Panel
          </h1>
          <p className="text-gray-600">
            Test Facebook WebView và routing issues
          </p>
        </div>

        <div className="space-y-8">
          <RouteTester />
          
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Debug Info</h2>
            <SimpleDebug />
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-green-600">1. Test Routes</h3>
                <p>Use the Route Tester above to check if specific routes are working.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-blue-600">2. Get Debug Info</h3>
                <p>Click the bug icon in bottom-right corner to get debug information.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-purple-600">3. Test Facebook WebView</h3>
                <p>Open this page in Facebook app on iPhone and check if routes work.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-orange-600">4. Copy Debug Info</h3>
                <p>Copy the debug info and send it to developer for analysis.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Common Issues</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-red-500">❌</span>
                <div>
                  <strong>404 Error:</strong> Route not found - check Nginx config
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-500">⚠️</span>
                <div>
                  <strong>Slow Response:</strong> Server overloaded or network issues
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500">ℹ️</span>
                <div>
                  <strong>Facebook WebView:</strong> Limited JavaScript execution
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
