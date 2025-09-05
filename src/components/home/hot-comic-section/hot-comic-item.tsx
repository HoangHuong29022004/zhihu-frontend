import { BookOpenCheck, Eye, Award } from "lucide-react";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ButtonBase from "@/components/common/utils/button/button-base";
import { ILastCompletedComic } from "@/types/comic.type";
import ImageBase from "@/components/common/image-base/image-base";
// import { Badge } from "@/components/ui/badge";

interface IProps {
  data: ILastCompletedComic;
  className?: string;
  index: number;
}

const HotComicItem = ({ data, className, index }: IProps) => {
  return (
    <Link
      href={`/comic/${data?.slug}?hot=${index}`}
      className={cn(
        `animationShowItem bg-white shadow-xl border overflow-hidden border-transparent hover:shadow-lg rounded-tr-[32px] cursor-pointer transition-all hover:border-primary relative group hover:-translate-y-1 hover:scale-[1.2]`,
        className,
        "hover:scale-[1.2]" // Ensure this is applied last
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative overflow-hidden rounded-none">
        {/* Hình ảnh */}
        <ImageBase
          src={data?.thumbnail || ""}
          alt={data.title}
          width={200}
          height={300}
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {index <= 2 && (
          <p
            className={`absolute top-0 rounded-br-2xl left-0 ${
              index >= 0 && index <= 2 ? "bg-red-400" : "bg-primary"
            } text-white text-xs flex items-center gap-1 px-2 py-1.5`}
          >
            <Award size={14} />
            <span className="font-semibold">Top {index + 1}</span>
          </p>
        )}
        {/* <div className="absolute bottom-2 left-2">
          <Badge variant="secondary" className="bg-black/60 text-white">
            {data.category}
          </Badge>
        </div> */}

        {/* <p className="absolute bottom-2 rounded-br-2xl left-2 bg-accent text-white text-xs flex items-center gap-1 px-2 py-1.5">
          <Clock9 size={14} />
          <span className="font-semibold">{data.createdAt}</span>
        </p> */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
          <ButtonBase className="px-4 py-2 text-sm" size="sm">
            Đọc truyện
          </ButtonBase>
        </div>
      </div>
      <div className="text-left p-3">
        {/* Tiêu đề */}
        <h3 className="text-sm font-semibold line-clamp-1 mb-1">
          {data.title}
        </h3>
        {/* Tác giả */}
        <p className="text-xs text-text-secondary mb-2 line-clamp-1">
          {data.authorName}
        </p>
        <div className="flex justify-between">
          <p className="text-xs text-text-secondary flex items-center gap-2 font-semibold">
            <BookOpenCheck size={16} />
            <span>{data.totalChapters} chapter</span>
          </p>
          <p className="text-xs text-text-secondary flex items-end gap-1 font-semibold">
            <Eye size={16} />
            <span>{data.totalViews}</span>
          </p>
        </div>
        {/* Thể loại */}
      </div>
    </Link>
  );
};

export default HotComicItem;
