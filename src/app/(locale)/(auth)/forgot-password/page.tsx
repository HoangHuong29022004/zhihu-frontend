import { Metadata } from "next";

import { APP_INFO } from "@/data/app/app-info";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: `Quên mật khẩu tại ${APP_INFO.appName} - Nền tảng tìm việc làm nhanh chống, chất lượng hàng đầu.`,
  description: `Hãy đăng nhập tài khoản cùng ${APP_INFO.appName} để tạo CV online & kết nối miễn phí trên ngay hôm nay để tiếp cận 10.000+ cơ hội việc làm được kết nối thành công trên ${APP_INFO.appName} mỗi ngày.`,
  keywords:
    "Tìm việc làm, cv, ứng tuyển, tuyển dụng, việc làm nổi bậc, curriculum vitae, resume, create cv, write cv",
};

const ForgotPasswordPage = () => {
  return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
