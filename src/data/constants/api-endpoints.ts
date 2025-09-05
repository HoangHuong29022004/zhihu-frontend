export const API_ENDPOINT = {
  // Auth module
  AUTH_LOGIN: "/auth/login",
  AUTH_LOGIN_GOOGLE: "/auth/google/login",
  AUTH_LOGOUT: "/auth/logout",
  AUTH_REGISTER: "/auth/register",
  AUTH_VERIFY: "/auth/verify",
  AUTH_RESEND_CONFIRM: "/auth/resend-confirm",
  AUTH_REFETCH_TOKEN: "/auth/refetchToken",
  AUTH_ME: "/auth/me",
  AUTH_CHANGE_PASSWORD: "/auth/change-password",
  AUTH_FORGOT_PASSWORD: "/auth/forgot-password",
  AUTH_RESET_PASSWORD: "/auth/reset-password",
  AUTH_UPDATE_PASSWORD: "/auth/update-password",

  // Comic module
  COMIC_MODULE: "/comics",
  COMIC_LAST_COMPLETED: "/comics/last-completed",
  COMIC_OUT_STANDINGS: "/comics/outstandings",
  COMIC_HOT: "/comics/hot",
  COMIC_DETAIL_BY_SLUG: "/comics/slug",
  COMIC_REQUESTING: "/comics/requesting",
  COMIC_APPROVED: "/comics/approved",
  COMIC_REJECTED: "/comics/rejected",
  COMIC_ME: "/comics/me",
  COMIC_PURCHASED: "/comics/purchased",
  COMIC_STATUS: "/comics/status",

  // Category module
  CATEGORY_MODULE: "/categories",

  // Chapter module
  CHAPTER_MODULE: "/chapters",
  CHAPTER_DETAIL_BY_SLUG: "/chapters/slug",

  // Audio module
  AUDIO_MODULE: "/audios",
  AUDIO_DETAIL_BY_SLUG: "/audios/slug",

  // Payment module
  PAYMENT_PURCHASED_CHAPTER: "/payments/purchased-chapter",
  PAYMENT_PURCHASED_COMIC: "/payments/purchased-comic",
  PAYMENT_PURCHASED_AUDIO: "/payments/purchased-audio",
  PAYMENT_SEE_PAY: "/payments/sepay",
  PAYMENT_TRANSACTION: "/payments/transactions",
  PAYMENT_ACCEPT_MANUAL: "/payments/accept-manual",
  PAYMENT_TRANSACTION_CHECK: "/payments/transactions/check",

  CURRENCY_HISTORY: "/currency/history",
  CURRENCY_MODULE: "/currency",

  // User module
  USERS_MODULE: "/users",

  // File module
  FILE_UPLOAD: "/uploads",
  FILE_UPLOAD_AUDIO: "/uploads/audio",

  // Favorites module
  FAVORITES_MODULE: "/favorites",

  // Favorites module
  MISSION_MODULE: "/missions",

  // Outstanding
  OUTSTANDING_MODULE: "/outstandings",

  // Comment module
  COMMENT_MODULE: "/comments",

  // Follow module
  FOLLOW: "/follows",

  // Withdraw module
  WITHDRAW: "/withdraw",
  WITHDRAW_APPROVED: "/withdraw/approved",
  WITHDRAW_REJECTED: "/withdraw/rejected",
  WITHDRAW_ME: "/withdraw/me",
  WITHDRAW_STATISTIC: "/withdraw/statistic",

  // Notification module
  NOTIFICATION_MODULE: "/notifications",
  NOTIFICATION_DETAIL_BY_SLUG: "/notifications/slug",
};

// API MODULES
export const API_MODULE = {
  AUTH: "auth",
  FILE: "files",
  USERS: "users",
  PERMISSIONS: "permissions",
  ROLES: "roles",
  CATEGORY: "categories",
};

// FILE TYPE
export const FILE_TYPE = {
  IMAGES: "images",
  FILES: "files",
};
