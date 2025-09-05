import { TextareaHTMLAttributes } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { cn } from "@/lib/utils";

import InputLabelBase from "./input-label";
import InputErrorBase from "./input-error";

interface ITextAreaItemProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  register: UseFormRegister<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  error?: FieldError;
  label?: string;
  isRequired?: boolean;
  variants?: {
    wrapperClassName?: string;
    textareaClassName?: string;
    errorClassName?: string;
  };
}

const TextAreaItem = ({
  name,
  label,
  isRequired = true,
  register,
  error,
  variants = {},
  ...props
}: ITextAreaItemProps) => {
  const { wrapperClassName, textareaClassName, errorClassName } = variants;

  return (
    <div className={cn("mb-3 min-w-72", wrapperClassName)}>
      {label && <InputLabelBase label={label} isRequired={isRequired} />}
      <textarea
        {...props}
        className={cn(
          "w-full h-24 px-4 py-3 border border-gray-200 rounded-lg resize-none hover:border-gray-500",
          error
            ? "border-error outline-accent-light"
            : "border-gray-300 outline-primary",
          textareaClassName
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

export default TextAreaItem;
