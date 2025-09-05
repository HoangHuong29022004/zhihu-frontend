"use client";

import { useAppStore } from "@/stores/app-store";
import Breadcrumb from "./breadcrumb";
import Notifications from "./notifications";
import { HeaderAvatar } from "@/components/client/header/desktop";
import { ADMIN_NAV_ITEMS } from "@/data/app/nav-items";
import useMediaQuery from "@/hooks/use-screen-size";
import { DropdownMobile } from "@/components/client/header/mobile";

export default function AdminHeader() {
  const isExpandedNavbar = useAppStore((state) => state.isExpandedNavbar);
  const { isMobile } = useMediaQuery();
  return (
    <>
      <header
        className={`bg-white backdrop-blur-extra bg-opacity-85 dark:bg-gray-800 shadow-md fixed top-0 ${
          isExpandedNavbar ? "left-72" : "left-[80px]"
        } right-0 z-10 px-6 h-16 flex justify-between`}
      >
        {!isMobile && <Breadcrumb />}
        <div className="flex max-sm:justify-end max-sm:w-full items-center gap-4">
          <Notifications />
          <HeaderAvatar navItems={ADMIN_NAV_ITEMS} />
          <DropdownMobile navItems={ADMIN_NAV_ITEMS} isAdmin={true} />
        </div>
      </header>
    </>
  );
}
