import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ITopCategoryItemProps {
  data: {
    name: string;
    image: string;
    count: number;
  };
  index: number;
}

const TopCategoryItem = ({ data, index }: ITopCategoryItemProps) => {
  return (
    <div
      className={cn(
        "group relative bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer transition-transform transform hover:scale-105 animationShowItem"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Hình ảnh */}
      <div className="relative w-full h-40">
        <Image
          unoptimized
          src={data.image}
          alt={data.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Nội dung */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
          {data.name}
        </h3>
        <p className="text-sm text-gray-500">{data.count} truyện</p>
      </div>

      {/* Hiệu ứng hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-white text-lg font-semibold">{data.name}</p>
      </div>
    </div>
  );
};

export default TopCategoryItem;
