"use client";

import { SectionWrapper } from "@/components/common/utils/common";
import { MoveRight } from "lucide-react";
import ButtonBase from "@/components/common/utils/button/button-base";
import { useState } from "react";
import { NoDataBase } from "@/components/common/utils/no-data";
import ComicSkeleton from "./comic-skeleton";
import Link from "next/link";
import { LastCompletedComicItem } from "./";
import { usePagination } from "@/hooks/use-pagination";
import { EXTENDED_DEMO_COMICS } from "@/data/mocks/demo-comics";

const LastCompletedComicSection = () => {
  const [isLoading] = useState<boolean>(false);
  
  // Sử dụng dữ liệu demo tĩnh
  const listComic = EXTENDED_DEMO_COMICS.slice(0, 16);

  const { paginatedData, currentPage, totalPages, setPage } = usePagination({
    data: listComic,
    itemsPerPage: 16,
  });

  return (
    <section id="last-completed-comic-section" className="bg-white">
      <SectionWrapper>
        {/* Header */}
        <div className="flex max-sm:flex-wrap justify-between mb-4 items-center gap-2">
          <div className="mb-4 text-left">
            <h2 className="text-primary font-bold text-2xl">
              Truyện mới cập nhật
            </h2>
            <p className="text-text-secondary mt-1">
              Khám phá truyện mới nhất cùng chúng tôi! (Demo Data)
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
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {Array.from({ length: 16 }).map((_, index) => (
              <ComicSkeleton key={index} />
            ))}
          </div>
        ) : paginatedData?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {paginatedData.map((comic, index) => (
              <LastCompletedComicItem
                key={index}
                data={comic}
                index={index}
                isShowCreatedAt={true}
              />
            ))}
          </div>
        ) : (
          <NoDataBase
            title="Chưa có liệu nào!"
            desc="Rất riết! Hiện tại chưa có dữ liệu!"
            imgSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/no-data.webp`}
            className="py-16"
          />
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <ButtonBase
                variants="outline"
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2"
              >
                Trước
              </ButtonBase>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <ButtonBase
                  key={page}
                  variants={currentPage === page ? "default" : "outline"}
                  onClick={() => setPage(page)}
                  className="px-4 py-2"
                >
                  {page}
                </ButtonBase>
              ))}
              
              <ButtonBase
                variants="outline"
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2"
              >
                Sau
              </ButtonBase>
            </div>
          </div>
        )}
      </SectionWrapper>
    </section>
  );
};

export default LastCompletedComicSection;