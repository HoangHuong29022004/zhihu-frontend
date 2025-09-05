/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import {
  ARR_PAGINATION_ITEMS,
  DEBOUNCE_SEARCH_TIME,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from "@/data/constants/global";
import SearchBase from "@/components/common/search-base/search-base";
import ButtonBase from "@/components/common/utils/button/button-base";
import { RefreshCw } from "lucide-react";
import DataTableComponent from "@/components/common/data-table/data-table";
import TableCell from "@/components/common/data-table/data-table-cell";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddComicCategory from "./add-comic-category";
import UpdateComicCategory from "./update-comic-category";
import DeleteJobCategory from "./delete-job-category";
import { useGetCategories } from "@/queries/categories.query";
import { ICategoryItem } from "@/types/category.type";
import debounce from "lodash.debounce";
import Pagination from "@/components/common/pagination/pagination";
import { DotLoader } from "@/components/common/utils/loading";
import QuantityBox from "@/components/common/total-price/total-price";
import useMediaQuery from "@/hooks/use-screen-size";

const AdminComicCategoryPageClient: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(DEFAULT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [txtSearch, setTxtSearch] = useState<string>("");
  const { isMobile } = useMediaQuery();

  // Update and delete actions
  const [deletedItem, setDeletedItem] = useState<any>(null);
  const [updatedItem, setUpdatedItem] = useState<any>(null);

  // Sync state with query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get("pageNumber") || "1", 10);
    const size = parseInt(queryParams.get("pageSize") || "20", 10);
    const searchQuery = queryParams.get("txtSearch") || "";

    if (pageNumber !== page || pageSize !== size || txtSearch !== searchQuery) {
      setPageNumber(page);
      setPageSize(size);
      setTxtSearch(searchQuery);
    }
  }, [pageNumber, pageSize, txtSearch]);

  const { isLoading, data, refetch, isRefetching } = useGetCategories({
    pageNumber,
    pageSize,
    search: txtSearch,
  });

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

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPageNumber(1);
    const url = new URL(window.location.href);
    url.searchParams.set("pageSize", size.toString());
    url.searchParams.set("pageNumber", "1");
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
      window.history.pushState({}, "", url);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Page Heading */}
      <div className="flex justify-between flex-wrap gap-4 bg-white px-4 py-6 rounded-xl">
        <div className="flex max-sm:flex-wrap gap-2 items-end">
          <SearchBase
            placeholder="Tên thể loại..."
            onGetValue={handleSearch}
            variants={{
              wrapperClassName: "max-sm:w-full",
              inputClassName: "max-sm:min-w-[130px]",
            }}
          />
          <QuantityBox quantity={data?.totalRecord || 0} />
        </div>
        <div className="flex gap-3 flex-wrap">
          <AddComicCategory />
          <ButtonBase
            title="Refresh button"
            variants="light"
            size={isMobile ? "md" : "lg"}
            icon={<RefreshCw />}
            onClick={() => refetch()}
          >
            {isRefetching ? "Làm mới..." : "Làm mới"}
          </ButtonBase>
          <UpdateComicCategory item={updatedItem} setItem={setUpdatedItem} />
          <DeleteJobCategory item={deletedItem} setItem={setDeletedItem} />
        </div>
      </div>

      {/* Data table */}
      <DataTableComponent
        headers={["Đường dẫn", "Tên thể loại"]}
        data={data && data?.data}
        isLoading={isLoading || isRefetching}
        onDelete={(item, options) => {
          setDeletedItem({
            id: item,
            options,
          });
        }}
        onUpdate={(item) => setUpdatedItem(item)}
        renderCells={(row: ICategoryItem) => (
          <>
            <TableCell className="text-main font-semibold max-w-48">
              {row.slug || "_"}
            </TableCell>
            <TableCell className="text-main font-semibold max-w-48">
              {row.name || "_"}
            </TableCell>
          </>
        )}
      />

      <div className="flex max-sm:flex-wrap justify-between gap-4 bg-white px-4 py-6 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="font-bold">Số dòng: </span>
          <Select
            onValueChange={(value) => handlePageSizeChange(parseInt(value))}
            value={pageSize.toString()}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn Số  dòng" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Số dòng</SelectLabel>
                {ARR_PAGINATION_ITEMS.map((item, index) => (
                  <SelectItem value={item.value} key={index}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Pagination */}
        <Pagination
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalItems={data?.totalRecord || 0}
          onPageChange={handlePageChange}
          maxVisiblePages={isMobile ? 3 : 5}
        />
      </div>
    </div>
  );
};

const AdminComicCategoryPage = () => {
  return (
    <Suspense fallback={<DotLoader />}>
      <AdminComicCategoryPageClient />
    </Suspense>
  );
};

export default AdminComicCategoryPage;
