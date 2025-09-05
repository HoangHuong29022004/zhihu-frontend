/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/configs/axios-interceptor";
import { API_ENDPOINT } from "@/data/constants/api-endpoints";
import { IQueryOptions } from "@/types/global";

export const getListMissions = async (token: string, query: IQueryOptions) => {
  const { pageNumber = 1, pageSize = 36 } = query;
  try {
    const res = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.MISSION_MODULE}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const updateMission = async (token: string, id: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).put(
      `${API_ENDPOINT.MISSION_MODULE}/${id}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};
