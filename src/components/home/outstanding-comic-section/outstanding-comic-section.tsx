"use client";

import { SectionWrapper } from "@/components/common/utils/common";
import { MoveRight } from "lucide-react";
import ButtonBase from "@/components/common/utils/button/button-base";
import { useState } from "react";
import { NoDataBase } from "@/components/common/utils/no-data";
import ComicSkeleton from "../last-comic-section/comic-skeleton";
import Link from "next/link";
import { LastCompletedComicItem } from "../last-comic-section";
import { EXTENDED_DEMO_COMICS } from "@/data/mocks/demo-comics";

const OutstandingComicSection = () => {
  const [isLoading] = useState<boolean>(false);
  
  // Sử dụng dữ liệu demo tĩnh - lấy 16 items khác
  const listComic = EXTENDED_DEMO_COMICS.slice(8, 24);

  return (
    <section ref={ref} id="section-top-outstanding">
      <SectionWrapper>
        {/* Header */}
        <div className="flex max-sm:flex-wrap justify-between mb-4 items-center gap-2">
          <div className="mb-4 text-left">
            <h2 className="text-primary font-bold text-2xl">
              Truyện được đề cử
            </h2>
            <p className="text-text-secondary mt-1">
              Danh sách truyện được đề cử! (Demo Data)
            </p>
          </div>
          <ButtonBase variants="outline" className="gap-2 max-sm:w-full">
            <Link href={"/comic/search"} className="flex items-center gap-2">
              <MoveRight /> Xem tất cả
            </Link>
          </ButtonBase>
        </div>

        {/* Comic Grid */}
        {isLoading ? (
          // Show skeleton loading
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {Array.from({ length: 16 }).map((_, index) => (
              <ComicSkeleton key={index} />
            ))}
          </div>
        ) : listComic?.length > 0 ? (
          // Show actual data
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {listComic.map((comic, index) => (
              <LastCompletedComicItem
                key={index}
                data={comic}
                index={index}
                isShowCreatedAt={index > 2 && true}
                isShowOutstanding={true}
              />
            ))}
          </div>
        ) : (
          // Show empty state
          <NoDataBase
            title="Chưa có liệu nào!"
            desc="Rất riết! Hiện tại chưa có dữ liệu!"
            imgSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/no-data.webp`}
            className="py-16"
          />
        )}
      </SectionWrapper>
    </section>
  );
};

export default OutstandingComicSection;