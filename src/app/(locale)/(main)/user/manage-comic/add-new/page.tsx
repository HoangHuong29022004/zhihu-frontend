/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { memo, Suspense, useRef, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ButtonBase } from "@/components/common/utils/button";
import { ArrowLeft, PenIcon, UploadIcon } from "lucide-react";
import { DotLoader, LoadingSpinner } from "@/components/common/utils/loading";
import {
  InputFile,
  InputItem,
  InputLabelBase,
  InputErrorBase,
} from "@/components/common/utils/input";
import { generateSlug } from "@/utils/common";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { toast } from "@/hooks/use-toast";
import ImageBase from "@/components/common/image-base/image-base";
import { useUploadFile } from "@/queries/file.query";
import Link from "next/link";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import { ICategoryItem } from "@/types/category.type";
import { AddComicSchema, TAddComicRequest } from "@/schemas/comic.schema";
import { useGetCategories } from "@/queries/categories.query";
import { useAddComic } from "@/queries/comic.query";
import SelectSearchBase from "@/components/common/utils/select-search/select-search";
import dynamic from "next/dynamic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SALARY_TYPE_OPTIONS } from "@/data/constants/global";

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

const AddComicClient = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarImage, setAvatarImage] = useState<string>("");
  const [categoryId, setCategoryId] = useState<ICategoryItem[]>([]);
  const [salaryType, setSalaryType] = useState<string>(
    SALARY_TYPE_OPTIONS[0].value
  );
  const editorRef = useRef(null);

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<TAddComicRequest>({
    resolver: zodResolver(AddComicSchema),
  });

  const handleReset = () => {
    reset();
    setCategoryId([]);
    setAvatarImage("");
    setSelectedFile(null);
  };

  // Using custom hook for upload file
  const { mutateAsync: mutateAsyncUploadFile, isPending: isPendingUploadFile } =
    useUploadFile(getAccessToken() ?? "");

  const { data } = useGetCategories({
    pageNumber: 1,
    pageSize: 1000,
    search: "",
  });
  const isLoading = false;

  // Using custom hook for deleting company
  const { mutateAsync, isPending } = useAddComic(getAccessToken() ?? "");

  const handleCategoryChange = (
    selectedItems: { id: string; value: string }[]
  ) => {
    const newCategories = selectedItems.map((item) => ({
      id: item.id,
      name: item.value,
      slug: "",
    }));
    setCategoryId(newCategories);
  };

  // Transform category data for SelectSearchBase
  const categoryOptions = useMemo(() => {
    return (
      data?.data?.map((item: ICategoryItem) => ({
        id: item.id,
        value: item.name,
      })) || []
    );
  }, [data?.data]);

  const onSubmit = async (request: TAddComicRequest) => {
    const editorValue = (editorRef.current as any).getContent() ?? "";
    const updatedCategories = categoryId.map((item) => item.id);
    const slug = generateSlug(request.title);
    if (!avatarImage) {
      toast({
        variant: "destructive",
        title: "Bạn chưa tải lên ảnh bìa!",
        description: "Hãy tải lên ảnh bìa truyện!",
      });
      return;
    }
    if (!editorValue) {
      toast({
        variant: "destructive",
        title: "Bạn chưa nhập mô tả truyện!",
        description: "Hãy nhập mô tả truyện!",
      });
      return;
    }
    const res = await mutateAsync({
      title: request.title,
      slug: slug,
      description: editorValue,
      thumbnail: avatarImage,
      unitPrice: request.unitPrice,
      categoryId: updatedCategories,
      salaryType: Number(salaryType),
      author: request.author,
    });
    if (res && isSuccessResponse(res?.statusCode, res?.success)) {
      handleReset();
      toast({
        title: "Tạo mới thành công!",
        description: res?.data,
      });
      window.location.href = "/user/manage-comic";
    } else {
      toast({
        variant: "destructive",
        title: "Tạo mới không thành công!",
        description: "Tên truyện đã tồn tại hoặc có lỗi xảy ra!",
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
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <PenIcon size={20} />
            <span>Đăng Truyện</span>
          </h1>
        </div>
        <Link href={`/user/manage-comic`}>
          <ButtonBase size="sm" icon={<ArrowLeft />} variants="outline">
            Quay lại
          </ButtonBase>
        </Link>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form action="post" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex gap-3 items-start max-sm:flex-wrap">
            <InputItem
              type="text"
              name="title"
              label="Tên truyện"
              register={register}
              placeholder="Tên truyện..."
              error={errors.title}
              variants={{
                wrapperClassName: "sm:w-1/2 max-sm:w-full",
              }}
            />
            <InputItem
              type="text"
              name="author"
              label="Tác giả"
              register={register}
              placeholder="Tên tác giả..."
              error={errors.author}
              variants={{
                wrapperClassName: "sm:w-1/2 max-sm:w-full",
              }}
            />
          </div>
          <div className="w-full mb-3">
            <InputLabelBase label="Thể loại" />
            <SelectSearchBase
              data={categoryOptions}
              onSelect={handleCategoryChange}
              placeholder="Thể loại truyện..."
              className="w-full"
            />
            {categoryId.length <= 0 && isSubmitted && (
              <InputErrorBase message="Vui lòng chọn thể loại!" />
            )}
          </div>

          <div className="w-full flex max-sm:flex-wrap gap-3 items-start">
            <div className="max-sm:w-full sm:w-1/2">
              <div className="flex gap-2 justify-between flex-wrap items-baseline">
                <InputLabelBase label="Chế độ chia lương" />
                <Link
                  href={"/term-condition"}
                  className="text-primary underline font-semibold text-xs"
                >
                  Chi tiết
                </Link>
              </div>
              <Select
                value={salaryType}
                onValueChange={(value) => setSalaryType(value)}
              >
                <SelectTrigger className="w-full h-12">
                  <SelectValue placeholder="Chọn chế độ chia lương..." />
                </SelectTrigger>
                <SelectContent>
                  {SALARY_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {isSubmitted && !salaryType && (
                <InputErrorBase message="Vui lòng chọn chế độ chia lương!" />
              )}
            </div>
            <InputItem
              type="number"
              defaultValue={0}
              min={0}
              step={10}
              disabled={salaryType === "0"}
              max={100000000}
              name="unitPrice"
              label="Giá truyện (dâu)"
              register={register}
              error={errors.unitPrice}
              variants={{
                wrapperClassName: "max-sm:w-full sm:w-1/2",
              }}
            />
          </div>
          <div className="w-full flex gap-3 items-end flex-wrap">
            <InputFile
              label="Ảnh bìa (chọn ảnh và nhấn tải file)"
              name="avatar"
              handleFileChange={handleFileChange}
              variants={{
                wrapperClassName: "max-sm:w-full sm:w-1/2",
              }}
              error={
                isSubmitted && !selectedFile && !avatarImage
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
              <InputErrorBase message="Vui lòng nhập mô tả truyện!" />
            )}
          </div>

          <InlineHint />
          <div className="mt-6 flex justify-end gap-2">
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
                <div className="flex gap-1 items-center">Đăng truyện</div>
              )}
            </ButtonBase>
          </div>
        </form>
      )}
    </div>
  );
};

const AddComic = () => {
  return (
    <Suspense fallback={<DotLoader />}>
      <AddComicClient />
    </Suspense>
  );
};

export default memo(AddComic);
