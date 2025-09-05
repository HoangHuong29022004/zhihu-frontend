/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "@/configs/axios-interceptor";
import { API_ENDPOINT } from "@/data/constants/api-endpoints";
import {
  TAddNotificationRequest,
  TUpdateNotificationRequest,
} from "@/schemas/notification.schema";
import { IQueryOptions } from "@/types/global";

export const getListNotifications = async ({
  pageNumber = 1,
  pageSize = 200,
  search,
}: IQueryOptions) => {
  try {
    const params = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (search) {
      params.append("search", search);
    }

    const { data } = await apiClient().get(
      `${API_ENDPOINT.NOTIFICATION_MODULE}?${params.toString()}`
    );

    return data.data;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response?: { data: unknown } };
      return axiosError.response?.data;
    }
    throw error;
  }
};

export const addNewNotification = async (
  token: string,
  request: TAddNotificationRequest
) => {
  try {
    const res = await apiClient("", true, "application/json", token).post(
      `${API_ENDPOINT.NOTIFICATION_MODULE}`,
      request
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const deleteNotification = async (token: string, request: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).delete(
      `${API_ENDPOINT.NOTIFICATION_MODULE}/${request}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const getNotificationDetails = async (
  token: string,
  request: string
) => {
  try {
    const res = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.NOTIFICATION_MODULE}/${request}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const updateNotification = async (
  token: string,
  id: string,
  request: TUpdateNotificationRequest
) => {
  try {
    const res = await apiClient("", true, "application/json", token).put(
      `${API_ENDPOINT.NOTIFICATION_MODULE}/${id}`,
      request
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const getNotificationDetailBySlug = async (
  request: string,
  token: string
) => {
  try {
    const res = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.NOTIFICATION_DETAIL_BY_SLUG}/${request}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};
