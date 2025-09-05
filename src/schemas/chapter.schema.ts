import { z } from "zod";

export const AddChapterSchema = z.object({
  slug: z.string().optional(),
  title: z.string().min(1, "Vui lòng nhập tiêu đề!"),
  content: z.string().optional(),
  thumbnail: z.string().optional(),
  audio: z.string().optional(),
  unitPrice: z
    .string()
    .transform((value) => parseInt(value, 0))
    .refine((value) => !isNaN(value) && value >= 0, {
      message: "Giá phải lớn hơn hoặc bằng 0!",
    }),
  comicId: z.string().optional(),
});
export type TAddChapterRequest = z.TypeOf<typeof AddChapterSchema>;

export const UpdateChapterSchema = z.object({
  slug: z.string().optional(),
  title: z.string().min(1, "Vui lòng nhập tiêu đề!"),
  content: z.string().optional(),
  thumbnail: z.string().optional(),
  audio: z.string().optional(),
  unitPrice: z
    .string()
    .transform((value) => parseInt(value, 0))
    .refine((value) => !isNaN(value) && value >= 0, {
      message: "Giá phải lớn hơn hoặc bằng 0!",
    }),
  comicId: z.string().optional(),
});
export type TUpdateChapterRequest = z.TypeOf<typeof UpdateChapterSchema>;
