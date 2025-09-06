"use client";

import React, { useEffect, useState } from "react";
import { SectionWrapper } from "@/components/common/utils/common";
import { getChapterDetailBySlug } from "@/services/chapter-service";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { IChapterDetail } from "@/types/comic.type";
import { IApiResponse } from "@/types/global";

interface IProps {
  chapter: string;
}

const ChapterDetailPage = ({ chapter }: IProps) => {
  const [data, setData] = useState<IChapterDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDetails() {
      if (!chapter) {
        setError("Không có chapter");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const token = getAccessToken();
        
        console.log("Fetching chapter:", chapter);
        const res: IApiResponse<IChapterDetail> = await getChapterDetailBySlug(
          chapter,
          token ?? ""
        );
        
        console.log("API Response:", res);
        
        if (res && isSuccessResponse(res?.statusCode, res?.success)) {
          setData(res.data);
          setError(null);
        } else {
          setError(`API Error: ${res?.statusCode} - ${res?.message || "Unknown error"}`);
        }
      } catch (err) {
        console.error("Error when fetching chapter details: ", err);
        setError(`Network Error: ${err}`);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [chapter]);

  if (loading) {
    return (
      <SectionWrapper className="pt-16 pb-16 max-w-[830px] bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải chương...</p>
        </div>
      </SectionWrapper>
    );
  }

  if (error) {
    return (
      <SectionWrapper className="pt-16 pb-16 max-w-[830px] bg-white">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Lỗi tải chương
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {error}
          </p>
          <div className="space-y-2">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Thử lại
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm"
            >
              Quay lại
            </button>
          </div>
        </div>
      </SectionWrapper>
    );
  }

  if (!data) {
    return (
      <SectionWrapper className="pt-16 pb-16 max-w-[830px] bg-white">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Không có dữ liệu
          </h3>
          <p className="text-gray-600 text-sm">
            Chương này không tồn tại hoặc đã bị xóa.
          </p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper className="pt-16 pb-16 max-w-[830px] bg-white">
      <div className="w-full">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
          {data.title}
        </h1>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-2">
            <strong>Tác giả:</strong> {data.authorName}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Ngày tạo:</strong> {new Date(data.createdAt).toLocaleDateString('vi-VN')}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Lượt xem:</strong> {data.totalViews}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Giá:</strong> {data.unitPrice} điểm
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Đã mua:</strong> {data.isPurchased ? "Có" : "Chưa"}
          </p>
        </div>

        {data.thumbnail && (
          <div className="mb-6">
            <img 
              src={data.thumbnail} 
              alt={data.title}
              className="w-full max-w-md mx-auto rounded-lg shadow-md"
            />
          </div>
        )}

        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">Nội dung chương:</h2>
          <div 
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Debug Info:</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Chapter Slug:</strong> {chapter}</p>
            <p><strong>Chapter ID:</strong> {data.id}</p>
            <p><strong>Comic Slug:</strong> {data.comicSlug}</p>
            <p><strong>Comic Title:</strong> {data.comicTitle}</p>
            <p><strong>User Agent:</strong> {typeof window !== 'undefined' ? navigator.userAgent : 'N/A'}</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ChapterDetailPage;