import React from "react";
import ChapterDetailPage from "./chapter-detail-page";
import NotFound from "@/app/not-found";

interface IProps {
  params: Promise<{ chapter: string }>;
}

export async function generateMetadata({ params }: IProps) {
  const { chapter } = await params;
  return {
    title: `Nội dung chapter - ${chapter}`,
    description: `Thông tin chi tiết về ${chapter}`,
    keywords: `Truyện tranh, chapter, ${chapter}`,
  };
}

const ChapterDetail = async ({ params }: IProps) => {
  const { chapter } = await params;
  if (!chapter) {
    return <NotFound />;
  }

  return <ChapterDetailPage chapter={chapter} />;
};

export default ChapterDetail;
