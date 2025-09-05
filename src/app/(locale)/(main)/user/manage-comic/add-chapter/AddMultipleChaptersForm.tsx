/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState } from "react";
import { ButtonBase } from "@/components/common/utils/button";
import { UploadIcon, Plus, Trash2, Eye, SaveIcon, PenIcon } from "lucide-react";
import { LoadingSpinner } from "@/components/common/utils/loading";
import {
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import { NoDataBase } from "@/components/common/utils/no-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import InputBase from "@/components/common/utils/input/input-base";

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

type Chapter = {
  title: string;
  content: string;
};

const AddMultipleChaptersForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarImage, setAvatarImage] = useState<string>("");
  const [chapters, setChapters] = useState<Chapter[]>([
    { title: "", content: "" },
  ]);
  const [tempChapters, setTempChapters] = useState<Chapter[]>([
    { title: "", content: "" },
  ]);
  const [chapterErrors, setChapterErrors] = useState<{
    [key: number]: { title?: string; content?: string };
  }>({});
  const editorRefs = useRef<any[]>([]);
  const searchParams = useSearchParams();
  const comicId = searchParams?.get("comic") || "";
  const comicSlug = searchParams?.get("slug") || "";
  const salaryType = searchParams?.get("salaryType") || "";
  const [showPreview, setShowPreview] = useState(false);

  const {
    register,
    setValue,
    watch,
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm<TAddChapterRequest>({ resolver: zodResolver(AddChapterSchema) });
  const unitPrice = watch("unitPrice");

  const { mutateAsync: mutateAsyncUploadFile, isPending: isPendingUploadFile } =
    useUploadFile(getAccessToken() ?? "");
  const { mutateAsync, isPending } = useAddChapter(getAccessToken() ?? "");

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
        }
      }
    } catch (error) {
      console.log("Failed to upload file. Please try again.", error);
    }
  };

  const handleChapterChange = (
    index: number,
    field: keyof Chapter,
    value: string
  ) => {
    const newTempChapters = [...tempChapters];
    newTempChapters[index] = { ...newTempChapters[index], [field]: value };
    setTempChapters(newTempChapters);
    if (chapterErrors[index]) {
      setChapterErrors({
        ...chapterErrors,
        [index]: { ...chapterErrors[index], [field]: undefined },
      });
    }
  };

  const handleSaveChapter = (index: number) => {
    const chapter = tempChapters[index];
    const errors: { title?: string; content?: string } = {};
    if (!chapter.title.trim()) {
      errors.title = "Vui lòng nhập tiêu đề chương!";
    }
    if (!chapter.content.trim()) {
      errors.content = "Vui lòng nhập nội dung chương!";
    }
    if (Object.keys(errors).length > 0) {
      setChapterErrors({ ...chapterErrors, [index]: errors });
      return;
    }
    const newChapters = [...chapters];
    newChapters[index] = { ...chapter };
    setChapters(newChapters);
    setChapterErrors({ ...chapterErrors, [index]: {} });
    toast({
      title: "Lưu chương thành công!",
      description: `Đã lưu thông tin chương ${index + 1}`,
    });
  };

  const handleAddChapter = () => {
    if (chapters.length >= 10) {
      toast({
        variant: "destructive",
        title: "Lỗi!",
        description: "Chỉ có thể thêm tối đa 10 chương một lần",
      });
      return;
    }
    setChapters([...chapters, { title: "", content: "" }]);
    setTempChapters([...tempChapters, { title: "", content: "" }]);
  };

  const handleRemoveChapter = (index: number) => {
    const newChapters = chapters.filter((_, i) => i !== index);
    const newTempChapters = tempChapters.filter((_, i) => i !== index);
    setChapters(newChapters);
    setTempChapters(newTempChapters);
  };

  const handleSubmitMultipleChapters = async () => {
    const unsavedChapters = tempChapters.filter(
      (tempChapter, index) =>
        tempChapter.title !== chapters[index].title ||
        tempChapter.content !== chapters[index].content
    );
    if (unsavedChapters.length > 0) {
      const unsavedChapterNumbers = unsavedChapters
        .map((_, index) => index + 1)
        .join(", ");
      toast({
        variant: "destructive",
        title: "Có lỗi xảy ra!",
        description: `Các chương ${unsavedChapterNumbers} chưa được lưu. Vui lòng lưu các chương này trước khi đăng!`,
      });
      return;
    }
    const newErrors: { [key: number]: { title?: string; content?: string } } =
      {};
    let hasError = false;
    chapters.forEach((chapter, index) => {
      const errors: { title?: string; content?: string } = {};
      if (!chapter.title.trim()) {
        errors.title = "Vui lòng nhập tiêu đề chương!";
        hasError = true;
      }
      if (!chapter.content.trim()) {
        errors.content = "Vui lòng nhập nội dung chương!";
        hasError = true;
      }
      if (Object.keys(errors).length > 0) {
        newErrors[index] = errors;
      }
    });
    if (hasError) {
      setChapterErrors(newErrors);
      toast({
        variant: "destructive",
        title: "Bạn chưa nhập tiêu đề hoặc nội dung!",
        description: "Vui lòng kiểm tra lại thông tin các chương",
      });
      return;
    }
    if (chapters.length === 0) {
      toast({
        variant: "destructive",
        title: "Bạn chưa thêm chương!",
        description: "Vui lòng thêm ít nhất một chương",
      });
      return;
    }
    try {
      for (const chapter of chapters) {
        const slug = generateSlug(chapter.title);
        const concatSlug = `${comicSlug}.${slug}`;
        const res = await mutateAsync({
          title: chapter.title,
          slug: concatSlug,
          content: chapter.content,
          thumbnail: avatarImage,
          unitPrice: Number(unitPrice),
          comicId: comicId,
        });
        if (!res || !isSuccessResponse(res?.statusCode, res?.success)) {
          throw new Error("Failed to upload chapter");
        }
      }
      toast({
        title: "Đăng nhiều chương thành công!",
        description: "Tất cả các chương đã được đăng thành công",
      });
      window.location.href = `/user/manage-comic/${comicSlug}?pageNumber=1&pageSize=20`;
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Đăng truyện không thành công!",
        description: "Chương đã tồn tại hoặc có lỗi xảy ra!",
      });
    }
  };

  const renderChapterForm = (chapter: Chapter, index: number) => {
    const tempChapter = tempChapters[index];
    const errors = chapterErrors[index] || {};
    return (
      <div key={index} className="bg-gray-50 p-4 rounded-2xl mb-4 shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Chương {index + 1}</h3>
            <span className="text-sm text-gray-500">({index + 1}/10)</span>
          </div>
          {chapters.length > 1 && (
            <ButtonBase
              size="sm"
              variants="outline"
              onClick={() => handleRemoveChapter(index)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 size={16} />
            </ButtonBase>
          )}
        </div>
        <div className="space-y-4">
          <InputBase
            type="text"
            name={`chapter-${index}-title`}
            label="Tiêu đề chương"
            placeholder="Nhập tiêu đề chương..."
            value={tempChapter.title}
            onChange={(e) =>
              handleChapterChange(index, "title", e.target.value)
            }
            error={errors.title}
          />
          <div>
            <InputLabelBase label="Nội dung chương" />
            <Editor
              apiKey="40p92novchn76jhjw0dc1yzu610ozpmpwmx7bn5psdwrjrpj"
              onInit={(_evt, editor) => {
                editorRefs.current[index] = editor;
                editor.setContent(tempChapter.content);
              }}
              onEditorChange={(content) =>
                handleChapterChange(index, "content", content)
              }
              init={{
                height: 300,
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
            {errors.content && (
              <div className="text-sm text-red-500 mt-1">{errors.content}</div>
            )}
          </div>
          <div className="flex justify-end">
            <ButtonBase
              className="font-semibold"
              type="button"
              onClick={() => handleSaveChapter(index)}
              icon={<SaveIcon size={16} />}
            >
              Lưu chương
            </ButtonBase>
          </div>
        </div>
      </div>
    );
  };

  const renderPreviewModal = () => {
    return (
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-sm:w-[90%] sm:max-w-[580px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              Xem trước các chương{" "}
              {chapters.length > 1 && `(${chapters.length})`}
            </DialogTitle>
            <DialogDescription>
              Kiểm tra nội dung trước khi đăng
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[66vh] overflow-y-auto">
            {chapters.length > 0 && chapters[0].title && chapters[0].content ? (
              chapters.map((chapter, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="text-base text-primary font-semibold mb-2">
                    {chapter.title}
                  </h3>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: chapter.content }}
                  />
                </div>
              ))
            ) : (
              <NoDataBase
                title="Chưu có chương nào được lưu!"
                desc="Hãy nhập đầy đủ nội dung tiêu đề, và lưu chương!"
                imgSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/no-data.webp`}
                className="py-16"
              />
            )}
          </div>
          <DialogFooter className="mt-2 gap-2">
            <ButtonBase
              className="font-semibold"
              type="button"
              variants="outline"
              onClick={() => setShowPreview(false)}
            >
              Đóng
            </ButtonBase>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div>
      <div className="bg-gray-50 p-4 rounded-2xl mb-6 shadow">
        <h3 className="text-lg font-semibold mb-4">Thông tin chương</h3>
        <div className="w-full flex max-sm:flex-wrap gap-3 items-start">
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
            variants={{ wrapperClassName: "max-sm:w-full sm:w-1/2" }}
          />
          <div className="max-sm:w-full sm:w-1/2">
            <InputFile
              label="Ảnh bìa"
              name="avatar"
              handleFileChange={handleFileChange}
              error={
                isSubmitted &&
                !selectedFile &&
                !avatarImage &&
                !isSubmitSuccessful
                  ? "Vui lòng chọn ảnh bìa!"
                  : ""
              }
            />
            <div className="flex items-end justify-start gap-3 mt-2">
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
                className="object-cover object-center rounded-md size-16 text-center"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {chapters.map((chapter, index) => renderChapterForm(chapter, index))}
      </div>
      <InlineHint message="Lưu ý: Đăng tối đa 10 chương 1 lần!" />
      <div className="flex max-sm:flex-wrap justify-between items-center mt-6 gap-6">
        <ButtonBase
          className="font-semibold max-sm:w-full"
          type="button"
          variants="outline"
          onClick={handleAddChapter}
        >
          <Plus className="mr-2" size={16} /> Thêm chương
        </ButtonBase>
        <div className="flex gap-3">
          <ButtonBase
            className="font-semibold"
            type="button"
            variants="outline"
            onClick={() => setShowPreview(true)}
          >
            <Eye className="mr-2" size={16} /> Xem trước
          </ButtonBase>
          <ButtonBase
            className={`font-semibold ${
              chapters.length <= 1 &&
              (!chapters[0].title || !chapters[0].content) &&
              "bg-opacity-60"
            }`}
            type="button"
            onClick={handleSubmitMultipleChapters}
            disabled={
              chapters.length <= 1 &&
              (!chapters[0].title || !chapters[0].content)
            }
          >
            {isPending ? (
              <LoadingSpinner type="button" text="Đăng tất cả chương" />
            ) : (
              <div className="flex gap-1 items-center">
                <PenIcon size={14} />
                Đăng tất cả chương
              </div>
            )}
          </ButtonBase>
        </div>
      </div>
      {renderPreviewModal()}
    </div>
  );
};

export default AddMultipleChaptersForm;
