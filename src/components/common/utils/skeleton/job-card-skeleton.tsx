import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const JobCardSkeleton = () => {
  return (
    <div className="bg-white shadow-sm border border-transparent hover:shadow-xl rounded-lg p-3 transition-all">
      {/* Logo + Job Info */}
      <div className="flex justify-start items-start gap-3 mb-3">
        <Skeleton className="size-16 rounded-md" />
        <div className="flex-1">
          <Skeleton className="h-6 full mb-1" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>

      {/* Salary + Location + Save Button */}
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="size-6 rounded-full" />
      </div>
    </div>
  );
};

export default JobCardSkeleton;
