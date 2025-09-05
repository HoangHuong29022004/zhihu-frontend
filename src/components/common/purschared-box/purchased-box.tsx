import { CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IProps {
  title: string;
  renderDesc: () => React.ReactNode;
  price?: number | string;
  currencyType?: string;
  priceLabel?: string;
  className?: string;
  txtSearch?: string;
}

const PurchasedBox: React.FC<IProps> = ({
  title,
  renderDesc,
  price,
  currencyType,
  priceLabel = "Giá:",
  className = "",
  txtSearch = "",
}) => {
  return (
    <div
      className={`border-1 border-l-8 border-primary my-6 max-sm:my-4 max-sm:p-6 sm:p-6 rounded-2xl bg-primary-active shadow-xl ${className}`}
    >
      <div className="flex max-sm:flex-col items-center gap-4">
        <div className="flex-shrink-0">
          <div className="bg-white p-4 max-sm:p-3 rounded-full shadow-sm">
            <CheckIcon className="w-10 h-10 max-sm:w-8 max-sm:h-8 text-primary" />
          </div>
        </div>
        <div className="flex-grow max-sm:text-center max-sm:w-full">
          <h2 className="font-bold text-2xl max-sm:text-xl text-primary mb-2 uppercase">
            {title}
          </h2>
          {renderDesc()}
          {price && (
            <div className="flex items-center gap-2 font-semibold max-sm:justify-center max-sm:mt-3">
              <span className="text-sm text-text-secondary italic">
                {priceLabel}
              </span>
              <span className="text-sm text-primary bg-white px-3 py-1 rounded-full flex justify-center font-bold items-center gap-1 shadow-sm">
                {price}{" "}
                {currencyType === "0" ? (
                  <Image
                    unoptimized
                    src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/strawberry.png`}
                    alt="strawberry-icon"
                    width={14}
                    height={14}
                    className="object-contain object-center ml-1"
                  />
                ) : currencyType === "1" ? (
                  <Image
                    unoptimized
                    src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/flower.png`}
                    alt="flower-icon"
                    width={14}
                    height={14}
                    className="object-contain object-center ml-1"
                  />
                ) : (
                  <Image
                    unoptimized
                    src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/strawberry.png`}
                    alt="strawberry-icon"
                    width={14}
                    height={14}
                    className="object-contain object-center ml-1"
                  />
                )}
              </span>
              <Link
                href={
                  txtSearch
                    ? `/user/manage-currency?txtSearch=${txtSearch}`
                    : "/user/manage-currency"
                }
                className="text-primary underline font-semibold text-xs mt-2"
              >
                Xem chi tiết
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchasedBox;
