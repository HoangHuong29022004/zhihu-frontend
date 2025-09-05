import { Metadata } from "next";

import { APP_INFO } from "@/data/app/app-info";
import NewPasswordForm from "@/components/auth/new-password-form";
import { ADSENSE_CONFIG } from "@/configs/adsense";

export const metadata: Metadata = {
  title: `Quên mật khẩu cùng ${APP_INFO.appName} - Nền tảng đọc truyện tranh online hàng đầu`,
  description: `Đọc truyện chữ, nghe audio truyện, đăng tác phẩm và kiếm thu nhập cùng Thanh Nhạc Châu. Nền tảng dành cho độc giả và người sáng tạo nội dung.`,
  keywords:
    "đọc truyện tranh, manga, manhua, manhwa, truyện tranh online, truyện tranh miễn phí, đọc manga, truyện tranh hot, cập nhật truyện tranh",
  other: {
    "google-adsense-account": ADSENSE_CONFIG.CLIENT_ID,
  },
};

const NewPasswordPage = () => {
  return <NewPasswordForm />;
};

export default NewPasswordPage;
