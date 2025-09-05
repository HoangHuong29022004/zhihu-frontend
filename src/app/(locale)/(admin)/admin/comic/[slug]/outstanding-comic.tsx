"use client";

import { ButtonBase } from "@/components/common/utils/button";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import { InputItem } from "@/components/common/utils/input";
import { LoadingSpinner } from "@/components/common/utils/loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useOutStanding } from "@/queries/comic.query";
import { OutStandingSchema, TOutStandingRequest } from "@/schemas/comic.schema";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { zodResolver } from "@hookform/resolvers/zod";
import { StarIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  comicId: string;
}
const OutStandingComic = ({ comicId }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TOutStandingRequest>({
    resolver: zodResolver(OutStandingSchema),
  });

  const { mutateAsync, isPending } = useOutStanding(getAccessToken() ?? "");

  const onSubmit = async (request: TOutStandingRequest) => {
    const res = await mutateAsync({
      amount: request.amount,
      comicId: comicId,
    });
    if (res && isSuccessResponse(res?.statusCode, res?.success)) {
      reset();
      toast({
        title: "Đề cử truyện thành công!",
        description: "Truyện đã được đề cử!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Đề cử truyện không thành công!",
        description: res?.data,
      });
    }
  };

  return (
    <>
      <ButtonBase
        variants="accent"
        icon={<StarIcon size={20} />}
        onClick={() => setIsOpen(true)}
        disabled={isPending}
      >
        Đề cử
      </ButtonBase>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="sm:max-w-[425px] max-sm:w-[90%]">
          <DialogHeader>
            <DialogTitle>Đề cử truyện</DialogTitle>
            <DialogDescription>
              Nhập thông tin để đề cử truyện
            </DialogDescription>
          </DialogHeader>
          <form
            action="post"
            onSubmit={handleSubmit(onSubmit)}
            className="max-h-[76vh] overflow-y-auto"
          >
            <InputItem
              type="number"
              defaultValue={10}
              min={10}
              step={10}
              max={100000000}
              name="amount"
              label="Giá đề cử (kem)"
              register={register}
              error={errors.amount}
            />
            <InlineHint />
            <DialogFooter className="mt-3 gap-2">
              <ButtonBase type="submit">
                {isPending ? (
                  <LoadingSpinner type="button" text="Xác nhận" />
                ) : (
                  <div className="flex gap-1 items-center">Xác nhận</div>
                )}
              </ButtonBase>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OutStandingComic;
