"use client";

import React, { Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { DotLoader } from "@/components/common/utils/loading";
import { useGetDetailsNotificationBySlug } from "@/queries/notification.query";
import { SectionWrapper } from "@/components/common/utils/common";
import { ArrowLeft, Bell, User, Calendar } from "lucide-react";
import { formatDateToVN } from "@/utils/time-handler";
import ImageBase from "@/components/common/image-base/image-base";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getAccessToken } from "@/utils/api-handler";
import ButtonBase from "@/components/common/utils/button/button-base";

const NotificationDetailClient: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { data, isLoading, error } = useGetDetailsNotificationBySlug(
    getAccessToken() ?? "",
    slug
  );

  const handleBackClick = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <section className="min-h-screen sm:py-12">
        <SectionWrapper>
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6" />
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-orange-100 p-6 mb-6">
                <div className="flex gap-6 mb-6">
                  <div className="w-32 h-32 bg-gray-200 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="h-4 bg-gray-200 rounded w-4/5" />
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>
    );
  }

  if (error || !data?.data) {
    return (
      <section className="min-h-screen sm:py-12">
        <SectionWrapper>
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
              <Bell size={32} className="text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Không tìm thấy thông báo
            </h3>
            <p className="text-gray-500 mb-6">
              Thông báo bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
            <Button onClick={handleBackClick} variant="outline">
              <ArrowLeft size={16} className="mr-2" />
              Quay lại
            </Button>
          </div>
        </SectionWrapper>
      </section>
    );
  }

  const notification = data.data;

  return (
    <section className="min-h-screen sm:py-12">
      <SectionWrapper>
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <ButtonBase onClick={handleBackClick} variants="outline" size="sm">
              <ArrowLeft size={14} className="mr-2" />
              Quay lại danh sách
            </ButtonBase>
          </div>

          {/* Notification Detail Card */}
          <Card className="bg-white/70 backdrop-blur-sm border-primary/20 rounded-2xl overflow-hidden shadow-lg border-l-8 border-l-primary-light">
            <CardContent className="p-0">
              {/* Header with Thumbnail */}
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <ImageBase
                    src={notification.thumbnail}
                    alt={notification.title}
                    width={400}
                    height={400}
                    fallbackSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/default_image.png`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-4 right-4 bg-primary text-white rounded-full p-2 shadow-lg">
                  <Bell size={20} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-text-secondary mb-4 leading-tight">
                  {notification.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-primary-active rounded-xl border border-primary-light">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20">
                      <ImageBase
                        src={notification.accountAvatar}
                        alt={notification.accountName}
                        width={32}
                        height={32}
                        fallbackSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/default_image.png`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <User size={14} className="text-primary" />
                        <span className="font-medium">
                          {notification.accountName || "Hệ thống"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar size={14} className="text-primary/60" />
                      <span>{formatDateToVN(notification.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="prose prose-lg max-w-none">
                  <div
                    className={cn(
                      "text-gray-700 leading-relaxed",
                      "prose-headings:text-text-secondary prose-headings:font-bold",
                      "prose-p:text-gray-700 prose-p:mb-4",
                      "prose-strong:text-primary prose-strong:font-semibold",
                      "prose-ol:text-gray-700 prose-ul:text-gray-700",
                      "prose-li:text-gray-700 prose-li:mb-2",
                      "prose-blockquote:border-l-4 prose-blockquote:border-primary/30",
                      "prose-blockquote:bg-orange-50/30 prose-blockquote:pl-4 prose-blockquote:py-2",
                      "prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded",
                      "prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-4 prose-pre:rounded-lg",
                      "prose-a:text-primary prose-a:underline hover:prose-a:text-primary-dark",
                      "prose-img:rounded-lg prose-img:shadow-md",
                      "prose-hr:border-gray-300 prose-hr:my-8"
                    )}
                    dangerouslySetInnerHTML={{
                      __html: notification.description,
                    }}
                  />
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center">
                  <ButtonBase
                    onClick={handleBackClick}
                    variants="outline"
                    size="sm"
                  >
                    <ArrowLeft size={14} className="mr-2" />
                    Quay lại
                  </ButtonBase>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>
    </section>
  );
};

const NotificationDetailPage = () => {
  return (
    <Suspense fallback={<DotLoader />}>
      <NotificationDetailClient />
    </Suspense>
  );
};

export default NotificationDetailPage;
