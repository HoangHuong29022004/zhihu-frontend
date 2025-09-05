"use client";

import { SectionWrapper } from "@/components/common/utils/common";
import { Suspense, useCallback, useEffect, useState } from "react";
import { ILastCompletedComic } from "@/types/comic.type";
import { NoDataBase } from "@/components/common/utils/no-data";
import ComicSkeleton from "@/components/home/last-comic-section/comic-skeleton";
import ComicItem from "@/components/home/last-comic-section/last-comic-item";
import {
  DEBOUNCE_SEARCH_TIME,
  DEFAULT_PAGE_NUMBER,
} from "@/data/constants/global";
import { useGetComics } from "@/queries/comic.query";
import debounce from "lodash.debounce";
import SearchBase from "@/components/common/search-base/search-base";
import Pagination from "@/components/common/pagination/pagination";
import { DotLoader } from "@/components/common/utils/loading";
import { useGetCategories } from "@/queries/categories.query";
import { CategorySkeleton } from "@/components/common/utils/skeleton";
import { ICategoryItem } from "@/types/category.type";
import { cn } from "@/lib/utils";
import CategoryItem from "@/components/common/category-item/category-item";
import { RotateCcw, TagIcon, ChevronDown, ChevronUp } from "lucide-react";
import ButtonBase from "@/components/common/utils/button/button-base";
import { useRouter } from "next/navigation";
import useMediaQuery from "@/hooks/use-screen-size";

