/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/configs/axios-interceptor";
import { API_ENDPOINT } from "@/data/constants/api-endpoints";
import { TAddCommentRequest } from "@/types/comment.type";
import { IQueryOptions } from "@/types/global";

export const getListCommentByComicId = async (
  comicId: string,
  { pageNumber = 1, pageSize = 10, search }: IQueryOptions
) => {
  try {
    const params = new URLSearchParams({
      comicId: comicId,
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (search) {
      params.append("search", search);
    }

    const { data } = await apiClient().get(
      `${API_ENDPOINT.COMMENT_MODULE}?${params.toString()}`
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

export const addNewComment = async (
  token: string,
  request: TAddCommentRequest
) => {
  try {
    const res = await apiClient("", true, "application/json", token).post(
      `${API_ENDPOINT.COMMENT_MODULE}`,
      request
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const deleteComment = async (token: string, request: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).delete(
      `${API_ENDPOINT.COMMENT_MODULE}`,
      {
        data: {
          commentId: request,
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
