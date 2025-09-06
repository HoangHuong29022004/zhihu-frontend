"use client";

import { SectionWrapper } from "@/components/common/utils/common";
import { MoveRight } from "lucide-react";
import ButtonBase from "@/components/common/utils/button/button-base";
import { useEffect, useState } from "react";
import { ILastCompletedComic } from "@/types/comic.type";
import { getHotComics } from "@/services/comic-service";
import { isSuccessResponse } from "@/utils/api-handler";
import { NoDataBase } from "@/components/common/utils/no-data";
import ComicSkeleton from "../last-comic-section/comic-skeleton";
import Link from "next/link";
import { LastCompletedComicItem } from "../last-comic-section";
import { useOnScreen } from "@/hooks/use-on-screen";

const HotComicSection = () => {
  const [listComic, setListComic] = useState<ILastCompletedComic[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  const { ref, isVisible } = useOnScreen<HTMLElement>();

  const getListComic = async () => {
    try {
      setIsLoading(true);
      const res = await getHotComics({ pageNumber: 1, pageSize: 36 });
      if (res && isSuccessResponse(res?.statusCode, res?.success)) {
        setListComic(res?.data.data || []);
      }
    } catch (error) {
      console.log("Error when fetching", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible && !hasLoaded) {
      setHasLoaded(true);
      getListComic();
    }
  }, [isVisible, hasLoaded]);

  return (
    <section ref={ref} id="section-hot-comics" className="bg-slate-100">
      <SectionWrapper>
        {/* Header */}
        <div className="flex max-sm:flex-wrap justify-between mb-4 items-center gap-2">
          <div className="mb-4 text-left">
            <h2 className="text-primary font-bold text-2xl">
              Top truyện hấp dẫn nhất
            </h2>
            <p className="text-text-secondary mt-1">
              Truyện đang được đọc nhiều nhất!
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
            {listComic.slice(0, 16)?.map((comic, index) => (
              <LastCompletedComicItem
                key={index}
                data={comic}
                index={index}
                isShowCreatedAt={index > 2 && true}
                isShowHot={true}
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

export default HotComicSection;
