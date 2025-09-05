import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { APP_INFO } from "@/data/app/app-info";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/providers/query-provider";
import { AdSenseScript } from "@/components/common/adsense";
import { ADSENSE_CONFIG, shouldShowAds } from "@/configs/adsense";

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
  other: {
    "google-adsense-account": ADSENSE_CONFIG.CLIENT_ID,
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
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} text-sm`}>
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
