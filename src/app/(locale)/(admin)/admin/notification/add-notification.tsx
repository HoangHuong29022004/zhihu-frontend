/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { memo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonBase } from "@/components/common/utils/button";
import { CirclePlus, UploadIcon } from "lucide-react";
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
import {
  InputErrorBase,
  InputFile,
  InputItem,
  InputLabelBase,
} from "@/components/common/utils/input";
import { generateSlug } from "@/utils/common";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { toast } from "@/hooks/use-toast";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import ImageBase from "@/components/common/image-base/image-base";
import { useUploadFile } from "@/queries/file.query";
import dynamic from "next/dynamic";
import useMediaQuery from "@/hooks/use-screen-size";
import {
  AddNotificationSchema,
  TAddNotificationRequest,
} from "@/schemas/notification.schema";
import { useAddNotification } from "@/queries/notification.query";

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

const AddNotification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarImage, setAvatarImage] = useState<string>("");
  const editorRef = useRef(null);
  const { isMobile } = useMediaQuery();

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm<TAddNotificationRequest>({
    resolver: zodResolver(AddNotificationSchema),
  });

  const handleReset = () => {
    reset();
    setIsOpen(false);
    setSelectedFile(null);
    setAvatarImage("");
  };

  // Using custom hook for upload file
  const { mutateAsync: mutateAsyncUploadFile, isPending: isPendingUploadFile } =
    useUploadFile(getAccessToken() ?? "");

  // Using custom hook for adding comic
  const { mutateAsync, isPending } = useAddNotification(getAccessToken() ?? "");

  const onSubmit = async (request: TAddNotificationRequest) => {
    const editorValue = (editorRef.current as any).getContent() ?? "";
    if (!editorValue) {
      toast({
        variant: "destructive",
        title: "Bạn chưa nhập mô tả thông báo!",
        description: "Hãy nhập mô tả thông báo!",
      });
      return;
    }
    const res = await mutateAsync({
      title: request.title,
      slug: generateSlug(request.title),
      description: editorValue,
      thumbnail: avatarImage,
    });
    if (res && isSuccessResponse(res?.statusCode, res?.success)) {
      handleReset();
      toast({
        title: "Tạo mới thông báo thành công!",
        description: res?.data,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Tạo mới thông báo không thành công!",
        description: res?.data,
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setValue("thumbnail", event.target.files[0].name);
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
          toast({
            variant: "destructive",
            title: "Tải file không thành công!",
            description: "File quá lớn hoặc có lỗi xảy ra!",
          });
        }
      }
    } catch (error) {
      console.log("Failed to upload file. Please try again.", error);
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
        <DialogContent className="sm:max-w-max max-sm:w-[90%]">
          <DialogHeader>
            <DialogTitle>Tạo mới</DialogTitle>
            <DialogDescription>Nhập thông tin để tạo mới!</DialogDescription>
          </DialogHeader>
          <form
            action="post"
            onSubmit={handleSubmit(onSubmit)}
            className="max-h-[76vh] overflow-y-auto"
          >
            <InputItem
              type="text"
              name="title"
              label="Tên thông báo"
              register={register}
              placeholder="Tên thông báo..."
              error={errors.title}
            />
            <div className="w-full flex max-sm:flex-wrap sm:gap-3 items-start">
              <InputFile
                label="Ảnh bìa (chọn ảnh và nhấn tải file)"
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
                  width={60}
                  height={60}
                  src={selectedFile && avatarImage ? avatarImage : ""}
                  alt="avatar-image"
                  fallbackSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/default_image.png`}
                  className="object-cover object-center rounded-md size-16 text-center mt-4"
                />
              </div>
            </div>

            <div className="w-full my-3">
              <InputLabelBase label="Mô tả" />
              <Editor
                apiKey="40p92novchn76jhjw0dc1yzu610ozpmpwmx7bn5psdwrjrpj"
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue=""
                init={{
                  height: 200,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
              {!(editorRef.current as any)?.getContent() && isSubmitted && (
                <InputErrorBase message="Vui lòng nhập mô tả thông báo!" />
              )}
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

export default memo(AddNotification);
