import { z } from "zod";

export const AddComicSchema = z.object({
  slug: z.string().optional(),
  title: z.string().min(1, "Vui lòng nhập tiêu đề!"),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  unitPrice: z
    .string()
    .transform((value) => parseInt(value, 0))
    .refine((value) => !isNaN(value) && value >= 0, {
      message: "Giá phải lớn hơn hoặc bằng 0!",
    }),
  categoryId: z.array(z.string()).optional(),
  salaryType: z.number().optional(),
  author: z.string().min(1, "Vui lòng nhập tên tác giả!"),
});
export type TAddComicRequest = z.TypeOf<typeof AddComicSchema>;

export const UpdateComicSchema = z.object({
  slug: z.string().optional(),
  title: z.string().min(1, "Vui lòng nhập tiêu đề!"),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  audio: z.string().optional(),
  unitPrice: z
    .string()
    .transform((value) => parseInt(value, 0))
    .refine((value) => !isNaN(value) && value >= 0, {
      message: "Giá phải lớn hơn hoặc bằng 0!",
    }),
  categoryId: z.array(z.string()).optional(),
  salaryType: z.number().optional(),
  author: z.string().min(1, "Vui lòng nhập tên tác giả!"),
});
export type TUpdateComicRequest = z.TypeOf<typeof UpdateComicSchema>;

export const OutStandingSchema = z.object({
  comicId: z.string().optional(),
  amount: z
    .string()
    .transform((value) => parseInt(value, 0))
    .refine((value) => !isNaN(value) && value >= 0, {
      message: "Phần thưởng phải lớn hơn hoặc bằng 0!",
    }),
});
export type TOutStandingRequest = z.TypeOf<typeof OutStandingSchema>;
