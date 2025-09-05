/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  approveTransactionManually,
  checkTransactionStatus,
  getCurrencyHistory,
  getPaymentTransactions,
  paymentSeePay,
} from "@/services/payment-service";
import { IApiResponse } from "@/types/global";
import { isSuccessResponse } from "@/utils/api-handler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePaymentSeePay = (token: string) => {
  return useMutation({
    mutationFn: (request: number) => paymentSeePay(token, request),
    onSuccess: (res: IApiResponse<any>) => {
      return res;
    },
    onError: (error: any) => {
      return error;
    },
  });
};

export const usePaymentTransactions = ({
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
    queryKey: ["payment-transaction", { pageNumber, pageSize }],
    queryFn: async () => {
      try {
        return await getPaymentTransactions(token, { pageNumber, pageSize });
      } catch (error) {
        return error;
      }
    },
    enabled,
  });
};

export const useApprovedTransactionManually = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      approveTransactionManually(token, id),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["payment-transaction"],
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

export const useGetCurrencyHistory = ({
  token,
  enabled = true,
}: {
  token: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["currency-history"],
    queryFn: async () => {
      try {
        return await getCurrencyHistory(token);
      } catch (error) {
        return error;
      }
    },
    enabled,
  });
};

export const useCheckTransaction = ({
  token,
  note,
  enabled = true,
}: {
  token: string;
  note: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["check-transaction", { note }],
    queryFn: async () => {
      try {
        return await checkTransactionStatus(token, note);
      } catch (error) {
        return error;
      }
    },
    enabled,
  });
};
