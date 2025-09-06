"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { ChevronDown, ChevronUp, Facebook, Instagram } from "lucide-react";

const SOCIAL_LINK_ICONS = [
  <Facebook size={18} key={1} />,
  <Instagram size={18} key={2} />,
];

const ScrollDetailsAction = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Hàm sao chép URL hiện tại
  const handleCopyCurrentUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast({
          variant: "default",
          title: "Sao chép đường dẫn thành công!",
        });
      })
      .catch((err) => {
        console.error("Error when copying url: ", err);
      });
  };

  // Hàm kiểm tra vị trí của SocialLinkList so với footer
  const checkPosition = () => {
    const socialLinkList = document.querySelector("#social-link-list");
    const footer = document.querySelector("footer");

    if (socialLinkList && footer) {
      const socialLinkListRect = socialLinkList.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();

      // Kiểm tra nếu SocialLinkList chạm vào footer
      if (socialLinkListRect.bottom >= footerRect.top - 40) {
        setIsVisible(false); // Ẩn SocialLinkList
      } else {
        setIsVisible(true); // Hiển thị SocialLinkList
      }
    }
  };

  // Thêm sự kiện scroll để kiểm tra vị trí
  useEffect(() => {
    window.addEventListener("scroll", checkPosition);
    return () => {
      window.removeEventListener("scroll", checkPosition);
    };
  }, []);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleScrollUp = () => {
    window.scrollBy({ top: -200, behavior: "smooth" });
  };
  const handleScrollDown = () => {
    window.scrollBy({ top: 200, behavior: "smooth" });
  };

  return (
    <div
      ref={sidebarRef}
      id="social-link-list"
      className={` bg-slate-50 shadow-md rounded-full px-2 py-4 fixed left-1/2 -translate-x-[500px] top-1/2 flex flex-col gap-2 text-text-secondary shadow-sm max-lg:hidden transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        className="border flex items-center justify-center rounded-full bg-primary w-10 h-10 text-white outline-none hover:border-primary transition-all hover:scale-110"
        onClick={handleScrollUp}
      >
        <ChevronUp size={24} />
      </button>
      <button
        className="border flex items-center justify-center rounded-full bg-primary w-10 h-10 text-white outline-none hover:border-primary transition-all hover:scale-110"
        onClick={handleScrollDown}
      >
        <ChevronDown size={24} />
      </button>
      {SOCIAL_LINK_ICONS.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-center border rounded-full w-10 h-10 hover:border-primary transition-all hover:scale-110 cursor-pointer bg-white"
          onClick={(e) => {
            e.preventDefault();
            handleCopyCurrentUrl();
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default ScrollDetailsAction;
