/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { memo } from "react";
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
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { StepBaseProgress } from "@/components/common/utils/common";
import { SHORT_WITHDRAW_STEPS } from "@/data/constants/global";
import { IWithDrawRequest } from "@/types/withdraw.type";
import { toast } from "@/hooks/use-toast";
import { Building2, User, CreditCard, DollarSign } from "lucide-react";
import { useAddWithdraw } from "@/queries/withdraw.query";

interface IProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  data: IWithDrawRequest | null;
}

const ConfirmModal = ({ isOpen, setIsOpen, data }: IProps) => {
  const { mutateAsync, isPending } = useAddWithdraw(getAccessToken() ?? "");

  const handleConfirm = async () => {
    try {
      if (data) {
        const res = await mutateAsync(data);
        if (res && isSuccessResponse(res?.statusCode, res?.success)) {
          toast({
            title: "Tạo yêu cầu rút tiền thành công!",
          });
          window.location.href = "/user/manage-withdraw";
          setIsOpen(false);
        } else {
          toast({
            variant: "destructive",
            title: "Tạo yêu cầu rút tiền không thành công!",
            description: res?.data,
          });
        }
      }
    } catch (error) {
      console.log("Check error: ", error);
      toast({
        variant: "destructive",
        title: "Tạo yêu cầu rút tiền không thành công!",
      });
    }
  };

  if (!data) {
    toast({
      variant: "destructive",
      title: "Vui lòng nhập đầy đủ thông tin!",
    });
    return;
  }

  return (
    <>
      <Dialog open={isOpen && Boolean(data)} onOpenChange={setIsOpen}>
        <DialogContent className="sm:w-max max-sm:w-[90%]">
          <DialogHeader>
            <DialogTitle>Xác nhận rút tiền</DialogTitle>
            <DialogDescription>Thông báo xác nhận</DialogDescription>
          </DialogHeader>
          <div className="flex mt-4">
            {SHORT_WITHDRAW_STEPS.map((item, index: number) => (
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
          <div className="flex flex-col gap-2 mt-2 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-md shadow-sm">
              <Building2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-600 min-w-20">Ngân hàng:</span>
              <span className="font-semibold text-text-secondary">
                {data?.bankName}
              </span>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-md shadow-sm">
              <User className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-600 min-w-20">Tên chủ thẻ:</span>
              <span className="font-semibold text-text-secondary">
                {data?.bankAccountName}
              </span>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-md shadow-sm">
              <CreditCard className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-600 min-w-20">Số tài khoản:</span>
              <span className="font-semibold text-text-secondary">
                {data?.bankAccount}
              </span>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-md shadow-sm">
              <DollarSign className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-600 min-w-20">Số tiền rút:</span>
              <span className="font-semibold text-primary">
                {formatToVND(data?.amount ?? 0)}
              </span>
            </div>
          </div>
          <InlineHint className="mt-0" />
          <DialogFooter className="mt-2 gap-2">
            <ButtonBase
              className="font-semibold"
              type="button"
              variants="outline"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Hủy bỏ
            </ButtonBase>
            <ButtonBase type="button" onClick={handleConfirm}>
              {isPending ? (
                <LoadingSpinner type="button" text="Xác nhận" />
              ) : (
                <div className="flex gap-1 items-center">Xác nhận</div>
              )}
            </ButtonBase>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default memo(ConfirmModal);
