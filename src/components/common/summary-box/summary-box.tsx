import { cn } from "@/lib/utils";
import { Users } from "lucide-react";
import React from "react";

interface IProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  bgColor?: string;
  className?: string;
  valueClassName?: string;
}

const SummaryBox = ({
  title,
  value,
  icon,
  bgColor = "bg-primary",
  className,
  valueClassName,
}: IProps) => {
  return (
    <div
      className={cn(
        "flex rounded-xl bg-white sm:h-28 max-sm:h-20 sm:min-w-60 max-sm:w-full shadow-md border hover:shadow-xl transition-all",
        className
      )}
    >
      <div
        className={`${bgColor} rounded-l-xl flex items-center justify-center text-white w-20`}
      >
        {icon ? icon : <Users size={30} />}
      </div>
      <div className="flex flex-col justify-center px-6 gap-1 text-text-secondary">
        <p className="text-sm font-semibold">{title || "Số lượng"}</p>
        <p
          className={cn("max-sm:text-lg sm:text-4xl font-bold", valueClassName)}
        >
          {value || 0}
        </p>
      </div>
    </div>
  );
};

export default SummaryBox;
