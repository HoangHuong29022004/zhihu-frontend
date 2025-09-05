"use client";

import { memo, useState } from "react";
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
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import {
  TUpdateUserCurrencyRequest,
  UpdateUserCurrencySchema,
} from "@/schemas/user.schema";
import {
  useGetDetailsUser,
  useUpdateCurrencyByAdmin,
} from "@/queries/user.query";
import {
  InputErrorBase,
  InputItem,
  InputLabelBase,
} from "@/components/common/utils/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CURRENCY_TYPE_OPTIONS } from "@/data/constants/global";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { formatThreeDigit } from "@/utils/common";

interface IUpdateProps {
  item: string;
  setItem: (value: boolean) => void;
}

const UpdateCurrency = (props: IUpdateProps) => {
  const { item, setItem } = props;
  const [currencyType, setCurrencyType] = useState<string>(
    CURRENCY_TYPE_OPTIONS[0].value
  );

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<TUpdateUserCurrencyRequest>({
    resolver: zodResolver(UpdateUserCurrencySchema),
  });

  const handleReset = () => {
    reset();
    setItem(false);
  };

  // Using custom hook for deleting company
  const { mutateAsync, isPending } = useUpdateCurrencyByAdmin(
    getAccessToken() ?? ""
  );

  const onSubmit = async (request: TUpdateUserCurrencyRequest) => {
    if (request && item && currencyType) {
      console.log("Check request: ", {
        ...request,
        userId: item,
        type: currencyType,
      });
      const res = await mutateAsync({
        request: {
          ...request,
          userId: item,
          type: Number(currencyType),
        },
      });
      if (res && isSuccessResponse(res?.statusCode, res?.success)) {
        handleReset();
        toast({
          title: "Cập nhật tiền tệ thành công!",
          description: res?.data,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Cập nhật tiền tệ không thành công!",
          description: res?.data,
        });
      }
    }
  };

  // Get details
  const { isLoading: isLoadingUserDetail, data } = useGetDetailsUser(
    getAccessToken() ?? "",
    item || ""
  );

  return (
    <>
      <Dialog open={Boolean(item)} onOpenChange={setItem}>
        <DialogContent className="max-w-max">
          <DialogHeader>
            <DialogTitle>Cập nhật tiền tệ</DialogTitle>
            <DialogDescription>Nhập thông tin để cập nhật!</DialogDescription>
          </DialogHeader>
          {isLoadingUserDetail ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : !data ? (
            <p>Chưa có dữ liệu!</p>
          ) : (
            <form action="post" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center gap-4 bg-slate-100 rounded-lg px-4 py-3 mb-4">
                <span className="font-semibold text-gray-700 sm:inline max-sm:hidden">
                  Tiền tệ:
                </span>
                <span className="flex items-center gap-1 text-sm font-medium text-red-500">
                  <span className="font-bold">
                    {formatThreeDigit(Number(data.data?.currencyStrawberry))}
                  </span>
                  <Image
                    unoptimized
                    src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/strawberry.png`}
                    alt="strawberry"
                    width={16}
                    height={16}
                    className="object-contain object-center ml-1"
                  />
                </span>
                <span className="flex items-center gap-1 text-sm font-medium text-pink-500">
                  <span className="font-bold">
                    {formatThreeDigit(Number(data.data?.currencyFlower))}
                  </span>
                  <Image
                    unoptimized
                    src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/flower.png`}
                    alt="flower"
                    width={16}
                    height={16}
                    className="object-contain object-center ml-1"
                  />
                </span>
                <span className="flex items-center gap-1 text-sm font-medium text-yellow-500">
                  <span className="font-bold">
                    {formatThreeDigit(Number(data.data?.currencyCream))}
                  </span>
                  <Image
                    unoptimized
                    src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/cream.png`}
                    alt="cream"
                    width={16}
                    height={16}
                    className="object-contain object-center ml-1"
                  />
                </span>
              </div>
              <div className="w-full">
                <InputLabelBase label="Loaị tiền tệ" />
                <Select
                  value={currencyType}
                  onValueChange={(value) => setCurrencyType(value)}
                >
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Loại tiền tệ..." />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCY_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isSubmitted && !currencyType && (
                  <InputErrorBase message="Vui lòng chọn loại tiền!" />
                )}
                <InputItem
                  type="number"
                  defaultValue={0}
                  min={0}
                  step={10}
                  disabled={!currencyType}
                  max={100000000}
                  name="amount"
                  label={`Số điểm (${
                    CURRENCY_TYPE_OPTIONS[Number(currencyType)]?.label
                  })`}
                  register={register}
                  error={errors.amount}
                  variants={{
                    wrapperClassName: "w-full",
                  }}
                />
              </div>
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

export default memo(UpdateCurrency);
