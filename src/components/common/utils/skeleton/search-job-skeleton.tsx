import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SearchJobSkeleton = () => {
  return (
    <div
      className={`bg-white shadow-sm border border-transparent rounded-xl px-3 py-4 cursor-pointer transition-all group w-full`}
    >
      <div className="flex justify-start items-start gap-3 mb-1 border-b-1 border-slate-50">
        <Skeleton className="w-[120px] h-[120px]" />
        <div className="text-left mt-1 flex-1">
          <div className="flex justify-between gap-20 items-start w-full mb-4">
            <Skeleton className="h-6 max-sm:w-2/3 sm:w-1/2" />
            <Skeleton className="h-6 max-sm:hidden sm:w-32" />
          </div>

          <div className="flex justify-between gap-20 items-start w-full mb-4">
            <Skeleton className="h-5 w-1/2" />
          </div>

          <div className="flex justify-between items-end">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20"></Skeleton>
              <Skeleton className="h-6 w-20 max-sm:hidden"></Skeleton>
              <Skeleton className="h-6 w-20 max-lg:hidden"></Skeleton>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 max-sm:w-20 sm:w-32"></Skeleton>
              <Skeleton className="size-10 max-sm:hidden"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchJobSkeleton;
