import { useState, InputHTMLAttributes } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import InputLabelBase from "./input-label";
import InputErrorBase from "./input-error";

interface IInputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
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

const InputPassword = ({
  name,
  label,
  isRequired = true,
  register,
  error,
  variants = {},
  ...props
}: IInputPasswordProps) => {
  const { wrapperClassName, inputClassName, errorClassName } = variants;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("relative mb-3 min-w-72", wrapperClassName)}>
      {label && <InputLabelBase label={label} isRequired={isRequired} />}
      <div className="relative w-full">
        <input
          {...props}
          type={showPassword ? "text" : "password"}
          className={cn(
            "w-full h-12 px-4 border border-gray-200 rounded-lg hover:border-gray-500",
            error
              ? "border-error outline-accent-light"
              : "border-gray-300 outline-primary",
            inputClassName
          )}
          {...register(name)}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-3 flex items-center text-primary hover:text-primary-dark"
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && (
        <InputErrorBase
          message={error.message || ""}
          className={errorClassName}
        />
      )}
    </div>
  );
};

export default InputPassword;
