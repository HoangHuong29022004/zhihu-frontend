/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IChapterComicDetail, IComicDetail } from "@/types/comic.type";
import TableCell from "@/components/common/data-table/data-table-cell";
import ImageBase from "@/components/common/image-base/image-base";
import DataTableComponent from "@/components/common/data-table/data-table";
import { CirclePlus, ArrowLeft } from "lucide-react";
import ButtonBase from "@/components/common/utils/button/button-base";
import Link from "next/link";
import SearchBase from "@/components/common/search-base/search-base";
import Pagination from "@/components/common/pagination/pagination";
import debounce from "lodash.debounce";
import {
  DEBOUNCE_SEARCH_TIME,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from "@/data/constants/global";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { getSalarySecretByType } from "@/utils/common";
import { useComicStore } from "@/stores/comic-store";

interface IProps {
  data: IComicDetail;
  onDelete: (item: any, options: any) => void;
}

const ChapterSectionUser = ({ data, onDelete }: IProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setComicDetail } = useComicStore();
  useEffect(() => {
    setComicDetail(data);
  }, [data]);

  // Initialize states from URL parameters or defaults
  const [pageNumber, setPageNumber] = useState<number>(() => {
    const page = parseInt(searchParams.get("pageNumber") || "", 10);
    return isNaN(page) ? DEFAULT_PAGE_NUMBER : page;
  });
  const [pageSize] = useState<number>(() => {
    const size = parseInt(searchParams.get("pageSize") || "", 10);
    return isNaN(size) ? DEFAULT_PAGE_SIZE : size;
  });
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("txtSearch") || ""
  );
  const [filteredChapters, setFilteredChapters] = useState<
    IChapterComicDetail[]
  >(data.chapters);

  // Filter chapters based on searchTerm
  useEffect(() => {
    if (!searchTerm) {
      setFilteredChapters(data.chapters);
      return;
    }

    const searchValue = searchTerm.toLowerCase();
    const filtered = data.chapters.filter((chapter) =>
      chapter.title?.toLowerCase().includes(searchValue)
    );
    setFilteredChapters(filtered);
    setPageNumber(1); // Reset to first page when search changes
  }, [searchTerm, data.chapters]);

  // Sync URL with state changes
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("pageNumber", pageNumber.toString());
    url.searchParams.set("pageSize", pageSize.toString());
    if (searchTerm) {
      url.searchParams.set("txtSearch", searchTerm);
    } else {
      url.searchParams.delete("txtSearch");
    }
    router.replace(url.toString(), { scroll: false });
  }, [pageNumber, pageSize, searchTerm, router]);

  // Calculate pagination for filtered chapters
  const totalItems = filteredChapters.length;
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedChapters = filteredChapters.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, DEBOUNCE_SEARCH_TIME),
    []
  );

  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  const handleToChapterDetails = (chapterSlug: string, index: number) => {
    if (data.status === "APPROVED" || data.status == "COMPLETED") {
      router.push(
        `/comic/${data.slug}/${chapterSlug}?index=${index}&comicTitle=${data.title}`
      );
    } else {
      toast({
        variant: "destructive",
        title: "Truyện chưa được duyệt hoặc đã tạm ngưng!",
        description: "Vui lòng chờ duyệt truyện để xem!",
      });
    }
  };

  const salaryTypeSecret = getSalarySecretByType(data.salaryType);

  return (
    <section className="flex flex-col gap-4 mt-6">
      <h1 className="text-lg text-text-secondary font-bold flex items-center">
        Danh sách chương
      </h1>
      {/* Page Heading */}
      <div className="flex justify-between flex-wrap gap-4 rounded-xl mb-2">
        <SearchBase
          placeholder="Tên chương..."
          onGetValue={handleSearch}
          variants={{
            inputClassName: "h-10",
          }}
        />
        <div className="flex gap-2">
          <Link
            href={`/user/manage-comic/add-chapter?comic=${data.id}&title=${data.title}&slug=${data.slug}&lastChapter=${data.chapters?.length}&salaryType=${salaryTypeSecret}`}
          >
            <ButtonBase size="md" icon={<CirclePlus />}>
              Đăng chương
            </ButtonBase>
          </Link>
          <Link href={`/user/manage-comic`}>
            <ButtonBase variants="outline" size="md" icon={<ArrowLeft />}>
              Quay lại
            </ButtonBase>
          </Link>
        </div>
      </div>

      {/* Data table */}
      <DataTableComponent
        headers={["Tên chương", "Ảnh bìa", "Giá chương (dâu)", "Chi tiết"]}
        data={paginatedChapters}
        isLoading={false}
        onDelete={onDelete}
        onUpdate={(item) => {
          router.push(
            `/user/manage-comic/update-chapter?chapter=${item}&comicSlug=${data.slug}&salaryType=${salaryTypeSecret}`
          );
        }}
        renderCells={(row: IChapterComicDetail) => (
          <>
            <TableCell
              className="text-text-secondary font-medium sm:max-w-24 cursor-pointer hover:text-primary transition-all duration-300"
              onClick={() => handleToChapterDetails(row.slug, row?.index ?? 0)}
            >
              {row.title || "_"}
            </TableCell>
            <TableCell
              className="text-center cursor-pointer w-[100px] sm:w-[120px] md:w-[150px]"
              onClick={() => handleToChapterDetails(row.slug, row?.index ?? 0)}
            >
              <ImageBase
                src={row.thumbnail}
                alt="thumbnail-image"
                width={60}
                height={60}
                fallbackSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/default_image.png`}
                className="object-cover object-center rounded-md w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 text-center mx-auto"
              />
            </TableCell>
            <TableCell className="mx-auto text-center">
              <p className="font-bold text-text-secondary">
                {row.unitPrice ?? "_"}
              </p>
            </TableCell>
            <TableCell className="mx-auto text-center">
              {row.unitPrice > 0 ? (
                <p className="text-xs whitespace-nowrap mx-auto text-primary bg-primary-active px-2 py-0.5  font-semibold rounded-full flex justify-center items-center gap-1 shadow w-fit">
                  {row.unitPrice}{" "}
                  <Image
                    unoptimized
                    src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/strawberry.png`}
                    alt="strawberry-icon"
                    width={14}
                    height={14}
                    className="object-contain object-center"
                  />
                </p>
              ) : (
                <p className="text-xs mx-auto whitespace-nowrap bg-green-100 text-green-800 px-2 py-0.5 font-semibold rounded-full flex justify-center items-center gap-1 shadow w-fit">
                  Miễn phí
                </p>
              )}
            </TableCell>
          </>
        )}
      />

      {/* Pagination */}
      {totalItems > pageSize && (
        <div className="mt-6 flex justify-center">
          <Pagination
            pageNumber={pageNumber}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            className="flex justify-center"
          />
        </div>
      )}
    </section>
  );
};

export default ChapterSectionUser;
