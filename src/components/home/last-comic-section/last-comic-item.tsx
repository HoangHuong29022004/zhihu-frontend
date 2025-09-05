import { Clock9, BookOpenCheck, Eye, StarIcon, Award } from "lucide-react";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ButtonBase from "@/components/common/utils/button/button-base";
import { ILastCompletedComic } from "@/types/comic.type";
import { renderTimeCreatedAt } from "@/utils/time-handler";
import ImageBase from "@/components/common/image-base/image-base";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface IProps {
  data: ILastCompletedComic;
  className?: string;
  index: number;
  isShowCategory?: boolean;
  isShowCreatedAt?: boolean;
  isShowOutstanding?: boolean;
  isShowHot?: boolean;
}

const LastCompletedComicItem = ({
  data,
  className,
  index,
  isShowCategory = false,
  isShowCreatedAt = false,
  isShowOutstanding = false,
  isShowHot = false,
}: IProps) => {
  return (
    <Link
      href={`/comic/${data?.slug}`}
      className={cn(
        `animationShowItem bg-white shadow-xl border border-transparent hover:shadow-lg rounded-tr-[32px] cursor-pointer transition-all hover:border-primary relative group hover:-translate-y-1 hover:scale-[1.2]`,
        className,
        "hover:scale-[1.2]"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {data.status === "COMPLETED" && (
        <Image
          src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/full_tag.png`}
          alt={data.title}
          width={200}
          height={300}
          className="w-[34px] h-[46px] absolute -left-[7px] bottom-20 z-30"
        />
      )}

      <div className="relative overflow-hidden rounded-none bg-slate-50 rounded-tr-[32px]">
        {/* Hình ảnh */}
        <ImageBase
          src={data.thumbnail}
          alt={data.title}
          width={200}
          height={300}
          className="w-full lg:h-[154px] sm:h-[220px] max-sm:h-[200px] object-cover object-left-top transition-transform duration-300 group-hover:scale-110 group-hover:object-cover"
        />
        {isShowHot && index <= 2 && (
          <p
            className={`absolute top-0 rounded-br-2xl left-0 ${
              index >= 0 && index <= 2 ? "bg-red-400" : "bg-primary"
            } text-white text-xs flex items-center gap-1 px-2 py-1.5`}
          >
            <Award size={14} />
            <span className="font-semibold">Top {index + 1}</span>
          </p>
        )}
        {isShowOutstanding && index <= 2 && (
          <p
            className={`absolute top-0 rounded-br-2xl left-0 ${
              index >= 0 && index <= 2 ? "bg-red-400" : "bg-primary-dark"
            } text-white text-xs flex items-center gap-1 px-2 py-1.5`}
          >
            <StarIcon size={14} />
            <span className="font-semibold">Đề cử {index + 1}</span>
          </p>
        )}
        {isShowCreatedAt && data.createdAt && (
          <p className="absolute top-0 rounded-br-2xl left-0 bg-primary text-white text-[11px] flex items-center gap-1 px-2 py-0.5">
            <Clock9 size={14} />
            <span className="font-semibold">
              {renderTimeCreatedAt(data.createdAt)}
            </span>
          </p>
        )}
        {isShowCategory && (
          <div className="absolute bottom-2 left-2 flex gap-1 flex-wrap z-10">
            {data.categories.slice(0, 2).map((item, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-black/60 text-white text-[11px] py-0"
              >
                {item.name}
              </Badge>
            ))}
            {data.categories.length > 2 && <span>...</span>}
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md z-40">
          <ButtonBase className="px-4 py-2 text-sm" size="sm">
            Đọc ngay
          </ButtonBase>
        </div>
      </div>
      <div className="text-left px-3 pb-3 pt-2">
        {/* Tiêu đề */}
        <h3 className="text-xs font-semibold line-clamp-1 mb-1">
          {data.title}
        </h3>
        {/* Tác giả */}
        {/* <p className="text-xs text-text-secondary mb-2 line-clamp-1">
          {data.authorName}
        </p> */}
        <div className="flex gap-1.5 items-center">
          <p className="text-xs text-text-secondary flex items-center gap-1 font-semibold">
            <BookOpenCheck size={16} />
            <span>{data.totalChapters}</span>
          </p>
          {!isShowOutstanding ? (
            <p className="text-xs text-text-secondary flex items-end gap-1 font-semibold">
              <Eye size={16} />
              <span>{data.totalViews}</span>
            </p>
          ) : (
            <span className="text-xs text-text-secondary flex items-center gap-1 font-semibold">
              <StarIcon size={16} className="text-yellow-500" />
              {data.totalOutstandings}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default LastCompletedComicItem;
