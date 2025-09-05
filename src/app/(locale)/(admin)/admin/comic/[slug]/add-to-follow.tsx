"use client";

import { ButtonBase } from "@/components/common/utils/button";
import { LoadingSpinner } from "@/components/common/utils/loading";
import { toast } from "@/hooks/use-toast";
import { useAddFollow } from "@/queries/follow.query";
import { useComicStore } from "@/stores/comic-store";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface IProps {
  authorId: string;
}
const AddToFollow = ({ authorId }: IProps) => {
  const followedUsers = useComicStore((state) => state.followedUsers);
  const isAdded = Boolean(followedUsers?.find((item) => item.id === authorId));

  const router = useRouter();
  const { mutateAsync, isPending } = useAddFollow(getAccessToken() ?? "");

  const handleAddFollow = async () => {
    const res = await mutateAsync(authorId ?? "");
    if (res && isSuccessResponse(res?.statusCode, res?.success)) {
      toast({
        title: "Bạn đã follow tác giả!",
        description: "Bạn vừa follow tác giả",
      });
      router.push(`/user/manage-follow`);
    } else {
      toast({
        variant: "destructive",
        title: "Follow tác giả không thành công!",
        description: res?.data,
      });
    }
  };

  return (
    <ButtonBase
      onClick={handleAddFollow}
      disabled={isPending || Boolean(isAdded)}
      variants="outline"
      className="w-1/2"
    >
      {isPending ? (
        <LoadingSpinner type="button" text="" />
      ) : (
        <div className="flex gap-1 items-center">
          <Plus size={16} />
          {isAdded ? "Đã follow" : "Follow"}
        </div>
      )}
    </ButtonBase>
  );
};

export default AddToFollow;
