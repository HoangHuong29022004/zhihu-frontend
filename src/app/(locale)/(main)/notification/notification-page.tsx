/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import {
  DEBOUNCE_SEARCH_TIME,
  DEFAULT_PAGE_NUMBER,
} from "@/data/constants/global";
import SearchBase from "@/components/common/search-base/search-base";
import debounce from "lodash.debounce";
import Pagination from "@/components/common/pagination/pagination";
import { useRouter } from "next/navigation";
import { DotLoader } from "@/components/common/utils/loading";
import useMediaQuery from "@/hooks/use-screen-size";
import { useGetNotifications } from "@/queries/notification.query";
import { INotification } from "@/types/notofication.type";
import { SectionWrapper } from "@/components/common/utils/common";
import { Bell, Inbox } from "lucide-react";
import NotificationItem from "./notification-item";

const NotificationPageClient: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(DEFAULT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState<number>(12);
  const [txtSearch, setTxtSearch] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const router = useRouter();
  const { isMobile } = useMediaQuery();

  // Sync state with query params only once on mount
  useEffect(() => {
    if (!isInitialized) {
      const queryParams = new URLSearchParams(location.search);
      const page = parseInt(queryParams.get("pageNumber") || "1", 10);
      const size = parseInt(queryParams.get("pageSize") || "12", 10);
      const searchQuery = queryParams.get("txtSearch") || "";

      setPageNumber(page);
      setPageSize(size);
      setTxtSearch(searchQuery);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const { isLoading, data, isRefetching } = useGetNotifications({
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

  const handleNotificationClick = (notification: INotification) => {
    if (notification.slug) {
      router.push(`/notification/${notification.slug}`);
    }
  };

  return (
    <section id="notification-section" className="min-h-screen  sm:py-12">
      <SectionWrapper>
        {/* Header */}
        <div className="flex max-sm:flex-wrap justify-between mb-8 items-center gap-4">
          <div className="mb-4 text-left">
            <h2 className="text-primary font-bold text-2xl flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary-active rounded-xl">
                <Bell size={24} className="text-primary" />
              </div>
              Thông báo hệ thống
            </h2>
            <p className="text-text-secondary mt-1 italic">
              Cập nhật những thông báo mới nhất từ hệ thống!
            </p>
          </div>
          <SearchBase
            placeholder="Tìm kiếm thông báo..."
            onGetValue={handleSearch}
            variants={{
              wrapperClassName: "rounded-full max-sm:flex-1",
              inputClassName: "rounded-full",
            }}
          />
        </div>

        {/* Stats */}
        {data && (
          <div className="mb-6 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-primary-light">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Inbox size={20} className="text-primary" />
                <span className="text-gray-700 font-medium">
                  Tổng cộng {data.totalRecord || 0} thông báo
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Trang {pageNumber} / {data.totalPage || 1}
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {(isLoading || isRefetching) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="bg-white/50 backdrop-blur-sm rounded-2xl border border-orange-100 p-4 animate-pulse"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notifications Grid */}
        {!isLoading &&
          !isRefetching &&
          data &&
          data.data &&
          data.data.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {data.data.map((notification: INotification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={handleNotificationClick}
                />
              ))}
            </div>
          )}

        {/* Empty state */}
        {!isLoading &&
          !isRefetching &&
          (!data || !data.data || data.data.length === 0) && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-4">
                <Bell size={32} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Chưa có thông báo nào
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Hiện tại chưa có thông báo mới nào. Hãy quay lại sau để xem
                những cập nhật mới nhất!
              </p>
            </div>
          )}

        {/* Pagination */}
        {data && data?.data?.length > 0 && data?.totalPage > 1 && (
          <div className="w-full flex justify-center">
            <Pagination
              pageNumber={pageNumber}
              pageSize={pageSize}
              totalItems={data?.totalRecord}
              onPageChange={handlePageChange}
              maxVisiblePages={isMobile ? 3 : 5}
            />
          </div>
        )}
      </SectionWrapper>
    </section>
  );
};

const UserNotificationPage = () => {
  return (
    <Suspense fallback={<DotLoader />}>
      <NotificationPageClient />
    </Suspense>
  );
};

export default UserNotificationPage;
