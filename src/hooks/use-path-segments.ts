"use client";

import { usePathname } from "next/navigation";

const usePathSegments = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);
  return pathSegments;
};

export default usePathSegments;
