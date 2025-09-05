/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "@/configs/axios-interceptor";
import { API_ENDPOINT } from "@/data/constants/api-endpoints";
import {
  TAddCategoryRequest,
  TUpdateCategoryRequest,
} from "@/schemas/category.schema";
import { IQueryOptions } from "@/types/global";

export const getListCategories = async ({
  pageNumber = 1,
  pageSize = 10,
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
      `${API_ENDPOINT.CATEGORY_MODULE}?${params.toString()}`
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

export const addNewCategory = async (
  token: string,
  request: TAddCategoryRequest
) => {
  try {
    const res = await apiClient("", true, "application/json", token).post(
      `${API_ENDPOINT.CATEGORY_MODULE}`,
      request
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const updateCategory = async (
  token: string,
  id: string,
  request: TUpdateCategoryRequest
) => {
  try {
    const res = await apiClient("", true, "application/json", token).put(
      `${API_ENDPOINT.CATEGORY_MODULE}/${id}`,
      request
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const getCategoryDetails = async (token: string, request: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.CATEGORY_MODULE}/${request}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const deleteCategory = async (token: string, request: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).delete(
      `${API_ENDPOINT.CATEGORY_MODULE}/${request}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};
