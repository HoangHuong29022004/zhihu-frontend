import { format as formatDateFns } from "date-fns";
import { vi } from "date-fns/locale";

export const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(date)
    .replace(",", "");
};

export const getVNTodayDate = (): string => {
  const daysOfWeek = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  const today = new Date();

  const dayOfWeek = daysOfWeek[today.getDay()]; // Lấy thứ trong tuần
  const day = today.getDate(); // Lấy ngày trong tháng
  const month = today.getMonth(); // Lấy tháng (tính từ 0)
  const year = today.getFullYear(); // Lấy năm

  return `${dayOfWeek}, ${day}/${month + 1}/${year}`;
};

export const renderTimeCreatedAt = (createdAt: string): string => {
  const now = Date.now();
  const createdTime = new Date(createdAt).getTime();
  const diffInMs = now - createdTime;

  // Convert to different time units
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
  const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
  const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));

  if (diffInSeconds < 60) {
    return "Vừa xong";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`;
  } else if (diffInHours < 24) {
    return `${diffInHours} giờ trước`;
  } else if (diffInDays < 7) {
    return `${diffInDays} ngày trước`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} tuần trước`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} tháng trước`;
  } else {
    return `${diffInYears} năm trước`;
  }
};

export function formatDateDDMMYYYY(dateInput: string | Date): string {
  const date = new Date(dateInput);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
}

export const formatDateToVN = (dateString: string) => {
  const date = new Date(dateString);
  // Convert to Vietnam timezone (UTC+7)
  const vietnamTime = new Date(date.getTime() - 7 * 60 * 60 * 1000);
  return formatDateFns(vietnamTime, "dd/MM/yyyy - HH:mm:ss", { locale: vi });
};
