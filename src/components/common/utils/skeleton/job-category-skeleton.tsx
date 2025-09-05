import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const JobCategorySkeleton = () => {
  return (
    <div className="flex gap-2 mb-1.5 items-center">
      <Skeleton className="w-10 h-7 rounded-xl" />
      <Skeleton className="flex-1 h-8 rounded-xl" />
    </div>
  );
};

export default JobCategorySkeleton;
