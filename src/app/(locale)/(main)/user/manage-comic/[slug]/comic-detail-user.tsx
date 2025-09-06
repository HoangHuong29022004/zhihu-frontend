/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useState } from "react";
import HeaderComicDetails from "@/app/(locale)/(admin)/admin/comic/[slug]/header-comic";
import DeleteChapter from "@/app/(locale)/(admin)/admin/comic/[slug]/delete-chapter";
import { useGetDetailsComicBySlug } from "@/queries/comic.query";
import { getAccessToken } from "@/utils/api-handler";
import { LoadingSpinner } from "@/components/common/utils/loading";
import NotFound from "@/app/not-found";
import ChapterSectionUser from "./chapter-section-user";
import AudioSectionUser from "./audio-section-user";
import DeleteAudio from "@/app/(locale)/(admin)/admin/comic/[slug]/delete-audio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Headphones } from "lucide-react";

interface IProps {
  comicSlug: string;
}

const ComicDetailUserPage = ({ comicSlug }: IProps) => {
  const { data, isLoading } = useGetDetailsComicBySlug(
    getAccessToken() ?? "",
    comicSlug
  );

  const [deletedItem, setDeletedItem] = useState<any>(null);
  const [deletedAudioItem, setDeletedAudioItem] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"chapters" | "audios">("chapters");

  // Sort chapters by extracting the first number from title
  const sortedChapters = data && (data as any).data && (data as any).data.chapters
    ? [...(data as any).data.chapters]
        .sort((a, b) => {
          const getChapterNumber = (title: string) => {
            const match = title.match(/\d+/);
            return match ? parseInt(match[0], 10) : 0;
          };
          return getChapterNumber(a.title) - getChapterNumber(b.title);
        })
        .map((chapter, idx) => ({
          ...chapter,
          index: idx,
        }))
    : [];

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-[70vh]">
          <LoadingSpinner />
        </div>
      ) : data && (data as any)?.data ? (
        <div>
          {/* Header Section */}
          <HeaderComicDetails data={(data as any)?.data} className="mt-0" />

          {/* Tabs Section */}
          <Tabs
            defaultValue="chapters"
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "chapters" | "audios")
            }
            className="w-full mt-10"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="chapters" className="flex items-center gap-2">
                <BookOpen size={20} />
                Chương ({(data as any).data.chapters.length})
              </TabsTrigger>
              <TabsTrigger value="audios" className="flex items-center gap-2">
                <Headphones size={20} />
                Audio ({(data as any).data.audios?.length || 0})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="chapters">
              <ChapterSectionUser
                data={{
                  ...(data as any).data,
                  chapters: sortedChapters,
                }}
                onDelete={(item, options) => {
                  setDeletedItem({
                    id: item,
                    options,
                  });
                }}
              />
            </TabsContent>
            <TabsContent value="audios">
              <AudioSectionUser
                data={{
                  ...(data as any).data,
                  chapters: sortedChapters,
                }}
                onDelete={(item, options) => {
                  setDeletedAudioItem({
                    id: item,
                    options,
                  });
                }}
              />
            </TabsContent>
          </Tabs>

          <DeleteChapter
            item={deletedItem}
            setItem={setDeletedItem}
            comicSlug={comicSlug}
          />
          <DeleteAudio item={deletedAudioItem} setItem={setDeletedAudioItem} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-[70vh]">
          <NotFound />
        </div>
      )}
    </div>
  );
};

export default ComicDetailUserPage;
