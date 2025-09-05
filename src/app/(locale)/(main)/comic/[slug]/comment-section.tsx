"use client";

import { NoDataBase } from "@/components/common/utils/no-data";
import { DEFAULT_PAGE_NUMBER } from "@/data/constants/global";
import { useGetComments } from "@/queries/comment.query";
import { IComment } from "@/types/comment.type";
import { renderTimeCreatedAt } from "@/utils/time-handler";
import { ChevronDown, ChevronUp, Clock, MessageSquare } from "lucide-react";
import React, { memo, useEffect, useState } from "react";
import AddComment from "./add-comment";
import DeleteComment from "./delete-comment";
import { useAuthStore } from "@/stores/auth-store";
import { SeparatorBase } from "@/components/common/utils/common";
import { LoadingSpinner } from "@/components/common/utils/loading";
import Image from "next/image";
import ImageBase from "@/components/common/image-base/image-base";

interface IProps {
  comicId: string;
}

const CommentSection = ({ comicId }: IProps) => {
  const user = useAuthStore((state) => state.user);

  const [expandedReplies, setExpandedReplies] = useState<{
    [key: string]: boolean;
  }>({});
  const [showReplyInput, setShowReplyInput] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleReplies = (commentId: string) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const toggleReplyInput = (commentId: string) => {
    setShowReplyInput((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const [pageNumber, setPageNumber] = useState<number>(DEFAULT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState<number>(1000);

  // Sync state with query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get("pageNumber") || "1", 10);
    const size = parseInt(queryParams.get("pageSize") || "20", 10);

    if (pageNumber !== page || pageSize !== size) {
      setPageNumber(page);
      setPageSize(size);
    }
  }, [pageNumber, pageSize]);

  const { isLoading, data } = useGetComments({
    comicId: comicId,
    pageNumber,
    pageSize,
  });

  return (
    <section className="w-full mx-auto mt-6 p-6 bg-white rounded-3xl shadow-xl max-sm:p-3 max-sm:rounded-xl">
      <div className="flex justify-between gap-2 mb-4 flex-wrap">
        <h2 className="text-base font-bold text-primary flex items-center gap-2 max-sm:text-sm">
          <MessageSquare size={20} className="max-sm:w-4 max-sm:h-4" />
          Bình luận ({data?.data?.length || 0})
        </h2>
      </div>
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <div className="flex items-center justify-center h-[70vh]">
            <LoadingSpinner />
          </div>
        ) : data && data?.data?.length > 0 ? (
          data?.data?.map((item: IComment) => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg max-sm:p-2 max-sm:gap-2"
            >
              <div className="w-10 h-10 flex-shrink-0 max-sm:w-8 max-sm:h-8">
                <ImageBase
                  src={item.authorAvatar}
                  alt={item.authorName}
                  width={40}
                  height={40}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800 max-sm:text-sm">
                      {item.authorName}
                    </span>
                  </div>
                  {(user?.id === item.authorId || user?.role === "Admin") && (
                    <DeleteComment commentId={item.id} />
                  )}
                </div>
                <p className="font-normal text-sm text-gray-800 mt-1 max-sm:text-xs">
                  {item.content}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      toggleReplies(item.id);
                      toggleReplyInput(item.id);
                    }}
                    className="text-primary text-sm mt-1 font-semibold hover:underline flex items-end gap-1 max-sm:text-xs"
                  >
                    {expandedReplies[item.id] ? (
                      <>
                        Ẩn trả lời ({item.replies.length})
                        <ChevronUp
                          size={16}
                          className="max-sm:w-3 max-sm:h-3"
                        />
                      </>
                    ) : (
                      <>
                        Trả Lời ({item.replies.length})
                        <ChevronDown
                          size={16}
                          className="max-sm:w-3 max-sm:h-3"
                        />
                      </>
                    )}
                  </button>
                  <p className="text-sm text-gray-500 flex gap-1.5 items-center max-sm:text-xs">
                    <Clock size={14} className="max-sm:w-3 max-sm:h-3 mt-0.5" />
                    {renderTimeCreatedAt(item.createdAt)}
                  </p>
                </div>
                {expandedReplies[item.id] && (
                  <div className="mt-2">
                    {item.replies.map((reply: IComment) => (
                      <div
                        key={reply.id}
                        className="flex items-start gap-3 p-3 bg-slate-100 rounded-lg mt-2 max-sm:p-2 max-sm:gap-2"
                      >
                        <div className="w-8 h-8 flex-shrink-0 max-sm:w-6 max-sm:h-6">
                          <Image
                            unoptimized
                            src={reply.authorAvatar}
                            alt={reply.authorName}
                            width={32}
                            height={32}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-800 max-sm:text-sm">
                                {reply.authorName}
                              </span>
                            </div>
                            {(user?.id === reply.authorId ||
                              user?.role === "Admin") && (
                              <DeleteComment commentId={reply.id} />
                            )}
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="font-normal text-sm text-gray-800 mt-1 max-sm:text-xs">
                              {reply.content}
                            </p>
                            <p className="text-sm text-gray-500 flex gap-1.5 items-center mt-1 max-sm:text-xs min-w-[80px]">
                              <Clock
                                size={14}
                                className="max-sm:w-3 max-sm:h-3 mt-0.5"
                              />
                              {renderTimeCreatedAt(item.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {showReplyInput[item.id] && (
                      <div className="mt-2">
                        <SeparatorBase />
                        <AddComment
                          comicId={comicId}
                          parentId={item.id}
                          isReply={true}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <NoDataBase
            title="Chưa có bình luận!"
            desc="Hãy là người đầu tiên bình luận truyện!"
            imgSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/no-data.webp`}
            className="py-4 max-sm:py-2"
          />
        )}
        <AddComment comicId={comicId} />
      </div>
    </section>
  );
};

export default memo(CommentSection);
