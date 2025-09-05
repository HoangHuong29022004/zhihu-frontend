/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  TUpdateUserCurrencyRequest,
  TUpdateUserRequest,
} from "@/schemas/user.schema";
import {
  getListUsers,
  getUserDetails,
  updateCurrencyByAdmin,
  updateUser,
  updateUserByAdmin,
} from "@/services/user-service";
import { IApiResponse } from "@/types/global";
import { isSuccessResponse } from "@/utils/api-handler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUsers = ({
  token,
  pageNumber,
  pageSize,
  search,
  enabled = true,
}: {
  token: string;
  pageNumber: number;
  pageSize: number;
  search: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["users", { pageNumber, pageSize, search }],
    queryFn: async () => {
      try {
        if (search) {
          return await getListUsers(token, {
            pageNumber,
            pageSize,
            search,
          });
        } else {
          return await getListUsers(token, { pageNumber, pageSize });
        }
      } catch (error) {
        return error;
      }
    },
    enabled,
  });
};

export const useGetDetailsUser = (token: string, id: string) => {
  return useQuery({
    queryKey: ["userDetails", { id }],
    queryFn: async () => {
      try {
        if (id) {
          return await getUserDetails(token, id);
        } else {
          return null;
        }
      } catch (error) {
        return error;
      }
    },
  });
};

export const useUpdateUser = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ request }: { request: TUpdateUserRequest }) =>
      updateUser(token, request),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["users"],
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

export const useUpdateUserByAdmin = (token: string, id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ request }: { request: TUpdateUserRequest }) =>
      updateUserByAdmin(token, id, request),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["users"],
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

export const useUpdateCurrencyByAdmin = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ request }: { request: TUpdateUserCurrencyRequest }) =>
      updateCurrencyByAdmin(token, request),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["users"],
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
