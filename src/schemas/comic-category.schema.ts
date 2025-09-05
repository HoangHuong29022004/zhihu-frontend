import { z } from "zod";

// Register schema
export const AddComicCategorySchema = z.object({
  name: z.string().min(1, "Tên thể loại không được bỏ trống!"),
});
export type TAddComicCategoryRequest = z.TypeOf<typeof AddComicCategorySchema>;

// Register schema
export const UpdateComicCategorySchema = z.object({
  name: z.string().min(1, "Tên thể loại không được bỏ trống!"),
});
export type TUpdateComicCategoryRequest = z.TypeOf<
  typeof UpdateComicCategorySchema
>;
