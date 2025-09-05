import Link from "next/link";
import Image from "next/image";
import {
  Info,
  Phone,
  Mail,
  HelpCircle,
  BookOpenCheck,
  Flame,
  Star,
  Save,
  Search,
  Bell,
  FacebookIcon,
} from "lucide-react";
import { BoxWrapper } from "@/components/common/utils/common";
import { APP_INFO, CONTACT_INFO } from "@/data/app/app-info";

const links = {
  about: [
    { name: "Giới thiệu", href: "/introduce", icon: Info },
    { name: "Liên hệ", href: "/contact", icon: Phone },
    // { name: "Nội quy đăng truyện", href: "/app-policy", icon: List },
    { name: "Điều khoản sử dụng", href: "/term-condition", icon: Save },
    { name: "Tin tức - Thông báo", href: "/news", icon: Bell },
  ],
  explore: [
    { name: "Tìm tryện", href: "/comic/search", icon: Search },
    {
      name: "Truyện mới",
      href: "/#last-completed-comic-section",
      icon: BookOpenCheck,
    },
    { name: "Truyện hot", href: "/#section-hot-comics", icon: Flame },
    { name: "Truyện đề cử", href: "/#section-top-outstanding", icon: Star },
  ],
  support: [{ name: "Hướng dẫn sử dụng", href: "/", icon: HelpCircle }],
};

const contactInfo = {
  fanPage: CONTACT_INFO.fanPage.primary,
  email: CONTACT_INFO.email.primary,
};

const Footer = () => {
  return (
    <footer className="bg-slate-100 text-text-main border-t border-slate-100">
      <BoxWrapper className="py-8 max-w-[1170px] mx-auto">
        <div className="container mx-auto px-4 text-left">
          {/* Liên kết */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo */}
            <div className="text-left">
              <Link href={"/"}>
                <Image
                  unoptimized
                  src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/app-logo-1.png`}
                  alt={"zhihuComic-logo-img"}
                  width={180}
                  height={60}
                  className={"h-[60px] w-[180px] cursor-pointer rounded-lg"}
                />
              </Link>
              <ul className="space-y-2 mt-3">
                <Link
                  target="_blank"
                  href="https://www.facebook.com/profile.php?id=61576557278518#"
                  className="font-semibold cursor-pointer text-text-secondary hover:text-primary flex items-center gap-2"
                >
                  <FacebookIcon size={16} />
                  {contactInfo.fanPage}
                </Link>
                <p className="font-semibold cursor-pointer text-text-secondary hover:text-primary flex items-center gap-2">
                  <Mail size={16} />
                  {contactInfo.email}
                </p>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-3">Về chúng tôi</h3>
              <ul className="space-y-2">
                {links.about.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="font-semibold text-text-secondary hover:text-primary flex items-center gap-2"
                    >
                      <link.icon size={16} />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-3">Khám phá</h3>
              <ul className="space-y-2">
                {links.explore.map((link, index) => (
                  <li key={index} className="font-semibold text-text-secondary">
                    <Link
                      href={link.href}
                      scroll
                      className="hover:text-primary flex items-center gap-2"
                    >
                      <link.icon size={16} />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-3">Hỗ trợ</h3>
              <ul className="space-y-2">
                {links.support.map((link, index) => (
                  <li key={index} className="font-semibold text-text-secondary">
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      <link.icon size={16} />
                      {link.name}
                    </Link>
                  </li>
                ))}
                <Link
                  target="_blank"
                  href="https://www.facebook.com/profile.php?id=61576557278518#"
                  className="font-semibold cursor-pointer text-text-secondary hover:text-primary flex items-center gap-2"
                >
                  <FacebookIcon size={16} />
                  {contactInfo.fanPage}
                </Link>
                <p className="font-semibold cursor-pointer text-text-secondary hover:text-primary flex items-center gap-2">
                  <Mail size={16} />
                  {contactInfo.email}
                </p>
              </ul>
            </div>
          </div>

          {/* Ứng dụng tải xuống và liên hệ */}
          <div className="mt-6 border-t border-slate-200 pt-6 flex justify-center items-center">
            <p className="text-text-secondary dark:text-white">
              &copy; {new Date().getFullYear()}
              <span className="text-primary font-semibold ml-1">
                {APP_INFO.appName}
              </span>
              . All rights reserved.
            </p>
          </div>
        </div>
      </BoxWrapper>
    </footer>
  );
};

export default Footer;
