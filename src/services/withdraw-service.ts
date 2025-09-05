/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "@/configs/axios-interceptor";
import { API_ENDPOINT } from "@/data/constants/api-endpoints";
import { IQueryOptions } from "@/types/global";
import { IWithDrawRequest } from "@/types/withdraw.type";

export const getWithdrawAdmin = async (token: string, query: IQueryOptions) => {
  const { pageNumber = 1, pageSize = 36 } = query;
  try {
    const res = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.WITHDRAW}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return res.data.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const approveWithDrawManually = async (
  token: string,
  request: string
) => {
  try {
    const res = await apiClient("", true, "application/json", token).put(
      `${API_ENDPOINT.WITHDRAW_APPROVED}/${request}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const rejectWithDrawManually = async (
  token: string,
  request: string
) => {
  try {
    const res = await apiClient("", true, "application/json", token).put(
      `${API_ENDPOINT.WITHDRAW_REJECTED}/${request}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const getWithdrawMe = async (token: string, query: IQueryOptions) => {
  const { pageNumber = 1, pageSize = 36 } = query;
  try {
    const res = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.WITHDRAW_ME}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return res.data.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const getWithdrawStatistic = async (token: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.WITHDRAW_STATISTIC}`
    );
    return res.data.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const addWithdraw = async (token: string, request: IWithDrawRequest) => {
  try {
    const res = await apiClient("", true, "application/json", token).post(
      `${API_ENDPOINT.WITHDRAW}`,
      request
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const deleteWithdraw = async (token: string, request: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).delete(
      `${API_ENDPOINT.WITHDRAW}/${request}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};
