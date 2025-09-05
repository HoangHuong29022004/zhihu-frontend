"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

import { ButtonBase } from "@/components/common/utils/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";

// Icon từ lucide-react
import {
  User,
  Banknote,
  CreditCard,
  FileText,
  DollarSign,
  InfoIcon,
  CheckIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { formatToVND, getAmountFromQRString } from "@/utils/common";
import { CountdownTimer } from "@/components/common/utils/count-down";
import { toast } from "@/hooks/use-toast";
import { PAYMENT_STEPS } from "@/data/constants/global";
import { StepBaseProgress } from "@/components/common/utils/common";
import ImageBase from "@/components/common/image-base/image-base";
import NotifyModal from "./notify-modal";
import { IPaymentSeePayInfoResponse } from "@/types/payment";
import { useCheckTransaction } from "@/queries/payment.query";
import { getAccessToken } from "@/utils/api-handler";
import { LoadingSpinner } from "@/components/common/utils/loading";

interface IProps {
  item: string;
  setItem: (value: boolean) => void;
  data: IPaymentSeePayInfoResponse;
}

// Define scanning animation variants
const scanVariants: Variants = {
  initial: { y: -10, opacity: 0 },
  animate: (i: number) => ({
    y: 330, // Move to bottom of QR code (320px height + 10px offset)
    opacity: [0, 0.7, 0], // Fade in then out
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: i * 0.5, // Stagger bars by 0.5s
      },
      opacity: {
        times: [0, 0.3, 1], // Control opacity timing
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: i * 0.5,
      },
    },
  }),
};

