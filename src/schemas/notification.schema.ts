import { z } from "zod";

export const AddNotificationSchema = z.object({
  slug: z.string().optional(),
  title: z.string().min(1, "Vui lòng nhập tiêu đề!"),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
});
export type TAddNotificationRequest = z.TypeOf<typeof AddNotificationSchema>;

export const UpdateNotificationSchema = z.object({
  slug: z.string().optional(),
  title: z.string().min(1, "Vui lòng nhập tiêu đề!"),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
});
export type TUpdateNotificationRequest = z.TypeOf<
  typeof UpdateNotificationSchema
>;
