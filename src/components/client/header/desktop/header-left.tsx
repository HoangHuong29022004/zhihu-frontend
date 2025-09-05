
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { NAV_ITEMS } from "@/data/app/nav-items";
import { NavItem } from "../../../common/utils/common";

const HeaderLeft = () => {
  return (
    <div className="flex items-center gap-6">
      <Link href={"/"} className="h-full py-2">
        <Image
          unoptimized
          src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/app-logo-1.png`}
          alt={"ZhihuComic-logo-img"}
          width={180}
          height={96}
          className={"h-full cursor-pointer"}
        />
      </Link>
      <ul className="max-md:hidden md:flex items-center gap-6">
        {NAV_ITEMS.map((item, index: number) => (
          <NavItem key={index} data={item} />
        ))}
      </ul>
    </div>
  );
};

export default HeaderLeft;
