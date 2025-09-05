import { getAccessToken } from "@/utils/api-handler";
import axios from "axios";

export const apiClient = (
  customUrl = "",
  auth = true,
  contentType = "application/json",
  accessToken = "",
  userId = ""
) => {
  // Check env node
  const baseUrl =
    process.env.NEXT_PUBLIC_ENV_NODE === "development"
      ? process.env.NEXT_PUBLIC_API_URL_DEV
      : process.env.NEXT_PUBLIC_API_URL_PRO;

  // config instance
  const axiosInstance = axios.create({
    baseURL: customUrl || baseUrl,
    // withCredentials: true,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers["Content-Type"] = contentType;
      config.headers["Accept"] = "*/*";
      if (userId) {
        config.headers["X-User-Id"] = `${userId}`;
      }
      if (auth) {
        // Get accessToken from zustand
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        } else {
          const token = getAccessToken();
          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // // Add response interceptor
  // axiosInstance.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     if (error.response?.status === 401) {
  //       // Clear any stored tokens
  //       localStorage.removeItem("auth-storage");
  //       localStorage.removeItem("app-storage");
  //       localStorage.removeItem("comic-storage");
  //       localStorage.removeItem("countdown-payment");
  //       localStorage.removeItem("countdown_verify");

  //       // Redirect to login page
  //       if (typeof window !== "undefined") {
  //         window.location.href = "/login";
  //       }
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  return axiosInstance;
};
