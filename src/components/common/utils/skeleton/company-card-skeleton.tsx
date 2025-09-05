import { Skeleton } from "@/components/ui/skeleton";

const CompanyCardSkeleton = () => {
  return (
    <div className="bg-white overflow-hidden shadow-sm border border-orange-200 rounded-2xl">
      <div className="flex justify-start items-start gap-3 mb-1 p-3">
        <Skeleton className="size-16 border border-slate-200 rounded-md" />
        <div className="text-left w-full">
          <Skeleton className="h-6 full mb-1" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </div>
      <div className="bg-orange-50 p-3 flex items-center gap-2">
        <Skeleton className="size-5" />
        <Skeleton className="h-4 w-full ml-2" />
      </div>
    </div>
  );
};

export default CompanyCardSkeleton;
