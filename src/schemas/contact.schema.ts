import { z } from "zod";
// Register schema
export const ContactSchema = z
    .object({
        fullName: z.string().min(1, "Vui lòng nhập tên đầy đủ!"),
        email: z
            .string()
            .min(1, "Vui lòng nhập email!")
            .email("Email không đúng định dạng!"),
        content: z
            .string()
            .min(1, "Nội dung không được bỏ trống!")
    })

export type TContactRequest = z.TypeOf<typeof ContactSchema>;