"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/stores/auth-store";
import {
  ChevronDown,
  CircleUserRound,
  LogInIcon,
  Newspaper,
} from "lucide-react";

import { SeparatorBase } from "../../../common/utils/common";
import { ButtonBase } from "../../../common/utils/button";
import { LoadingSpinner } from "../../../common/utils/loading";
import { INavItem } from "@/data/app/nav-items";
import { useRouter } from "next/navigation";
import { removeAuthCookies } from "@/utils/auth-hanlder";

interface IProps {
  navItems: INavItem[];
}

const HeaderAvatar = ({ navItems }: IProps) => {
  // local states
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // global states and custom hooks
  const handleLogoutAuthStore = useAuthStore((state) => state.logout);

  const user = useAuthStore((state) => state.user);

  // built int hooks
  const router = useRouter();

  // function utils
  const handleLogout = async () => {
    console.log("chay vo day");
    try {
      setIsLoading(true);
      // const res = await sLogout();
      handleLogoutAuthStore();
      removeAuthCookies();

      router.push("/login");
    } catch (error) {
      console.log("Logout failed: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-md:hidden md:flex rounded-full h-10 px-2 items-center gap-1 bg-slate-100 relative cursor-pointer group">
      <div className="w-10 h-10 bg-slate-50 rounded-full grid place-items-center overflow-hidden">
        {user?.avatar ? (
          <Image
            unoptimized
            src={user?.avatar || ""}
            alt="form-auth-img"
            width={28}
            height={28}
            className="size-9 object-cover object-center rounded-full"
          />
        ) : (
          <CircleUserRound className="text-primary" />
        )}
      </div>
      <ChevronDown
        size={18}
        className="text-primary group-hover:rotate-180 transition-transform duration-300"
      />
      {/* Pseudo elements */}
      <div className="absolute top-10 right-0 w-20 h-6 bg-transparent"></div>
      {/* List Sub items */}
      <div className="animationShowPopover bg-white rounded-md shadow absolute top-14 right-0 p-4 w-max hidden group-hover:block transition-all">
        <div className="mb-2 flex gap-4 items-start">
          <div className="size-12 bg-slate-50 rounded-full grid place-items-center overflow-hidden border border-gray-200 shadow-sm">
            {user?.avatar ? (
              <Image
                unoptimized
                src={user?.avatar || ""}
                alt="form-auth-img"
                width={40}
                height={40}
                className="object-cover object-center"
              />
            ) : (
              <CircleUserRound className="text-primary" />
            )}
          </div>
          <div>
            <p className="text-primary font-semibold mb-1">{user?.fullName}</p>
            <p className="text-text-secondary">{user?.email}</p>
          </div>
        </div>
        <SeparatorBase />
        <ul className="max-h-[300px] overflow-y-auto">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`animationShowPopover p-3 bg-slate-100 rounded-md mb-3 min-w-[340px] hover:shadow hover:font-semibold transition-shadow`}
            >
              <Link
                href={item.url}
                className="flex items-center gap-2 text-primary"
              >
                {item.icon ?? <Newspaper size={16} />}
                <span className={`font-medium text-text-secondary`}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <SeparatorBase />
        <ButtonBase className="w-full mt-4" onClick={handleLogout}>
          {isLoading ? (
            <LoadingSpinner type="button" text="Đăng xuất" />
          ) : (
            <div className="flex gap-2 items-center">
              <LogInIcon size={18} /> Đăng xuất
            </div>
          )}
        </ButtonBase>
      </div>
    </div>
  );
};

export default HeaderAvatar;
