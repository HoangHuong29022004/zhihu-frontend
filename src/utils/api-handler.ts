import { useAuthStore } from "@/stores/auth-store";
import { isClientEnvironment } from "./common";

export const isSuccessResponse = (
  statusCode: number | string,
  isSuccess?: boolean
): boolean => {
  // Check if statusCode is null, undefined, or NaN
  if (statusCode == null || isNaN(Number(statusCode))) return false;
  // Convert statusCode to number if it is a string
  const code =
    typeof statusCode === "string" ? parseInt(statusCode, 10) : statusCode;
  // Check if the code is within the range of 200-299
  return code >= 200 && code < 300 && Boolean(isSuccess);
};

// Truy cập trực tiếp Zustand store
export const getAccessToken = () => {
  if (!isClientEnvironment()) return null;
  const { accessToken } = useAuthStore.getState();
  return accessToken;
};

// Truy cập trực tiếp Zustand store
export const getXUserId = () => {
  if (!isClientEnvironment()) return null;
  const { user } = useAuthStore.getState();
  return user?.id;
};
export const getRefreshToken = () => {
  if (!isClientEnvironment()) return null;
  const { refreshToken } = useAuthStore.getState();
  return refreshToken;
};

// Truy cập trực tiếp Zustand store
export const setAccessToken = (value: string) => {
  if (!isClientEnvironment() || !value) return null;
  const { setAccessToken } = useAuthStore.getState();
  return setAccessToken(value);
};

export const setRefreshToken = (value: string) => {
  if (!isClientEnvironment() || !value) return null;
  const { setRefreshToken } = useAuthStore.getState();
  return setRefreshToken(value);
};

export const getAPIHost = () => {
  const isProduction = process.env.NEXT_PUBLIC_ENV_NODE === "production";
  return isProduction
    ? process.env.NEXT_PUBLIC_API_URL_PRO
    : process.env.NEXT_PUBLIC_API_URL_DEV;
};

/**
 * Clears all cookies in the current domain
 */
export const clearAllCookies = () => {
  // Get all cookies
  const cookies = document.cookie.split(";");

  // Remove each cookie
  cookies.forEach((cookie) => {
    const cookieName = cookie.split("=")[0].trim();
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
};
