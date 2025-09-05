/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  Suspense,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import { DEBOUNCE_SEARCH_TIME } from "@/data/constants/global";
import SearchBase from "@/components/common/search-base/search-base";
import ButtonBase from "@/components/common/utils/button/button-base";
import { ArrowLeft, Bitcoin, RefreshCw } from "lucide-react";
import DataTableComponent from "@/components/common/data-table/data-table";
import TableCell from "@/components/common/data-table/data-table-cell";
import debounce from "lodash.debounce";
import { DotLoader } from "@/components/common/utils/loading";
import { getAccessToken } from "@/utils/api-handler";
import Link from "next/link";
import { renderPaymentStatus } from "@/utils/styling-handler";
import { IWithdrawMe } from "@/types/withdraw.type";
import { formatToVND } from "@/utils/common";
import { useGetWithdrawMe } from "@/queries/withdraw.query";
import DeleteWithdraw from "./delete-withdraw";
import { toast } from "@/hooks/use-toast";
import { formatDateToVN } from "@/utils/time-handler";

const ManageWithDrawClient: React.FC = () => {
  const [txtSearch, setTxtSearch] = useState<string>("");
  const [deletedItem, setDeletedItem] = useState<any>(null);

  // Sync state with query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("txtSearch") || "";

    if (txtSearch !== searchQuery) {
      setTxtSearch(searchQuery);
    }
  }, [txtSearch]);

  const { isLoading, data, refetch, isRefetching } = useGetWithdrawMe({
    token: getAccessToken() ?? "",
    pageNumber: 1,
    pageSize: 1000,
  });

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!data?.data || !txtSearch.trim()) {
      return data?.data;
    }

    const searchTerm = txtSearch.toLowerCase().trim();

    return data.data.filter((item: IWithdrawMe) => {
      const bankAccountName = (item.bankAccountName || "").toLowerCase();
      const bankAccount = (item.bankAccount || "").toLowerCase();
      const bankName = (item.bankName || "").toLowerCase();

      return (
        bankAccountName.includes(searchTerm) ||
        bankAccount.includes(searchTerm) ||
        bankName.includes(searchTerm)
      );
    });
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

  const handleNavigateWithdraw = () => {
    window.location.href = "/user/withdraw";
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Page Heading */}
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <div>
          <h1 className="text-lg text-text-secondary font-bold flex items-center gap-2">
            Lịch sử rút tiền
          </h1>
          <p className="text-text-secondary italic">
            Theo dõi lịch sử rút tiền của bạn
          </p>
        </div>
        <Link href={`/`}>
          <ButtonBase size="sm" icon={<ArrowLeft />} variants="outline">
            Quay lại
          </ButtonBase>
        </Link>
      </div>
      <div className="flex flex-wrap gap-2 rounded-xl mt-2">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-between w-full">
          <div className="w-full sm:w-auto">
            <SearchBase
              variants={{
                inputClassName: "h-10",
              }}
              placeholder="Tên tài khoản, số tài khoản, ngân hàng..."
              onGetValue={handleSearch}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <ButtonBase
              title="Refresh button"
              className="sm:ml-3 w-full sm:w-auto"
              variants="light"
              icon={<RefreshCw />}
              onClick={() => refetch()}
            >
              {isRefetching ? "Làm mới..." : "Làm mới"}
            </ButtonBase>
            <ButtonBase
              className="w-full sm:w-auto"
              onClick={handleNavigateWithdraw}
            >
              <div className="flex gap-1 items-center flex-nowrap whitespace-nowrap">
                <Bitcoin size={16} />
                Rút tiền ngay
              </div>
            </ButtonBase>
            <DeleteWithdraw item={deletedItem} setItem={setDeletedItem} />
          </div>
        </div>
      </div>

      {/* Data table */}
      <DataTableComponent
        headers={[
          "Tên tài khoản",
          "Ngân hàng",
          "Số tài khoản",
          "Số tiền",
          "Ngày tạo",
          "Trạng thái",
        ]}
        data={filteredData}
        onDelete={(item, options, row) => {
          if (row) {
            if (row.status === "REJECTED" || row.status === "APPROVED") {
              toast({
                variant: "destructive",
                title: "Bạn không thể xóa yêu cầu này!",
                description: "Yêu cầu đã được duyệt hoặc từ chối",
              });
              return;
            }
          }
          setDeletedItem({
            id: item,
            options,
          });
        }}
        isLoading={isLoading || isRefetching}
        renderCells={(row: IWithdrawMe) => (
          <>
            <TableCell className="text-main font-semibold max-w-48">
              {row.bankAccountName || "_"}
            </TableCell>
            <TableCell className="text-main max-w-48">
              {row.bankName || "_"}
            </TableCell>
            <TableCell className="text-main max-w-48">
              {row.bankAccount || "_"}
            </TableCell>
            <TableCell className="text-main max-w-48 mx-auto text-center font-semibold text-primary">
              {formatToVND(row.amount) || "_"}
            </TableCell>
            <TableCell className="text-main w-max">
              {formatDateToVN(row.createdAt) || "_"}
            </TableCell>
            <TableCell className="text-main max-w-48 mx-auto text-center font-semibold">
              {renderPaymentStatus(row.status)}
            </TableCell>
          </>
        )}
      />
    </div>
  );
};

const MangeWithDrawPage = () => {
  return (
    <Suspense fallback={<DotLoader />}>
      <ManageWithDrawClient />
    </Suspense>
  );
};

export default MangeWithDrawPage;
