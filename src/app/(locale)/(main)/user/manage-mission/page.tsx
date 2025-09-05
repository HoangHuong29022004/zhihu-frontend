/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import { DEBOUNCE_SEARCH_TIME } from "@/data/constants/global";
import SearchBase from "@/components/common/search-base/search-base";
import ButtonBase from "@/components/common/utils/button/button-base";
import { ArrowLeft, CheckIcon, RefreshCw } from "lucide-react";
import DataTableComponent from "@/components/common/data-table/data-table";
import TableCell from "@/components/common/data-table/data-table-cell";
import debounce from "lodash.debounce";
import { DotLoader } from "@/components/common/utils/loading";
import { useGetMissions, useUpdateMission } from "@/queries/mission.query";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { IMissionItem } from "@/types/mission.type";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { renderMissionStatus } from "@/utils/styling-handler";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import { getProfile } from "@/services/auth-service";
import { useAuthStore } from "@/stores/auth-store";
import Image from "next/image";

const ManageMissionPageClient: React.FC = () => {
  const [txtSearch, setTxtSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IMissionItem[] | undefined>(
    undefined
  );
  const setUser = useAuthStore((state) => state.setUser);

  // Sync state with query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("txtSearch") || "";

    if (txtSearch !== searchQuery) {
      setTxtSearch(searchQuery);
    }
  }, [txtSearch]);

  const { isLoading, data, refetch, isRefetching } = useGetMissions({
    token: getAccessToken() ?? "",
    pageNumber: 1,
    pageSize: 100,
  });

  // Filter data based on txtSearch
  useEffect(() => {
    if (!data?.data) {
      setFilteredData(undefined);
      return;
    }

    if (!txtSearch) {
      setFilteredData(data.data);
      return;
    }

    const searchTerm = txtSearch.toLowerCase();
    const filtered = data?.data?.filter(
      (mission: IMissionItem) =>
        mission.title?.toLowerCase().includes(searchTerm) ||
        mission.description?.toLowerCase().includes(searchTerm)
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

  // Using custom hook for updating mission
  const { mutateAsync } = useUpdateMission(getAccessToken() ?? "");

  const handleCompleteMission = async (request: string) => {
    const res = await mutateAsync(request);
    if (res && isSuccessResponse(res?.statusCode, res?.success)) {
      refetch();

      const profileResponse = await getProfile(getAccessToken() ?? "");
      if (profileResponse) {
        setUser(profileResponse?.data);
      }
      toast({
        title: "Chúc mừng đã hoàn thành!",
        description: "Hãy kiểm tra phần thưởng!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Nhiệm vụ chưa hoàn thành!",
        description: "Hãy đọc mô tả và hoàn thành nhiệm vụ!",
      });
    }
  };

  const renderActions = (row: IMissionItem) => {
    return (
      <ButtonBase
        className={`font-semibold ${
          row.status === "COMPLETED" && "opacity-40"
        }`}
        size="sm"
        onClick={() => handleCompleteMission(row.id)}
        disabled={row.status === "COMPLETED"}
      >
        {/* {isPending ? (
          <LoadingSpinner type="button" text="Hoàn thành" />
        ) : (
          <div className="flex gap-1 items-center flex-nowrap whitespace-nowrap">
            <CheckIcon size={16} />
            Hoàn thành
          </div>
        )} */}
        <div className="flex gap-1 items-center flex-nowrap whitespace-nowrap">
          <CheckIcon size={16} />
          Hoàn thành
        </div>
      </ButtonBase>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Page Heading */}
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <h1 className="text-lg text-text-secondary font-bold flex items-center gap-2">
          Tất cả nhiệm vụ ({filteredData?.length || 0})
        </h1>
        <Link href={`/`}>
          <ButtonBase size="sm" icon={<ArrowLeft />} variants="outline">
            Quay lại
          </ButtonBase>
        </Link>
      </div>
      <div className="flex flex-wrap gap-3 rounded-xl">
        <SearchBase
          variants={{
            inputClassName: "h-10",
          }}
          placeholder="Tên nhiệm vụ..."
          onGetValue={handleSearch}
        />
        <ButtonBase
          title="Refresh button"
          variants="light"
          icon={<RefreshCw />}
          onClick={() => refetch()}
        >
          {isRefetching ? "Làm mới..." : "Làm mới"}
        </ButtonBase>
      </div>

      {/* Data table */}
      <DataTableComponent
        headers={["Nhiệm vụ", "Mô tả", "Phần thưởng (hoa)", "Trạng thái"]}
        data={filteredData || []} // Use filteredData instead of data?.data
        isLoading={isLoading || isRefetching}
        renderActions={renderActions}
        renderCells={(row: IMissionItem) => (
          <>
            <TableCell className="text-main font-semibold w-[200px] min-w-[150px] max-w-[250px] truncate">
              {row.title || "_"}
            </TableCell>
            <TableCell className="w-[300px] min-w-[200px] max-w-[400px] truncate text-sm">
              {row.description || "_"}
            </TableCell>
            <TableCell className="w-[100px] min-w-[80px] text-center font-semibold">
              <div className="flex">
                + {row.amount}{" "}
                <Image
                  unoptimized
                  src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/flower.png`}
                  alt="strawberry-icon"
                  width={16}
                  height={16}
                  className="object-contain object-center ml-2"
                />
              </div>
            </TableCell>
            <TableCell className="w-[120px] min-w-[100px] text-center">
              {renderMissionStatus(row.status)}
            </TableCell>
          </>
        )}
      />
      <InlineHint message="Hãy đọc kỹ mô tả nhiệm vụ và nhấn hoàn thành để nhận phần thưởng!" />
    </div>
  );
};

const ManageMissionPage = () => {
  return (
    <Suspense fallback={<DotLoader />}>
      <ManageMissionPageClient />
    </Suspense>
  );
};

export default ManageMissionPage;
