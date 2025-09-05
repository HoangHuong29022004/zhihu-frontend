import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface IAuthFormWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
  img?: string;
  variants?: {
    wrapperClassName?: string;
    imgClassName?: string;
    titleClassName?: string;
    desClassName?: string;
  };
}

const AuthFormWrapper: React.FC<IAuthFormWrapperProps> = ({
  title,
  description,
  children,
  img,
  variants,
}) => {
  return (
    // {`w-[420px] ${variants?.wrapperClassName}`} => "w-[420px] w-[1000px]" => Not good
    // "cn("w-[420px] w-[1000px]") => "w-[1000px]" => OK
    <div
      className={cn("max-sm:w-[full] sm:w[620px]", variants?.wrapperClassName)}
    >
      {/* Form header */}
      {img && (
        <Image
          unoptimized
          src={img}
          alt="form-auth-img"
          loading="lazy"
          fill={true}
          className={cn(variants?.imgClassName)}
        />
      )}
      <p
        className={cn(
          "mb-2 text-left text-2xl font-bold text-primary",
          variants?.titleClassName
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          "text-text-secondary text-sm text-left text-pretty",
          variants?.desClassName
        )}
      >
        {description}
      </p>
      {/* Form body */}
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default AuthFormWrapper;
