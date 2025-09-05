import { DELETE_OPTION } from "@/data/constants/global";

export interface IQueryOptions {
  pageNumber?: number | string;
  pageSize?: number | string;
  search?: string;
  orderBy?: string;
  orderOption?: "asc" | "desc";
  status?: string;
  categorySlug?: string;
}

// Config API response interceptor
export interface IApiResponse<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
}

// Type from constants
export type IDeleteOptionType =
  (typeof DELETE_OPTION)[keyof typeof DELETE_OPTION];

// Delete request
export interface IDeletedRequest {
  id: string;
  options?: IDeleteOptionType;
}
