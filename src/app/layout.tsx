import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { APP_INFO } from "@/data/app/app-info";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/providers/query-provider";
import { AdSenseScript } from "@/components/common/adsense";
import { ADSENSE_CONFIG, shouldShowAds } from "@/configs/adsense";
import { AutoOpenBrowser } from "@/components/common/auto-open-browser";
import { FacebookDebug } from "@/components/common/facebook-debug";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${APP_INFO.appName} - Nền tảng đọc truyện ngôn tình online hàng đầu`,
  description: `Đọc truyện chữ, nghe audio truyện, đăng tác phẩm và kiếm thu nhập cùng Thanh Nhạc Châu. Nền tảng dành cho độc giả và người sáng tạo nội dung.`,
  keywords:
    "đọc truyện tranh, manga, manhua, manhwa, truyện tranh online, truyện tranh miễn phí, đọc manga, truyện tranh hot, cập nhật truyện tranh",
  viewport: "width=device-width, initial-scale=1.0, user-scalable=no",
  other: {
    "google-adsense-account": ADSENSE_CONFIG.CLIENT_ID,
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": APP_INFO.appName,
    "msapplication-TileColor": "#F472B6",
    "theme-color": "#F472B6",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9429981491740615"
          crossOrigin="anonymous"
        ></script>
        <meta
          name="google-adsense-account"
          content={ADSENSE_CONFIG.CLIENT_ID}
        />
        {/* Facebook WebView compatibility */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={APP_INFO.appName} />
        <meta name="msapplication-TileColor" content="#F472B6" />
        <meta name="theme-color" content="#F472B6" />
        {/* Facebook Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={APP_INFO.appName} />
        <meta property="og:locale" content="vi_VN" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@thanhnhacchau" />
        
               {/* Facebook WebView Auto Redirect Script */}
               <script
                 dangerouslySetInnerHTML={{
                   __html: `
                     (function() {
                       var userAgent = navigator.userAgent;
                       var isFB = /FBAN|FBAV|FB_IAB|FB4A/i.test(userAgent);
                       
                       if (isFB) {
                         var currentUrl = window.location.href;
                         var hasRedirected = sessionStorage.getItem('fb-redirect-attempted');
                         
                         // Only redirect for non-chapter pages to avoid interfering with chapter loading
                         var isChapterPage = currentUrl.includes('/comic/') && currentUrl.split('/').length >= 5;
                         
                         if (!hasRedirected && !isChapterPage) {
                           sessionStorage.setItem('fb-redirect-attempted', 'true');
                           
                           // Try multiple aggressive redirect methods immediately
                           try {
                             // Method 1: Try window.open first (most reliable)
                             var newWindow = window.open(currentUrl, '_blank', 'noopener,noreferrer');
                             if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
                               // Method 2: Try with different parameters
                               window.open(currentUrl, '_blank');
                             }
                           } catch(e) {
                             // Method 3: Direct location change
                             try {
                               window.location.href = currentUrl;
                             } catch(e2) {
                               // Method 4: Create and click link (fallback)
                               try {
                                 var link = document.createElement('a');
                                 link.href = currentUrl;
                                 link.target = '_blank';
                                 link.rel = 'noopener noreferrer';
                                 link.style.display = 'none';
                                 document.body.appendChild(link);
                                 
                                 // Simulate user click with multiple events
                                 var clickEvent = new MouseEvent('click', {
                                   view: window,
                                   bubbles: true,
                                   cancelable: true
                                 });
                                 link.dispatchEvent(clickEvent);
                                 
                                 setTimeout(function() {
                                   document.body.removeChild(link);
                                 }, 100);
                               } catch(e3) {
                                 // Method 5: location.replace as final fallback
                                 setTimeout(function() {
                                   try {
                                     window.location.replace(currentUrl);
                                   } catch(e4) {}
                                 }, 200);
                               }
                             }
                           }
                         }
                       }
                     })();
                   `,
                 }}
               />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} text-sm`}>
        <AutoOpenBrowser />
        <FacebookDebug />
        <QueryProvider>
          <NextTopLoader
            speed={800}
            showSpinner={false}
            height={2}
            zIndex={5000}
            color="#F472B6"
          />
          {children}
          <Toaster />
        </QueryProvider>

        {shouldShowAds() && <AdSenseScript client={ADSENSE_CONFIG.CLIENT_ID} />}
      </body>
    </html>
  );
}
