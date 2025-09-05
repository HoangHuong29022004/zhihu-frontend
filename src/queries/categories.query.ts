/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  TAddCategoryRequest,
  TUpdateCategoryRequest,
} from "@/schemas/category.schema";
import {
  addNewCategory,
  deleteCategory,
  getCategoryDetails,
  getListCategories,
  updateCategory,
} from "@/services/category-service";
import { IApiResponse, IDeletedRequest } from "@/types/global";
import { isSuccessResponse } from "@/utils/api-handler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCategories = ({
  pageNumber,
  pageSize,
  search,
  enabled = true,
}: {
  pageNumber: number;
  pageSize: number;
  search: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["categories", { pageNumber, pageSize, search }],
    queryFn: async () => {
      try {
        if (search) {
          return await getListCategories({
            pageNumber,
            pageSize,
            search,
          });
        } else {
          return await getListCategories({ pageNumber, pageSize });
        }
      } catch (error) {
        return error;
      }
    },
    enabled,
  });
};

export const useAddCategory = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: TAddCategoryRequest) =>
      addNewCategory(token, request),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["categories"],
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

export const useUpdateCategory = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: TUpdateCategoryRequest;
    }) => updateCategory(token, id, request),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["categories"],
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

export const useGetDetailsCategory = (token: string, id: string) => {
  return useQuery({
    queryKey: ["categoryDetails", { id }],
    queryFn: async () => {
      try {
        if (id) {
          return await getCategoryDetails(token, id);
        } else {
          return null;
        }
      } catch (error) {
        return error;
      }
    },
  });
};

export const useDeleteCategory = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: IDeletedRequest) => deleteCategory(token, request.id),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["categories"],
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
