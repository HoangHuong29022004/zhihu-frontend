/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/configs/axios-interceptor";
import { API_ENDPOINT } from "@/data/constants/api-endpoints";
import {
  TAddComicRequest,
  TOutStandingRequest,
  TUpdateComicRequest,
} from "@/schemas/comic.schema";
import { IQueryOptions } from "@/types/global";

export const getLastCompleteComics = async (query: IQueryOptions) => {
  const { pageNumber = 1, pageSize = 36 } = query;
  try {
    const res = await apiClient().get(
      `${API_ENDPOINT.COMIC_LAST_COMPLETED}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const getOutStandingComics = async (query: IQueryOptions) => {
  const { pageNumber = 1, pageSize = 36 } = query;
  try {
    const res = await apiClient().get(
      `${API_ENDPOINT.COMIC_OUT_STANDINGS}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const getHotComics = async (query: IQueryOptions) => {
  const { pageNumber = 1, pageSize = 36 } = query;
  try {
    const res = await apiClient().get(
      `${API_ENDPOINT.COMIC_HOT}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const getComicDetailBySlug = async (request: string, _token: string) => {
  // Sử dụng dữ liệu demo thay vì gọi API
  try {
    const { DEMO_COMIC_DETAILS } = await import("@/data/mocks/demo-comic-detail");
    
    // Tìm comic theo slug
    const comicDetail = DEMO_COMIC_DETAILS[request];
    
    if (comicDetail) {
      // Trả về response format giống API thật
      return {
        statusCode: 200,
        success: true,
        message: "Success",
        data: comicDetail
      };
    } else {
      // Trả về 404 nếu không tìm thấy
      return {
        statusCode: 404,
        success: false,
        message: "Comic not found",
        data: null
      };
    }
  } catch (error: any) {
    console.error("Error in getComicDetailBySlug:", error);
    return {
      statusCode: 500,
      success: false,
      message: "Internal server error",
      data: null
    };
  }
};

export const getListComics = async ({
  pageNumber = 1,
  pageSize = 200,
  search,
  categorySlug,
}: IQueryOptions) => {
  try {
    const params = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (search) {
      params.append("search", search);
    }
    if (categorySlug) {
      params.append("categorySlug", categorySlug);
    }

    const { data } = await apiClient().get(
      `${API_ENDPOINT.COMIC_MODULE}?${params.toString()}`
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

export const getListComicsRequesting = async ({
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
      `${API_ENDPOINT.COMIC_REQUESTING}?${params.toString()}`
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

export const addNewComic = async (token: string, request: TAddComicRequest) => {
  try {
    const res = await apiClient("", true, "application/json", token).post(
      `${API_ENDPOINT.COMIC_MODULE}`,
      request
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const approvedComic = async (token: string, id: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).put(
      `${API_ENDPOINT.COMIC_APPROVED}?id=${id}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const rejectedComic = async (
  token: string,
  id: string,
  note: string
) => {
  try {
    const res = await apiClient("", true, "application/json", token).put(
      `${API_ENDPOINT.COMIC_REJECTED}?id=${id}`,
      note
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const updateComic = async (
  token: string,
  id: string,
  request: TUpdateComicRequest
) => {
  try {
    const res = await apiClient("", true, "application/json", token).put(
      `${API_ENDPOINT.COMIC_MODULE}/${id}`,
      request
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const updateComicStatus = async (
  token: string,
  id: string,
  request: number
) => {
  try {
    const res = await apiClient("", true, "application/json", token).put(
      `${API_ENDPOINT.COMIC_STATUS}?id=${id}`,
      request
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const getComicDetails = async (token: string, request: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.COMIC_MODULE}/${request}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const deleteComic = async (token: string, request: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).delete(
      `${API_ENDPOINT.COMIC_MODULE}/${request}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const getListUserComics = async (
  token: string,
  { pageNumber = 1, pageSize = 200, search }: IQueryOptions
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
      `${API_ENDPOINT.COMIC_ME}?${params.toString()}`
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

export const getListUserPurchasedComics = async (
  token: string,
  { pageNumber = 1, pageSize = 200, search }: IQueryOptions
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
      `${API_ENDPOINT.COMIC_PURCHASED}?${params.toString()}`
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

export const outStandingComic = async (
  token: string,
  request: TOutStandingRequest
) => {
  try {
    const res = await apiClient("", true, "application/json", token).post(
      `${API_ENDPOINT.OUTSTANDING_MODULE}`,
      request
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};
