/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TAddNotificationRequest,
  TUpdateNotificationRequest,
} from "@/schemas/notification.schema";
import {
  addNewNotification,
  deleteNotification,
  getListNotifications,
  getNotificationDetailBySlug,
  getNotificationDetails,
  updateNotification,
} from "@/services/notification-service";
import { IApiResponse, IDeletedRequest } from "@/types/global";
import { isSuccessResponse } from "@/utils/api-handler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetNotifications = ({
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
    queryKey: ["notifications", { pageNumber, pageSize, search }],
    queryFn: async () => {
      try {
        if (search) {
          return await getListNotifications({
            pageNumber,
            pageSize,
            search,
          });
        } else {
          return await getListNotifications({ pageNumber, pageSize });
        }
      } catch (error) {
        return error;
      }
    },
    enabled,
  });
};

export const useAddNotification = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: TAddNotificationRequest) =>
      addNewNotification(token, request),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["notifications"],
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

export const useDeleteNotification = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: IDeletedRequest) =>
      deleteNotification(token, request.id),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["notifications"],
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

export const useGetDetailsNotification = (token: string, id: string) => {
  return useQuery({
    queryKey: ["notificationDetailsId", { id }],
    queryFn: async () => {
      try {
        if (id) {
          return await getNotificationDetails(token, id);
        } else {
          return null;
        }
      } catch (error) {
        return error;
      }
    },
  });
};

export const useUpdateNotification = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: TUpdateNotificationRequest;
    }) => updateNotification(token, id, request),
    onSuccess: (res: IApiResponse<any>) => {
      if (res && isSuccessResponse(res.statusCode, res?.success)) {
        queryClient.invalidateQueries({
          queryKey: ["notifications"],
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

export const useGetDetailsNotificationBySlug = (
  token: string,
  slug: string
) => {
  return useQuery({
    queryKey: ["notificationBySlug", { slug }],
    queryFn: async () => {
      try {
        if (slug) {
          return await getNotificationDetailBySlug(slug, token);
        } else {
          return null;
        }
      } catch (error) {
        return error;
      }
    },
  });
};
