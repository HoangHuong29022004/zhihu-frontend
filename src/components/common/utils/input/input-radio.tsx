import { cn } from "@/lib/utils";
import React, { InputHTMLAttributes, memo } from "react";

interface IInputRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  variants?: {
    wrapperClassName?: string;
    inputClassName?: string;
    labelClassName?: string;
  };
}

const InputRadio: React.FC<IInputRadioProps> = ({
  id,
  name,
  value,
  label,
  checked,
  variants,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex gap-2 items-center mb-2.5 cursor-pointer hover:text-primary",
        variants?.wrapperClassName
      )}
    >
      <input
        {...props}
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        className="w-4 h-4 rounded-full cursor-pointer"
        style={{ accentColor: "green" }} // Đổi màu nhanh gọn
      />
      <label
        htmlFor={id}
        className={cn("font-medium cursor-pointer", variants?.labelClassName)}
      >
        {label}
      </label>
    </div>
  );
};

export default memo(InputRadio);
