import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { cn } from "@/lib/utils";
import InputLabelBase from "./input-label";
import InputErrorBase from "./input-error";

interface IInputItemsProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: FieldError;
  label?: string;
  isRequired?: boolean;
  variants?: {
    wrapperClassName?: string;
    inputClassName?: string;
    errorClassName?: string;
  };
}

const InputItem = ({
  name,
  label,
  isRequired = true,
  register,
  error,
  variants = {},
  ...props
}: IInputItemsProps) => {
  const { wrapperClassName, inputClassName, errorClassName } = variants;

  return (
    <div className={cn("mb-3 min-w-72", wrapperClassName)}>
      {label && <InputLabelBase label={label} isRequired={isRequired} />}
      <input
        {...props}
        className={cn(
          "w-full h-12 px-4 border border-gray-200 rounded-lg hover:border-gray-500",
          error
            ? "border-error outline-accent-light"
            : "border-gray-300 outline-primary",
          inputClassName
        )}
        {...register(name)}
      />
      {error && (
        <InputErrorBase
          message={error.message || ""}
          className={errorClassName}
        />
      )}
    </div>
  );
};

export default InputItem;
