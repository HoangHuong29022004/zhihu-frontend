/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/configs/axios-interceptor";
import { API_ENDPOINT } from "@/data/constants/api-endpoints";
import { TAddAudioRequest, TUpdateAudioRequest } from "@/schemas/audio.schema";

export const addNewAudio = async (token: string, request: TAddAudioRequest) => {
  try {
    const res = await apiClient("", true, "application/json", token).post(
      `${API_ENDPOINT.AUDIO_MODULE}`,
      request
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const deleteAudio = async (token: string, request: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).delete(
      `${API_ENDPOINT.AUDIO_MODULE}/${request}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const getAudioDetailById = async (token: string, request: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.AUDIO_MODULE}/${request}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const getAudioDetailBySlug = async (token: string, request: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.AUDIO_DETAIL_BY_SLUG}/${request}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const updateAudio = async (
  token: string,
  id: string,
  request: TUpdateAudioRequest
) => {
  try {
    const res = await apiClient("", true, "application/json", token).put(
      `${API_ENDPOINT.AUDIO_MODULE}/${id}`,
      request
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};
