/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from "@/data/constants/global";
import ButtonBase from "@/components/common/utils/button/button-base";
import { ArrowLeft, BellOff } from "lucide-react";
import DataTableComponent from "@/components/common/data-table/data-table";
import TableCell from "@/components/common/data-table/data-table-cell";
import Pagination from "@/components/common/pagination/pagination";
import { DotLoader } from "@/components/common/utils/loading";
import { useDeleteFollow, useGetFollows } from "@/queries/follow.query";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { IUserFollow } from "@/types/user.type";
import Link from "next/link";
import ImageBase from "@/components/common/image-base/image-base";
import { toast } from "@/hooks/use-toast";
import { useComicStore } from "@/stores/comic-store";

const ManageFollowClient: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(DEFAULT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const setFollowedUsers = useComicStore((state) => state.setFollowedUsers);

  // Sync state with query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get("pageNumber") || "1", 10);
    const size = parseInt(queryParams.get("pageSize") || "20", 10);

    if (pageNumber !== page || pageSize !== size) {
      setPageNumber(page);
      setPageSize(size);
    }
  }, [pageNumber, pageSize]);

  const { isLoading, data, refetch, isRefetching } = useGetFollows({
    token: getAccessToken() ?? "",
    pageNumber,
    pageSize,
  });

  if (data && data?.data?.length > 0) {
    setFollowedUsers(data?.data);
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

  // Using custom hook for updating mission
  const { mutateAsync } = useDeleteFollow(getAccessToken() ?? "");

  const handleDeleteFollow = async (request: string) => {
    const res = await mutateAsync(request);
    if (res && isSuccessResponse(res?.statusCode, res?.success)) {
      refetch();
      toast({
        title: "Bỏ follow tác giả thành công!",
        description: "Bạn vừa bỏ follow tác giả!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Bỏ follow tác giả không thành công!",
        description: "Có lỗi xảy ra. Vui lòng kiểm tra lại!",
      });
    }
  };

  const renderActions = (row: IUserFollow) => {
    return (
      <ButtonBase size="sm" onClick={() => handleDeleteFollow(row.id)}>
        <div className="flex gap-1 items-center flex-nowrap whitespace-nowrap">
          <BellOff size={16} />
          Unfollow
        </div>
      </ButtonBase>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center gap-2 flex-wrap mb-6">
        <h1 className="text-lg text-text-secondary font-bold flex items-center gap-2 mb-4">
          Follow ({data?.totalRecord || 0})
        </h1>
        <Link href={`/`}>
          <ButtonBase size="sm" icon={<ArrowLeft />} variants="outline">
            Quay lại
          </ButtonBase>
        </Link>
      </div>

      {/* Data table */}
      <DataTableComponent
        headers={["Avatar", "Tác giả", "Mô tả"]}
        data={data && data?.data}
        isLoading={isLoading || isRefetching}
        renderActions={renderActions}
        renderCells={(row: IUserFollow) => (
          <>
            <TableCell className="text-main font-semibold cursor-pointer w-28">
              <ImageBase
                src={row.avatar}
                alt="user-avatar"
                width={60}
                height={60}
                fallbackSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/default_image.png`}
                className="object-contain object-center rounded-full size-12 text-center mx-auto"
              />
            </TableCell>
            <TableCell className="text-main font-semibold max-w-48">
              {row.fullName || "_"}
            </TableCell>
            <TableCell className="text-text-secondary max-w-48">
              {`Bạn đã follow tác giả ${row.fullName}`}
            </TableCell>
          </>
        )}
      />

      {/* Pagination */}
      {data && data?.totalPage > 1 && (
        <Pagination
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalItems={data?.totalRecord}
          onPageChange={handlePageChange}
          className="justify-end mt-6"
        />
      )}
    </div>
  );
};

const ManageFollowPage = () => {
  return (
    <Suspense fallback={<DotLoader />}>
      <ManageFollowClient />
    </Suspense>
  );
};

export default ManageFollowPage;
