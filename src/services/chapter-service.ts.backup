/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/configs/axios-interceptor";
import { API_ENDPOINT } from "@/data/constants/api-endpoints";
import {
  TAddChapterRequest,
  TUpdateChapterRequest,
} from "@/schemas/chapter.schema";

export const getChapterDetailBySlug = async (
  request: string,
  token: string
) => {
  try {
    const res = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.CHAPTER_DETAIL_BY_SLUG}/${request}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
    
    // Facebook WebView specific retry logic
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent;
      const isFacebookWebView = /FBAN|FBAV|FB_IAB|FB4A/i.test(userAgent);
      
      if (isFacebookWebView && !error?.response) {
        // Network error in Facebook WebView, try again with different approach
        try {
          const retryRes = await apiClient("", true, "application/json", token).get(
            `${API_ENDPOINT.CHAPTER_DETAIL_BY_SLUG}/${request}`,
            {
              timeout: 10000, // 10 second timeout
              headers: {
                'X-Facebook-WebView': 'true',
                'X-Retry': '1'
              }
            }
          );
          return retryRes.data;
        } catch (retryError: any) {
          if (retryError?.response && retryError?.response?.data) {
            return retryError.response.data;
          }
        }
      }
    }
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
