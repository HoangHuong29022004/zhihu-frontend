"use client";

import Link from "next/link";
import { SectionWrapper } from "@/components/common/utils/common";
import ComicItem from "./last-comic-item";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import { usePagination } from "@/hooks/use-pagination";
import ButtonBase from "@/components/common/utils/button/button-base";
import { useEffect, useState } from "react";
import { ILastCompletedComic } from "@/types/comic.type";
import ComicSkeleton from "./comic-skeleton";
import { NoDataBase } from "@/components/common/utils/no-data";
import { getListComics } from "@/services/comic-service";
import { useComicStore } from "@/stores/comic-store";

const LastCompletedComicSection = () => {
  const [listComic, setListComic] = useState<ILastCompletedComic[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const setLastCompletedComic = useComicStore(
    (state) => state.setLastCompletedComic
  );

  const getListComic = async () => {
    try {
      setIsLoading(true);
      const res = await getListComics({ pageNumber: 1, pageSize: 80 });
      if (res && res?.data.length > 0) {
        setListComic(res?.data || []);
        setLastCompletedComic(res?.data);
      }
    } catch (error) {
      console.log("Error when fetching", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getListComic();
  }, []);

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
              Khám phá truyện mới nhất cùng chúng tôi!
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
              <ComicItem
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
        {!isLoading && paginatedData?.length > 0 && (
          <div className="flex justify-center items-center gap-3 mt-5">
            <button
              aria-label="Previous button"
              onClick={() => {
                setPage(currentPage - 1);
              }}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-full border border-primary text-primary grid place-items-center transition-colors ${
                currentPage === 1
                  ? "opacity-30"
                  : "hover:bg-primary hover:text-white"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <p className="text-text-secondary text-base">
              <b className="text-primary">{currentPage}</b>
              <span className="mx-1">/</span>
              <span>{totalPages} trang</span>
            </p>
            <button
              aria-label="Next button"
              onClick={() => {
                setPage(currentPage + 1);
              }}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-full border border-primary text-primary grid place-items-center transition-colors ${
                currentPage === totalPages
                  ? "opacity-30"
                  : "hover:bg-primary hover:text-white"
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </SectionWrapper>
    </section>
  );
};

export default LastCompletedComicSection;
