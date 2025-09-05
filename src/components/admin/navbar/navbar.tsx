"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ADMIN_NAV_ITEMS } from "@/data/app/admin-nav-items";
import AdminNavbarToggle from "./navbar-toggle";
import AdminNavbarHeader from "./navbar-header";
import AdminNavItem from "./nav-item";
import ButtonBase from "@/components/common/utils/button/button-base";
import { Rocket } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import useMediaQuery from "@/hooks/use-screen-size";

export default function AdminNavbar() {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const pathname = usePathname();
  const { isMobile } = useMediaQuery();

  const isExpandedNavbar = useAppStore((state) => state.isExpandedNavbar);
  const toggleNavbar = useAppStore((state) => state.toggleNavbar);

  useEffect(() => {
    if (isMobile && isExpandedNavbar) {
      toggleNavbar();
    }
  }, [isMobile, isExpandedNavbar, toggleNavbar]);

  const toggleSubmenu = (path: string) =>
    setActiveSubmenu((prev) => (prev === path ? null : path));
  const handleItemClick = (path: string) => setActiveItem(path);

  useEffect(() => {
    const activeNavItem = ADMIN_NAV_ITEMS.find((item) =>
      pathname.startsWith(item.path)
    );
    setActiveItem(
      activeNavItem ? activeNavItem.path : ADMIN_NAV_ITEMS[0]?.path
    );
  }, [pathname]);

  return (
    <div
      className={cn(
        "flex flex-col py-6 bg-white border-r transition-all duration-300 h-screen",
        isExpandedNavbar ? "w-72" : "max-sm:w-16 sm:w-20"
      )}
    >
      <AdminNavbarHeader isExpanded={isExpandedNavbar} />
      <div className="flex-1 overflow-auto py-2 max-sm:p-0.5 sm:px-2">
        <AdminNavbarToggle
          isExpanded={isExpandedNavbar}
          onToggle={toggleNavbar}
        />
        <nav>
          <ul className="space-y-1 max-sm:p-0.5 sm:px-2 max-sm:text-center">
            {ADMIN_NAV_ITEMS.map((item, index) => (
              <AdminNavItem
                key={index}
                item={item}
                isExpanded={isExpandedNavbar}
                isActive={activeItem === item.path}
                activeSubmenu={activeSubmenu}
                onItemClick={handleItemClick}
                onSubmenuToggle={toggleSubmenu}
              />
            ))}
          </ul>
          <div
            className={`w-full text-center flex flex-col justify-center rounded-2xl gap-4 mt-4 bg-slate-50 p-4 ${
              !isExpandedNavbar && "hidden"
            }`}
          >
            <p className="text-text-secondary">
              Leading our team with more apps development
            </p>
            <ButtonBase icon={<Rocket className="h-4 w-4" />}>
              Explore more
            </ButtonBase>
          </div>
        </nav>
      </div>
    </div>
  );
}
