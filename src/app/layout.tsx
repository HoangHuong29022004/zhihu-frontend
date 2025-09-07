import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { APP_INFO } from "@/data/app/app-info";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/providers/query-provider";
import { AdSenseScript } from "@/components/common/adsense";
import { ADSENSE_CONFIG, shouldShowAds } from "@/configs/adsense";
// import { FacebookDebug } from "@/components/common/facebook-debug";

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
        
        {/* Simple Facebook WebView Redirect */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var ua = navigator.userAgent;
                if (/FBAN|FBAV|FB_IAB|FB4A/i.test(ua)) {
                  var url = window.location.href;
                  // Try multiple methods
                  try {
                    window.open(url, '_blank');
                  } catch(e) {}
                  
                  try {
                    window.location.href = url;
                  } catch(e) {}
                  
                  try {
                    window.location.replace(url);
                  } catch(e) {}
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} text-sm`}>
        {/* <FacebookDebug /> */}
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
