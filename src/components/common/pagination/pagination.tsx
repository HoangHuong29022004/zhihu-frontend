"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  className?: string;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  pageNumber,
  pageSize,
  totalItems,
  onPageChange,
  className,
  maxVisiblePages = 5,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === totalPages;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, pageNumber - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          variant={i === pageNumber ? "default" : "outline"}
          className={`mx-[1px] ${
            i === pageNumber ? "bg-primary text-white" : ""
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(pageNumber - 1)}
        disabled={isFirstPage}
        className="disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {renderPageNumbers()}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(pageNumber + 1)}
        disabled={isLastPage}
        className="disabled:opacity-50"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
