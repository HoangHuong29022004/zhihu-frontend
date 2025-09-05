/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "@/configs/axios-interceptor";
import { API_ENDPOINT } from "@/data/constants/api-endpoints";
import {
  TChangePasswordRequest,
  TForgotPasswordRequest,
  TLoginRequest,
  TRegisterRequest,
  TResetPasswordRequest,
  TVerifyRequest,
} from "@/schemas/auth.schema";
import { getAccessToken } from "@/utils/api-handler";

export const cLogin = async (request: TLoginRequest) => {
  try {
    const res = await apiClient("", false).post(`${API_ENDPOINT.AUTH_LOGIN}`, {
      email: request.email,
      password: request.password,
    });
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const changePassword = async (request: TChangePasswordRequest) => {
  try {
    const res = await apiClient("", false).put(
      `${API_ENDPOINT.AUTH_CHANGE_PASSWORD}`,
      {
        email: request.email,
        oldPassword: request.oldPassword,
        newPassword: request.newConfirmPassword,
      }
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const getProfile = async (token: string) => {
  try {
    const res = await apiClient("", true, "application/json", token).get(
      `${API_ENDPOINT.AUTH_ME}`
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const sLogin = async (request: TLoginRequest) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: request.email,
        password: request.password,
      }),
    });
    return await res.json();
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const setTokenLoginSuccess = async ({
  accessToken,
  refetchToken,
}: {
  accessToken: string;
  refetchToken: string;
}) => {
  try {
    const res = await fetch("/api/auth/login-success", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken,
        refetchToken,
      }),
    });
    return await res.json();
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const sRefetchToken = async () => {
  try {
    const res = await fetch("/api/auth/refetch-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    return await res.json();
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const googleLogin = async () => {
  try {
    const res = await apiClient().get(`${API_ENDPOINT.AUTH_LOGIN_GOOGLE}`);
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const signUp = async (request: TRegisterRequest) => {
  // function name register is duplicate with register of react-hook-form => signUp
  try {
    const res = await apiClient("", false).post(
      `${API_ENDPOINT.AUTH_REGISTER}`,
      {
        fullName: request.fullName,
        email: request.email,
        password: request.password,
        avatar: "",
      }
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const verifyAccount = async (email: string, request: TVerifyRequest) => {
  try {
    const res = await apiClient("", false).post(
      `${API_ENDPOINT.AUTH_VERIFY}/${email}`,
      request
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const resendConfirm = async (email: string) => {
  try {
    const res = await apiClient("", false).post(
      `${API_ENDPOINT.AUTH_RESEND_CONFIRM}`,
      {
        email,
      }
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const logout = async () => {
  try {
    const res = await apiClient().post(`${API_ENDPOINT.AUTH_LOGOUT}`, {});
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const sLogout = async () => {
  try {
    const accessToken = getAccessToken();
    const res = await fetch("/api/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken }),
    });
    return await res.json();
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const forgotPassword = async (request: TForgotPasswordRequest) => {
  try {
    const res = await apiClient("", false).put(
      `${API_ENDPOINT.AUTH_FORGOT_PASSWORD}`,
      {
        email: request.email,
      }
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const resetPassword = async (request: TResetPasswordRequest) => {
  try {
    const res = await apiClient("", false).put(
      `${API_ENDPOINT.AUTH_RESET_PASSWORD}`,
      {
        userId: request.userId,
        code: request.code,
        password: request.password,
      }
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};

export const updatePassword = async (
  token: string,
  id: string,
  password: string
) => {
  try {
    const res = await apiClient("", true, "application/json", token).put(
      `${API_ENDPOINT.AUTH_UPDATE_PASSWORD}`,
      {
        userId: id,
        password,
      }
    );
    return res.data;
  } catch (error: any) {
    if (error?.response && error?.response?.data) {
      return error.response.data;
    }
  }
};
