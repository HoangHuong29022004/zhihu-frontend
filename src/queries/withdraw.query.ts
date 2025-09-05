/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  addWithdraw,
  deleteWithdraw,
  getWithdrawAdmin,
  getWithdrawMe,
  getWithdrawStatistic,
} from "@/services/withdraw-service";
import {
  approveWithDrawManually,
  rejectWithDrawManually,
} from "@/services/withdraw-service";
import { IApiResponse } from "@/types/global";
import { IWithDrawRequest } from "@/types/withdraw.type";
import { isSuccessResponse } from "@/utils/api-handler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetWithdrawAdmin = ({
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
    queryKey: ["withdraw-admin", { pageNumber, pageSize }],
    queryFn: async () => {
      try {
        return await getWithdrawAdmin(token, { pageNumber, pageSize });
      } catch (error) {
        return error;
      }
    },
    enabled,
  });
};

export const useApprovedWithdrawManually = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => approveWithDrawManually(token, id),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["withdraw-admin"],
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

export const useRejectWithdrawManually = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => rejectWithDrawManually(token, id),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["withdraw-admin"],
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

export const useGetWithdrawMe = ({
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
    queryKey: ["withdraw-me", { pageNumber, pageSize }],
    queryFn: async () => {
      try {
        return await getWithdrawMe(token, { pageNumber, pageSize });
      } catch (error) {
        return error;
      }
    },
    enabled,
  });
};

export const useGetWithdrawStatistic = ({
  token,
  enabled = true,
}: {
  token: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["withdraw-statistic"],
    queryFn: async () => {
      try {
        return await getWithdrawStatistic(token);
      } catch (error) {
        return error;
      }
    },
    enabled,
  });
};

export const useAddWithdraw = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: IWithDrawRequest) => addWithdraw(token, request),
    onSuccess: (res: IApiResponse<any>) => {
      queryClient.invalidateQueries({
        queryKey: ["withdraw-me"],
        exact: false,
      });
      return res;
    },
    onError: (error: any) => {
      return error;
    },
  });
};

export const useDeleteWithdraw = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: string) => deleteWithdraw(token, request),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["withdraw-me"],
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
