"use client";

import NotFound from "@/app/not-found";
import ImageBase from "@/components/common/image-base/image-base";
import { BoxWrapper } from "@/components/common/utils/common";
import { LoadingSpinner } from "@/components/common/utils/loading";
import { useGetDetailsUser } from "@/queries/user.query";
import { IUserProfile } from "@/types/user.type";
import { getAccessToken, isSuccessResponse } from "@/utils/api-handler";
import { formatThreeDigit } from "@/utils/common";
import {
  CircleDollarSign,
  MailIcon,
  MapIcon,
  TagIcon,
  User,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IProps {
  id: string;
}

const ProfileUserPage = (props: IProps) => {
  const [data, setData] = useState<IUserProfile | null>(null);

  // Get details
  const { isLoading, data: res } = useGetDetailsUser(
    getAccessToken() ?? "",
    props.id || ""
  );

  useEffect(() => {
    if (res && isSuccessResponse(res?.statusCode, res?.success)) {
      setData(res?.data);
    }
  }, [res]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-[600px] bg-gray-100">
          <LoadingSpinner />
        </div>
      ) : data && data?.email ? (
        <>
          <BoxWrapper className="w-full mb-10 p-0 relative">
            <ImageBase
              width={1000}
              height={100}
              src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/default_image.png`}
              alt="bg-avatar-img"
              className="w-full object-cover object-center h-52 md:h-56 rounded-3xl"
            />
            <div className="absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50 inset-0 rounded-3xl"></div>
            <div className="absolute bottom-4 sm:-bottom-6 left-4 sm:left-6 flex md:flex-row justify-between items-start md:items-center gap-2 sm:gap-4">
              <ImageBase
                width={100}
                height={100}
                src={data.avatar}
                alt="bg-avatar-img"
                className="max-sm:size-12 sm:size-24 md:size-32 rounded-full"
                fallbackSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/default_image.png`}
              />
              <div className="text-shadow-lg flex flex-col gap-1 sm:gap-2 justify-start text-left mt-2 md:mt-0">
                <h1 className="text-base sm:text-2xl md:text-3xl text-white font-bold">
                  {data.fullName || "_"}
                </h1>
                <p className="text-white text-xs sm:text-sm md:text-base">
                  {data.email}
                </p>
              </div>
            </div>
          </BoxWrapper>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Company Info Section */}
            <BoxWrapper className="col-span-1 md:col-span-8 p-0 overflow-hidden bg-white rounded-3xl">
              <div className="px-4 md:px-6 py-3 md:py-4 bg-primary mb-2 text-left">
                <p className="text-base md:text-lg text-white font-bold">
                  Thông tin tài khoản
                </p>
              </div>
              <ul className="space-y-3 md:space-y-4 p-4 md:p-6">
                <li className="flex items-center flex-wrap">
                  <User className="text-text-secondary mr-2" />
                  <span className="font-semibold mr-2">Tên đầy đủ:</span>
                  <span className="font-bold text-text-secondary">
                    {data.fullName || "_"}
                  </span>
                </li>
                <li className="flex items-center flex-wrap">
                  <MailIcon className="text-text-secondary mr-2" />
                  <span className="font-semibold mr-2">Email:</span>
                  {data.email}
                </li>
                <li className="flex items-center flex-wrap">
                  <TagIcon className="text-text-secondary mr-2" />
                  <span className="font-semibold mr-2">Vai trò:</span>
                  {data.role}
                </li>
                <li className="flex items-center flex-wrap">
                  <MapIcon className="text-text-secondary mr-2" />
                  <span className="font-semibold mr-2">Địa chỉ:</span>
                  {"Chưa có thông tin!"}
                </li>
              </ul>
            </BoxWrapper>

            {/* Company Contact Section */}
            <BoxWrapper className="col-span-1 md:col-span-4 p-0 overflow-hidden bg-white rounded-3xl">
              <div className="px-4 md:px-6 py-3 md:py-4 bg-primary mb-2 text-left">
                <p className="text-base md:text-lg text-white font-bold">
                  Thông tin tiền tệ
                </p>
              </div>
              <ul className="space-y-3 md:space-y-4 p-4 md:p-6">
                <li className="flex items-center flex-wrap">
                  <CircleDollarSign className="text-text-secondary mr-2" />
                  <span className="font-semibold mr-2">Tiền tệ (dâu):</span>
                  {formatThreeDigit(data?.currencyStrawberry || 0) || "_"}
                  <Image
                    unoptimized
                    src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/strawberry.png`}
                    alt="strawberry-icon"
                    width={14}
                    height={14}
                    className="object-contain object-center ml-2"
                  />
                </li>
                <li className="flex items-center flex-wrap">
                  <CircleDollarSign className="text-text-secondary mr-2" />
                  <span className="font-semibold mr-2">Tiền tệ (hoa):</span>
                  <span>
                    {formatThreeDigit(data?.currencyFlower || 0) || "_"}
                  </span>
                  <Image
                    unoptimized
                    src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/flower.png`}
                    alt="strawberry-icon"
                    width={14}
                    height={14}
                    className="object-contain object-center ml-2"
                  />
                </li>
                <li className="flex items-center flex-wrap">
                  <CircleDollarSign className="text-text-secondary mr-2" />
                  <span className="font-semibold mr-2">Tiền tệ (kem):</span>
                  {formatThreeDigit(data?.currencyCream || 0) || "_"}
                  <Image
                    unoptimized
                    src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/cream.png`}
                    alt="strawberry-icon"
                    width={14}
                    height={14}
                    className="object-contain object-center ml-2"
                  />
                </li>
              </ul>
            </BoxWrapper>
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default ProfileUserPage;
