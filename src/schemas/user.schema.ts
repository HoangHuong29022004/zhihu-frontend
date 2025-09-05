import { z } from "zod";

export const UpdateUserSchema = z.object({
  fullName: z.string().min(1, "Vui lòng nhập tên đầy đủ!"),
  avatar: z.string().optional(),
});
export type TUpdateUserRequest = z.TypeOf<typeof UpdateUserSchema>;

export const UpdateUserCurrencySchema = z.object({
  userId: z.string().optional(),
  type: z.number().optional(),
  amount: z
    .string()
    .transform((value) => parseInt(value, 0))
    .refine((value) => !isNaN(value) && value >= 0, {
      message: "Số điểm phải lớn hơn 0!",
    }),
  description: z.string().optional(),
});
export type TUpdateUserCurrencyRequest = z.TypeOf<
  typeof UpdateUserCurrencySchema
>;
