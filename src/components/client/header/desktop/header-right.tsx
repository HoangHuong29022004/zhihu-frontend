"use client";
import React from "react";
import Link from "next/link";

import HeaderRecruit from "./header-recruit";
import HeaderAvatar from "./header-avatar";
import { SeparatorBase } from "../../../common/utils/common";
import { ButtonBase } from "../../../common/utils/button";
import { useAuthStore } from "@/stores/auth-store";
import { DropdownMobile } from "../mobile";
import { USER_NAV_ITEMS } from "@/data/app/nav-items";
import { PenIcon } from "lucide-react";

const HeaderRight = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const refetchToken = useAuthStore((state) => state.refreshToken);
  const isAuthorized = accessToken && refetchToken;

  return (
    <div className="flex items-center gap-3">
      {isAuthorized ? (
        <>
          {/* Recruit */}
          <HeaderRecruit />

          <SeparatorBase
            type="vertical"
            className="max-md:hidden md:block max-lg:mx-0"
          />

          {/* Notifications */}
          {/* <HeaderNotification /> */}

          {/* User avatar */}
          <HeaderAvatar navItems={USER_NAV_ITEMS} />
        </>
      ) : (
        <div className="max-md:hidden md:flex gap-3">
          <Link href={"/login"}>
            <ButtonBase>Đăng nhập</ButtonBase>
          </Link>
          <Link href={"/register"}>
            <ButtonBase variants="outline">Đăng ký</ButtonBase>
          </Link>
          <Link href={"/login"}>
            <ButtonBase variants="accent">
              <PenIcon size={16} className="mr-1" />
              Đăng truyện
            </ButtonBase>
          </Link>
        </div>
      )}
      <DropdownMobile navItems={USER_NAV_ITEMS} />
    </div>
  );
};

export default HeaderRight;
