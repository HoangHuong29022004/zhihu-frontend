/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  TAddChapterRequest,
  TUpdateChapterRequest,
} from "@/schemas/chapter.schema";
import {
  addNewChapter,
  deleteChapter,
  getChapterDetailById,
  updateChapter,
} from "@/services/chapter-service";
import { IApiResponse, IDeletedRequest } from "@/types/global";
import { isSuccessResponse } from "@/utils/api-handler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAddChapter = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: TAddChapterRequest) => addNewChapter(token, request),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["chapters", "comicDetailsSlug"],
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

export const useUpdateChapter = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: TUpdateChapterRequest;
    }) => updateChapter(token, id, request),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["chapters"],
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

export const useGetDetailsChapter = (token: string, id: string) => {
  return useQuery({
    queryKey: ["chapterDetails", { id }],
    queryFn: async () => {
      try {
        if (id) {
          return await getChapterDetailById(token, id);
        } else {
          return null;
        }
      } catch (error) {
        return error;
      }
    },
  });
};

export const useDeleteChapter = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: IDeletedRequest) => deleteChapter(token, request.id),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["chapters"],
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
