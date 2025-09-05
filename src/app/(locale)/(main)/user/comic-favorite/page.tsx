/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Eye, BookOpen, Clock9, PlayIcon, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ILastCompletedComic } from "@/types/comic.type";
import { renderTimeCreatedAt } from "@/utils/time-handler";
import ButtonBase from "@/components/common/utils/button/button-base";
import ImageBase from "@/components/common/image-base/image-base";
import { DEFAULT_PAGE_NUMBER } from "@/data/constants/global";
import Pagination from "@/components/common/pagination/pagination";
import { ComicSkeleton } from "@/components/home/last-comic-section";
import { NoDataBase } from "@/components/common/utils/no-data";
import { DotLoader } from "@/components/common/utils/loading";
import { getAccessToken } from "@/utils/api-handler";
import { useGetFavorites } from "@/queries/favorites.query";
import DeleteFavorite from "./delete-favorite";
import { useComicStore } from "@/stores/comic-store";
import { Badge } from "@/components/ui/badge";
import { renderComicStatus } from "@/utils/styling-handler";

const ComicCard: React.FC<{ comic: ILastCompletedComic }> = ({ comic }) => {
  const [deletedItem, setDeletedItem] = useState<any>(null);

  const handleDelete = () => {
    setDeletedItem({
      id: comic.id,
    });
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
        <div className="relative">
          <ImageBase
            src={comic?.thumbnail || ""}
            alt={comic.title}
            width={200}
            height={300}
            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-2 left-2 flex gap-1 flex-wrap z-10">
            {comic.categories.map((item, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-black/60 text-white"
              >
                {item.name}
              </Badge>
            ))}
          </div>
          <div className="absolute inset-0 flex gap-1 items-center justify-center group-hover:scale-110 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md z-20">
            <ButtonBase
              className="px-4 py-2 text-sm"
              size="sm"
              variants="accent"
              onClick={handleDelete}
            >
              Xóa truyện
            </ButtonBase>
          </div>
        </div>
        <CardContent className="p-4">
          <Link
            href={`/comic/${comic?.slug}`}
            className="font-semibold text-base line-clamp-1 mb-2"
          >
            {comic.title}
          </Link>
          <div className="flex w-full items-center justify-between text-xs mb-2">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <BookOpen size={14} />
              <span>{comic.totalChapters}</span>
            </div>
            {renderComicStatus(comic.status, "mx-0")}
          </div>
          <div className="flex items-end justify-between text-xs mb-3">
            <div className="flex items-center space-x-1">
              <Clock9 size={14} />
              <span>{renderTimeCreatedAt(comic.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye size={14} />
              <span>{comic.totalViews}</span>
            </div>
          </div>
          <Link href={`/comic/${comic?.slug}`} className="w-full">
            <ButtonBase
              size="sm"
              className="w-full flex items-center gap-1"
              icon={<PlayIcon size={16} />}
            >
              Đọc ngay
            </ButtonBase>
          </Link>
        </CardContent>
      </Card>
      <DeleteFavorite item={deletedItem} setItem={setDeletedItem} />
    </>
  );
};

const ComicFavoriteClient: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(DEFAULT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState<number>(16);
  const setComicFavorites = useComicStore((state) => state.setComicFavorites);
  // const [txtSearch, setTxtSearch] = useState<string>("");

  // Sync state with query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get("pageNumber") || "1", 10);
    const size = parseInt(queryParams.get("pageSize") || "16", 10);
    // const searchQuery = queryParams.get("txtSearch") || "";

    if (pageNumber !== page || pageSize !== size) {
      setPageNumber(page);
      setPageSize(size);
      // setTxtSearch(searchQuery);
    }
  }, [pageNumber, pageSize]);

  const { isLoading, data } = useGetFavorites({
    token: getAccessToken() ?? "",
    pageNumber,
    pageSize,
  });

  if (data && data?.data?.length > 0) {
    setComicFavorites(data?.data);
  }

  const handlePageChange = (newPage: number) => {
    const totalPages = Math.ceil(data?.totalPage || 0);
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage);
      const url = new URL(window.location.href);
      url.searchParams.set("pageNumber", newPage.toString());
      url.searchParams.set("pageSize", pageSize.toString());
      window.history.pushState({}, "", url);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-2 flex-wrap mb-6">
        <h1 className="text-lg text-text-secondary font-bold flex items-center gap-2 mb-4">
          Truyện yêu thích ({data?.totalRecord || 0})
        </h1>
        <Link href={`/`}>
          <ButtonBase size="sm" icon={<ArrowLeft />} variants="outline">
            Quay lại
          </ButtonBase>
        </Link>
      </div>
      {isLoading ? (
        // Show skeleton loading
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <ComicSkeleton key={index} />
          ))}
        </div>
      ) : data && data?.data?.length > 0 ? (
        // Show actual data
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.data?.map((comic: ILastCompletedComic, index: number) => (
            <ComicCard key={index} comic={comic} />
          ))}
        </div>
      ) : (
        // Show empty state
        <NoDataBase
          title="Chưa có liệu nào!"
          desc="Rất riết! Hiện tại chưa có dữ liệu!"
          imgSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/no-data.webp`}
          className="py-16"
          renderButtonAction={() => (
            <Link href={`/`}>
              <ButtonBase icon={<PlayIcon size={20} />}>
                Đọc truyện ngay
              </ButtonBase>
            </Link>
          )}
        />
      )}

      {/* Pagination */}
      {data && data?.totalPage > 1 && (
        <Pagination
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalItems={data?.totalRecord || 0}
          onPageChange={handlePageChange}
          className="justify-end mt-6"
        />
      )}
    </div>
  );
};

const ComicFavorite = () => {
  return (
    <Suspense fallback={<DotLoader />}>
      <ComicFavoriteClient />
    </Suspense>
  );
};

export default ComicFavorite;
