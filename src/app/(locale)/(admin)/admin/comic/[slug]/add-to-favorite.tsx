"use client";

import { ButtonBase } from "@/components/common/utils/button";
import { LoadingSpinner } from "@/components/common/utils/loading";
import { toast } from "@/hooks/use-toast";
import { useAddFavorite } from "@/queries/favorites.query";
import { useComicStore } from "@/stores/comic-store";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface IProps {
  comicId: string;
}
const AddComicToFavorite = ({ comicId }: IProps) => {
  const comicFavorites = useComicStore((state) => state.comicFavorites);
  const isAdded = comicFavorites?.find((item) => item.id === comicId);

  const router = useRouter();
  const { mutateAsync, isPending } = useAddFavorite(getAccessToken() ?? "");

  const handleAddToFavorite = async () => {
    const res = await mutateAsync(comicId ?? "");
    if (res && isSuccessResponse(res?.statusCode, res?.success)) {
      toast({
        title: "Thêm truyện yêu thích thành công!",
        description: "Truyện đã được thêm vào mục yêu thích",
      });
      router.push(`/user/comic-favorite`);
    } else {
      toast({
        variant: "destructive",
        title: "Thêm truyện yêu thích không thành công!",
        description: res?.data,
      });
    }
  };

  return (
    <ButtonBase
      onClick={handleAddToFavorite}
      disabled={isPending || Boolean(isAdded)}
      className="w-1/2"
    >
      {isPending ? (
        <LoadingSpinner type="button" text="Yêu thích" />
      ) : (
        <div className="flex gap-1 items-center">
          <Heart size={16} />
          {isAdded ? "Đã thêm" : "Yêu thích"}
        </div>
      )}
    </ButtonBase>
  );
};

export default AddComicToFavorite;
