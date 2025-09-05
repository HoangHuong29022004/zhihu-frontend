"use client";

import { toast } from "@/hooks/use-toast";
import { useDeleteComment } from "@/queries/comment.query";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { MoreVertical, Trash2 } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IProps {
  commentId: string;
}

const DeleteComment = ({ commentId }: IProps) => {
  const { mutateAsync } = useDeleteComment(getAccessToken() ?? "");

  const handleDelete = async () => {
    if (commentId) {
      const res = await mutateAsync(commentId);
      if (res && isSuccessResponse(res?.statusCode, res?.success)) {
        toast({
          title: "Bình luận đã được xóa!",
          description: "Bạn vừa xóa bình luận",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Xóa bình luận không thành công!",
          description: res?.data,
        });
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-primary hover:text-primary/80 p-1 rounded-full focus:outline-none bg-slate-100">
          <MoreVertical size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={handleDelete}
          className="hover:text-red-400 hover:cursor-pointer"
        >
          <Trash2 size={16} className="mr-2" />
          Xóa bình luận
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeleteComment;
