/* eslint-disable @typescript-eslint/no-explicit-any */

import { TAddAudioRequest, TUpdateAudioRequest } from "@/schemas/audio.schema";
import {
  addNewAudio,
  deleteAudio,
  getAudioDetailById,
  updateAudio,
} from "@/services/audio-service";
import { IApiResponse } from "@/types/global";
import { isSuccessResponse } from "@/utils/api-handler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAddAudio = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: TAddAudioRequest) => addNewAudio(token, request),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["audios"],
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

export const useDeleteAudio = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: string) => deleteAudio(token, request),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["audios"],
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

export const useGetDetailsAudio = (token: string, id: string) => {
  return useQuery({
    queryKey: ["audioDetails", { id }],
    queryFn: async () => {
      try {
        if (id) {
          return await getAudioDetailById(token, id);
        } else {
          return null;
        }
      } catch (error) {
        return error;
      }
    },
  });
};

export const useGetDetailsAudioBygSlug = (token: string, slug: string) => {
  return useQuery({
    queryKey: ["audioDetails", { slug }],
    queryFn: async () => {
      try {
        if (slug) {
          return await getAudioDetailById(token, slug);
        } else {
          return null;
        }
      } catch (error) {
        return error;
      }
    },
  });
};

export const useUpdateAudio = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: TUpdateAudioRequest;
    }) => updateAudio(token, id, request),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["audios"],
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
