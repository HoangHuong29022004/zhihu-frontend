// Defining constant delete options
export const DELETE_OPTION = {
  SOFT: "soft",
  HARD: "hard",
  ALL: "all",
} as const;

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 20;
export const DEBOUNCE_SEARCH_TIME = 500; // milliseconds

export const PAGINATION_ITEMS = [5, 10, 20, 50];
export const ARR_PAGINATION_ITEMS = PAGINATION_ITEMS.map((item) => ({
  label: `${item} dòng / trang`,
  value: item.toString(),
}));

// APP ROLES
export const APP_ROLE = {
  ADMIN: "Admin",
  USER: "User",
};

export const COMIC_STATUSES = [
  {
    label: "Đã duyệt",
    value: "APPROVED",
  },
  {
    label: "Chờ duyệt",
    value: "PENDING",
  },
  {
    label: "Từ chối",
    value: "REJECTED",
  },
];
export const ARR_COMIC_STATUSES = COMIC_STATUSES.map((item) => ({
  label: `${item.label}`,
  value: item.value,
}));

export const MISSION_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  PAID: "PAID",
};

export const ARR_MISSION_STATUSES = [
  {
    label: "Đang làm",
    value: "PENDING",
  },
  {
    label: "Đã xong",
    value: "COMPLETED",
  },
];

export const ARR_PAYMENT_STATUSES = [
  {
    label: "Đang xử lí",
    value: "PENDING",
  },
  {
    label: "Đã duyệt",
    value: "PAID",
  },
];

export const PAYMENT_STEPS = [
  "1. Chọn số tiền và điểm",
  "2. Xác nhận thanh toán",
  "3. Chuyển khoản và hoàn tất",
];

export const SHORT_PAYMENT_STEPS = ["Chọn số tiền", "Xác nhận", "Chuyển khoản"];

export const WITHDRAW_STEPS = [
  "1. Nhập số tiền",
  "2. Xác nhận rút tiền",
  "3. Admin duyệt giao dịch",
];

export const SHORT_WITHDRAW_STEPS = ["Nhập số tiền", "Xác nhận", "Admin duyệt"];

export const CURRENCY_TYPES = [
  {
    label: "Dâu",
    value: "STRAWBERRY",
  },
  {
    label: "Hoa",
    value: "FLOWER",
  },
  {
    label: "Kem",
    value: "CREAM",
  },
];

export const SALARY_TYPE_OPTIONS = [
  { label: "Zhihu (10.000 VND / 1000 view)", value: "0" },
  { label: "Không độc quyền (70% cho tác giả)", value: "1" },
  { label: "Độc quyền (90% cho tác giả)", value: "2" },
] as const;

export const SALARY_TYPE_SECRETS = {
  ZHIHU: "9a7c4083463d5cf4f1c8cb42a867bcf99823c5df111cf020799ca2c062c41e1f",
  NON_EXCLUSIVE:
    "6356b1c96cc2e45fc782b66fd94e4a30b9c48df927127d17f7f39e0cfb24cf10",
  EXCLUSIVE: "e8a83e2489c1f803b29d5f8e5291ae8181c4e994b0d7cd53e0f685b5fe37427c",
};

export const CURRENCY_TYPE_OPTIONS = [
  { label: "Dâu", value: "0" },
  { label: "Hoa", value: "1" },
  { label: "Kem", value: "2" },
] as const;

export const CURRENCY_TYPE_PURCHASED_OPTIONS = [
  { label: "Dâu", value: "0" },
  { label: "Hoa", value: "1" },
] as const;

