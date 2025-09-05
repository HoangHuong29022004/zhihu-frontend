import { z } from "zod";

export const PaymentSeePaySchema = z.object({
  amount: z
    .string()
    .transform((value) => parseInt(value, 0))
    .refine((value) => !isNaN(value) && value >= 0, {
      message: "Phần thưởng phải lớn hơn hoặc bằng ̀5,000 (VND)!",
    }),
});
export type TPaymentSeePayRequest = z.TypeOf<typeof PaymentSeePaySchema>;
