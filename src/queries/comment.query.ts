/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  addNewComment,
  deleteComment,
  getListCommentByComicId,
} from "@/services/comment-service";
import { TAddCommentRequest } from "@/types/comment.type";
import { IApiResponse } from "@/types/global";
import { isSuccessResponse } from "@/utils/api-handler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetComments = ({
  comicId,
  pageNumber,
  pageSize,
  enabled = true,
}: {
  comicId: string;
  pageNumber: number;
  pageSize: number;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["comments", { comicId, pageNumber, pageSize }],
    queryFn: async () => {
      try {
        return await getListCommentByComicId(comicId, { pageNumber, pageSize });
      } catch (error) {
        return error;
      }
    },
    enabled,
  });
};

export const useAddComment = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: TAddCommentRequest) => addNewComment(token, request),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["comments"],
          exact: false,
        });
      }
      return res;
    },
    onError: (error: any) => {
      return error;
    },
  });
};

export const useDeleteComment = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: string) => deleteComment(token, request),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["comments"],
          exact: false,
        });
      }
      return res;
    },
    onError: (error: any) => {
      return error;
    },
  });
};
