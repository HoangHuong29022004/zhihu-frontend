import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ComicSkeleton = () => {
    return (
        <div className="space-y-3">
            <Skeleton className="h-[160px] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
        </div>
    )
}

export default ComicSkeleton;
