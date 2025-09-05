"use client";
import ButtonBase from "@/components/common/utils/button/button-base";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { formatThreeDigit } from "@/utils/common";
import {
  Award,
  CircleUserRound,
  PenBoxIcon,
  PenIcon,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileBox = ({ className }: { className?: string }) => {
  const user = useAuthStore((state) => state.user);
  return (
    <Card
      className={cn(
        "shadow-xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl sticky top-24",
        className
      )}
    >
      <CardHeader className="text-center border-b border-gray-200">
        <div className="flex justify-start gap-2 items-center mb-2">
          <div className="size-12 bg-slate-50 rounded-full grid place-items-center overflow-hidden border-1 border border-gray-200 shadow-sm">
            {user?.avatar ? (
              <Image
                src={user?.avatar || ""}
                alt="form-auth-img"
                width={40}
                height={40}
                unoptimized
                className="object-cover object-center"
              />
            ) : (
              <CircleUserRound className="text-primary" />
            )}
          </div>
          <div className="text-left">
            <CardTitle className="text-base font-bold text-gray-900">
              {user?.fullName}
            </CardTitle>
            <p className="text-sm text-text-secondary break-words">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="flex justify-start gap-2 flex-wrap mt-2">
          <ButtonBase
            size="sm"
            variants="outline"
            className="gap-2 max-sm:w-full"
          >
            <Link
              href={"/user/update-profile"}
              className="flex items-center gap-2"
            >
              <PenBoxIcon size={16} /> Cập nhật
            </Link>
          </ButtonBase>
          <ButtonBase size="sm" className="gap-2 max-sm:w-full">
            <Link
              href={"/user/manage-comic/add-new"}
              className="flex items-center gap-2"
            >
              <PenIcon size={16} /> Đăng Truyện
            </Link>
          </ButtonBase>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        {/* Currency Section */}
        <div className="pt-2">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Thông số của bạn
          </h3>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center space-x-3 bg-slate-100 p-2 rounded-lg">
              <Award className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm font-medium text-gray-500 flex">
                  Dâu{" "}
                  <Image
                    unoptimized
                    src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/strawberry.png`}
                    alt="strawberry-icon"
                    width={14}
                    height={14}
                    className="object-contain object-center ml-2"
                  />
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {formatThreeDigit(Number(user?.currencyStrawberry))} điểm
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-slate-100 p-2 rounded-lg">
              <Award className="w-5 h-5 text-pink-500" />
              <div>
                <p className="text-sm font-medium text-gray-500 flex">
                  Hoa{" "}
                  <Image
                    unoptimized
                    src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/flower.png`}
                    alt="strawberry-icon"
                    width={16}
                    height={16}
                    className="object-contain object-center ml-2"
                  />
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {formatThreeDigit(Number(user?.currencyFlower))} điểm
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-slate-100 p-2 rounded-lg">
              <Award className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-gray-500 flex">
                  Kem{" "}
                  <Image
                    unoptimized
                    src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/cream.png`}
                    alt="strawberry-icon"
                    width={16}
                    height={16}
                    className="object-contain object-center ml-2"
                  />
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {formatThreeDigit(Number(user?.currencyCream))} điểm
                </p>
              </div>
            </div>
            <Link href={`/user/deposit`} className="w-full mt-2">
              <ButtonBase className="w-full">
                <div className="flex gap-1 items-center flex-nowrap whitespace-nowrap">
                  <ShoppingCart size={16} />
                  Nạp điểm ngay
                </div>
              </ButtonBase>
            </Link>
            {/* <div className="flex items-center space-x-3 bg-slate-100 p-2 rounded-lg">
              <Book className="w-5 h-5 text-green-500" />
              <div className="w-full">
                <p className="text-sm font-medium text-gray-500">
                  Truyện của bạn
                </p>
                <p className="text-base font-semibold text-gray-900 flex justify-between items-center">
                  <span>0</span>
                  <Link href={"/user/manage-comic"}>
                    <span className="text-primary text-xs hover:underline">
                      Chi tiết
                    </span>
                  </Link>
                </p>
              </div>
            </div> */}
            {/* <div className="flex items-center space-x-3 bg-slate-100 p-2 rounded-lg">
              <Book className="w-5 h-5 text-blue-500" />
              <div className="w-full">
                <p className="text-sm font-medium text-gray-500">
                  Truyện chờ duyệt
                </p>
                <p className="text-base font-semibold text-gray-900 flex justify-between items-center">
                  <span>0</span>
                  <Link href={"/user/manage-comic"}>
                    <span className="text-primary text-xs hover:underline">
                      Chi tiết
                    </span>
                  </Link>
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileBox;
