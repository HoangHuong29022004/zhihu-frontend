import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import InputLabelBase from "./input-label";
import InputErrorBase from "./input-error";

interface IInputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isRequired?: boolean;
  error?: string;
  onValueChange?: (value: string) => void;
  variants?: {
    wrapperClassName?: string;
    inputClassName?: string;
    errorClassName?: string;
  };
}

const InputBase = ({
  label,
  isRequired = true,
  error,
  onValueChange,
  variants = {},
  value,
  onChange,
  ...props
}: IInputBaseProps) => {
  const { wrapperClassName, inputClassName, errorClassName } = variants;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onValueChange?.(e.target.value);
  };

  return (
    <div className={cn("mb-3 min-w-72", wrapperClassName)}>
      {label && <InputLabelBase label={label} isRequired={isRequired} />}
      <input
        {...props}
        value={value}
        onChange={handleChange}
        className={cn(
          "w-full h-12 px-4 border border-gray-200 rounded-lg hover:border-gray-500",
          error
            ? "border-error outline-accent-light"
            : "border-gray-300 outline-primary",
          inputClassName
        )}
      />
      {error && <InputErrorBase message={error} className={errorClassName} />}
    </div>
  );
};

export default InputBase;
