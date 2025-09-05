"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { LogInIcon } from "lucide-react";

import AuthFormWrapper from "./auth-form-wrapper";
import { InputItem, InputPassword } from "../common/utils/input";
import { ButtonBase } from "../common/utils/button";
import { LoadingSpinner } from "../common/utils/loading";
import { LoginSchema, TLoginRequest } from "@/schemas/auth.schema";
import { isSuccessResponse } from "@/utils/api-handler";
import { useAuthStore } from "@/stores/auth-store";
import { cLogin, getProfile } from "@/services/auth-service";
import { toast } from "@/hooks/use-toast";
import { setAuthCookies } from "@/utils/auth-hanlder";

interface ILoadingState {
  login: boolean;
  google: boolean;
  facebook: boolean;
}

// staging: khoatdce160367@fpt.edu.vn - Dangkhoa123@

const LoginForm = () => {
  const [loadingState, setLoadingState] = useState<ILoadingState>({
    login: false,
    google: false,
    facebook: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginRequest>({
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);

  // Handle logic login
  const onSubmit = async (request: TLoginRequest) => {
    try {
      setLoadingState({ ...loadingState, login: true });
      if (request) {
        const res = await cLogin(request);

        // Handle response successfully
        if (res && isSuccessResponse(res?.statusCode, res?.success)) {
          const accessToken = res.data.accessToken;
          const refreshToken = res.data.refreshToken;

          setAccessToken(accessToken);
          setRefreshToken(refreshToken);

          setAuthCookies({
            accessToken,
            refreshToken,
          });

          const profileResponse = await getProfile(accessToken);
          if (profileResponse) {
            setUser(profileResponse?.data);
          }

          if (profileResponse?.data.role === "Admin") {
            router.push("/admin/comic");
          } else {
            router.push("/");
          }
        } else {
          // if (res?.statusCode === 423) {
          //   // no verify
          //   const res = await resendConfirm(request.email);
          //   if (res && isSuccessResponse(res?.statusCode)) {
          //     router.push(`/verify?email=${request.email}`);
          //   }
          // }
          toast({
            variant: "destructive",
            title: "Đăng nhập không thành công!",
            description: "Sai tài khoản hoặc mật khẩu!",
          });
        }
      }
    } catch (error) {
      console.log("Login failed! ", error);
    } finally {
      setLoadingState({ ...loadingState, login: false });
    }
  };

  // const handleGoogleLogin = async () => {
  //   setLoadingState({ google: false, login: true, facebook: false });
  //   // // Kích thước popup
  //   // const popupWidth = 500;
  //   // const popupHeight = 600;

  //   // // Tính toán vị trí căn giữa màn hình
  //   // const left = window.screenX + (window.innerWidth - popupWidth) / 2;
  //   // const top = window.screenY + (window.innerHeight - popupHeight) / 2;
  //   // const windowFeatures = `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=yes,scrollbars=yes`;
  //   // window.open(googleLoginUrl, "GoogleLoginPopup", windowFeatures);
  //   window.location.href = `${getAPIHost()}/auth/google/login?prompt=select_account`;
  // };

  return (
    <AuthFormWrapper
      title={`Đăng nhập tài khoản`}
      description="Hãy đăng nhập hệ thống để trải nghiệm tính năng và đăng truyện nào!"
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
          name="password"
          label="Mật khẩu"
          placeholder="example@123 (+6 characters)"
          register={register}
          error={errors.password}
        />
        <div className="flex flex-wrap gap-3 justify-between mt-4">
          <p className="text-sm text-center">
            Bạn chưa có tài khoản?
            <Link className="text-primary font-semibold ml-1" href="/register">
              Đăng ký
            </Link>
          </p>
          <Link
            className="text-text-main font-semibold ml-1"
            href="/forgot-password"
          >
            Quên mật khẩu?
          </Link>
        </div>
        <ButtonBase
          type="submit"
          size="lg"
          className={`w-full mt-4 ${
            loadingState.login && "cursor-wait opacity-60"
          }`}
          disabled={loadingState.login}
        >
          {loadingState.login ? (
            <LoadingSpinner type="button" text="Đăng nhập" />
          ) : (
            <div className="flex gap-1 items-center">
              <LogInIcon size={18} /> Đăng nhập
            </div>
          )}
        </ButtonBase>
      </form>
      {/* <p className="text-sm text-text-secondary text-center my-4">
        Hoặc đăng nhập bằng
      </p> */}
      {/* <div className="mt-4 flex items-center gap-2">
        <ButtonBase
          type="button"
          variants="outline"
          size="lg"
          className={`w-full cursor-default opacity-60 ${
            loadingState.google && "cursor-default opacity-60"
          }`}
          disabled={true}
          onClick={handleGoogleLogin}
        >
          {loadingState.google ? (
            <LoadingSpinner type="button" text="Google" variant="primary" />
          ) : (
            <div className="flex gap-1.5 items-center font-semibold">
              <Image
                unoptimized
                src="/images/common/google-icon.svg"
                alt="Google"
                width={18}
                height={18}
              />
              Google
            </div>
          )}
        </ButtonBase>
        <ButtonBase
          type="button"
          variants="outline"
          size="lg"
          className={`w-1/2 ${
            loadingState.facebook && "cursor-default opacity-60"
          }`}
          disabled={loadingState.facebook}
          onClick={handleFacebookLogin}
        >
          {loadingState.facebook ? (
            <LoadingSpinner type="button" text="Facebook" variant="primary" />
          ) : (
            <div className="flex gap-1 items-center font-semibold">
              <Image
                src="/images/common/facebook-icon.svg"
                alt="Google"
                width={18}
                height={18}
              />
              Facebook
            </div>
          )}
        </ButtonBase>
      </div> */}
    </AuthFormWrapper>
  );
};

export default LoginForm;