export const BANK_NAME_OPTIONS = [
  { label: "ABBANK - Ngân hàng TMCP An Bình", value: "ABBANK" },
  { label: "ACB - Ngân hàng TMCP Á Châu", value: "ACB" },
  {
    label: "Agribank - Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam",
    value: "Agribank",
  },
  { label: "ANZVL - Ngân hàng TNHH MTV ANZ Việt Nam", value: "ANZVL" },
  { label: "Bac A Bank - Ngân hàng TMCP Bắc Á", value: "Bac A Bank" },
  { label: "BaoVietBank - Ngân hàng TMCP Bảo Việt", value: "BaoVietBank" },
  { label: "BIDV - Ngân hàng Đầu tư và Phát triển Việt Nam", value: "BIDV" },
  {
    label: "CB Bank - Ngân hàng Thương mại TNHH MTV Xây dựng Việt Nam",
    value: "CB Bank",
  },
  { label: "CIMB - Ngân hàng TNHH MTV CIMB Việt Nam", value: "CIMB" },
  {
    label: "Eximbank - Ngân hàng TMCP Xuất nhập khẩu Việt Nam",
    value: "Eximbank",
  },
  { label: "GPBank - Ngân hàng TNHH MTV Dầu khí Toàn cầu", value: "GPBank" },
  {
    label: "HDBank - Ngân hàng TMCP Phát triển TP. Hồ Chí Minh",
    value: "HDBank",
  },
  { label: "HLBVN - Ngân hàng TNHH MTV Hong Leong Việt Nam", value: "HLBVN" },
  { label: "HSBC - Ngân hàng TNHH MTV HSBC Việt Nam", value: "HSBC" },
  { label: "Indovina Bank - Ngân hàng TNHH Indovina", value: "Indovina Bank" },
  { label: "Kienlongbank - Ngân hàng TMCP Kiên Long", value: "Kienlongbank" },
  {
    label: "LienVietPostBank - Ngân hàng TMCP Bưu điện Liên Việt",
    value: "LienVietPostBank",
  },
  { label: "MBBank - Ngân hàng TMCP Quân đội", value: "MBBank" },
  { label: "MSB - Ngân hàng TMCP Hàng hải Việt Nam", value: "MSB" },
  { label: "NCB - Ngân hàng TMCP Quốc Dân", value: "NCB" },
  {
    label: "Oceanbank - Ngân hàng Thương mại TNHH MTV Đại Dương",
    value: "Oceanbank",
  },
  { label: "OCB - Ngân hàng TMCP Phương Đông", value: "OCB" },
  {
    label: "Public Bank - Ngân hàng TNHH MTV Public Bank Việt Nam",
    value: "Public Bank",
  },
  {
    label: "PVcomBank - Ngân hàng TMCP Đại Chúng Việt Nam",
    value: "PVcomBank",
  },
  {
    label: "Sacombank - Ngân hàng TMCP Sài Gòn Thương Tín",
    value: "Sacombank",
  },
  { label: "SCB - Ngân hàng TMCP Sài Gòn", value: "SCB" },
  { label: "SeABank - Ngân hàng TMCP Đông Nam Á", value: "SeABank" },
  { label: "SHB - Ngân hàng TMCP Sài Gòn – Hà Nội", value: "SHB" },
  {
    label: "Shinhan Bank - Ngân hàng TNHH MTV Shinhan Việt Nam",
    value: "Shinhan Bank",
  },
  {
    label:
      "Standard Chartered - Ngân hàng TNHH MTV Standard Chartered Việt Nam",
    value: "Standard Chartered",
  },
  {
    label: "Techcombank - Ngân hàng TMCP Kỹ thương Việt Nam",
    value: "Techcombank",
  },
  { label: "TPBank - Ngân hàng TMCP Tiên Phong", value: "TPBank" },
  { label: "UOB - Ngân hàng TNHH MTV UOB Việt Nam", value: "UOB" },
  { label: "VBSP - Ngân hàng Chính sách xã hội Việt Nam", value: "VBSP" },
  { label: "VDB - Ngân hàng Phát triển Việt Nam", value: "VDB" },
  { label: "VIB - Ngân hàng TMCP Quốc tế", value: "VIB" },
  { label: "VietABank - Ngân hàng TMCP Việt Á", value: "VietABank" },
  { label: "Vietbank - Ngân hàng TMCP Việt Nam Thương Tín", value: "Vietbank" },
  {
    label: "Vietcombank - Ngân hàng TMCP Ngoại thương Việt Nam",
    value: "Vietcombank",
  },
  {
    label: "VietinBank - Ngân hàng TMCP Công Thương Việt Nam",
    value: "VietinBank",
  },
  { label: "VPBank - Ngân hàng TMCP Việt Nam Thịnh Vượng", value: "VPBank" },
  { label: "VRB - Ngân hàng Liên doanh Việt – Nga", value: "VRB" },
  {
    label: "Woori Bank - Ngân hàng TNHH MTV Woori Việt Nam",
    value: "Woori Bank",
  },
] as const;

export const COMIC_STATUS_OPTIONS = [
  // { label: "Chờ duyệt", value: "0" },
  // { label: "Đã từ chối", value: "1" },
  // { label: "Đã duyệt", value: "2" },
  { label: "Hoàn thành", value: "4" },
  { label: "Tạm ngưng", value: "5" },
] as const;

export const MAX_AUDIO_SIZE = 20;
export const MAX_AUDIO_SIZE_KB = MAX_AUDIO_SIZE * 1024 * 1024; // 20MB

export const DEFAULT_USER_PASSWORD = "aB12345!";
