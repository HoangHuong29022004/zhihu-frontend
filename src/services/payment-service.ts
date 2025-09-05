/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "@/configs/axios-interceptor";
import { API_ENDPOINT } from "@/data/constants/api-endpoints";
import { IQueryOptions } from "@/types/global";

interface IPurchasedChapterRequest {
  xUserId: string;
  accessToken: string;
  chapterId: string;
  currencyType: number;
}

export const purchasedChapter = async (request: IPurchasedChapterRequest) => {
  const { xUserId, accessToken, chapterId, currencyType } = request;
  try {
    const res = await apiClient(
      "",
      true,
      "application/json",
      accessToken,
      xUserId
    ).post(`${API_ENDPOINT.PAYMENT_PURCHASED_CHAPTER}`, {
      chapterId: chapterId,
      currenceType: currencyType,
    });
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

interface IPurchasedAudioRequest {
  xUserId: string;
  accessToken: string;
  audioId: string;
  currencyType: number;
}

export const purchasedAudio = async (request: IPurchasedAudioRequest) => {
  const { xUserId, accessToken, audioId, currencyType } = request;
  try {
    const res = await apiClient(
      "",
      true,
      "application/json",
      accessToken,
      xUserId
    ).post(`${API_ENDPOINT.PAYMENT_PURCHASED_AUDIO}`, {
      audioId: audioId,
      currenceType: currencyType,
    });
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

interface IPurchasedComicRequest {
  xUserId: string;
  accessToken: string;
  comicId: string;
  currencyType: number;
}

export const purchasedComic = async (request: IPurchasedComicRequest) => {
  const { accessToken, comicId, currencyType } = request;
  try {
    const res = await apiClient("", true, "application/json", accessToken).post(
      `${API_ENDPOINT.PAYMENT_PURCHASED_COMIC}`,
      {
        comicId: comicId,
        currenceType: currencyType,
      }
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const paymentSeePay = async (token: string, request: number) => {
  try {
    const res = await apiClient("", true, "application/json", token).post(
      `${API_ENDPOINT.PAYMENT_SEE_PAY}`,
      {
        amount: request,
      }
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const getPaymentTransactions = async (
  token: string,
  query: IQueryOptions
) => {
  const { pageNumber = 1, pageSize = 36 } = query;
  try {
    const res = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.PAYMENT_TRANSACTION}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return res.data.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const approveTransactionManually = async (
  token: string,
  request: string
) => {
  try {
    const res = await apiClient("", true, "application/json", token).put(
      `${API_ENDPOINT.PAYMENT_ACCEPT_MANUAL}/${request}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const getCurrencyHistory = async (token: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.CURRENCY_HISTORY}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const checkTransactionStatus = async (
  token: string,
  request: string
) => {
  try {
    const res = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.PAYMENT_TRANSACTION_CHECK}/${request}`
    );
    return res.data.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};
