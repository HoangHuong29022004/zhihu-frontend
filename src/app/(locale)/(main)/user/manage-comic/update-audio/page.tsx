/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { memo, Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ButtonBase } from "@/components/common/utils/button";
import {
  ArrowLeft,
  BookOpen,
  InfoIcon,
  PenIcon,
  UploadIcon,
} from "lucide-react";
import { DotLoader, LoadingSpinner } from "@/components/common/utils/loading";
import {
  InputFile,
  InputItem,
  InputLabelBase,
} from "@/components/common/utils/input";
import { generateSlug, isZhihuSecret } from "@/utils/common";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { toast } from "@/hooks/use-toast";
import { useUploadAudio } from "@/queries/file.query";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { TUpdateAudioRequest, UpdateAudioSchema } from "@/schemas/audio.schema";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import { useGetDetailsAudio, useUpdateAudio } from "@/queries/audio.query";
import { MAX_AUDIO_SIZE, MAX_AUDIO_SIZE_KB } from "@/data/constants/global";

const UpdateAudioClient = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const searchParams = useSearchParams();
  const audio = searchParams?.get("audio") || "";
  const comicId = searchParams?.get("comicId") || "";
  const [audioUrl, setAudioUrl] = useState<string>("");
  const salaryType = searchParams?.get("salaryType") || "";

  // Get details
  const { isLoading: isLoadingGetDetails, data } = useGetDetailsAudio(
    getAccessToken() ?? "",
    audio
  );

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm<TUpdateAudioRequest>({
    resolver: zodResolver(UpdateAudioSchema),
  });

  const handleReset = () => {
    setSelectedFile(null);
    setAudioUrl("");
    reset();
  };

  // Using custom hook for upload file
  const { mutateAsync: mutateAsyncUploadFile, isPending: isPendingUploadFile } =
    useUploadAudio(getAccessToken() ?? "");

  // Using custom hook for deleting company
  const { mutateAsync, isPending } = useUpdateAudio(getAccessToken() ?? "");

  const onSubmit = async (request: TUpdateAudioRequest) => {
    if (!audioUrl) {
      toast({
        variant: "destructive",
        title: "Cập nhật audio không thành công!",
        description: "Bạn chưa tải audio",
      });
      return;
    }
    const slug = generateSlug(request.title);
    const concatSlug = `${data?.data?.comicSlug}.${slug}`;
    const res = await mutateAsync({
      id: audio,
      request: {
        title: request.title,
        slug: concatSlug,
        url: audioUrl,
        unitPrice: request.unitPrice,
        comicId: comicId,
      },
    });
    if (res && isSuccessResponse(res?.statusCode, res?.success)) {
      handleReset();
      toast({
        title: "Cập nhật thành công!",
        description: res?.data,
      });
      window.location.href = `/user/manage-comic/${data?.data?.comicSlug}?pageNumber=1&pageSize=20`;
    } else {
      toast({
        variant: "destructive",
        title: "Cập nhật không thành công!",
        description: res?.data,
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      // Check if file is MP3
      if (file.type !== "audio/mpeg" && file.type !== "audio/mp3") {
        toast({
          variant: "destructive",
          title: "Lỗi định dạng file!",
          description: "Vui lòng chọn file MP3",
        });
        event.target.value = ""; // Reset input
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        // Double check file type before upload
        // Double check file type before upload
        if (
          selectedFile.type !== "audio/mpeg" &&
          selectedFile.type !== "audio/mp3"
        ) {
          toast({
            variant: "destructive",
            title: "Lỗi định dạng file!",
            description: "Vui lòng chọn file MP3",
          });
          return;
        }

        if (selectedFile.size > MAX_AUDIO_SIZE_KB) {
          toast({
            variant: "destructive",
            title: "Lỗi kích thước file!",
            description: `File không được lớn hơn ${MAX_AUDIO_SIZE}MB`,
          });
          return;
        }
        const res = await mutateAsyncUploadFile({
          file: selectedFile,
        });
        if (res && res?.link) {
          setAudioUrl(res?.link);
        }
      }
    } catch (error) {
      console.log("Failed to upload file. Please try again.", error);
    }
  };

  // Set item details to form
  useEffect(() => {
    if (data && isSuccessResponse(data?.statusCode, data?.success)) {
      setValue("title", data?.data?.title);
      setValue("unitPrice", data?.data?.unitPrice.toString());
      setAudioUrl(data?.data?.url);
    }
  }, [audio, data]);

  return (
    <div>
      {isLoadingGetDetails || !data ? (
        <div className="flex items-center justify-center h-[70vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <PenIcon size={20} />
                <span>Cập nhật audio</span>
              </h1>
              <p className="text-md text-gray-500 font-bold italic flex items-center gap-2">
                <BookOpen className="text-gray-500" size={16} />
                {data?.data?.comicTitle || "Không tìm thấy truyện"}
              </p>
            </div>
            <Link href={`/user/manage-comic`}>
              <ButtonBase size="sm" icon={<ArrowLeft />} variants="outline">
                Quay lại
              </ButtonBase>
            </Link>
          </div>
          <form action="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2 items-center bg-orange-50 border border-orange-200 px-3 py-2 rounded-lg my-2">
              <InfoIcon size={18} className="text-orange-500" />
              <span className="text-orange-700 text-sm">
                Để tối ưu trải nghiệm nghe audio tại ứng dụng, chúng tôi khuyến
                nghị giảm dung lượng file tối đa 20MB
              </span>
              <Link
                href="https://freecompress.com/vi/compress-mp3"
                className="text-primary underline font-bold"
                target="_blank"
              >
                Tại đây
              </Link>
            </div>
            <div className="w-full flex max-sm:flex-wrap gap-3 items-start">
              <InputItem
                type="text"
                name="title"
                label="Tên audio"
                register={register}
                placeholder="Tên audio..."
                error={errors.title}
                variants={{
                  wrapperClassName: "max-sm:w-full sm:w-1/2",
                }}
              />
              <InputItem
                type="number"
                defaultValue={0}
                min={0}
                step={10}
                max={100000000}
                name="unitPrice"
                label="Giá audio (dâu)"
                register={register}
                error={errors.unitPrice}
                disabled={isZhihuSecret(salaryType)}
                variants={{
                  wrapperClassName: "w-1/2",
                }}
              />
            </div>
            <div className="w-full flex max-sm:flex-wrap gap-3 items-end">
              <InputFile
                label="File audio (chọn file và nhấn tải file)"
                name="avatar"
                handleFileChange={handleFileChange}
                accept=".mp3,audio/mpeg,audio/mp3"
                variants={{
                  wrapperClassName: "w-1/2",
                }}
                error={
                  isSubmitted &&
                  !selectedFile &&
                  !audioUrl &&
                  !isSubmitSuccessful
                    ? "Vui lòng chọn file MP3!"
                    : ""
                }
              />
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
            </div>
            <div className="w-full mt-3">
              {audioUrl && (
                <>
                  <InputLabelBase
                    label="Audio (đã tải lên)"
                    isRequired={false}
                  />
                  <AudioPlayer
                    src={audioUrl}
                    className="bg-gray-800 text-white mt-3 rounded-xl"
                    customAdditionalControls={[]}
                  />
                </>
              )}
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
                  <LoadingSpinner type="button" text="Cập nhật" />
                ) : (
                  <div className="flex gap-1 items-center">Cập nhật</div>
                )}
              </ButtonBase>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

const UpdateAudio = () => {
  return (
    <Suspense fallback={<DotLoader />}>
      <UpdateAudioClient />
    </Suspense>
  );
};

export default memo(UpdateAudio);
