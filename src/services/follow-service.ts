/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/configs/axios-interceptor";
import { API_ENDPOINT } from "@/data/constants/api-endpoints";
import { IQueryOptions } from "@/types/global";

export const getListFollows = async (token: string, query: IQueryOptions) => {
  const { pageNumber = 1, pageSize = 36 } = query;
  try {
    const res = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.FOLLOW}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return res.data.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const addNewFollow = async (token: string, request: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).post(
      `${API_ENDPOINT.FOLLOW}`,
      {
        followedId: request,
      }
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const deleteFollow = async (token: string, request: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).delete(
      `${API_ENDPOINT.FOLLOW}`,
      {
        data: {
          followedId: request,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};
