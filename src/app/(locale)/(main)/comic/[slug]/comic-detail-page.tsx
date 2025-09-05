"use client";
import { SectionWrapper } from "@/components/common/utils/common";
import { IComicDetail } from "@/types/comic.type";
import React, { useEffect, useState } from "react";
import HeaderComicDetails from "@/app/(locale)/(admin)/admin/comic/[slug]/header-comic";
import CommentSection from "./comment-section";
import ChapterSection from "./chapter-section";
import AudioSection from "./audio-section";
import PurchasedComic from "./purchased-comic";
import { getComicDetailBySlug } from "@/services/comic-service";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Headphones } from "lucide-react";

interface IProps {
  comicSlug: string;
}

const ComicDetailPage = ({ comicSlug }: IProps) => {
  const [data, setData] = useState<IComicDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const queryParams = new URLSearchParams(location.search);
  const hot = queryParams.get("hot") || 0;
  const outstanding = queryParams.get("outstanding") || 0;
  const [activeTab, setActiveTab] = useState("chapters");

  const token = getAccessToken();

  useEffect(() => {
    const fetchComicDetails = async () => {
      try {
        const token = getAccessToken() ?? "";
        const res = await getComicDetailBySlug(comicSlug, token);
        if (res && isSuccessResponse(res?.statusCode, res?.success)) {
          setData(res.data);
        }
      } catch (error) {
        console.error("Error when fetching comic details: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (comicSlug) {
      fetchComicDetails();
    }
  }, [comicSlug]);

  if (loading || !data) {
    return (
      <SectionWrapper className="pt-16 pb-16 bg-white">
        <div className="w-full">
          {/* Image Skeleton */}
          <div className="w-full h-[150px] bg-gray-200 rounded-tr-[64px] animate-pulse mb-10"></div>
          {/* Title Skeleton */}
          <div className="h-12 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>
          {/* Metadata Skeleton */}
          <div className="flex items-center mb-4 gap-4">
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
            </div>
          </div>
          {/* Author and Views Skeleton */}
          <div className="flex justify-between items-center">
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
        </div>
        {/* Content Skeleton */}
        <div className="mx-auto my-16 relative flex flex-col gap-4">
          <div className="h-40 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-20 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-40 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-20 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-40 bg-gray-200 rounded w-full animate-pulse"></div>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper className="pt-6 pb-16">
      {/* Header Section */}
      <HeaderComicDetails
        data={data}
        hot={Number(hot) + 1}
        outstanding={Number(outstanding) + 1}
        isUserView={true}
        isLogin={Boolean(token)}
      />

      {data.status === "COMPLETED" && <PurchasedComic data={data} />}

      {/* Tabs Section */}
      <Tabs
        defaultValue="chapters"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mt-10 mb-6"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chapters" className="flex items-center gap-2">
            <BookOpen size={20} />
            Chương ({data.totalChapters})
          </TabsTrigger>
          <TabsTrigger value="audios" className="flex items-center gap-2">
            <Headphones size={20} />
            Audio ({data.audios.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chapters">
          <ChapterSection data={data} />
        </TabsContent>
        <TabsContent value="audios">
          <AudioSection data={data} />
        </TabsContent>
      </Tabs>

      {/* Comment section */}
      <CommentSection comicId={data.id} />
    </SectionWrapper>
  );
};

export default ComicDetailPage;
