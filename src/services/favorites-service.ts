/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/configs/axios-interceptor";
import { API_ENDPOINT } from "@/data/constants/api-endpoints";
import { IQueryOptions } from "@/types/global";

export const getListFavorites = async (token: string, query: IQueryOptions) => {
  const { pageNumber = 1, pageSize = 36 } = query;
  try {
    const res = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.FAVORITES_MODULE}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return res.data.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const addNewFavorite = async (token: string, request: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).post(
      `${API_ENDPOINT.FAVORITES_MODULE}`,
      {
        comicId: request,
      }
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const deleteFavorite = async (token: string, request: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).delete(
      `${API_ENDPOINT.FAVORITES_MODULE}`,
      {
        data: {
          comicId: request,
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
