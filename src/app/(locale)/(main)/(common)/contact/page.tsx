"use client";

import { AuthFormWrapper } from "@/components/auth";
import ButtonBase from "@/components/common/utils/button/button-base";
import { SectionWrapper } from "@/components/common/utils/common";
import { HeadContainer } from "@/components/common/utils/header-container/header-container";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import { InputItem } from "@/components/common/utils/input";
import { LoadingSpinner } from "@/components/common/utils/loading";
import { ContactSchema, TContactRequest } from "@/schemas/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TContactRequest>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: TContactRequest) => {
    console.log("Check data: ", data);
    try {
      setIsLoading(true);
      // const res = await signUp(data);
      // if (res && isSuccessResponse(res?.statusCode, res?.success)) {
      //     const secret = generateVerifyToken();
      //     setVerifySecret(secret);
      //     toast({
      //         variant: "default",
      //         title: "Đăng ký tài khoản thành công!",
      //         description: "Mã xác thực được gửi đến email của bạn!",
      //     });
      //     router.push(`verify?email=${data.email}&check=${secret}`);
      // } else {
      //     toast({
      //         variant: "destructive",
      //         title: "Đăng ký không thành công!",
      //         description: "Email đã tồn tại hoặc có lỗi xảy ra!",
      //     });
      // }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section id="section-contact" className="bg-slate-50">
      {/* Header */}
      <HeadContainer
        title="Liên hệ"
        description="Bạn đang cần giúp đõ? Liên hệ ngay với chúng tôi!"
      />

      {/* Body here */}
      <SectionWrapper className="py-8">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-12 gap-1">
            <div className="col-span-12 p-2">
              {/* Section 3: Gửi email */}
              <div className="flex flex-col gap-4 py-8 px-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <AuthFormWrapper
                  title="Nhập thông tin liên hệ"
                  description="Hãy nhập thông tin liên hệ và nội dung để chúng tôi hỗ trợ bạn trong thời gian sớm nhất!"
                  variants={{
                    desClassName: "text-base text-gray-700",
                  }}
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
                    <InputItem
                      name="content"
                      label="Nội dung"
                      register={register}
                      placeholder="Nội dung"
                      error={errors.content}
                    />
                    <InlineHint />
                    <ButtonBase
                      type="submit"
                      size="lg"
                      className={`w-full mt-6 ${
                        isLoading && "cursor-wait opacity-60"
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <LoadingSpinner type="button" text="Hoàn tất" />
                      ) : (
                        <div className="flex gap-2 items-center">
                          <SendIcon />
                          Gửi thông tin
                        </div>
                      )}
                    </ButtonBase>
                  </form>
                </AuthFormWrapper>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
};

export default ContactPage;
