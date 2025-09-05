"use client";

import { Suspense, useState } from "react";
import { CircleAlert, LogInIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

import AuthFormWrapper from "./auth-form-wrapper";
import { ButtonBase } from "../common/utils/button";
import { resendConfirm } from "@/services/auth-service";
import { isSuccessResponse } from "@/utils/api-handler";
import { useRouter, useSearchParams } from "next/navigation";
import { CountdownTimer } from "../common/utils/count-down";
import { LoadingSpinner } from "../common/utils/loading";
import { useAuthStore } from "@/stores/auth-store";
import { useStore } from "zustand";

const VerifyAccountFormClient = () => {
  const searchParams = useSearchParams();
  const emailVerify = searchParams?.get("email") || "";
  // const status = searchParams?.get("status") || "";
  const router = useRouter();

  // global states
  // Sử dụng useStore để tránh hydration mismatch
  const isExpiredTimeVerify = useStore(
    useAuthStore,
    (state) => state.isExpiredTimeVerify
  );
  const setIsExpiredTimeVerify = useStore(
    useAuthStore,
    (state) => state.setIsExpiredTimeVerify
  );

  // local states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resetCountdown, setResetCountdown] = useState(false);

  const handleResendEmail = async () => {
    try {
      setIsLoading(true);
      const res = await resendConfirm(emailVerify);
      if (res && isSuccessResponse(res?.statusCode, res?.success)) {
        toast({
          title: "Mã xác thực đã được gửi!",
          description: "Hãy kiểm tra email để xác thực lại!.",
        });
        setIsExpiredTimeVerify(false);
        setResetCountdown(true);
      } else {
        if (res.statusCode === 429) {
          toast({
            variant: "destructive",
            title: "Vui lòng đăng ký lại!",
          });
          router.push("/");
        } else {
          toast({
            variant: "destructive",
            title: "Gửi lại mã xác thực không thành công!",
            description: res?.message,
          });
        }
        setResetCountdown(true);
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormWrapper
      title="Xác thực tài khoản"
      description={`Mã xác thực đã được gửi đến email ${emailVerify}.`}
    >
      <div>
        <p
          className={`text-sm mt-1 h-10 mb-2 ${
            isExpiredTimeVerify
              ? "bg-red-400 text-white"
              : "bg-slate-100 text-text-secondary"
          } rounded-md leading-10 px-4  flex items-center gap-2`}
        >
          <CircleAlert size={18} />
          <span className="flex gap-2 items-end">
            {isExpiredTimeVerify ? (
              <span>Mã xác thực đã hết hạn!</span>
            ) : (
              <>
                <span>Mã xác thực sẽ hết hạn trong</span>
                <CountdownTimer
                  initialTime={900} // 300 seconds = 5 minutes
                  onExpire={() => {
                    setIsExpiredTimeVerify(true); // set vào store để tránh refresh loading lại
                    toast({
                      variant: "destructive",
                      title: "Mã xác thực đã hết hạn!",
                      description: "Vui lòng yêu cầu gửi lại mã.",
                    });
                  }}
                  className="text-text-secondary font-bold"
                  storageKey="countdown_verify"
                  resetCountdown={resetCountdown} // Truyền giá trị reset
                />
              </>
            )}
          </span>
        </p>
        {/* <InputItem
          name="email"
          type="email"
          label="Email"
          value={emailVerify}
          register={register}
          error={errors.email}
          disabled={true}
        /> */}
        <p className="text-sm text-center">Bạn không nhận được mã xác thực?</p>
        <ButtonBase
          type="submit"
          className={`w-full mt-4 ${isLoading && "cursor-wait opacity-60"}`}
          size="lg"
          disabled={isLoading}
          onClick={handleResendEmail}
        >
          {isLoading ? (
            <LoadingSpinner type="button" text="Gửi lại mã xác thực" />
          ) : (
            <div className="flex gap-1 items-center">
              <LogInIcon size={18} /> Gửi lại mã xác thực
            </div>
          )}
        </ButtonBase>
      </div>
    </AuthFormWrapper>
  );
};

const VerifyAccountForm = () => {
  return (
    <Suspense>
      <VerifyAccountFormClient />
    </Suspense>
  );
};

export default VerifyAccountForm;
