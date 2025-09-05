"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { LogInIcon } from "lucide-react";

import { RegisterSchema, TRegisterRequest } from "../../schemas/auth.schema";
import AuthFormWrapper from "./auth-form-wrapper";
import { InputItem, InputPassword } from "../common/utils/input";
import { ButtonBase } from "../common/utils/button";
import { signUp } from "@/services/auth-service";
import { isSuccessResponse } from "@/utils/api-handler";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { LoadingSpinner } from "../common/utils/loading";
import { useAuthStore } from "@/stores/auth-store";
import { generateVerifyToken } from "@/utils/common";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setVerifySecret } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterRequest>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: TRegisterRequest) => {
    try {
      setIsLoading(true);
      const res = await signUp(data);
      if (res && isSuccessResponse(res?.statusCode, res?.success)) {
        const secret = generateVerifyToken();
        setVerifySecret(secret);
        toast({
          variant: "default",
          title: "Đăng ký tài khoản thành công!",
          description: "Hãy đăng nhập tài khoản của bạn!",
        });
        router.push("/login");
        // router.push(`verify?email=${data.email}&check=${secret}`);
      } else {
        toast({
          variant: "destructive",
          title: "Đăng ký không thành công!",
          description: "Email đã tồn tại hoặc có lỗi xảy ra!",
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
      title="Đăng ký tài khoản"
      description="Hãy đăng ký tài khoản của bạn để trải nghiệm tính năng và đăng truyện nào!"
    >
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <InputItem
          name="fullName"
          label="Tên đầy đủ"
          register={register}
          placeholder="Nguyen Van A"
          error={errors.fullName}
        />
        <InputItem
          name="email"
          label="Email"
          register={register}
          placeholder="email.example@gmail.com"
          error={errors.email}
        />
        <InputPassword
          name="password"
          type="password"
          label="Mật khẩu"
          placeholder="example@123 (+6 characters)"
          register={register}
          error={errors.password}
        />
        <InputPassword
          name="confirmPassword"
          type="password"
          label="Nhập lại mật khẩu"
          placeholder="example@123 (+6 characters)"
          register={register}
          error={errors.confirmPassword}
        />
        <p className="text-sm text-center">
          Bạn đã có tài khoản?
          <Link className="text-primary font-semibold ml-1" href="/login">
            Đăng nhập ngay
          </Link>
        </p>
        <ButtonBase
          type="submit"
          size="lg"
          className={`w-full mt-4 ${isLoading && "cursor-wait opacity-60"}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingSpinner type="button" text="Đăng ký" />
          ) : (
            <div className="flex gap-2 items-center">
              <LogInIcon size={18} /> Đăng ký
            </div>
          )}
        </ButtonBase>
      </form>
    </AuthFormWrapper>
  );
};

export default RegisterForm;
