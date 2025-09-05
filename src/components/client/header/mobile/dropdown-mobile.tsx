"use client";

import {
  AlignJustify,
  ArrowRight,
  CircleUserRound,
  Newspaper,
  PenIcon,
} from "lucide-react";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { ButtonBase } from "@/components/common/utils/button";
import { LoadingSpinner } from "@/components/common/utils/loading";
import { INavItem, NAV_ITEMS } from "@/data/app/nav-items";
import { useAuthStore } from "@/stores/auth-store";
import { removeAuthCookies } from "@/utils/auth-hanlder";

interface IProps {
  navItems: INavItem[];
  isAdmin?: boolean;
}

const DropdownMobile = ({ navItems, isAdmin = false }: IProps) => {
  // local states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // global states and custom hooks
  const handleLogoutAuthStore = useAuthStore((state) => state.logout);

  const user = useAuthStore((state) => state.user);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const isAuth = refreshToken && user;

  // built int hooks
  const router = useRouter();

  // function utils
  // const handleLogout = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await sLogout();
  //     if (res && isSuccessResponse(res?.statusCode)) {
  //       handleLogoutAuthStore();
  //       setIsOpen(false);
  //       router.push("/login");
  //     }
  //   } catch (error) {
  //     console.log("Logout failed: ", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // function utils
  const handleLogout = async () => {
    try {
      setIsLoading(true);
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
    <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <SheetTrigger>
        <div className="max-md:flex md:hidden size-10 bg-slate-100 rounded-full justify-center items-center">
          <AlignJustify size={20} className="text-primary" />
        </div>
      </SheetTrigger>
      <SheetContent className="sm:w-[560px] max:sm:w-[360px] p-3">
        <SheetHeader className="text-left">
          <SheetTitle>Tài khoản</SheetTitle>
        </SheetHeader>

        {isAuth && (
          <div className="bg-slate-100 p-3 rounded-lg mt-2 flex item-start gap-3">
            <div className="size-10 bg-slate-50 rounded-full grid place-items-center overflow-hidden">
              {user?.avatar ? (
                <Image
                  unoptimized
                  src={user?.avatar || ""}
                  alt="user-avatar-img"
                  width={28}
                  height={28}
                  className="object-cover object-center rounded-full"
                />
              ) : (
                <CircleUserRound className="text-primary" />
              )}
            </div>
            <div>
              <p className="text-primary font-semibold mb-1">
                {user?.fullName}
              </p>
              <p className="text-text-secondary">{user?.email}</p>
            </div>
          </div>
        )}

        <Accordion type="single" collapsible className="w-full mt-2">
          {/* user info */}
          {isAuth && (
            <AccordionItem
              value="item-1"
              className="px-3 bg-slate-100 rounded-md"
            >
              <AccordionTrigger className="no-underline">
                Thông tin người dùng
              </AccordionTrigger>
              <AccordionContent>
                <ul className="h-[180px] overflow-y-auto">
                  {navItems.map((item, index) => (
                    <li
                      key={index}
                      className={`animationShowPopover p-3 bg-white rounded-md mb-3 min-w-[340px] hover:shadow hover:font-semibold transition-shadow`}
                      onClick={() => setIsOpen(false)}
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
              </AccordionContent>
            </AccordionItem>
          )}

          {/* jobs */}
          {!isAdmin && (
            <>
              <AccordionItem
                value={`${isAuth ? "item-2" : "item-1"}`}
                className="px-3 bg-slate-100 rounded-md mt-2"
              >
                <AccordionTrigger className="no-underline">
                  {NAV_ITEMS[0].label}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="h-[180px] overflow-y-auto">
                    {NAV_ITEMS[0]?.subItems?.map((item, index) => (
                      <li
                        key={index}
                        className={`animationShowPopover p-3 bg-white rounded-md mb-3 min-w-[340px] hover:shadow hover:font-semibold transition-shadow`}
                        onClick={() => setIsOpen(false)}
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
                </AccordionContent>
              </AccordionItem>

              {/* company */}
              <AccordionItem
                value={`${isAuth ? "item-3" : "item-2"}`}
                className="px-3 bg-slate-100 rounded-md mt-2"
              >
                <AccordionTrigger className="no-underline">
                  {NAV_ITEMS[1].label}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="h-[180px] overflow-y-auto">
                    {NAV_ITEMS[1]?.subItems?.map((item, index) => (
                      <li
                        key={index}
                        className={`animationShowPopover p-3 bg-white rounded-md mb-3 min-w-[340px] hover:shadow hover:font-semibold transition-shadow`}
                        onClick={() => setIsOpen(false)}
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
                </AccordionContent>
              </AccordionItem>

              {/* blog */}
              <AccordionItem
                value={`${isAuth ? "item-4" : "item-3"}`}
                className="px-3 bg-slate-100 rounded-md mt-2"
              >
                <AccordionTrigger className="no-underline">
                  {NAV_ITEMS[2].label}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="h-[180px] overflow-y-auto">
                    {NAV_ITEMS[2]?.subItems?.map((item, index) => (
                      <li
                        key={index}
                        className={`animationShowPopover p-3 bg-white rounded-md mb-3 min-w-[340px] hover:shadow hover:font-semibold transition-shadow`}
                        onClick={() => setIsOpen(false)}
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
                </AccordionContent>
              </AccordionItem>
            </>
          )}
        </Accordion>

        {/* Logout */}
        {isAuth ? (
          <>
            {user?.role === "Admin" && !isAdmin && (
              <Link href="/admin/comic" className="mt-2">
                <ButtonBase className="w-full mt-4" variants="outline">
                  <p className="flex items-center font-semibold hover:text-primary gap-1">
                    <ArrowRight size={18} className="mt-1" />
                    <span>Đến trang quản trị?</span>
                  </p>
                </ButtonBase>
              </Link>
            )}
            <ButtonBase className="w-full mt-4" onClick={handleLogout}>
              {isLoading ? (
                <LoadingSpinner type="button" text="Đăng xuất" />
              ) : (
                <div className="flex gap-2 items-center">
                  <ArrowRight size={18} />
                  Đăng xuất
                </div>
              )}
            </ButtonBase>
          </>
        ) : (
          <>
            <div className="flex gap-3 mt-4 mb-2">
              <Link href={"/login"} className="w-1/2">
                <ButtonBase className="w-full">Đăng nhập</ButtonBase>
              </Link>
              <Link href={"/register"} className="w-1/2">
                <ButtonBase variants="outline" className="w-full">
                  Đăng ký
                </ButtonBase>
              </Link>
            </div>
            <Link href={"/login"} className="w-full">
              <ButtonBase variants="accent" className="w-full">
                <PenIcon size={16} className="mr-1" />
                Đăng truyện
              </ButtonBase>
            </Link>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default DropdownMobile;
