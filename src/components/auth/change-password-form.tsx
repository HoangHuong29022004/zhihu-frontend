"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { LogInIcon } from "lucide-react";

import AuthFormWrapper from "./auth-form-wrapper";
import { InputItem, InputPassword } from "../common/utils/input";
import { ButtonBase } from "../common/utils/button";
import { LoadingSpinner } from "../common/utils/loading";
import {
  ChangePasswordSchema,
  TChangePasswordRequest,
} from "@/schemas/auth.schema";
import { changePassword } from "@/services/auth-service";
import { isSuccessResponse } from "@/utils/api-handler";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { removeAuthCookies } from "@/utils/auth-hanlder";

const ChangePasswordForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TChangePasswordRequest>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const handleLogoutAuthStore = useAuthStore((state) => state.logout);

  // function utils
  const handleLogout = async () => {
    try {
      handleLogoutAuthStore();
      removeAuthCookies();

      router.push("/login");
    } catch (error) {
      console.log("Logout failed: ", error);
    }
  };

  // Handle logic login
  const onSubmit = async (request: TChangePasswordRequest) => {
    try {
      setIsLoading(true);
      const res = await changePassword(request);
      if (res && isSuccessResponse(res?.statusCode, res?.success)) {
        toast({
          variant: "default",
          title: "Đổi mật khẩu thành công!",
          description: "Bạn đã đổi mật khẩu thành công!",
        });
        handleLogout();
      } else {
        toast({
          variant: "destructive",
          title: "Đổi mật khẩu không thành công!",
          description: "Sai email hoặc mật khẩu. Có lỗi xảy ra!",
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormWrapper
      title={`Đổi mật khẩu`}
      description="Hãy nhập thông tin mật khẩu mới và mật khẩu cũ để đổi mật khẩu của bạn!"
    >
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <InputItem
          name="email"
          label="Email"
          register={register}
          placeholder="user@gmail.com..."
          error={errors.email}
        />
        <InputPassword
          name="oldPassword"
          label="Mật khẩu cũ"
          placeholder="oldPassword@123 (+6 characters)"
          register={register}
          error={errors.oldPassword}
        />
        <InputPassword
          name="newPassword"
          type="password"
          label="Mật khẩu mới"
          placeholder="newPassword@123 (+6 characters)"
          register={register}
          error={errors.newPassword}
        />
        <InputPassword
          name="newConfirmPassword"
          type="password"
          label="Nhập lại mật khẩu mới"
          placeholder="newPassword@123 (+6 characters)"
          register={register}
          error={errors.newConfirmPassword}
        />
        <p className="text-sm text-center flex items-center justify-center gap-1 flex-wrap">
          Bạn chưa có tài khoản?
          <Link className="text-primary font-semibold ml-1" href="/register">
            Đăng ký
          </Link>
        </p>
        <ButtonBase
          type="submit"
          size="lg"
          className={`w-full mt-4 ${isLoading && "cursor-wait opacity-60"}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingSpinner type="button" text="Hoàn tất" />
          ) : (
            <div className="flex gap-1 items-center">
              <LogInIcon size={18} /> Hòan tất
            </div>
          )}
        </ButtonBase>
      </form>
    </AuthFormWrapper>
  );
};

export default ChangePasswordForm;
