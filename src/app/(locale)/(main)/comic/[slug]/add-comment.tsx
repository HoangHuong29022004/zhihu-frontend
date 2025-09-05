"use client";
import { ButtonBase } from "@/components/common/utils/button";
import TextAreaBase from "@/components/common/utils/input/text-area";
import { LoadingSpinner } from "@/components/common/utils/loading";
import { toast } from "@/hooks/use-toast";
import { useAddComment } from "@/queries/comment.query";
import { useAuthStore } from "@/stores/auth-store";
import {
  clearAllCookies,
  getAccessToken,
  isSuccessResponse,
} from "@/utils/api-handler";
import { PenBoxIcon, SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface IProps {
  comicId: string;
  parentId?: string;
  areaVariants?: string;
  isReply?: boolean;
}

const AddComment = ({ comicId, parentId, isReply = false }: IProps) => {
  const [text, setText] = useState<string>("");
  const token = getAccessToken();
  const router = useRouter();
  const { logout: handleLogoutAuthStore } = useAuthStore();

  const handleTextChange = (value: string) => {
    setText(value);
  };

  // Using custom hook for deleting company
  const { mutateAsync, isPending } = useAddComment(getAccessToken() ?? "");

  const handleAddComment = async () => {
    if (!token) {
      handleLogoutAuthStore();
      clearAllCookies();
      toast({
        variant: "destructive",
        title: "Đăng nhập hết hạn hoặc chưa đăng nhập!",
        description: "Vui lòng đăng nhập lại!",
      });
      router.push("/login");
      return;
    }
    if (!text) {
      toast({
        variant: "destructive",
        title: "Lỗi bình luận",
        description: "Nội dung không được bỏ trống!",
      });
      return;
    }

    let request = null;
    if (parentId) {
      request = {
        comicId: comicId,
        content: text,
        parentId: parentId,
      };
    } else {
      request = {
        comicId: comicId,
        content: text,
      };
    }
    const res = await mutateAsync(request);
    if (res && isSuccessResponse(res?.statusCode, res?.success)) {
      toast({
        title: "Bạn vừa bình luận!",
        description: "Bình đã luận truyện",
      });
      setText("");
    } else {
      toast({
        variant: "destructive",
        title: "Bình luận không thành công!",
        description: res?.data,
      });
    }
  };

  return (
    <div className="mt-2">
      <TextAreaBase
        label={parentId ? "Trả lời bình luận" : "Viết bình luận"}
        isRequired={false}
        value={text}
        onChange={handleTextChange}
        placeholder="Nội dung bình luận..."
        variants={{
          textareaClassName: "bg-gray-50 mt-1",
          wrapperClassName: `rounded-full ${isReply && "min-w-54 w-full"}`,
        }}
        required
      />
      <div className="flex justify-start gap-2 flex-wrap mt-1">
        <ButtonBase
          size="sm"
          variants="light"
          className="gap-2 max-sm:w-full"
          onClick={() => setText("")}
        >
          <PenBoxIcon size={16} /> Hủy bỏ
        </ButtonBase>
        <ButtonBase
          size="sm"
          className="gap-2 max-sm:w-full"
          onClick={handleAddComment}
        >
          {isPending ? (
            <LoadingSpinner type="button" text="Bình luận" />
          ) : (
            <div className="flex gap-1 items-center">
              <SendIcon size={16} /> {parentId ? "Trả lời" : "Bình luận"}
            </div>
          )}
        </ButtonBase>
      </div>
    </div>
  );
};

export default AddComment;
