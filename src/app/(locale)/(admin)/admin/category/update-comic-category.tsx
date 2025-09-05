"use client";

import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { InputItem } from "@/components/common/utils/input";
import {
  TUpdateCategoryRequest,
  UpdateCategorySchema,
} from "@/schemas/category.schema";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import {
  useGetDetailsCategory,
  useUpdateCategory,
} from "@/queries/categories.query";
import { toast } from "@/hooks/use-toast";
import { generateSlug } from "@/utils/common";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";

interface IProps {
  item: string;
  setItem: (value: boolean) => void;
}

const UpdateComicCategory = (props: IProps) => {
  const { item, setItem } = props;
  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateCategoryRequest>({
    resolver: zodResolver(UpdateCategorySchema),
  });

  const handleReset = () => {
    reset();
    setItem(false);
  };

  // Using custom hook for deleting company
  const { mutateAsync, isPending } = useUpdateCategory(getAccessToken() ?? "");

  const onSubmit = async (request: TUpdateCategoryRequest) => {
    if (request && item) {
      const res = await mutateAsync({
        id: item,
        request: {
          name: request.name,
          slug: generateSlug(request.name),
        },
      });
      if (res && isSuccessResponse(res?.statusCode, res?.success)) {
        handleReset();
        toast({
          title: "Cập nhật thành công!",
          description: res?.data,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Cập nhật không thành công!",
          description: res?.data,
        });
      }
    }
  };

  // Get details
  const { isLoading, data: res } = useGetDetailsCategory(
    getAccessToken() ?? "",
    item
  );

  // Set item details to form
  useEffect(() => {
    if (res && isSuccessResponse(res?.statusCode, res?.success)) {
      setValue("name", res?.data?.name);
    }
  }, [item, res]);

  return (
    <>
      <Dialog open={Boolean(item)} onOpenChange={setItem}>
        <DialogContent className="sm:max-w-[425px] max-sm:w-[90%]">
          <DialogHeader>
            <DialogTitle>Cập nhật</DialogTitle>
            <DialogDescription>
              Nhập thông tin để cập nhật thể loại!
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <div className="flex items-center justify-center ">
              <LoadingSpinner />
            </div>
          ) : !res ? (
            <p>Chưa có dữ liệu!</p>
          ) : (
            <form action="post" onSubmit={handleSubmit(onSubmit)}>
              <InputItem
                type="text"
                name="name"
                label="Tên thể loại"
                register={register}
                placeholder="Tên thể loại..."
                error={errors.name}
              />
              <InlineHint />
              <DialogFooter className="mt-6 gap-2">
                <ButtonBase
                  className="font-semibold"
                  type="button"
                  variants="outline"
                  onClick={handleReset}
                >
                  Hủy bỏ
                </ButtonBase>
                <ButtonBase className="font-semibold" type="submit">
                  {isPending ? (
                    <LoadingSpinner type="button" text="Cập nhật" />
                  ) : (
                    <div className="flex gap-1 items-center">Cập nhật</div>
                  )}
                </ButtonBase>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default memo(UpdateComicCategory);
