import LeftIntro from "@/components/client/left-intro/left-intro";
import { APP_INFO } from "@/data/app/app-info";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white dark:bg-slate-900 w-full h-screen grid grid-cols-12 relative">
      <Link
        href={"/"}
        className=" text-white absolute top-6 left-6 flex items-center justify-center gap-2 font-semibold bg-primary rounded-full h-10 w-10 transition duration-200 ease-in-out shadow-sm hover:shadow-md hover:bg-primary-dark"
      >
        <Undo2 size={20} />
      </Link>
      <div className="flex-1 p-4 flex justify-center items-center max-md:col-span-12 md:col-span-7">
        {children}
      </div>
      <LeftIntro
        description={`${APP_INFO.appName} - Hệ sinh thái truyên tranh hàng đầu cho các đọc giả!`}
      />
    </div>
  );
};

export default AuthLayout;
