/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { toast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/common/utils/loading";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import { DEFAULT_USER_PASSWORD } from "@/data/constants/global";
import { updatePassword } from "@/services/auth-service";
import { IUserResetPassword } from "@/types/user.type";

interface IProps {
  item: IUserResetPassword;
  setItem: (value: any) => void;
}

const ResetPassword = ({ item, setItem }: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const token = getAccessToken() ?? "";
      const res = await updatePassword(token, item.id, DEFAULT_USER_PASSWORD);
      if (res && isSuccessResponse(res?.statusCode, res?.success)) {
        setItem(null);
        toast({
          title: "Đặt lại mật khẩu user thành công!",
          description: `Mật khẩu: ${DEFAULT_USER_PASSWORD}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Đặt lại mật khẩu user không thành công!",
          description: res?.data,
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={Boolean(item)} onOpenChange={setItem}>
        <DialogContent className="sm:max-w-[425px] max-sm:w-[90%]">
          <DialogHeader>
            <DialogTitle>Đặt lại mật khẩu</DialogTitle>
            <DialogDescription>Thiết lập mật khẩu mặt định</DialogDescription>
          </DialogHeader>
          <div>
            <p>Đặt lại mật khẩu của user về mặt định? </p>
            <p className="mt-2">
              Tài khoản: <b>{item?.email ?? "_"}</b>
            </p>
            <p className="mt-2">
              Mật khẩu: <b> {DEFAULT_USER_PASSWORD}</b>
            </p>
            <InlineHint />
          </div>
          <DialogFooter className="mt-2 gap-2">
            <ButtonBase
              className="font-semibold"
              type="button"
              variants="outline"
              onClick={() => setItem(null)}
            >
              Hủy bỏ
            </ButtonBase>
            <ButtonBase variants="accent" type="button" onClick={handleDelete}>
              {isLoading ? (
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

export default memo(ResetPassword);
