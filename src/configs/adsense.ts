export const ADSENSE_CONFIG = {
  // Client ID từ Google AdSense - ĐÃ ĐÚNG
  CLIENT_ID:
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-9429981491740615",

  // Các ad slot IDs - CẦN THAY THẾ BẰNG SLOT IDs THẬT TỪ GOOGLE ADSENSE
  // Hướng dẫn: Vào Google AdSense > Ads > By ad unit > Copy Ad unit ID
  AD_SLOTS: {
    HEADER: process.env.NEXT_PUBLIC_ADSENSE_HEADER_SLOT || "2931872322",
    SIDEBAR: process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || "2191853335",
    CONTENT: process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT || "2730909382",
    FOOTER: process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT || "6679545642",
    IN_ARTICLE: process.env.NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT || "4053382307",
  },

  // Cấu hình cho từng môi trường
  ENVIRONMENTS: {
    LOCAL: {
      enabled: true, // Tắt ads ở local để test
      clientId: "ca-pub-9429981491740615",
    },
    DEMO: {
      enabled: true, // Bật ads ở demo (vercel.app)
      clientId:
        process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-9429981491740615",
    },
    PRODUCTION: {
      enabled: true, // Bật ads ở production
      clientId:
        process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-9429981491740615",
    },
  },
};

// Helper function để kiểm tra môi trường hiện tại
export const getCurrentEnvironment = () => {
  if (typeof window === "undefined") return "LOCAL";

  const hostname = window.location.hostname;

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "LOCAL";
  } else if (hostname.includes("vercel.app")) {
    return "DEMO";
  } else if (hostname === "thanhnhacchau.com") {
    return "PRODUCTION";
  }

  return "LOCAL";
};

// Helper function để kiểm tra xem có nên hiển thị ads không
export const shouldShowAds = () => {
  const env = getCurrentEnvironment();
  return (
    ADSENSE_CONFIG.ENVIRONMENTS[env as keyof typeof ADSENSE_CONFIG.ENVIRONMENTS]
      ?.enabled || false
  );
};
