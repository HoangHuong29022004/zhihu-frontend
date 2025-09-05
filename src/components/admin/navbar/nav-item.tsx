"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { IAdminNavItem } from "@/data/app/admin-nav-items";
import { usePathname } from "next/navigation";

interface IProps {
  item: IAdminNavItem;
  isExpanded: boolean;
  isActive: boolean;
  activeSubmenu: string | null;
  onItemClick: (path: string) => void;
  onSubmenuToggle: (path: string) => void;
}

export default function AdminNavItem({
  item,
  isExpanded,
  isActive,
  activeSubmenu,
  onItemClick,
  onSubmenuToggle,
}: IProps) {
  const pathname = usePathname();

  // Handle click on main item
  const handleMainItemClick = (e: React.MouseEvent) => {
    if (item.subItems && item.subItems.length > 0) {
      e.preventDefault();
      onSubmenuToggle(item.path);
      // If submenu is not active, activate first subitem
      if (activeSubmenu !== item.path && item.subItems.length > 0) {
        onItemClick(item.subItems[0].path);
      }
    } else {
      onItemClick(item.path);
    }
  };

  // Check if any subitem is active
  const isSubItemActive = item.subItems?.some(
    (subItem) => subItem.path === pathname
  );

  return (
    <li>
      <Link
        href={item.subItems && item.subItems.length > 0 ? "#" : item.path}
        onClick={handleMainItemClick}
        className={cn(
          "flex items-center justify-between p-3 rounded-lg transition-colors group",
          isExpanded ? "w-full" : "flex-col items-center",
          isActive || isSubItemActive
            ? "bg-primary-active text-primary-foreground"
            : "hover:bg-slate-100 text-foreground"
        )}
      >
        <div className={cn("flex items-center", !isExpanded && "flex-col")}>
          <div
            className={cn(
              "flex items-center w-5 h-5 text-text-secondary mr-3",
              (isActive || isSubItemActive) && "text-primary"
            )}
          >
            {item.icon}
          </div>
          {isExpanded && (
            <span
              className={cn(
                "font-semibold",
                (isActive || isSubItemActive) && "font-bold text-primary"
              )}
            >
              {item.title}
            </span>
          )}
        </div>
        {item.subItems && item.subItems.length > 0 && isExpanded && (
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSubmenuToggle(item.path);
            }}
            className={cn(
              "cursor-pointer transition-transform duration-200",
              isActive || isSubItemActive ? "text-primary" : "text-foreground",
              activeSubmenu === item.path && "rotate-180"
            )}
          >
            <ChevronDown className="h-4 w-4" />
          </span>
        )}
      </Link>
      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          activeSubmenu === item.path && item.subItems && isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <ul className="ml-4 mt-2 space-y-1">
            {item.subItems?.map((subItem) => (
              <li key={subItem.path}>
                <Link
                  href={subItem.path}
                  onClick={() => onItemClick(subItem.path)}
                  className={cn(
                    "flex items-center p-3 rounded-md transition-colors duration-200",
                    pathname === subItem.path
                      ? "bg-primary-active text-primary"
                      : "hover:bg-slate-100"
                  )}
                >
                  <div
                    className={cn(
                      "mr-3 w-5 h-5 transition-colors duration-200",
                      pathname === subItem.path
                        ? "text-primary"
                        : "text-text-secondary"
                    )}
                  >
                    {subItem.icon}
                  </div>
                  <span
                    className={cn(
                      "transition-all duration-200",
                      pathname === subItem.path && "font-semibold"
                    )}
                  >
                    {subItem.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
