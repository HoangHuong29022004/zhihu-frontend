/* eslint-disable @typescript-eslint/no-explicit-any */

import { memo, useState } from "react";
import { ButtonBase } from "@/components/common/utils/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/common/utils/loading";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import { formatToVND } from "@/utils/common";
import { usePaymentSeePay } from "@/queries/payment.query";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { toast } from "@/hooks/use-toast";
import PaymentModal from "./payment-modal";
import { StepBaseProgress } from "@/components/common/utils/common";
import { SHORT_PAYMENT_STEPS } from "@/data/constants/global";
import { IPaymentSeePayInfoResponse } from "@/types/payment";
import Image from "next/image";

interface IProps {
  item: number;
  setItem: (value: any) => void;
}

const ConfirmModal = ({ item, setItem }: IProps) => {
  const [qrUrl, setQrUrl] = useState<any>(null);
  const [seePayResponse, setSeePayResponse] =
    useState<IPaymentSeePayInfoResponse | null>(null);
  const strawberry = item ? Math.floor(item * 0.8) : 0;

  const { mutateAsync, isPending } = usePaymentSeePay(getAccessToken() ?? "");

  const handleConfirm = async () => {
    const res = await mutateAsync(item);
    if (res && isSuccessResponse(res?.statusCode, res?.success)) {
      toast({
        title: "Hãy quét mã để nạp điểm!",
      });
      setQrUrl(res?.data?.url);
      const paymentResponse: IPaymentSeePayInfoResponse = {
        amount: res?.data.amount,
        accountNumber: res?.data.accountNumber,
        bankName: res?.data.bankName,
        fullName: res?.data.fullName,
        note: res?.data.note,
        url: res?.data.url,
      };
      setSeePayResponse(paymentResponse);
      setItem("");
    } else {
      toast({
        variant: "destructive",
        title: "Nạp tiền không thành công!",
        description: res?.data,
      });
    }
  };

  return (
    <>
      <PaymentModal
        item={qrUrl}
        setItem={setQrUrl}
        data={seePayResponse as IPaymentSeePayInfoResponse}
      />
      <Dialog open={Boolean(item)} onOpenChange={setItem}>
        <DialogContent className="sm:w-max max-sm:w-[90%]">
          <DialogHeader>
            <DialogTitle>Xác nhận thanh toán</DialogTitle>
            <DialogDescription>Thông báo xác nhận</DialogDescription>
          </DialogHeader>
          <div className="flex mt-4">
            {SHORT_PAYMENT_STEPS.map((item, index: number) => (
              <StepBaseProgress
                isMobile={true}
                key={index}
                step={item}
                index={index}
                currentActive={1}
                separatorClassName="xl:w-6 mx-4"
              />
            ))}
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <p>
              Bạn muốn nạp số tiền:{" "}
              <b className="text-primary">{formatToVND(item)}</b>
            </p>
            <div className="flex gap-1">
              <span>Bạn sẽ nhận được</span>
              <div className="flex">
                <b>+{strawberry} </b>
                <Image
                  unoptimized
                  src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/strawberry.png`}
                  alt="strawberry-icon"
                  width={16}
                  height={16}
                  className="object-contain object-center ml-2"
                />
              </div>{" "}
              <span>và tặng kèm</span>
              <div className="flex">
                <b>+{strawberry} </b>
                <Image
                  unoptimized
                  src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/cream.png`}
                  alt="strawberry-icon"
                  width={16}
                  height={16}
                  className="object-contain object-center ml-2"
                />
              </div>{" "}
            </div>
            <InlineHint />
          </div>
          <DialogFooter className="mt-2 gap-2">
            <ButtonBase
              className="font-semibold"
              type="button"
              variants="outline"
              onClick={() => {
                setQrUrl(null);
                setItem(0);
              }}
            >
              Hủy bỏ
            </ButtonBase>
            <ButtonBase type="button" onClick={handleConfirm}>
              {isPending ? (
                <LoadingSpinner type="button" text="Tiến hành thanh toán" />
              ) : (
                <div className="flex gap-1 items-center">
                  Tiến hành thanh toán
                </div>
              )}
            </ButtonBase>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default memo(ConfirmModal);
