import { z } from "zod";

// Register schema
export const RegisterSchema = z
  .object({
    fullName: z.string().min(1, "Vui lòng nhập tên đầy đủ!"),
    email: z
      .string()
      .min(1, "Vui lòng nhập email!")
      .email("Email không đúng định dạng!"),
    password: z
      .string()
      .min(6, "Mật khẩu phải từ 6 ký tự!")
      .max(20, "Mật khẩu tối đa 20 ký tự!"),
    confirmPassword: z
      .string()
      .min(6, "Mật khẩu phải từ 6 ký tự!")
      .max(20, "Mật khẩu nhập lại tối đa 20 ký tự!"),
    avatar: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp!",
    path: ["confirmPassword"],
  });
export type TRegisterRequest = z.TypeOf<typeof RegisterSchema>;

// Login schema
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng nhập email!")
    .email("Email không đúng định dạng!"),
  password: z
    .string()
    .min(6, "Mật khẩu phải từ 6 ký tự!")
    .max(20, "Mật khẩu tối đa 20 ký tự!"),
});

export type TLoginRequest = z.TypeOf<typeof LoginSchema>;

// Verify schema
export const VerifySchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng nhập email!")
    .email("Email không đúng định dạng!"),
});

export type TVerifyRequest = z.TypeOf<typeof VerifySchema>;

// Forgot password schema
export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng nhập email!")
    .email("Email không đúng định dạng!"),
});
export type TForgotPasswordRequest = z.TypeOf<typeof ForgotPasswordSchema>;

export const ChangePasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, "Vui lòng nhập email!")
      .email("Email không đúng định dạng!"),
    oldPassword: z
      .string()
      .min(6, "Mật khẩu phải từ 6 ký tự!")
      .max(20, "Mật khẩu tối đa 20 ký tự!"),
    newPassword: z
      .string()
      .min(6, "Mật khẩu phải từ 6 ký tự!")
      .max(20, "Mật khẩu tối đa 20 ký tự!"),
    newConfirmPassword: z
      .string()
      .min(6, "Mật khẩu phải từ 6 ký tự!")
      .max(20, "Mật khẩu nhập lại tối đa 20 ký tự!"),
  })
  .refine((data) => data.newPassword === data.newConfirmPassword, {
    message: "Mật khẩu nhập lại không khớp!",
    path: ["newConfirmPassword"],
  });
export type TChangePasswordRequest = z.TypeOf<typeof ChangePasswordSchema>;

// Forgot password schema
export const ResetPasswordSchema = z
  .object({
    userId: z.string().optional(),
    code: z.string().optional(),
    password: z
      .string()
      .min(6, "Mật khẩu phải từ 6 ký tự!")
      .max(20, "Mật khẩu tối đa 20 ký tự!"),
    confirmPassword: z
      .string()
      .min(6, "Mật khẩu phải từ 6 ký tự!")
      .max(20, "Mật khẩu nhập lại tối đa 20 ký tự!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp!",
    path: ["newConfirmPassword"],
  });
export type TResetPasswordRequest = z.TypeOf<typeof ResetPasswordSchema>;
