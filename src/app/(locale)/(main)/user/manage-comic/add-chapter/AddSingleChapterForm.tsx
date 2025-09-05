/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonBase } from "@/components/common/utils/button";
import { UploadIcon } from "lucide-react";
import { LoadingSpinner } from "@/components/common/utils/loading";
import {
  InputErrorBase,
  InputFile,
  InputItem,
  InputLabelBase,
} from "@/components/common/utils/input";
import { generateSlug, isZhihuSecret } from "@/utils/common";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { toast } from "@/hooks/use-toast";
import ImageBase from "@/components/common/image-base/image-base";
import { useUploadFile } from "@/queries/file.query";
import { AddChapterSchema, TAddChapterRequest } from "@/schemas/chapter.schema";
import { useAddChapter } from "@/queries/chapter.query";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

const AddSingleChapterForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarImage, setAvatarImage] = useState<string>("");
  const editorRef = useRef(null);
  const searchParams = useSearchParams();
  const comicId = searchParams?.get("comic") || "";
  const comicSlug = searchParams?.get("slug") || "";
  const salaryType = searchParams?.get("salaryType") || "";

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<TAddChapterRequest>({
    resolver: zodResolver(AddChapterSchema),
  });

  const handleReset = () => {
    reset();
  };

  const { mutateAsync: mutateAsyncUploadFile, isPending: isPendingUploadFile } =
    useUploadFile(getAccessToken() ?? "");
  const { mutateAsync, isPending } = useAddChapter(getAccessToken() ?? "");

  const onSubmit = async (request: TAddChapterRequest) => {
    const editorValue = (editorRef.current as any).getContent() ?? "";
    if (!editorValue) {
      toast({
        variant: "destructive",
        title: "Bạn chưa nhập nội dung chương!",
        description: "Hãy nhập nội dung chương!",
      });
      return;
    }
    const chapterSlug = generateSlug(request.title);
    const concatSlug = `${comicSlug}.${chapterSlug}`;
    const res = await mutateAsync({
      title: request.title,
      slug: concatSlug,
      content: editorValue,
      thumbnail: avatarImage,
      unitPrice: request.unitPrice,
      comicId: comicId,
    });
    if (res && isSuccessResponse(res?.statusCode, res?.success)) {
      handleReset();
      toast({
        title: "Đăng chương mới thành công!",
        description: res?.data,
      });
      window.location.href = `/user/manage-comic/${comicSlug}?pageNumber=1&pageSize=20`;
    } else {
      toast({
        variant: "destructive",
        title: "Đăng chương không thành công!",
        description: "Tên chương đã tồn tại hoặc có lỗi xảy ra!",
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
        const res = await mutateAsyncUploadFile({ file: selectedFile });
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
    <form action="post" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex max-sm:flex-wrap gap-3 items-start">
        <InputItem
          type="text"
          name="title"
          label="Tên chương"
          register={register}
          placeholder="Tên chương..."
          error={errors.title}
          variants={{ wrapperClassName: "max-sm:w-full sm:w-1/2" }}
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
          disabled={isZhihuSecret(salaryType)}
          variants={{ wrapperClassName: "w-1/2" }}
        />
      </div>
      <div className="w-full flex max-sm:flex-wrap gap-3 items-end">
        <InputFile
          label="Ảnh bìa (chọn ảnh và nhấn tải file)"
          name="avatar"
          handleFileChange={handleFileChange}
          isRequired={false}
          variants={{ wrapperClassName: "w-1/2" }}
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
        {!(editorRef?.current as any)?.getContent() && isSubmitted && (
          <InputErrorBase message="Vui lòng nhập nội dung chương!" />
        )}
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
            <LoadingSpinner type="button" text="Đăng truyện" />
          ) : (
            <div className="flex gap-1 items-center">Đăng chương</div>
          )}
        </ButtonBase>
      </div>
    </form>
  );
};

export default AddSingleChapterForm;
