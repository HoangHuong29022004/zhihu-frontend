"use client";
import ButtonBase from "@/components/common/utils/button/button-base";
import { SectionWrapper } from "@/components/common/utils/common";
import { renderTimeCreatedAt } from "@/utils/time-handler";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  CheckIcon,
  Clock9,
  DollarSign,
  Eye,
  LockKeyhole,
  LockKeyholeOpen,
  Share2Icon,
  User,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ScrollDetailsAction from "./scroll-detail-actions";
import { IChapterDetail } from "@/types/comic.type";
import { IApiResponse } from "@/types/global";
import { getChapterDetailBySlug } from "@/services/chapter-service";
import {
  clearAllCookies,
  getAccessToken,
  getXUserId,
  isSuccessResponse,
} from "@/utils/api-handler";
import { useComicStore } from "@/stores/comic-store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { purchasedChapter } from "@/services/payment-service";
import { LoadingSpinner } from "@/components/common/utils/loading";
import { toast } from "@/hooks/use-toast";
import ImageBase from "@/components/common/image-base/image-base";
import { formatTextDescription } from "@/utils/common";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import Image from "next/image";
import { useAuthStore } from "@/stores/auth-store";
import { InputLabelBase } from "@/components/common/utils/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CURRENCY_TYPE_OPTIONS,
  CURRENCY_TYPE_PURCHASED_OPTIONS,
} from "@/data/constants/global";

interface IProps {
  chapter: string;
}

