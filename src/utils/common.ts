import { SALARY_TYPE_SECRETS } from "@/data/constants/global";
import { TSalaryType } from "@/types/comic.type";

export const handleScrollToTop = (top?: number) => {
  window.scrollTo({
    top: top ?? 0,
    behavior: "smooth",
  });
};

export const isClientEnvironment = () => typeof window !== "undefined";

export const generateVerifyToken = () => {
  const SECRET_KEY = process.env.NEXT_PUBLIC_VERIFY_SECRET || "default_secret";
  const timestamp = Date.now();
  const randomNum = Math.random().toString(36).substring(2, 10);
  const rawToken = `${SECRET_KEY}-${timestamp}-${randomNum}`;

  return btoa(rawToken);
};

export const generateSlug = (text: string, isUnique?: boolean): string => {
  if (!text) return "";
  let slug = text.toLowerCase();
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  slug = slug
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (isUnique) {
    slug += `-${Date.now()}`;
  }

  return slug;
};

export const formatTextDescription = (text: string) => {
  // Normalize all newline characters to \n
  const normalizedText = text.replace(/(\r\n|\r|\n)/g, "\n");
  // Split into paragraphs based on double newlines
  const paragraphs = normalizedText.split("\n\n");
  return paragraphs
    .map(
      (paragraph) =>
        `<p>${paragraph
          .trim()
          .replace(/\n/g, "<br>")
          .replace(/\\r|\\n/g, "")}</p>`
    )
    .join("");
};

/**
 * Trích xuất giá trị amount từ chuỗi chứa các tham số giống URL.
 * @param str Chuỗi kiểu acc=...&bank=...&amount=...&des=...
 * @returns Số tiền (amount) dưới dạng number. Trả về 0 nếu không tìm thấy hoặc lỗi.
 */
export function getAmountFromQRString(str: string): number {
  try {
    if (!str) return 0;
    const match = str.match(/amount=(\d+)/);
    if (!match) return 0;

    const amount = parseInt(match[1], 10);
    return isNaN(amount) ? 0 : amount;
  } catch (error) {
    console.error("Lỗi khi phân tích chuỗi:", error);
    return 0;
  }
}

/**
 * Format số tiền thành dạng tiền Việt Nam (VD: 10000 => "10,000 VND")
 * @param amount Số tiền dạng number
 * @returns Chuỗi định dạng tiền Việt Nam
 */
export function formatToVND(amount: number): string {
  if (isNaN(amount)) return "0 VND";
  return amount.toLocaleString("en-US") + " VND";
}

/**
 * Format số tiền thành dạng tiền Việt Nam (VD: 10000 => "10,000 VND")
 * @param amount Số tiền dạng number
 * @returns Chuỗi định dạng tiền Việt Nam
 */
export function formatThreeDigit(number: number): string {
  if (isNaN(number)) return "0";
  return number.toLocaleString("en-US");
}

export function getSalarySecretByType(type: TSalaryType): string {
  return SALARY_TYPE_SECRETS[type];
}

export function isZhihuSecret(secret: string): boolean {
  if (!secret) return false;
  return secret === SALARY_TYPE_SECRETS.ZHIHU;
}
