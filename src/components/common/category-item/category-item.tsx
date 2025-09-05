"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { ICategoryItem } from "@/types/category.type";
import { CheckIcon } from "lucide-react";

interface ICategoryItemProps {
  category: ICategoryItem;
  isActive: boolean;
  onClick: (category: ICategoryItem) => void;
}

const CategoryItem: React.FC<ICategoryItemProps> = ({
  category,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick(category)}
      className={cn(
        "px-4 h-[32px] leading-[32px] rounded-full text-sm font-medium transition-all duration-200 hover:shadow-xl shadow-md flex items-center gap-1",
        isActive
          ? "bg-primary text-white shadow-md"
          : "bg-gray-100 text-text-secondary hover:bg-gray-200"
      )}
    >
      {isActive && <CheckIcon className="text-white font-bold" size={16} />}
      {category.name}
    </button>
  );
};

export default CategoryItem;
