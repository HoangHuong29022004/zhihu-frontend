/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import {
  APP_ROLE,
  ARR_PAGINATION_ITEMS,
  DEBOUNCE_SEARCH_TIME,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from "@/data/constants/global";
import SearchBase from "@/components/common/search-base/search-base";
import ButtonBase from "@/components/common/utils/button/button-base";
import {
  LockKeyhole,
  RefreshCw,
  UserRoundCheck,
  CircleDollarSign,
  RotateCcw,
} from "lucide-react";
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
import debounce from "lodash.debounce";
import Pagination from "@/components/common/pagination/pagination";
import { IUserProfile, IUserResetPassword } from "@/types/user.type";
import { useGetUsers } from "@/queries/user.query";
import { getAccessToken } from "@/utils/api-handler";
import ImageBase from "@/components/common/image-base/image-base";
import { useRouter } from "next/navigation";
import SummaryBox from "@/components/common/summary-box/summary-box";
import { DotLoader } from "@/components/common/utils/loading";
import useMediaQuery from "@/hooks/use-screen-size";
import UpdateUser from "./update-user";
import UpdateCurrency from "./update-currency";
import { useAuthStore } from "@/stores/auth-store";
import ResetPassword from "./reset-password";

const AdminUserPageClient: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(DEFAULT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [txtSearch, setTxtSearch] = useState<string>("");
  const { isMobile } = useMediaQuery();

  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== APP_ROLE.ADMIN) {
      router.push("/");
      return;
    }
  }, [user, router]);

  // Update and delete actions
  const [updateCurrency, setUpdateCurrency] = useState<any>(null);
  const [updatedItem, setUpdatedItem] = useState<any>(null);
  const [resetPasswordItem, setResetPasswordItem] =
    useState<IUserResetPassword | null>(null);

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

  const { isLoading, data, isRefetching } = useGetUsers({
    token: getAccessToken() ?? "",
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
      <div className="grid max-md:grid-cols-1 md:grid-cols-3 gap-6 bg-white px-4 py-6 rounded-xl">
        <SummaryBox title="Tổng số người dùng" value={data?.totalRecord || 0} />
        <SummaryBox
          title="Tài khoản bị khóa"
          value={0}
          icon={<LockKeyhole size={30} />}
          bgColor="bg-gray-400"
        />
        <SummaryBox
          title="Tài khoản đang hoạt động"
          value={data?.totalRecord}
          icon={<UserRoundCheck size={30} />}
          bgColor="bg-primary-light"
        />
      </div>

      {/* Page Heading */}
      <div className="flex justify-between flex-wrap gap-4 bg-white px-4 py-6 rounded-xl">
        <SearchBase
          placeholder="Tên người dùng, email..."
          onGetValue={handleSearch}
          variants={{
            wrapperClassName: "max-sm:w-full",
            inputClassName: "max-sm:min-w-[130px]",
          }}
        />
        <ButtonBase
          title="Refresh button"
          variants="light"
          size={isMobile ? "md" : "lg"}
          icon={<RefreshCw />}
          onClick={() => (window.location.href = "/admin/user")}
        >
          {isRefetching ? "Làm mới..." : "Làm mới"}
        </ButtonBase>
        <UpdateUser item={updatedItem} setItem={setUpdatedItem} />
        <UpdateCurrency item={updateCurrency} setItem={setUpdateCurrency} />
        <ResetPassword
          item={resetPasswordItem as IUserResetPassword}
          setItem={setResetPasswordItem}
        />
      </div>

      {/* Data table */}
      <DataTableComponent
        headers={[
          "Mã người dùng",
          "Tên người dùng",
          "Email",
          "Avatar",
          "Vai trò",
        ]}
        data={data && data?.data}
        isLoading={isLoading || isRefetching}
        icons={{
          delete: <CircleDollarSign />,
          details: <RotateCcw />,
        }}
        onDetails={(item, row) => {
          setResetPasswordItem({
            id: item,
            email: row?.email,
          } as IUserResetPassword);
        }}
        onDelete={(item) => {
          setUpdateCurrency(item);
        }}
        onUpdate={(item) => setUpdatedItem(item)}
        renderCells={(row: IUserProfile) => (
          <>
            <TableCell className="text-text-secondary font-medium">
              {row.id || "_"}
            </TableCell>
            <TableCell
              className="text-main font-semibold cursor-pointer"
              onClick={() => router.push(`/admin/user/${row.id}`)}
            >
              {row.fullName || "_"}
            </TableCell>
            <TableCell
              className="text-main font-semibold cursor-pointer"
              onClick={() => router.push(`/admin/user/${row.id}`)}
            >
              {row?.email || "_"}
            </TableCell>
            <TableCell
              className="text-main font-semibold cursor-pointer mx-auto text-center"
              onClick={() => router.push(`/admin/user/${row.id}`)}
            >
              <ImageBase
                src={row.avatar}
                alt="user-avatar"
                width={60}
                height={60}
                fallbackSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/default_image.png`}
                className="object-contain object-center rounded-full size-16 text-center mx-auto"
              />
            </TableCell>
            <TableCell className="max-w-max mx-auto text-center">
              <span
                className={`px-3 py-1 max-x-auto rounded-full text-xs font-medium ${
                  row.role === APP_ROLE.USER
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {row.role}
              </span>
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

const AdminUserPage = () => {
  return (
    <Suspense fallback={<DotLoader />}>
      <AdminUserPageClient />
    </Suspense>
  );
};

export default AdminUserPage;
