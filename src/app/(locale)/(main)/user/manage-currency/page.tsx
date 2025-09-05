/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import { DEBOUNCE_SEARCH_TIME } from "@/data/constants/global";
import SearchBase from "@/components/common/search-base/search-base";
import ButtonBase from "@/components/common/utils/button/button-base";
import { ArrowLeft, RefreshCw, ShoppingCart } from "lucide-react";
import DataTableComponent from "@/components/common/data-table/data-table";
import TableCell from "@/components/common/data-table/data-table-cell";
import debounce from "lodash.debounce";
import { DotLoader } from "@/components/common/utils/loading";
import { getAccessToken } from "@/utils/api-handler";
import { ICurrencyHistory } from "@/types/payment";
import Link from "next/link";
import { useGetCurrencyHistory } from "@/queries/payment.query";
import { formatDateToVN } from "@/utils/time-handler";
import {
  renderCurrencyIcon,
  renderCurrencyLabel,
} from "@/utils/styling-handler";

const ManageCurrencyClient: React.FC = () => {
  const [txtSearch, setTxtSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<
    ICurrencyHistory[] | undefined
  >(undefined);

  // Sync state with query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("txtSearch") || "";

    if (txtSearch !== searchQuery) {
      setTxtSearch(searchQuery);
    }
  }, [txtSearch]);

  const { isLoading, data, isRefetching } = useGetCurrencyHistory({
    token: getAccessToken() ?? "",
  });

  const handleReset = () => {
    window.location.href = "/user/manage-currency";
  };

  // Filter data based on txtSearch
  useEffect(() => {
    if (!data?.data) {
      setFilteredData(undefined);
      return;
    }

    // Combine all history arrays
    const combinedData = [
      ...data.data.strawberryHistory,
      ...data.data.flowerHistory,
      ...data.data.creamHistory,
    ];

    // Sort tất cả items theo createdAt trước khi filter
    const sortedCombinedData = combinedData.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    if (!txtSearch) {
      setFilteredData(sortedCombinedData);
      return;
    }

    let searchTerm = txtSearch.toLowerCase();
    if (searchTerm === "hoa") {
      searchTerm = "flower";
    } else if (searchTerm === "dâu") {
      searchTerm = "strawberry";
    } else if (searchTerm === "kem") {
      searchTerm = "cream";
    }
    const filtered = sortedCombinedData.filter(
      (item: ICurrencyHistory) =>
        item.type?.toLowerCase().includes(searchTerm) ||
        item.description?.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filtered);
  }, [data?.data, txtSearch]);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setTxtSearch(value);
      const url = new URL(window.location.href);
      if (value) {
        url.searchParams.set("txtSearch", value);
      } else {
        url.searchParams.delete("txtSearch");
      }
      window.history.pushState({}, "", url);
    }, DEBOUNCE_SEARCH_TIME),
    []
  );

  // Handle search
  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Page Heading */}
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <div>
          <h1 className="text-lg text-text-secondary font-bold flex items-center gap-2">
            Quản lý tiền tệ ({filteredData?.length})
          </h1>
          <p className="text-text-secondary italic">
            Theo dõi lịch sử tiền tệ của bạn
          </p>
        </div>
        <Link href={`/`}>
          <ButtonBase size="sm" icon={<ArrowLeft />} variants="outline">
            Quay lại
          </ButtonBase>
        </Link>
      </div>
      <div className="flex flex-wrap gap-2 rounded-xl mt-2">
        {/* <div className="grid grid-cols-3 gap-6 bg-white rounded-xl mb-6">
          <SummaryBox
            title="Tổng số  <Image
              unoptimized
              src={             `${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/strawberry.png`
              }
              alt="strawberry-icon"
              width={40}
              height={40}
              className="object-contain object-center"
            />"
            value={data?.data.currencyStrawberry || 0}
            icon={<Award />}
            className="h-20"
            valueClassName="text-xl"
            bgColor="bg-red-400"
          />
          <SummaryBox
            title="Tổng số hoa"
            value={data?.data.currencyFlower || 0}
            icon={<Award />}
            className="h-20"
            valueClassName="text-xl"
          />
          <SummaryBox
            title="Tổng số kem🍦"
            value={data?.data.currencyCream || 0}
            bgColor="bg-primary-light"
            icon={<Award />}
            className="h-20"
            valueClassName="text-xl"
          />
        </div> */}

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-between w-full">
          <div className="w-full sm:w-auto">
            <SearchBase
              variants={{
                inputClassName: "h-10",
              }}
              placeholder="Mô tả, loại tiền..."
              onGetValue={handleSearch}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <ButtonBase
              title="Refresh button"
              className="sm:ml-3 w-full sm:w-auto"
              variants="light"
              icon={<RefreshCw />}
              onClick={handleReset}
            >
              {isRefetching ? "Làm mới..." : "Làm mới"}
            </ButtonBase>
            <Link href={`/user/deposit`} className="w-full sm:w-auto">
              <ButtonBase className="w-full sm:w-auto">
                <div className="flex gap-1 items-center flex-nowrap whitespace-nowrap">
                  <ShoppingCart size={16} />
                  Nạp điểm ngay
                </div>
              </ButtonBase>
            </Link>
          </div>
        </div>
      </div>

      {/* Data table */}
      <DataTableComponent
        headers={["Loại tiền", "Mô tả", "Ngày tạo", "Số điểm"]}
        data={filteredData || []}
        isLoading={isLoading || isRefetching}
        renderCells={(row: ICurrencyHistory) => (
          <>
            <TableCell className="text-main font-semibold max-w-48">
              {renderCurrencyLabel(row.type) || "_"}
            </TableCell>
            <TableCell className="max-w-48">{row.description || "_"}</TableCell>
            <TableCell className="text-main max-w-48">
              {formatDateToVN(row.createdAt) || "_"}
            </TableCell>
            <TableCell className="mx-auto text-center font-semibold text-primary">
              <div className="flex gap-2 justify-center">
                {row.amount} {renderCurrencyIcon(row.type)}
              </div>
            </TableCell>
          </>
        )}
      />
    </div>
  );
};

const ManageCurrencyPage = () => {
  return (
    <Suspense fallback={<DotLoader />}>
      <ManageCurrencyClient />
    </Suspense>
  );
};

export default ManageCurrencyPage;
