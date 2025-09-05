"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  Suspense,
  useRef,
} from "react";
import { ButtonBase } from "@/components/common/utils/button";
import { IComicDetail } from "@/types/comic.type";
import { PlayIcon, Headphones } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/common/pagination/pagination";
import debounce from "lodash.debounce";
import SearchBase from "@/components/common/search-base/search-base";
import {
  DEBOUNCE_SEARCH_TIME,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from "@/data/constants/global";
import { NoDataBase } from "@/components/common/utils/no-data";
import { DotLoader } from "@/components/common/utils/loading";
import Image from "next/image";
import { useComicStore } from "@/stores/comic-store";

interface IProps {
  data: IComicDetail;
}

const AudioSectionClient = ({ data }: IProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { setComicDetail } = useComicStore();

  useEffect(() => {
    setComicDetail(data);
  }, [data]);

  // Initialize states from URL parameters or defaults
  const [pageNumber, setPageNumber] = useState<number>(() => {
    const page = parseInt(searchParams.get("audioPage") || "", 10);
    return isNaN(page) ? DEFAULT_PAGE_NUMBER : page;
  });
  const [pageSize] = useState<number>(() => {
    const size = parseInt(searchParams.get("audioPageSize") || "", 10);
    return isNaN(size) ? DEFAULT_PAGE_SIZE : size;
  });
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("audioSearch") || ""
  );
  const [filteredAudios, setFilteredAudios] = useState<IComicDetail["audios"]>(
    data.audios
  );

  // Filter audios based on searchTerm
  useEffect(() => {
    if (!searchTerm) {
      setFilteredAudios(data.audios);
      return;
    }

    const searchValue = searchTerm.toLowerCase();
    const filtered = data.audios.filter((audio) =>
      audio.title?.toLowerCase().includes(searchValue)
    );
    setFilteredAudios(filtered);
    setPageNumber(1); // Reset to first page when search changes
  }, [searchTerm, data.audios]);

  // Sync URL with state changes
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("audioPage", pageNumber.toString());
    url.searchParams.set("audioPageSize", pageSize.toString());
    if (searchTerm) {
      url.searchParams.set("audioSearch", searchTerm);
    } else {
      url.searchParams.delete("audioSearch");
    }
    router.replace(url.toString(), { scroll: false });
  }, [pageNumber, pageSize, searchTerm, router]);

  // Calculate pagination for filtered audios
  const totalItems = filteredAudios.length;
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedAudios = filteredAudios.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
    // Scroll to section after page change
    setTimeout(() => {
      const offset = 100;
      if (sectionRef.current) {
        const top =
          sectionRef.current.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: top - offset,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, DEBOUNCE_SEARCH_TIME),
    []
  );

  // Handle search
  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  return (
    <section
      id="section-list-audios"
      ref={sectionRef}
      className="w-full mx-auto mt-6 p-6 bg-white rounded-3xl shadow-lg"
    >
      <div className="flex justify-between gap-2 mb-6 flex-wrap">
        <h2 className="text-base font-bold text-primary flex items-center gap-2">
          <Headphones size={20} className="" />
          Danh Sách Audio
          <span>({totalItems})</span>
        </h2>
        <SearchBase
          variants={{
            inputClassName: "h-10",
            wrapperClassName: "max-sm:w-full",
          }}
          placeholder="Tên audio..."
          onGetValue={handleSearch}
        />
      </div>
      <div className="flex flex-col gap-2">
        {paginatedAudios.length > 0 ? (
          paginatedAudios.map((audio) => (
            <Link
              key={audio.id}
              href={`/comic/${data.slug}/audio/${audio.slug}?comicThumbnail=${data.thumbnail}?index=${audio?.index}&comicTitle=${data.title}`}
              className="flex items-center justify-between max-md:flex-wrap max-md:gap-2 md:gap-4 p-3 bg-slate-50 shadow-sm hover:bg-slate-100 rounded-lg transition-colors"
            >
              <span className="text-text-secondary font-semibold flex gap-2 items-center md:max-w-60%">
                <span>
                  <PlayIcon size={16} />
                </span>
                <span className="line-clamp-1">{audio.title}</span>
                {audio.unitPrice > 0 && (
                  <span className="text-sm text-[#F472B6] bg-[#FDF2F8] px-2 py-1 rounded-full flex justify-center items-center gap-1 shadow">
                    {audio.unitPrice}{" "}
                    <Image
                      unoptimized
                      src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/strawberry.png`}
                      alt="strawberry-icon"
                      width={14}
                      height={14}
                      className="object-contain object-center ml-1"
                    />
                  </span>
                )}
              </span>
              <ButtonBase
                icon={<PlayIcon size={16} />}
                size="sm"
                className="max-md:hidden whitespace-nowrap"
                onClick={() =>
                  router.push(
                    `/comic/${data.slug}/audio/${audio.slug}?comicThumbnail=${data.thumbnail}`
                  )
                }
              >
                Nghe ngay
              </ButtonBase>
            </Link>
          ))
        ) : (
          <NoDataBase
            title="Không tìm thấy audio!"
            desc="Rất tiếc! Hiện tại chưa có dữ liệu!"
            imgSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/no-data.webp`}
            className="py-16"
            renderButtonAction={() => (
              <Link href={`/`}>
                <ButtonBase icon={<PlayIcon size={20} />}>
                  Nghe audio ngay
                </ButtonBase>
              </Link>
            )}
          />
        )}
      </div>
      {/* Pagination Component */}
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

const AudioSection = ({ data }: IProps) => {
  const sortedAudios = [...data.audios]
    .sort((a, b) => {
      const getChapterNumber = (title: string) => {
        const match = title.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      };
      return getChapterNumber(a.title) - getChapterNumber(b.title);
    })
    .map((audio, idx) => ({
      ...audio,
      index: idx,
    }));
  return (
    <Suspense fallback={<DotLoader />}>
      <AudioSectionClient data={{ ...data, audios: sortedAudios }} />
    </Suspense>
  );
};

export default AudioSection;
