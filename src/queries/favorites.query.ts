/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  addNewFavorite,
  deleteFavorite,
  getListFavorites,
} from "@/services/favorites-service";
import { IApiResponse } from "@/types/global";
import { isSuccessResponse } from "@/utils/api-handler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetFavorites = ({
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
    queryKey: ["favorites", { pageNumber, pageSize }],
    queryFn: async () => {
      try {
        return await getListFavorites(token, { pageNumber, pageSize });
      } catch (error) {
        return error;
      }
    },
    enabled,
});
};

export const useAddFavorite = (token: string) => {
  return useMutation({
    mutationFn: (request: string) => addNewFavorite(token, request),
    onSuccess: (res: IApiResponse<any>) => {
      return res;
    },
    onError: (error: any) => {
      return error;
    },
  });
};

export const useDeleteFavorite = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: string) => deleteFavorite(token, request),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["favorites"],
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
