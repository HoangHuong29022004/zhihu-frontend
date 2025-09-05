"use client";

import { cn } from "@/lib/utils";
import { Newspaper } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { INavItem } from "@/data/app/nav-items";

interface INavItemProps {
  data: INavItem;
  variants?: {
    wrapperClassName?: string;
    labelClassName?: string;
  };
}

const NavItem = ({ data, variants }: INavItemProps) => {
  const pathname = usePathname();
  const isActive = (url: string) => pathname === url;

  return (
    <li
      className={cn(
        "text-text-main hover:text-primary hover:font-semibold cursor-pointer relative group text-sm transition-all",
        variants?.wrapperClassName
      )}
    >
      {/* Nav item */}
      <Link href={data.url}>
        <span
          className={cn(
            `font-medium pb-2 ${
              isActive(data.url)
                ? "text-primary font-semibold border-b-[3px] border-primary"
                : ""
            }`,
            variants?.labelClassName
          )}
        >
          {data.label}
        </span>
      </Link>
      {data.subItems && data.subItems.length > 0 && (
        <>
          {/* Pseudo elements */}
          <div className="absolute w-full h-6 opacity-0"></div>
          {/* List Sub items */}
          <ul className="animationShowPopover bg-white rounded-md shadow absolute top-8 -left-3 p-4 w-max hidden group-hover:block transition-all max-h-[400px] overflow-y-auto">
            {data.subItems.map((subItem, index) => (
              <li
                key={index}
                className={`p-3 bg-slate-100 rounded-md mb-3 min-w-[340px] hover:shadow hover:font-semibold transition-shadow ${
                  isActive(subItem.url) ? "bg-primary text-white" : ""
                }`}
              >
                <Link
                  href={subItem.url}
                  className="flex items-center gap-2 text-primary"
                >
                  {subItem.icon ?? <Newspaper size={16} />}
                  <span
                    className={`font-medium text-text-secondary ${
                      isActive(subItem.url) && "font-semibold"
                    }`}
                  >
                    {subItem.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </li>
  );
};

export default NavItem;
