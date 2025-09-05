"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { CheckIcon, LogInIcon } from "lucide-react";

import AuthFormWrapper from "./auth-form-wrapper";
import { InputItem } from "../common/utils/input";
import { ButtonBase } from "../common/utils/button";
import { LoadingSpinner } from "../common/utils/loading";
import {
  ForgotPasswordSchema,
  TForgotPasswordRequest,
} from "@/schemas/auth.schema";
import { forgotPassword } from "@/services/auth-service";
import { isSuccessResponse } from "@/utils/api-handler";
import { toast } from "@/hooks/use-toast";
import InlineHint from "../common/utils/inline-hint/iinline-hint";

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSendEmailSuccess, setIsSendEmailSuccess] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPasswordRequest>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  // Handle logic login
  const onSubmit = async (request: TForgotPasswordRequest) => {
    try {
      setIsLoading(true);
      // Lưu giá trị email vào state
      setEmailValue(request.email);
      // logic handle
      const res = await forgotPassword(request);
      if (res && isSuccessResponse(res?.statusCode, res?.success)) {
        toast({
          title: "Email xác nhận đã được gửi tới bạn!",
          description: "Hãy kiểm tra và xác nhận email!",
        });
        setIsSendEmailSuccess(true);
      } else {
        toast({
          variant: "destructive",
          title: "Email chưa đăng ký hoặc có lỗi!",
          description: "Có lỗi xảy ra trong quá trình gửi email!",
        });
      }
    } catch (error) {
      console.log("Login failed! ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormWrapper
      title={`Quên mật khẩu`}
      description="Vui lòng kiểm tra kỹ thông tin khi đổi mật khẩu mới nhé!"
    >
      {!isSendEmailSuccess ? (
        <form
          action="post"
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-[400px]"
        >
          <InputItem
            name="email"
            label="Email"
            register={register}
            placeholder="user@gmail.com..."
            error={errors.email}
          />
          <p className="text-sm text-center">
            Bạn chưa có tài khoản?
            <Link className="text-primary font-semibold ml-1" href="/register">
              Đăng ký ngay
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
      ) : (
        <>
          {/* Email value  */}
          <InlineHint
            icon={<CheckIcon />}
            message={`Hãy xác nhận email ${emailValue} để tiếp tục nhé!`}
            className="bg-green-400 text-white mb-2"
          />
        </>
      )}
    </AuthFormWrapper>
  );
};

export default ForgotPasswordForm;
