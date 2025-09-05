/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { memo, Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ButtonBase } from "@/components/common/utils/button";
import { UploadIcon } from "lucide-react";
import { DotLoader, LoadingSpinner } from "@/components/common/utils/loading";
import { InputFile, InputItem } from "@/components/common/utils/input";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { toast } from "@/hooks/use-toast";
import ImageBase from "@/components/common/image-base/image-base";
import { useUploadFile } from "@/queries/file.query";
import { TUpdateUserRequest, UpdateUserSchema } from "@/schemas/user.schema";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import { useAuthStore } from "@/stores/auth-store";
import { useUpdateUser } from "@/queries/user.query";
import { NoDataBase } from "@/components/common/utils/no-data";
import { getProfile } from "@/services/auth-service";

const UpdateProfileClient = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarImage, setAvatarImage] = useState<string>("");
  const { user } = useAuthStore();

  const setUser = useAuthStore((state) => state.setUser);

  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm<TUpdateUserRequest>({
    resolver: zodResolver(UpdateUserSchema),
  });

  const handleReset = () => {
    reset();
  };

  // Using custom hook for upload file
  const { mutateAsync: mutateAsyncUploadFile, isPending: isPendingUploadFile } =
    useUploadFile(getAccessToken() ?? "");

  // Using custom hook for deleting company
  const { mutateAsync, isPending } = useUpdateUser(getAccessToken() ?? "");

  const onSubmit = async (request: TUpdateUserRequest) => {
    if (request) {
      const res = await mutateAsync({
        request: {
          fullName: request.fullName,
          avatar: avatarImage,
        },
      });
      if (res && isSuccessResponse(res?.statusCode, res?.success)) {
        const profileResponse = await getProfile(getAccessToken() ?? "");
        if (profileResponse) {
          setUser(profileResponse?.data);
        }
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
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

  // Set item details to form
  useEffect(() => {
    if (user) {
      setValue("fullName", user.fullName);
      setValue("avatar", user.avatar);
      setAvatarImage(user.avatar);
      setSelectedFile(user.avatar ? new File([], user.avatar) : null);
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        Thông tin tài khoản
      </h1>
      {!user ? (
        <div className="flex items-center justify-center h-full">
          <NoDataBase />
        </div>
      ) : (
        <form action="post" onSubmit={handleSubmit(onSubmit)}>
          <InputItem
            type="text"
            name="fullName"
            label="Tên đầy đủ"
            register={register}
            placeholder="Tên đẩy đủ..."
            error={errors.fullName}
          />
          <div className="w-full flex gap-3 items-center max-sm:flex-wrap">
            <InputItem
              required={false}
              type="text"
              name="email"
              label="Email"
              value={user?.email ?? ""}
              register={register}
              placeholder="Email..."
              variants={{
                wrapperClassName: "sm:w-1/2 max-sm:w-full",
              }}
              disabled
            />
            <InputItem
              type="password"
              name="password"
              label="Mật khẩu"
              value={"***********"}
              register={register}
              placeholder="*****"
              variants={{
                wrapperClassName: "sm:w-1/2 max-sm:w-full",
              }}
              disabled
            />
          </div>

          <div className="w-full flex flex-wrap gap-3 items-end">
            <InputFile
              label="Ảnh đại diện (chọn ảnh và nhấn tải file)"
              name="avatar"
              handleFileChange={handleFileChange}
              variants={{
                wrapperClassName: "sm:w-1/2 max-sm:w-full",
              }}
              error={
                isSubmitted &&
                !selectedFile &&
                !avatarImage &&
                !isSubmitSuccessful
                  ? "Vui lòng chọn ảnh bìa!"
                  : ""
              }
            />
            <div className="flex flex-1 items-end justify-start gap-3">
              <ButtonBase
                disabled={!selectedFile}
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
                width={40}
                height={40}
                className="size-12 object-cover object-center rounded-full border border-gray-200 shadow-sm"
                src={selectedFile && avatarImage ? avatarImage : ""}
                alt="avatar-image"
                fallbackSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/default_image.png`}
              />
            </div>
          </div>

          <InlineHint />
          <div className="w-full flex gap-3 items-center justify-end mt-6">
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
                <LoadingSpinner type="button" text="Cập nhật thông tin" />
              ) : (
                <div className="flex gap-1 items-center">
                  Cập nhật thông tin
                </div>
              )}
            </ButtonBase>
          </div>
        </form>
      )}
    </div>
  );
};

const UpdateProfile = () => {
  return (
    <Suspense fallback={<DotLoader />}>
      <UpdateProfileClient />
    </Suspense>
  );
};

export default memo(UpdateProfile);
