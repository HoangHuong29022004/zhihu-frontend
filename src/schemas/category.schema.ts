import { z } from "zod";

export const AddCategorySchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên thể loại!"),
  slug: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type TAddCategoryRequest = z.infer<typeof AddCategorySchema>;

export const UpdateCategorySchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên thể loại!"),
  slug: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type TUpdateCategoryRequest = z.infer<typeof UpdateCategorySchema>;
