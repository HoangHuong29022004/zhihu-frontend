import React from "react";
import { cn } from "@/lib/utils";
import ImageBase from "../../image-base/image-base";

interface NoDataBaseProps {
  title?: string;
  desc?: string;
  imgSrc?: string;
  renderButtonAction?: () => React.ReactNode;
  className?: string;
}

const NoDataBase = ({
  imgSrc,
  desc,
  title,
  renderButtonAction,
  className,
}: NoDataBaseProps) => {
  return (
    <div className={cn("w-full grid place-items-center gap-3", className)}>
      <ImageBase
        src={
          imgSrc || `${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/no-data.webp`
        }
        alt={"no-job-img"}
        width={104}
        height={91}
      />
      <p className="font-semibold">{title || "Osp! Không có dữ liệu!"}</p>
      <p>{desc || "Rất riết! Hiện tại chưa có dữ liệu trong danh sách."}</p>
      {renderButtonAction && renderButtonAction()}
    </div>
  );
};

export default NoDataBase;
