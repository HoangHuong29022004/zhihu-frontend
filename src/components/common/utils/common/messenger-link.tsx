import { MessageCircleMore, Bell, ListCollapse } from "lucide-react";
import Link from "next/link";
import React from "react";

const AppSupportGroup = () => {
  const buttons = [
    {
      href: "/notification",
      icon: <Bell size={22} />,
      title: "Thông báo",
    },
    {
      href: "/user/manage-mission",
      icon: <ListCollapse size={22} />,
      title: "Nhiệm vụ",
    },
    {
      href: "https://www.facebook.com/profile.php?id=61576557278518#",
      icon: <MessageCircleMore size={22} />,
      title: "Hỗ trợ qua Messenger",
      target: "_blank",
    },
  ];

  const buttonStyle =
    "flex w-10 h-10 items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:scale-110 bg-primary-active text-primary";

  return (
    <div className="fixed bottom-20 right-6 z-[90] flex flex-col gap-2">
      {buttons.map((button, index) => (
        <Link
          key={index}
          href={button.href}
          target={button.target}
          className={`${buttonStyle}`}
          title={button.title}
        >
          {button.icon}
        </Link>
      ))}
    </div>
  );
};

export default AppSupportGroup;
