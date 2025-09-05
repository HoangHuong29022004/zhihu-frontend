/* eslint-disable @typescript-eslint/no-explicit-any */

import { ButtonBase } from "@/components/common/utils/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { toast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/common/utils/loading";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import { memo } from "react";
import { useApprovedWithdrawManually } from "@/queries/withdraw.query";

interface IProps {
  item: string;
  setItem: (value: boolean) => void;
}

const ApprovedTransaction = ({ item, setItem }: IProps) => {
  const { mutateAsync, isPending } = useApprovedWithdrawManually(
    getAccessToken() ?? ""
  );

  const handleDelete = async () => {
    if (item) {
      const res = await mutateAsync({
        id: item,
      });
      if (res && isSuccessResponse(res?.statusCode, res?.success)) {
        setItem(false);
        toast({
          title: "Duyệt giao dịch thành công!",
          description: res?.data,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Duyệt giao dịch không thành công!",
          description: res?.data,
        });
      }
    }
  };

  return (
    <>
      <Dialog open={Boolean(item)} onOpenChange={setItem}>
        <DialogContent className="sm:max-w-[425px] max-sm:w-[90%]">
          <DialogHeader>
            <DialogTitle>Duyệt giao dịch</DialogTitle>
            <DialogDescription>Duyệt giao dịch thủ công!</DialogDescription>
          </DialogHeader>
          <div>
            <p>Bạn chắc chắn muốn xác nhận giao dịch này?</p>
            <InlineHint />
          </div>
          <DialogFooter className="mt-2 gap-2">
            <ButtonBase
              className="font-semibold"
              type="button"
              variants="outline"
              onClick={() => setItem(false)}
            >
              Hủy bỏ
            </ButtonBase>
            <ButtonBase variants="primary" type="button" onClick={handleDelete}>
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

export default memo(ApprovedTransaction);