const PaymentModal = ({ item, setItem, data }: IProps) => {
  const amount = getAmountFromQRString(item);
  const [isShowNotify, setIsShowNotify] = useState<boolean>(false);
  const [shouldCheckTransaction, setShouldCheckTransaction] =
    useState<boolean>(false);
  const [isPaymentInfoExpanded, setIsPaymentInfoExpanded] =
    useState<boolean>(false);

  const { data: checkTransactionData, isLoading } = useCheckTransaction({
    token: getAccessToken() ?? "",
    note: data?.note || "",
    enabled: shouldCheckTransaction,
  });

  const handleCompletePayment = () => {
    setShouldCheckTransaction(true);
    setItem(false);
    setIsShowNotify(true);
  };

  const infoList = [
    {
      label: "Tên",
      value: data?.fullName,
      icon: <User size={16} />,
    },
    {
      label: "Ngân hàng",
      value: data?.bankName,
      icon: <Banknote size={16} />,
    },
    {
      label: "Số tài khoản",
      value: data?.accountNumber,
      icon: <CreditCard size={16} />,
    },
    {
      label: "Nội dung",
      value: data?.note,
      icon: <FileText size={16} />,
    },
    {
      label: "Quy đổi",
      value: amount
        ? `+${Math.floor(amount * 0.8)} dâu (+${Math.floor(amount * 0.8)} kem)`
        : 0,
      icon: <DollarSign size={16} />,
      highlight: false,
    },
    {
      label: "Số tiền",
      value: formatToVND(data?.amount),
      icon: <DollarSign size={16} />,
      highlight: true,
    },
  ];

  return (
    <>
      <NotifyModal
        item={isShowNotify}
        setItem={setIsShowNotify}
        imgSrc={
          checkTransactionData?.status === "PAID"
            ? `${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/check_success.svg`
            : ""
        }
        renderHeading={() =>
          checkTransactionData?.status === "PAID" ? (
            <div className="flex justify-center gap-1 items-center mt-3 text-primary">
              <CheckIcon size={20} />
              <h1 className="text-center font-semibold text-lg">
                Nạp điểm thành công!
              </h1>
            </div>
          ) : (
            <div className="flex justify-center gap-1 items-center mt-3 text-primary">
              <h1 className="text-center font-semibold text-lg">
                Opps! Giao dịch đang được kiểm duyệt!
              </h1>
            </div>
          )
        }
        description={
          checkTransactionData?.status === "PAID"
            ? "Xin chúc mừng bạn đã nạp điểm thành công!"
            : "Giao dịch của bạn đang được chúng tôi xử lí!"
        }
      />
      <Dialog open={Boolean(item)}>
        <DialogContent className="sm:max-w-2xl max-sm:w-[94%] h-[94vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Thanh toán</DialogTitle>
            <DialogDescription>Hãy quét mã để thanh toán</DialogDescription>
          </DialogHeader>

          <div className="flex mt-4">
            {PAYMENT_STEPS.map((item, index: number) => (
              <StepBaseProgress
                isMobile={true}
                key={index}
                step={item}
                index={index}
                currentActive={2}
              />
            ))}
          </div>

          <div className="flex gap-2 items-center bg-yellow-100 px-2 py-2 rounded-md">
            <InfoIcon size={16} />
            <span className="text-text-secondary font-semibold">
              Giao dịch sẽ hết hạn sau
            </span>
            <CountdownTimer
              initialTime={900} // 300 seconds = 5 minutes
              onExpire={() => {
                setItem(false);
                toast({
                  variant: "destructive",
                  title: "Opps! Giao dịch đã hết hạn!",
                  description: "Vui lòng chọn lại giao dịch mới",
                });
              }}
              className="text-text-secondary font-bold"
              storageKey="countdown-payment"
              resetCountdown={!item}
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start mt-2">
            <div className="w-full lg:w-1/2 lg:border-r lg:pr-6">
              {/* Desktop: Hiển thị đầy đủ */}
              <div className="hidden lg:block">
                <h3 className="font-semibold text-lg mb-4">
                  Thông tin chuyển khoản
                </h3>
                <ul className="space-y-3 text-sm">
                  {infoList.map((info, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="pt-1">{info.icon}</span>
                      <span className="break-all">
                        <strong>{info.label}:</strong>{" "}
                        <span
                          className={
                            info.highlight
                              ? "text-primary font-semibold text-base sm:text-lg"
                              : ""
                          }
                        >
                          {info.value}
                        </span>
                      </span>
                    </li>
                  ))}
                  <div className="p-2 border rounded-lg mx-auto lg:mx-0">
                    <ImageBase
                      src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/sepay-logo.png`}
                      alt="sePay-logo"
                      width={100}
                      height={100}
                      className="object-cover object-center rounded-md text-center mx-auto"
                    />
                  </div>
                </ul>
              </div>

              {/* Mobile: Dropdown */}
              <div className="lg:hidden">
                <button
                  onClick={() =>
                    setIsPaymentInfoExpanded(!isPaymentInfoExpanded)
                  }
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-semibold text-lg">
                    Thông tin chuyển khoản
                  </h3>
                  {isPaymentInfoExpanded ? (
                    <ChevronUp size={20} className="text-gray-600" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-600" />
                  )}
                </button>

                {isPaymentInfoExpanded && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                    <ul className="space-y-3 text-sm">
                      {infoList.map((info, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="pt-1">{info.icon}</span>
                          <span className="break-all">
                            <strong>{info.label}:</strong>{" "}
                            <span
                              className={
                                info.highlight
                                  ? "text-primary font-semibold text-base sm:text-lg"
                                  : ""
                              }
                            >
                              {info.value}
                            </span>
                          </span>
                        </li>
                      ))}
                      <div className="p-2 border rounded-lg mx-auto">
                        <ImageBase
                          src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/sepay-logo.png`}
                          alt="sePay-logo"
                          width={100}
                          height={100}
                          className="object-cover object-center rounded-md text-center mx-auto"
                        />
                      </div>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            {/* QR Code with Scanning Animation */}
            <div className="w-full lg:w-1/2 text-center mt-2 lg:mt-0">
              {item && (
                <div
                  className="relative inline-block"
                  aria-label="Scan this QR code to complete payment"
                >
                  <Image
                    unoptimized
                    src={item}
                    alt="QR Payment"
                    width={320}
                    height={320}
                    className="object-cover object-center mx-auto rounded-md shadow-md"
                  />
                  {/* Multiple scanning bars */}
                  <motion.div
                    variants={scanVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute left-0 right-0 h-2 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_rgba(0,128,255,0.7)]"
                    style={{ top: 0 }}
                  />
                </div>
              )}
            </div>
          </div>
          <InlineHint message="Hãy click nút hoàn tất khi thanh toán xong!" />
          <DialogFooter className="mt-2 gap-2">
            <ButtonBase
              className="font-semibold"
              type="button"
              variants="outline"
              onClick={() => {
                setItem(false);
                toast({
                  variant: "destructive",
                  title: "Opps! Bạn đã hủy bỏ giao dịch!",
                });
              }}
            >
              Hủy bỏ
            </ButtonBase>
            <ButtonBase
              className="font-semibold"
              type="submit"
              onClick={handleCompletePayment}
            >
              {isLoading ? (
                <LoadingSpinner type="button" text=" Hoàn tất thanh toán" />
              ) : (
                <div className="flex gap-1 items-center">
                  Hoàn tất thanh toán
                </div>
              )}
            </ButtonBase>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default memo(PaymentModal);