const SearchComicPageClient = () => {
  const [pageNumber, setPageNumber] = useState<number>(DEFAULT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState<number>(24);
  const [txtSearch, setTxtSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<ICategoryItem | null>(null);
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);
  const { isMobile } = useMediaQuery();

  const router = useRouter();

  // Sync state with query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get("pageNumber") || "1", 10);
    const size = parseInt(queryParams.get("pageSize") || "24", 10);
    const searchQuery = queryParams.get("txtSearch") || "";
    const categorySlug = queryParams.get("categorySlug") || "";

    setPageNumber(page);
    setPageSize(size);
    setTxtSearch(searchQuery);

    // Set selected category if categorySlug exists in URL
    if (categorySlug && categories?.data) {
      const category = categories.data.find(
        (cat: ICategoryItem) => cat.slug === categorySlug
      );
      setSelectedCategory(category || null);
    }
  }, []);

  const { isLoading, data, isRefetching } = useGetComics({
    pageNumber,
    pageSize,
    search: txtSearch,
    categorySlug: selectedCategory?.slug || "",
  });

  const { isLoading: isLoadingCategory, data: categories } = useGetCategories({
    pageNumber: 1,
    pageSize: 100,
    search: "",
  });

  // Update selected category when categories data is loaded
  useEffect(() => {
    if (categories?.data) {
      const queryParams = new URLSearchParams(location.search);
      const categorySlug = queryParams.get("categorySlug") || "";

      if (categorySlug) {
        const category = categories.data.find(
          (cat: ICategoryItem) => cat.slug === categorySlug
        );
        setSelectedCategory(category || null);
      }
    }
  }, [categories?.data]);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setTxtSearch(value);
      const url = new URL(window.location.href);
      url.searchParams.set("pageNumber", "1");
      url.searchParams.set("pageSize", pageSize.toString());
      if (value) {
        url.searchParams.set("txtSearch", value);
      } else {
        url.searchParams.delete("txtSearch");
      }
      window.history.pushState({}, "", url);
    }, DEBOUNCE_SEARCH_TIME),
    [pageSize]
  );

  // Handle search
  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  // Handle category selection
  const handleCategoryClick = (category: ICategoryItem) => {
    setSelectedCategory(category);
    setPageNumber(1); // Reset to first page when changing category

    const url = new URL(window.location.href);
    url.searchParams.set("pageNumber", "1");
    url.searchParams.set("pageSize", pageSize.toString());
    url.searchParams.set("categorySlug", category.slug);
    if (txtSearch) {
      url.searchParams.set("txtSearch", txtSearch);
    }
    window.history.pushState({}, "", url);
  };

  // Handle clear category filter
  const handleClearCategory = () => {
    setSelectedCategory(null);
    setPageNumber(1);

    const url = new URL(window.location.href);
    url.searchParams.set("pageNumber", "1");
    url.searchParams.set("pageSize", pageSize.toString());
    url.searchParams.delete("categorySlug");
    if (txtSearch) {
      url.searchParams.set("txtSearch", txtSearch);
    }
    window.history.pushState({}, "", url);
  };

  const handlePageChange = (newPage: number) => {
    const totalPages = Math.ceil(data?.totalPage || 0);
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage);
      const url = new URL(window.location.href);
      url.searchParams.set("pageNumber", newPage.toString());
      url.searchParams.set("pageSize", pageSize.toString());
      if (txtSearch) {
        url.searchParams.set("txtSearch", txtSearch);
      }
      if (selectedCategory) {
        url.searchParams.set("categorySlug", selectedCategory.slug);
      }
      window.history.pushState({}, "", url);
    }
  };

  const handleReset = () => {
    setSelectedCategory(null);
    router.push("/comic/search");
  };

  // Get categories to display based on mobile state
  const getDisplayCategories = () => {
    if (!categories?.data) return [];

    if (isMobile && !showAllCategories) {
      return categories.data.slice(0, 8);
    }

    return categories.data;
  };

  const displayCategories = getDisplayCategories();
  const hasMoreCategories =
    isMobile && categories?.data && categories.data.length > 8;

  return (
    <section id="search-comic-section" className="bg-white sm:py-12">
      <SectionWrapper>
        {/* Header */}
        <div className="flex max-sm:flex-wrap justify-between mb-4 items-center gap-2">
          <div className="mb-4 text-left">
            <h2 className="text-primary font-bold text-2xl">Tìm kiếm truyện</h2>
            <p className="text-text-secondary mt-1 italic">
              Khám phá truyện mới nhất cùng chúng tôi!
            </p>
          </div>
          <SearchBase
            placeholder="Tên truyện..."
            onGetValue={handleSearch}
            variants={{
              wrapperClassName: "rounded-full max-sm:flex-1",
              inputClassName: "rounded-full",
            }}
          />
        </div>

        {/* Categories Section */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-primary flex items-center gap-2">
            <TagIcon size={20} /> Thể loại
          </h3>

          {isLoadingCategory ? (
            // Show skeleton loading for categories
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 10 }).map((_, index) => (
                <CategorySkeleton key={index} />
              ))}
            </div>
          ) : categories?.data && categories.data.length > 0 ? (
            // Show actual categories
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {/* Clear filter button */}
                <button
                  onClick={handleClearCategory}
                  className={cn(
                    "px-4 h-[32px] leading-[32px] rounded-full text-sm font-medium transition-all duration-200 hover:scale-105",
                    !selectedCategory
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  Tất cả
                </button>

                {/* Category items */}
                {displayCategories.map((category: ICategoryItem) => (
                  <CategoryItem
                    key={category.id}
                    category={category}
                    isActive={selectedCategory?.id === category.id}
                    onClick={handleCategoryClick}
                  />
                ))}
              </div>

              {/* Show more/less button for mobile */}
              {hasMoreCategories && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="flex items-center gap-2 px-4 pb-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {showAllCategories ? (
                      <>
                        Thu gọn
                        <ChevronUp size={16} />
                      </>
                    ) : (
                      <>
                        Xem thêm
                        <ChevronDown size={16} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Show empty state for categories
            <p className="text-gray-500 text-sm">Không có thể loại nào</p>
          )}
        </div>

        {/* Comic Grid */}
        {isLoading || isRefetching ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {
              // Show skeleton loading
              Array.from({ length: 16 }).map((_, index) => (
                <ComicSkeleton key={index} />
              ))
            }
          </div>
        ) : data && data?.data?.length > 0 ? (
          // Show actual data
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {data?.data?.map((comic: ILastCompletedComic, index: number) => (
              <ComicItem
                key={index}
                data={comic}
                index={index}
                isShowCategory={true}
                isShowCreatedAt={true}
              />
            ))}
          </div>
        ) : (
          // Show empty state
          <NoDataBase
            title="Không tìm thấy truyện!"
            desc="Không có truyện nào khớp với tìm kiếm của bạn!"
            imgSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/no-data.webp`}
            className="py-16"
            renderButtonAction={() => (
              <ButtonBase onClick={handleReset} icon={<RotateCcw size={20} />}>
                Đặt lại
              </ButtonBase>
            )}
          />
        )}

        {/* Pagination */}
        {data && data?.data?.length > 0 && data.totalPage > 1 && (
          <div className="w-full flex justify-center mt-6">
            <Pagination
              pageNumber={pageNumber}
              pageSize={pageSize}
              totalItems={data?.totalRecord || 0}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </SectionWrapper>
    </section>
  );
};

const SearchComicPage = () => {
  return (
    <Suspense fallback={<DotLoader />}>
      <SearchComicPageClient />
    </Suspense>
  );
};

export default SearchComicPage;
