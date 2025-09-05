import { cn } from "@/lib/utils";
import React from "react";

interface ISeparatorProps {
  className?: string;
  type?: "horizontal" | "vertical";
}
const SeparatorBase = ({
  className = "",
  type = "horizontal",
}: ISeparatorProps) => {
  const styles =
    type === "horizontal"
      ? "w-full h-[1px] my-4"
      : "w-[1px] h-8 bg-gray-100 mx-2";
  return <div className={cn(`bg-gray-100 ${styles}`, className)}></div>;
};

export default SeparatorBase;
