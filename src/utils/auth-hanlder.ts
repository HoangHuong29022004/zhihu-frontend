/**
 * Hàm tiện ích để quản lý cookies authentication
 */

interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Set authentication cookies
 * @param tokens Object chứa accessToken và refreshToken
 */
export const setAuthCookies = (tokens: IAuthTokens) => {
  const { accessToken, refreshToken } = tokens;

  // Set cookies với các options bảo mật
  document.cookie = `accessToken=${accessToken}; path=/; secure=true; samesite=strict`;
  document.cookie = `refreshToken=${refreshToken}; path=/; secure=true; samesite=strict`;
};

/**
 * Remove authentication cookies
 */
export const removeAuthCookies = () => {
  // Xóa cookies bằng cách set expires về quá khứ
  const expiredDate = new Date(0).toUTCString();
  document.cookie = `accessToken=; path=/; expires=${expiredDate}; secure=true; samesite=strict`;
  document.cookie = `refreshToken=; path=/; expires=${expiredDate}; secure=true; samesite=strict`;
};
