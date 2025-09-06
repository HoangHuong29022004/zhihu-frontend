/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/configs/axios-interceptor";
import { API_ENDPOINT } from "@/data/constants/api-endpoints";
import {
  TAddChapterRequest,
  TUpdateChapterRequest,
} from "@/schemas/chapter.schema";

export const getChapterDetailBySlug = async (
  request: string,
  _token: string
) => {
  // Sử dụng dữ liệu demo thay vì gọi API
  try {
    const { DEMO_CHAPTER_DETAILS } = await import("@/data/mocks/demo-chapter-detail");
    
    // Tìm chapter theo slug
    const chapterDetail = DEMO_CHAPTER_DETAILS[request];
    
    if (chapterDetail) {
      // Trả về response format giống API thật
      return {
        statusCode: 200,
        success: true,
        message: "Success",
        data: chapterDetail
      };
    } else {
      // Trả về 404 nếu không tìm thấy
      return {
        statusCode: 404,
        success: false,
        message: "Chapter not found",
        data: null
      };
    }
  } catch (error: any) {
    console.error("Error in getChapterDetailBySlug:", error);
    return {
      statusCode: 500,
      success: false,
      message: "Internal server error",
      data: null
    };
  }
};

export const addNewChapter = async (
  token: string,
  request: TAddChapterRequest
) => {
  try {
    const res = await apiClient("", true, "application/json", token).post(
      `${API_ENDPOINT.CHAPTER_MODULE}`,
      request
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const updateChapter = async (
  token: string,
  id: string,
  request: TUpdateChapterRequest
) => {
  try {
    const res = await apiClient("", true, "application/json", token).put(
      `${API_ENDPOINT.CHAPTER_MODULE}/${id}`,
      request
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const getChapterDetailById = async (token: string, request: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.CHAPTER_MODULE}/${request}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const deleteChapter = async (token: string, request: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).delete(
      `${API_ENDPOINT.CHAPTER_MODULE}/${request}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};
