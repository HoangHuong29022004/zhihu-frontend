/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { memo, Suspense, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ButtonBase } from "@/components/common/utils/button";
import { ArrowLeft, BookOpen, PenIcon, UploadIcon } from "lucide-react";
import { DotLoader, LoadingSpinner } from "@/components/common/utils/loading";
import {
  InputFile,
  InputItem,
  InputLabelBase,
} from "@/components/common/utils/input";
import { generateSlug } from "@/utils/common";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { toast } from "@/hooks/use-toast";
import ImageBase from "@/components/common/image-base/image-base";
import { useUploadFile } from "@/queries/file.query";
import { AddChapterSchema, TAddChapterRequest } from "@/schemas/chapter.schema";
import { useAddChapter } from "@/queries/chapter.query";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

const AddChapterClient = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarImage, setAvatarImage] = useState<string>("");
  const editorRef = useRef(null);
  const searchParams = useSearchParams();
  const comicId = searchParams?.get("comic") || "";
  const comicTitle = searchParams?.get("title") || "_";
  const comicSlug = searchParams?.get("slug") || "_";

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm<TAddChapterRequest>({
    resolver: zodResolver(AddChapterSchema),
  });

  const handleReset = () => {
    reset();
  };

  // Using custom hook for upload file
  const { mutateAsync: mutateAsyncUploadFile, isPending: isPendingUploadFile } =
    useUploadFile(getAccessToken() ?? "");

  // Using custom hook for deleting company
  const { mutateAsync, isPending } = useAddChapter(getAccessToken() ?? "");

  const onSubmit = async (request: TAddChapterRequest) => {
    const editorValue = (editorRef.current as any).getContent() ?? "";
    const res = await mutateAsync({
      title: request.title,
      slug: generateSlug(request.title),
      content: editorValue,
      thumbnail: avatarImage,
      unitPrice: request.unitPrice,
      comicId: comicId,
    });
    if (res && isSuccessResponse(res?.statusCode, res?.success)) {
      handleReset();
      toast({
        title: "Đăng truyện thành công!",
        description: res?.data,
      });
      window.location.href = `/admin/comic/${comicSlug}`;
    } else {
      toast({
        variant: "destructive",
        title: "Đăng truyện không thành công!",
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
        }
      }
    } catch (error) {
      console.log("Failed to upload file. Please try again.", error);
    }
  };

  return (
    <div className="bg-white rounded-xl max-sm:p-4 sm:p-10">
      <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <PenIcon size={20} />
            <span>Đăng chương</span>
          </h1>
          <p className="text-md text-gray-500 font-bold italic flex items-center gap-2">
            <BookOpen className="text-gray-500" size={16} />
            {comicTitle}
          </p>
        </div>
        <Link href={`/admin/comic/${comicSlug}`}>
          <ButtonBase size="md" icon={<ArrowLeft />} variants="outline">
            Quay lại
          </ButtonBase>
        </Link>
      </div>
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex max-sm:flex-wrap sm:gap-3 items-start">
          <InputItem
            type="text"
            name="title"
            label="Tên chương"
            register={register}
            placeholder="Tên chương..."
            error={errors.title}
            variants={{
              wrapperClassName: "sm:w-1/2 max-sm:w-full max-sm:min-w-32",
            }}
          />
          <InputItem
            type="number"
            defaultValue={0}
            min={0}
            step={10}
            max={100000000}
            name="unitPrice"
            label="Giá chương (dâu)"
            register={register}
            error={errors.unitPrice}
            variants={{
              wrapperClassName: "sm:w-1/2 max-sm:w-full max-sm:min-w-32",
            }}
          />
        </div>
        <div className="w-full flex max-sm:flex-wrap gap-3 items-center">
          <InputFile
            label="Ảnh bìa (chọn ảnh và nhấn tải file)"
            name="avatar"
            handleFileChange={handleFileChange}
            variants={{
              wrapperClassName: "sm:w-1/2 max-sm:w-full max-sm:min-w-32",
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
              className="object-contain object-center rounded-md size-16 text-center mt-4"
            />
          </div>
        </div>

        <div className="w-full my-3">
          <InputLabelBase label="Nội dung chương" />
          <Editor
            apiKey="40p92novchn76jhjw0dc1yzu610ozpmpwmx7bn5psdwrjrpj"
            onInit={(_evt, editor) => (editorRef.current = editor)}
            init={{
              height: 600,
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
        </div>

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
              <LoadingSpinner type="button" text="Đăng chương" />
            ) : (
              <div className="flex gap-1 items-center">Đăng chương</div>
            )}
          </ButtonBase>
        </div>
      </form>
    </div>
  );
};

const AddChapter = () => {
  return (
    <Suspense fallback={<DotLoader />}>
      <AddChapterClient />
    </Suspense>
  );
};

export default memo(AddChapter);
