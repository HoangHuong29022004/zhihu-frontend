/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "@/configs/axios-interceptor";
import { API_ENDPOINT } from "@/data/constants/api-endpoints";
import {
  TUpdateUserCurrencyRequest,
  TUpdateUserRequest,
} from "@/schemas/user.schema";
import { IQueryOptions } from "@/types/global";

export const getListUsers = async (
  token: string,
  { pageNumber = 1, pageSize = 10, search }: IQueryOptions
) => {
  try {
    const params = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (search) {
      params.append("search", search);
    }

    const { data } = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.USERS_MODULE}?${params.toString()}`
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

export const getUserDetails = async (token: string, request: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.USERS_MODULE}/${request}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const updateUser = async (
  token: string,
  request: TUpdateUserRequest
) => {
  try {
    const res = await apiClient("", true, "application/json", token).put(
      `${API_ENDPOINT.USERS_MODULE}`,
      request
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const updateUserByAdmin = async (
  token: string,
  id: string,
  request: TUpdateUserRequest
) => {
  try {
    const res = await apiClient("", true, "application/json", token).put(
      `${API_ENDPOINT.USERS_MODULE}/${id}`,
      request
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const updateCurrencyByAdmin = async (
  token: string,
  request: TUpdateUserCurrencyRequest
) => {
  try {
    const res = await apiClient("", true, "application/json", token).post(
      `${API_ENDPOINT.CURRENCY_MODULE}`,
      request
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};
