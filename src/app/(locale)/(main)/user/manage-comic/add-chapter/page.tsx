/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { memo, Suspense, useState } from "react";
import { DotLoader } from "@/components/common/utils/loading";
import { PenIcon, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ButtonBase } from "@/components/common/utils/button";
import { useSearchParams } from "next/navigation";
import AddSingleChapterForm from "./AddSingleChapterForm";
import AddMultipleChaptersForm from "./AddMultipleChaptersForm";

type TabType = "single" | "multiple";

const AddChapter = () => {
  const [activeTab, setActiveTab] = useState<TabType>("single");
  const searchParams = useSearchParams();
  const comicTitle = searchParams?.get("title") || "_";

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <PenIcon size={20} />
            <span>Đăng chương</span>
          </h1>
          <p className="text-md text-gray-500 font-bold italic flex items-center gap-2">
            <BookOpen className="text-gray-500" size={16} />
            {comicTitle}
          </p>
        </div>
        <Link href={`/user/manage-comic`}>
          <ButtonBase size="md" icon={<ArrowLeft />} variants="outline">
            Quay lại
          </ButtonBase>
        </Link>
      </div>
      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 ${
              activeTab === "single"
                ? "border-b-2 border-primary text-primary font-bold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("single")}
          >
            Đăng một chương
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "multiple"
                ? "border-b-2 border-primary text-primary font-bold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("multiple")}
          >
            Đăng nhiều chương
          </button>
        </div>
      </div>
      {activeTab === "single" ? (
        <AddSingleChapterForm />
      ) : (
        <AddMultipleChaptersForm />
      )}
    </div>
  );
};

const AddChapterPage = () => {
  return (
    <Suspense fallback={<DotLoader />}>
      <AddChapter />
    </Suspense>
  );
};

export default memo(AddChapterPage);
