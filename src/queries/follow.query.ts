/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addNewFollow,
  deleteFollow,
  getListFollows,
} from "./../services/follow-service";

import { IApiResponse } from "@/types/global";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetFollows = ({
  token,
  pageNumber,
  pageSize,
  enabled = true,
}: {
  token: string;
  pageNumber: number;
  pageSize: number;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["follow", { pageNumber, pageSize }],
    queryFn: async () => {
      try {
        return await getListFollows(token, { pageNumber, pageSize });
      } catch (error) {
        return error;
      }
    },
    enabled,
  });
};

export const useAddFollow = (token: string) => {
  return useMutation({
    mutationFn: (request: string) => addNewFollow(token, request),
    onSuccess: (res: IApiResponse<any>) => {
      return res;
    },
    onError: (error: any) => {
      return error;
    },
  });
};

export const useDeleteFollow = (token: string) => {
  return useMutation({
    mutationFn: (request: string) => deleteFollow(token, request),
    onSuccess: (res: IApiResponse<any>) => {
      return res;
    },
    onError: (error: any) => {
      return error;
    },
  });
};
