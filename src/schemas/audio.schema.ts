import { z } from "zod";

export const AddAudioSchema = z.object({
  slug: z.string().optional(),
  title: z.string().min(1, "Vui lòng nhập tiêu đề!"),
  url: z.string().optional(),
  unitPrice: z
    .string()
    .transform((value) => parseInt(value, 0))
    .refine((value) => !isNaN(value) && value >= 0, {
      message: "Giá phải lớn hơn hoặc bằng 0!",
    }),
  comicId: z.string().optional(),
});
export type TAddAudioRequest = z.TypeOf<typeof AddAudioSchema>;

export const UpdateAudioSchema = z.object({
  slug: z.string().optional(),
  title: z.string().min(1, "Vui lòng nhập tiêu đề!"),
  url: z.string().optional(),
  unitPrice: z
    .string()
    .transform((value) => parseInt(value, 0))
    .refine((value) => !isNaN(value) && value >= 0, {
      message: "Giá phải lớn hơn hoặc bằng 0!",
    }),
  comicId: z.string().optional(),
});
export type TUpdateAudioRequest = z.TypeOf<typeof UpdateAudioSchema>;