const ChapterDetailPage = ({ chapter }: IProps) => {
  const [data, setData] = useState<IChapterDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [isPurchasedChapter, setIsPurchasedChapter] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { logout: handleLogoutAuthStore } = useAuthStore();
  const searchParams = useSearchParams();
  const index = Number(searchParams.get("index")) || 0;
  const { comicDetail } = useComicStore();
  const pathname = usePathname(); // "/comic/luc-linh-chau-13-tu-kiep-kho-tron/chuong-4"
  const comicSlug = pathname.split("/")[2]; // "luc-linh-chau-13-tu-kiep-kho-tron"
  const comicTitle = searchParams.get("comicTitle") ?? "";
  const [currencyType, setCurrencyType] = useState<string>(
    CURRENCY_TYPE_OPTIONS[0].value
  );

  // Hàm sao chép URL hiện tại
  const handleCopyCurrentUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast({
          variant: "default",
          title: "Sao chép đường dẫn thành công!",
        });
      })
      .catch((err) => {
        console.error("Error when copying url: ", err);
      });
  };

  // Navigation logic
  const chapters = comicDetail?.chapters || [];
  const nextChapterSlug = chapters[index + 1]?.slug;
  const prevChapterSlug = chapters[index - 1]?.slug;
  const isFirstChapter = index <= 0;
  const isLastChapter = index >= chapters.length - 1;

  const handlePreviousChapter = () => {
    if (!isFirstChapter && index > 0) {
      router.push(
        `/comic/${comicDetail?.slug}/${prevChapterSlug}?index=${
          index - 1
        }&comicTitle=${comicTitle}`
      );
    }
  };

  const handleNextChapter = () => {
    if (!isLastChapter && index < chapters.length - 1) {
      router.push(
        `/comic/${comicDetail?.slug}/${nextChapterSlug}?index=${
          index + 1
        }&comicTitle=${comicTitle}`
      );
    }
  };

  useEffect(() => {
    async function fetchDetails() {
      if (!chapter) return;
      
      try {
        setLoading(true);
        const token = getAccessToken();
        
        const res: IApiResponse<IChapterDetail> = await getChapterDetailBySlug(
          chapter,
          token ?? ""
        );
        
        if (res && isSuccessResponse(res?.statusCode, res?.success)) {
          setData(res.data);
        } else {
          setError("Không thể tải chương. Vui lòng thử lại sau.");
        }
      } catch (err) {
        console.error("Error when fetching chapter details: ", err);
        setError("Đã xảy ra lỗi khi tải chương.");
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [chapter]);

  // Bảo vệ nội dung khỏi copy
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ngăn chặn Ctrl+C, Ctrl+X, Ctrl+A, Ctrl+V
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "c" || e.key === "x" || e.key === "a" || e.key === "v")
      ) {
        e.preventDefault();
        return false;
      }

      // Ngăn chặn F12 (Developer Tools)
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }

      // Ngăn chặn Ctrl+Shift+I (Developer Tools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "I") {
        e.preventDefault();
        return false;
      }

      // Ngăn chặn Ctrl+Shift+C (Developer Tools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "C") {
        e.preventDefault();
        return false;
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("selectstart", handleSelectStart);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("selectstart", handleSelectStart);
    };
  }, []);

  const handleBuyChapter = async () => {
    try {
      setIsLoadingPayment(true);
      const token = getAccessToken();
      const xUserId = getXUserId();

      if (!token) {
        handleLogoutAuthStore();
        clearAllCookies();
        toast({
          variant: "destructive",
          title: "Đăng nhập hết hạn hoặc chưa đăng nhập!",
          description: "Vui lòng đăng nhập lại!",
        });
        router.push("/login");
        return;
      }

      const res = await purchasedChapter({
        xUserId: xUserId ?? "",
        accessToken: token ?? "",
        chapterId: data?.id ?? "",
        currencyType: Number(currencyType),
      });
      if (res && isSuccessResponse(res?.statusCode, res?.success)) {
        setOpenDialog(false);
        setIsPurchasedChapter(true);
        toast({
          title: "Mua chapter thành công!",
          description: "Bạn có thể đọc chapter ngay lập tức!",
        });

        // Refresh the page data immediately
        try {
          const refreshedRes: IApiResponse<IChapterDetail> =
            await getChapterDetailBySlug(chapter, token ?? "");
          if (
            refreshedRes &&
            isSuccessResponse(refreshedRes?.statusCode, refreshedRes?.success)
          ) {
            setData(refreshedRes.data);
          }
        } catch (refreshError) {
          console.error("Error refreshing chapter data: ", refreshError);
          // Fallback to router refresh if data refresh fails
          router.refresh();
        }
      } else {
        toast({
          variant: "destructive",
          title: "Mua chapter thất bại!",
          description: "Có lỗi xảy ra vui lòng kiểm tra lại!",
        });
      }
    } catch (error) {
      console.error("Error when buying chapter: ", error);
      toast({
        variant: "destructive",
        title: "Mua chapter thất bại!",
        description: "Có lỗi xảy ra vui lòng kiểm tra lại!",
      });
    } finally {
      setIsLoadingPayment(false);
    }
  };

  // Handle loading state
  if (loading) {
    return (
      <SectionWrapper className="pt-16 pb-16 max-w-[830px] bg-white">
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

  // Handle error or no data
  if (error || !data || !data.title) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Không thể tải chương
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {error || "Chương này không tồn tại hoặc đã bị xóa."}
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
      </div>
    );
  }

  return (
    <SectionWrapper className="pt-16 pb-16 max-w-[830px] bg-white">
      {/* Header Section */}

      <div className="w-full animationShowPopover">
        <ImageBase
          width={180}
          height={274}
          src={data.thumbnail}
          alt={data?.title}
          fallbackSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/default_image.png`}
          className="w-fit h-[300px] mx-auto text-center object-contain object-center rounded-tr-[42px] mb-10 border-2 border-primary"
        />

        <h1 className="text-2xl md:text-5xl font-bold text-text-main mb-6 flex items-center gap-2">
          {!data.isPurchased && !isPurchasedChapter && (
            <LockKeyhole size={46} color="#F472B6" />
          )}
          {data.title}
        </h1>
        <div className="flex items-center mb-4 gap-4 flex-wrap">
          <Link
            href={`/comic/${comicSlug ?? data.comicSlug}`}
            className="text-base text-text-secondary flex items-center gap-2 font-bold cursor-pointer hover:text-text-main"
          >
            <BookOpen size={16} />
            {comicTitle || data.comicTitle}
          </Link>
          <div className="flex gap-2">
            {data.unitPrice > 0 && (
              <p className="text-xs text-[#F472B6] bg-[#FDF2F8] px-2 py-0.5 rounded-full flex justify-center font-bold items-center gap-1 shadow font-semibold">
                {data.unitPrice}{" "}
                <Image
                  unoptimized
                  src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/strawberry.png`}
                  alt="strawberry-icon"
                  width={14}
                  height={14}
                  className="object-contain object-center ml-1"
                />
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-1 justify-start mb-2">
          {comicDetail?.categories.map((item, index) => (
            <span
              key={index}
              className="text-xs font-semibold bg-primary text-white px-4 py-1 rounded-full flex justify-center items-center gap-1 shadow w-fit"
            >
              {item.name}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-2">
            <p className="text-text-secondary text-xs flex items-center gap-1">
              <User className="text-gray-500 w-5 h-5" />
              <span className="text-text-secondary font-medium">
                {data.authorName}
              </span>
            </p>
            <span className="text-text-secondary text-xs">-</span>
            <p className="text-text-secondary text-xs flex items-center gap-1">
              <Clock9 size={14} />
              <span className="font-semibold">
                {renderTimeCreatedAt(data.createdAt)}
              </span>
            </p>
            <p className="text-xs text-[#F472B6] bg-[#FDF2F8] px-2 py-1 rounded-full flex justify-center items-center gap-1 shadow font-bold">
              <Eye size={16} />
              {data.totalViews}
            </p>
          </div>
          <button
            className="text-text-secondary text-xs flex items-center gap-1"
            onClick={handleCopyCurrentUrl}
          >
            <Share2Icon />
          </button>
        </div>
      </div>

      {!data.isPurchased && !isPurchasedChapter && data.unitPrice > 0 ? (
        <AlertDialog open={isOpenDialog} onOpenChange={setOpenDialog}>
          <div className="border-1 mt-8 bg-slate-50 max-sm:p-6 sm:p-8 rounded-[24px] border border-primary">
            <h2 className="font-bold text-2xl text-center uppercase text-primary flex items-center justify-center gap-2">
              <DollarSign className="w-6 h-6" />
              CHƯƠNG VIP
            </h2>
            <div className="mt-4 flex flex-col gap-2">
              <p className="flex gap-2 items-center">
                <CheckIcon size={20} className="text-primary" />
                <span className="mb-1 italic text-text-secondary text-base">
                  Giá cần trả
                </span>
                <span className="text-xs mb-1 text-[#F472B6] bg-[#FDF2F8] px-2 py-0.5 rounded-full flex justify-center font-bold items-center gap-1 shadow font-semibold">
                  {data.unitPrice}{" "}
                  <Image
                    unoptimized
                    src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/strawberry.png`}
                    alt="strawberry-icon"
                    width={14}
                    height={14}
                    className="object-contain object-center"
                  />
                </span>
                <span className="mb-1 italic text-text-secondary text-base">
                  để trải nghiệm đọc chương này.
                </span>
              </p>
              <p className="flex gap-2 items-center">
                <CheckIcon size={20} className="text-primary" />
                <span className="mb-1 italic text-text-secondary text-base">
                  Bạn sẽ xem chương này với số lần không bị giới hạn.
                </span>
              </p>
              <p className="flex gap-2 items-center">
                <CheckIcon size={20} className="text-primary" />
                <span className="mb-1 italic text-text-secondary text-base">
                  Nếu bạn đã mua combo truyện thì tất cả chương này sẽ miễn phí.
                </span>
              </p>
              <p className="flex gap-2 items-center">
                <CheckIcon size={20} className="text-primary" />
                <span className="mb-1 italic text-text-secondary text-base">
                  Chúng tôi sẽ chỉ trừ số điểm của bạn cho lần xem chương đầu
                  tiên.
                </span>
              </p>
              <p className="flex gap-2 items-center">
                <CheckIcon size={20} className="text-primary" />
                <span className="mb-1 italic text-text-secondary text-base">
                  Khi bạn mua thành công hãy kiểm tra lại số điểm trong phần{" "}
                  <Link
                    href="/user/manage-currency"
                    className="font-semibold text-primary hover:text-primary-light"
                  >
                    Quản lý tiền tệ
                  </Link>
                </span>
              </p>
            </div>
            <AlertDialogTrigger asChild>
              <ButtonBase
                icon={<LockKeyholeOpen />}
                className="text-center w-full mt-4"
              >
                Mua ngay
              </ButtonBase>
            </AlertDialogTrigger>
          </div>

          <AlertDialogContent className="max-sm:w-[90%] sm:w-[460px]">
            <AlertDialogHeader>
              <AlertDialogTitle>
                <span className="flex gap-2 items-center">
                  <Bell size={20} />
                  Thống báo
                </span>
              </AlertDialogTitle>
              <p className="text-base text-left">
                Bạn có xác nhận mua chương này?
              </p>
              <div className="flex items-center gap-2 text-base">
                <span className="font-semibold">Giá chương:</span>
                <p className="text-base text-[#F472B6] bg-[#FDF2F8] px-2 py-0.5 rounded-full flex justify-center font-bold items-center gap-1 shadow font-semibold">
                  {data.unitPrice}{" "}
                  <Image
                    unoptimized
                    src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/strawberry.png`}
                    alt="strawberry-icon"
                    width={14}
                    height={14}
                    className="object-contain object-center"
                  />
                </p>
              </div>
              <div className="w-full">
                <InputLabelBase label="Loại tiền" />
                <Select
                  value={currencyType}
                  onValueChange={(value) => setCurrencyType(value)}
                >
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Loại tiền..." />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCY_TYPE_PURCHASED_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </AlertDialogHeader>
            <InlineHint className="mt-0" />
            <AlertDialogFooter>
              <div className="w-full flex gap-2 justify-end">
                <ButtonBase
                  type="button"
                  onClick={() => setOpenDialog(false)}
                  variants="accent"
                >
                  <div className="flex gap-1 items-center">Hủy bỏ</div>
                </ButtonBase>
                <ButtonBase
                  type="button"
                  className={`${isLoadingPayment && "cursor-wait opacity-60"}`}
                  disabled={isLoadingPayment}
                  onClick={handleBuyChapter}
                >
                  {isLoadingPayment ? (
                    <LoadingSpinner type="button" text="Xác nhận" />
                  ) : (
                    <div className="flex gap-1 items-center">Xác nhận</div>
                  )}
                </ButtonBase>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <div className="mx-auto my-16 relative">
          <div
            className={`bg-white text-lg text-pretty animationShowPopover select-none`}
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
            }}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            dangerouslySetInnerHTML={{
              __html: formatTextDescription(data.content),
            }}
          />
          <ScrollDetailsAction />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="max-w-4xl mx-auto p-6 flex justify-center gap-4">
        {!isFirstChapter && (
          <ButtonBase
            icon={<ArrowLeft size={16} />}
            variants="outline"
            disabled={isFirstChapter}
            onClick={handlePreviousChapter}
          >
            Chương trước
          </ButtonBase>
        )}
        {!isLastChapter && (
          <ButtonBase
            icon={<ArrowRight size={16} />}
            disabled={isLastChapter}
            onClick={handleNextChapter}
          >
            Chương sau
          </ButtonBase>
        )}
      </div>
    </SectionWrapper>
  );
};

export default ChapterDetailPage;
