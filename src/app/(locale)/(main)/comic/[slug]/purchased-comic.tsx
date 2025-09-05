"use client";
import { ButtonBase } from "@/components/common/utils/button";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import { LoadingSpinner } from "@/components/common/utils/loading";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { purchasedComic } from "@/services/payment-service";
import { IComicDetail } from "@/types/comic.type";
import {
  clearAllCookies,
  getAccessToken,
  getXUserId,
  isSuccessResponse,
} from "@/utils/api-handler";
import { Bell, CheckIcon, DollarSign, LockKeyholeOpen } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import PurchasedBox from "@/components/common/purschared-box/purchased-box";
import Image from "next/image";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputLabelBase } from "@/components/common/utils/input";
import {
  CURRENCY_TYPE_OPTIONS,
  CURRENCY_TYPE_PURCHASED_OPTIONS,
} from "@/data/constants/global";

interface IProps {
  data: IComicDetail;
}

const PurchasedComic = ({ data }: IProps) => {
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const router = useRouter();
  const { logout: handleLogoutAuthStore } = useAuthStore();
  const [currencyType, setCurrencyType] = useState<string>(
    CURRENCY_TYPE_OPTIONS[0].value
  );

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

      const res = await purchasedComic({
        xUserId: xUserId ?? "",
        accessToken: token ?? "",
        comicId: data?.id ?? "",
        currencyType: Number(currencyType),
      });
      if (res && isSuccessResponse(res?.statusCode, res?.success)) {
        setOpenDialog(false);
        toast({
          title: "Mua combo truyện thành công!",
          description: "Bạn có thể đọc chapter ngay lập tức!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Mua combo truyện thất bại!",
          description: "Có lỗi xảy ra vui lòng kiểm tra lại!",
        });
      }
    } catch (error) {
      console.error("Error when buying chapter: ", error);
      toast({
        variant: "destructive",
        title: "Mua combo truyện thất bại!",
        description: "Có lỗi xảy ra vui lòng kiểm tra lại!",
      });
    } finally {
      setIsLoadingPayment(false);
    }
  };

  return (
    <>
      {data.isPurchased && data.unitPrice > 0 ? (
        <PurchasedBox
          title="Đã mua combo truyện"
          renderDesc={() => (
            <p className="text-text-secondary mb-3 font-semibold italic">
              Xin chúc mừng! Bạn đã mua thành công combo truyện. Từ bây giờ,
              toàn bộ các chương truyện cùng phiên bản audio hấp dẫn đã sẵn sàng
              để bạn khám phá. Hãy tận hưởng hành trình trải nghiệm không giới
              hạn, mọi lúc mọi nơi, với đầy đủ nội dung và âm thanh sống động
              nhất.
            </p>
          )}
          price={data.unitPrice}
          txtSearch={data.title}
        />
      ) : data.unitPrice > 0 ? (
        <AlertDialog open={isOpenDialog} onOpenChange={setOpenDialog}>
          <div className="border-1 my-10 bg-slate-50 max-sm:p-6 sm:p-8 rounded-[24px] border border-primary">
            <h2 className="font-bold text-2xl text-center uppercase text-primary flex items-center justify-center gap-2">
              <DollarSign className="w-6 h-6" />
              MUA COMBO TRUYỆN
            </h2>
            <div className="mt-4 flex flex-col gap-2">
              <p className="flex gap-2 items-center">
                <CheckIcon size={20} className="text-primary" />
                <span className="mb-1 italic text-text-secondary text-base">
                  Ủng hộ
                </span>
                <span className="text-xs mb-1 text-[#F472B6] bg-[#FDF2F8] px-2 py-0.5 rounded-full flex justify-center font-bold items-center gap-1 shadow">
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
                  để trải nghiệm tất cả{" "}
                  <b className="text-primary">{data.totalChapters} chương </b>
                  không giới hạn.
                </span>
              </p>
              <p className="flex gap-2 items-center">
                <CheckIcon size={20} className="text-primary" />
                <span className="mb-1 italic text-text-secondary text-base">
                  Chúng tôi sẽ chỉ trừ số điểm của bạn khi mua combo này.
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
                Bạn có xác nhận mua combo truyện này?
              </p>
              <div className="flex items-center gap-2 text-base">
                <span className="font-semibold">Giá truyện:</span>
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
        ""
      )}
    </>
  );
};

export default PurchasedComic;
