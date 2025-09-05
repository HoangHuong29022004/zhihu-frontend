"use client";

import { memo, useEffect, useState } from "react";
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
import { InputFile, InputItem } from "@/components/common/utils/input";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { toast } from "@/hooks/use-toast";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import { TUpdateUserRequest, UpdateUserSchema } from "@/schemas/user.schema";
import { useGetDetailsUser, useUpdateUserByAdmin } from "@/queries/user.query";
import ImageBase from "@/components/common/image-base/image-base";
import { UploadIcon } from "lucide-react";
import { useUploadFile } from "@/queries/file.query";

interface IUpdateProps {
  item: string;
  setItem: (value: boolean) => void;
}

const UpdateUser = (props: IUpdateProps) => {
  const { item, setItem } = props;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarImage, setAvatarImage] = useState<string>("");

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm<TUpdateUserRequest>({
    resolver: zodResolver(UpdateUserSchema),
  });

  const handleReset = () => {
    reset();
    setItem(false);
  };

  // Using custom hook for deleting company
  const { mutateAsync, isPending } = useUpdateUserByAdmin(
    getAccessToken() ?? "",
    item
  );

  const onSubmit = async (request: TUpdateUserRequest) => {
    if (request && item) {
      const res = await mutateAsync({
        request: {
          fullName: request.fullName,
          avatar: avatarImage,
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

  // Using custom hook for upload file
  const { mutateAsync: mutateAsyncUploadFile, isPending: isPendingUploadFile } =
    useUploadFile(getAccessToken() ?? "");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setValue("avatar", event.target.files[0].name);
    }
  };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const res = await mutateAsyncUploadFile({
          file: selectedFile,
        });
        if (res && res?.link) {
          setAvatarImage(res?.link);
        } else {
        }
      }
    } catch (error) {
      console.log("Failed to upload file. Please try again.", error);
    }
  };

  // Get details
  const { isLoading: isLoadingUserDetail, data } = useGetDetailsUser(
    getAccessToken() ?? "",
    item || ""
  );

  // Set item details to form
  useEffect(() => {
    if (data) {
      setValue("fullName", data?.data?.fullName);
      setValue("avatar", data?.data?.avatar);
      setAvatarImage(data?.data?.avatar);
      setSelectedFile(
        data?.data?.avatar ? new File([], data?.data?.avatar) : null
      );
    }
  }, [data]);

  return (
    <>
      <Dialog open={Boolean(item)} onOpenChange={setItem}>
        <DialogContent className="max-w-max">
          <DialogHeader>
            <DialogTitle>Cập nhật</DialogTitle>
            <DialogDescription>Nhập thông tin để cập nhật!</DialogDescription>
          </DialogHeader>
          {isLoadingUserDetail ? (
            <div className="flex items-center justify-center ">
              <LoadingSpinner />
            </div>
          ) : !data ? (
            <p>Chưa có dữ liệu!</p>
          ) : (
            <form action="post" onSubmit={handleSubmit(onSubmit)}>
              <InputItem
                type="text"
                name="fullName"
                label="Tên người dùng"
                register={register}
                placeholder="Tên người dùng..."
                error={errors.fullName}
                required={false}
              />
              <div className="w-full flex gap-3 items-end">
                <InputFile
                  label="Avatar (chọn ảnh và nhấn tải file)"
                  name="avatar"
                  handleFileChange={handleFileChange}
                  variants={{
                    wrapperClassName: "w-1/2",
                  }}
                  error={
                    isSubmitted &&
                    !selectedFile &&
                    !avatarImage &&
                    !isSubmitSuccessful
                      ? "Logo image is required!"
                      : ""
                  }
                />
                <div className="flex flex-1 items-end justify-between gap-3">
                  <ButtonBase
                    disabled={!selectedFile || !avatarImage}
                    size="lg"
                    type="button"
                    onClick={handleUpload}
                    className={`mr-2 ${!selectedFile && "opacity-70"}`}
                  >
                    {isPendingUploadFile ? (
                      <LoadingSpinner text="Uploading..." type="button" />
                    ) : (
                      <>
                        <UploadIcon /> <span className="ml-2">Tải file</span>
                      </>
                    )}
                  </ButtonBase>

                  <ImageBase
                    width={60}
                    height={60}
                    src={selectedFile && avatarImage ? avatarImage : ""}
                    alt="avatar-image"
                    fallbackSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/default_image.png`}
                    className="object-contain object-center rounded-full size-16 text-center mt-4"
                  />
                </div>
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

export default memo(UpdateUser);
