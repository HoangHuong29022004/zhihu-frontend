import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SearchJobSkeletonMobile = () => {
  return (
    <div
      className={`bg-white shadow-sm border border-transparent rounded-xl px-3 py-4 cursor-pointer transition-all group w-full`}
    >
      <div className="flex justify-start items-start gap-3 mb-1 border-b-1 border-slate-50">
        <Skeleton className="w-[120px] h-[120px]" />
        <div className="text-left mt-1 flex-1">
          <div className="flex justify-between gap-20 items-start w-full mb-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 flex-1" />
          </div>

          <div className="flex justify-between gap-20 items-start w-full mb-4">
            <Skeleton className="h-5 w-52" />
          </div>

          <div className="flex justify-between items-end">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20"></Skeleton>
              <Skeleton className="h-6 w-20"></Skeleton>
              <Skeleton className="h-6 w-20"></Skeleton>
            </div>
            <div className="max-sm:hidden sm:flex gap-2">
              <Skeleton className="h-10 w-32"></Skeleton>
              <Skeleton className="size-10"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchJobSkeletonMobile;
