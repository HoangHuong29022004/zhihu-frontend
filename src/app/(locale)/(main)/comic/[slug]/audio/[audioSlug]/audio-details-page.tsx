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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IApiResponse } from "@/types/global";
import {
  clearAllCookies,
  getAccessToken,
  getXUserId,
  isSuccessResponse,
} from "@/utils/api-handler";
import NotFound from "@/app/not-found";
import { useComicStore } from "@/stores/comic-store";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { purchasedAudio } from "@/services/payment-service";
import { LoadingSpinner } from "@/components/common/utils/loading";
import { toast } from "@/hooks/use-toast";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import { getAudioDetailBySlug } from "@/services/audio-service";
import { IAudioDetails } from "@/types/audio.type";
import CustomAudioPlayer from "@/components/common/audio-player/audio-player";
import PurchasedBox from "@/components/common/purschared-box/purchased-box";
import Image from "next/image";
import { useAuthStore } from "@/stores/auth-store";
import {
  CURRENCY_TYPE_OPTIONS,
  CURRENCY_TYPE_PURCHASED_OPTIONS,
} from "@/data/constants/global";
import { InputLabelBase } from "@/components/common/utils/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IProps {
  slug: string;
}

const AudioDetailsPage = ({ slug }: IProps) => {
  const [data, setData] = useState<IAudioDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [isPurchasedAudio, setIsPurchasedAudio] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { logout: handleLogoutAuthStore } = useAuthStore();
  const [currencyType, setCurrencyType] = useState<string>(
    CURRENCY_TYPE_OPTIONS[0].value
  );

  const searchParams = useSearchParams();
  const comicThumbnail = searchParams.get("comicThumbnail") ?? "";

  const index = Number(searchParams.get("index")) || 0;
  const { comicDetail } = useComicStore();
  const pathname = usePathname(); // "/comic/luc-linh-chau-13-tu-kiep-kho-tron/chuong-4"
  const comicSlug = pathname.split("/")[2]; // "luc-linh-chau-13-tu-kiep-kho-tron"
  const comicTitle = searchParams.get("comicTitle") ?? "";

  // Navigation logic
  const audios = comicDetail?.audios || [];
  const nextChapterSlug = audios[index + 1]?.slug;
  const prevChapterSlug = audios[index - 1]?.slug;
  const isFirstChapter = index <= 0;
  const isLastChapter = index >= audios.length - 1;

  const handlePreviousChapter = () => {
    if (!isFirstChapter && index > 0) {
      router.push(
        `/comic/${
          comicDetail?.slug
        }/audio/${prevChapterSlug}?comicThumbnail=${comicThumbnail}&index=${
          index - 1
        }&comicTitle=${comicTitle}`
      );
    }
  };

  const handleNextChapter = () => {
    if (!isLastChapter && index < audios.length - 1) {
      router.push(
        `/comic/${
          comicDetail?.slug
        }/audio/${nextChapterSlug}?comicThumbnail=${comicThumbnail}&index=${
          index + 1
        }&comicTitle=${comicTitle}`
      );
    }
  };

  useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true);
        const token = getAccessToken();
        const res: IApiResponse<IAudioDetails> = await getAudioDetailBySlug(
          token ?? "",
          slug
        );
        if (res && isSuccessResponse(res?.statusCode, res?.success)) {
          setData(res.data);
        }
      } catch (err) {
        console.error("Error when fetching audio details: ", err);
        setError("Đã xảy ra lỗi khi tải audio.");
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [slug]);

  const handleBuyAudio = async () => {
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

      const res = await purchasedAudio({
        xUserId: xUserId ?? "",
        accessToken: token ?? "",
        audioId: data?.id ?? "",
        currencyType: Number(currencyType),
      });
      if (res && isSuccessResponse(res?.statusCode, res?.success)) {
        setOpenDialog(false);
        setIsPurchasedAudio(true);
        toast({
          title: "Mua audio thành công!",
          description: "Bạn có thể nghe audio ngay lập tức!",
        });
        window.location.reload();
      } else {
        toast({
          variant: "destructive",
          title: "Mua audio thất bại!",
          description: "Có lỗi xảy ra vui lòng kiểm tra lại!",
        });
      }
    } catch (error) {
      console.error("Error when buying audio: ", error);
      toast({
        variant: "destructive",
        title: "Mua audio thất bại!",
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
          <div className="h-44 bg-gray-200 rounded w-full animate-pulse"></div>
        </div>
      </SectionWrapper>
    );
  }

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

  // Handle error or no data
  if (error || !data || !data.title) {
    return <NotFound />;
  }

  return (
    <SectionWrapper className="pt-16 pb-16 max-w-[830px] bg-white">
      {/* Header Section */}

      <div className="w-full animationShowPopover">
        <h1 className="text-2xl md:text-5xl font-bold text-text-main mb-6 flex items-center gap-2">
          {!data.isPurchased && !isPurchasedAudio && (
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
        <div className="flex gap-1 justify-start mb-2">
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

      {!data.isPurchased && !isPurchasedAudio && data.unitPrice > 0 ? (
        <AlertDialog open={isOpenDialog} onOpenChange={setOpenDialog}>
          <div className="border-1 mt-8 bg-slate-50 max-sm:p-6 sm:p-8 rounded-[24px] shadow-xl border border-primary">
            <h2 className="font-bold text-2xl text-center uppercase text-primary flex items-center justify-center gap-2">
              <DollarSign className="w-6 h-6" />
              Audio VIP
            </h2>
            <div className="mt-4 flex flex-col gap-2">
              <p className="flex gap-2 items-center">
                <CheckIcon size={20} className="text-primary" />
                <span className="mb-1 italic text-text-secondary text-base">
                  Bạn cần ủng hộ
                </span>
                <span className="text-xs mb-1 text-[#F472B6] bg-[#FDF2F8] px-2 py-0.5 rounded-full flex justify-center font-bold items-center gap-1 shadow font-semibold">
                  {data.unitPrice}{" "}
                  <Image
                    unoptimized
                    src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/strawberry.png`}
                    alt="strawberry-icon"
                    width={14}
                    height={14}
                    className="object-contain object-center ml-1"
                  />
                </span>
                <span className="mb-1 italic text-text-secondary text-base">
                  để trải nghiệm nghe audio này.
                </span>
              </p>
              <p className="flex gap-2 items-center">
                <CheckIcon size={20} className="text-primary" />
                <span className="mb-1 italic text-text-secondary text-base">
                  Bạn sẽ nghe audio này với số lần không bị giới hạn.
                </span>
              </p>
              <p className="flex gap-2 items-center">
                <CheckIcon size={20} className="text-primary" />
                <span className="mb-1 italic text-text-secondary text-base">
                  Nếu bạn đã mua combo truyện thì tất cả audio này sẽ miễn phí.
                </span>
              </p>
              <p className="flex gap-2 items-center">
                <CheckIcon size={20} className="text-primary" />
                <span className="mb-1 italic text-text-secondary text-base">
                  Chúng tôi sẽ chỉ trừ số điểm của bạn cho lần nghe đầu tiên.
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
                Bạn có xác nhận mua audio này?
              </p>
              <div className="flex items-center gap-2 text-base">
                <span className="font-semibold">Giá audio (dâu):</span>
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
                  onClick={handleBuyAudio}
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
          {data.unitPrice > 0 ? (
            <PurchasedBox
              title="Đã mua audio"
              renderDesc={() => (
                <p className="text-text-secondary mb-3 font-semibold italic">
                  Xin chúc mừng! Bạn đã mua thành công nội dung audio. Từ bây
                  giờ, bạn có thể thoải mái khám phá và tận hưởng thế giới âm
                  thanh phong phú với trải nghiệm nghe không giới hạn, mọi lúc
                  mọi nơi.
                </p>
              )}
              price={data.unitPrice}
            />
          ) : (
            <PurchasedBox
              title="Audio miễn phí"
              renderDesc={() => (
                <p className="text-text-secondary mb-3 font-semibold italic">
                  Đây là aduio miễn phí. Giờ đây, bạn có thể thỏa sức trải
                  nghiệm và tận hưởng thế giới âm thanh không giới hạn, bất cứ
                  lúc nào, hoàn toàn không mất phí.
                </p>
              )}
            />
          )}

          <CustomAudioPlayer
            src={data.url}
            title={data.title}
            authorName={data.authorName}
            totalViews={data.totalViews}
            createdAt={data.createdAt}
            thumbnailUrl={
              comicThumbnail?.trim()
                ? comicThumbnail
                : data.authorAvatar?.trim()
                ? data.authorAvatar
                : undefined
            }
          />
        </div>
      )}

      {/* Navigation Buttons */}
      {/* Navigation Buttons */}
      <div className="max-w-4xl mx-auto p-6 flex justify-center gap-4">
        {!isFirstChapter && (
          <ButtonBase
            icon={<ArrowLeft size={16} />}
            variants="outline"
            disabled={isFirstChapter}
            onClick={handlePreviousChapter}
          >
            Tập trước
          </ButtonBase>
        )}
        {!isLastChapter && (
          <ButtonBase
            icon={<ArrowRight size={16} />}
            disabled={isLastChapter}
            onClick={handleNextChapter}
          >
            Tập sau
          </ButtonBase>
        )}
      </div>
    </SectionWrapper>
  );
};

export default AudioDetailsPage;
