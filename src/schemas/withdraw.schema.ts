import { z } from "zod";

export const WithDrawSchema = z.object({
  bankName: z.string().optional(),
  bankAccount: z
    .string()
    .min(1, "Vui lòng nhập số tài khoản!")
    .regex(/^\d+$/, "Số tài khoản không hợp lệ!")
    .min(6, "Số tài khoản phải có ít nhất 6 số!")
    .max(20, "Số tài khoản không được quá 20 số!"),
  bankAccountName: z
    .string()
    .min(1, "Vui lòng nhập tên tài khoản!")
    .min(2, "Tên tài khoản phải có ít nhất 2 ký tự!")
    .max(50, "Tên tài khoản không được quá 50 ký tự!")
    .regex(
      /^[a-zA-ZÀ-ỹ\s\d]+$/,
      "Tên tài khoản chỉ được chứa chữ cái, số và dấu cách!"
    )
    .transform((value) => value.toUpperCase()),
  amount: z
    .string()
    .transform((value) => parseInt(value, 0))
    .refine((value) => !isNaN(value) && value > 0, {
      message: "Số tiền phải lớn hơn 0!",
    }),
});
export type TWithDrawRequest = z.TypeOf<typeof WithDrawSchema>;
