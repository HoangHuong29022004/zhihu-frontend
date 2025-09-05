"use client";

import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ButtonBase } from "@/components/common/utils/button";
import { CirclePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/common/utils/loading";
import { InputItem } from "@/components/common/utils/input";
import {
  AddCategorySchema,
  TAddCategoryRequest,
} from "@/schemas/category.schema";
import { generateSlug } from "@/utils/common";
import { useAddCategory } from "@/queries/categories.query";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { toast } from "@/hooks/use-toast";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import useMediaQuery from "@/hooks/use-screen-size";

const AddComicCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useMediaQuery();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddCategoryRequest>({
    resolver: zodResolver(AddCategorySchema),
  });

  const handleReset = () => {
    reset();
    setIsOpen(false);
  };

  // Using custom hook for deleting company
  const { mutateAsync, isPending } = useAddCategory(getAccessToken() ?? "");

  const onSubmit = async (request: TAddCategoryRequest) => {
    if (request) {
      const slug = generateSlug(request.name);
      const res = await mutateAsync({
        name: request.name,
        slug: slug,
      });
      if (res && isSuccessResponse(res?.statusCode, res?.success)) {
        handleReset();
        toast({
          title: "Tạo mới thành công!",
          description: res?.data,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Tạo mới không thành công!",
          description: res?.data,
        });
      }
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <ButtonBase size={isMobile ? "md" : "lg"} icon={<CirclePlus />}>
            Thêm mới
          </ButtonBase>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-sm:w-[90%]">
          <DialogHeader>
            <DialogTitle>Tạo mới</DialogTitle>
            <DialogDescription>Nhập thông tin để tạo mới!</DialogDescription>
          </DialogHeader>
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
                  <LoadingSpinner type="button" text="Thêm mới" />
                ) : (
                  <div className="flex gap-1 items-center">Thêm mới</div>
                )}
              </ButtonBase>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default memo(AddComicCategory);
