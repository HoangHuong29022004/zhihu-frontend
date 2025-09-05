"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useState } from "react";
import Link from "next/link";
import { CheckIcon, LogInIcon } from "lucide-react";

import AuthFormWrapper from "./auth-form-wrapper";
import { InputPassword } from "../common/utils/input";
import { ButtonBase } from "../common/utils/button";
import { DotLoader, LoadingSpinner } from "../common/utils/loading";
import {
  ResetPasswordSchema,
  TResetPasswordRequest,
} from "@/schemas/auth.schema";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/services/auth-service";
import { isSuccessResponse } from "@/utils/api-handler";
import { toast } from "@/hooks/use-toast";
import InlineHint from "../common/utils/inline-hint/iinline-hint";

const NewPasswordFormClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams?.get("userId") || "";
  const code = searchParams?.get("code") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPasswordRequest>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  // Handle logic login
  const onSubmit = async (request: TResetPasswordRequest) => {
    try {
      setIsLoading(true);
      const res = await resetPassword({
        ...request,
        userId,
        code,
      });
      if (res && isSuccessResponse(res?.statusCode, res?.success)) {
        toast({
          variant: "default",
          title: "Đổi mật khẩu thành công!",
          description: "Bạn đã đổi mật khẩu thành công!",
        });
        router.push("/login");
      } else {
        toast({
          variant: "destructive",
          title: "Đổi mật khẩu không thành công!",
          description: "Có lỗi xảy ra!",
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
      title={`Quên mật khẩu`}
      description="Vui lòng kiểm tra kỹ thông tin khi đổi mật khẩu mới nhé!"
    >
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <InlineHint
          icon={<CheckIcon />}
          message={`Hãy xác nhận email thành công. Hãy nhập mật khẩu mới!`}
          className="bg-green-400 text-white mb-2"
        />
        <InputPassword
          name="password"
          type="password"
          label="Mật khẩu mới"
          placeholder="newPassword@123 (+6 characters)"
          register={register}
          error={errors.password}
        />
        <InputPassword
          name="confirmPassword"
          type="password"
          label="Nhập lại mật khẩu mới"
          placeholder="newPassword@123 (+6 characters)"
          register={register}
          error={errors.confirmPassword}
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

const NewPasswordForm = () => {
  return (
    <Suspense fallback={<DotLoader />}>
      <NewPasswordFormClient />
    </Suspense>
  );
};

export default NewPasswordForm;
