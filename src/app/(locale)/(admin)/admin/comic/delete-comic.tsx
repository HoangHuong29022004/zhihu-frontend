/* eslint-disable @typescript-eslint/no-explicit-any */

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
import { IDeletedRequest } from "@/types/global";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { toast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/common/utils/loading";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import { useDeleteComic } from "@/queries/comic.query";

interface IProps {
  item: IDeletedRequest;
  setItem: (value: any) => void;
}

const DeleteComic = ({ item, setItem }: IProps) => {
  const { mutateAsync, isPending } = useDeleteComic(getAccessToken() ?? "");

  const handleDelete = async () => {
    if (item) {
      const res = await mutateAsync({
        id: item.id,
      });
      if (res && isSuccessResponse(res?.statusCode, res?.success)) {
        setItem(null);
        toast({
          title: "Xóa phần tử thành công!",
          description: res?.data,
        });
        window.location.href = "/user/manage-comic";
      } else {
        toast({
          variant: "destructive",
          title: "Xóa phần tử không thành công!",
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
            <DialogTitle>Xóa truyện</DialogTitle>
            <DialogDescription>Xác nhận thông tin để xóa!</DialogDescription>
          </DialogHeader>
          <div>
            <p>Bạn chắc chắn muốn xóa dữ liệu?</p>
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
              {isPending ? (
                <LoadingSpinner type="button" text="Xóa" />
              ) : (
                <div className="flex gap-1 items-center">Xóa</div>
              )}
            </ButtonBase>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default memo(DeleteComic);
