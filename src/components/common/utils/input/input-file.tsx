import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

interface IInutFileProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  label?: string;
  isRequired?: boolean;
  variants?: {
    wrapperClassName?: string;
    inputClassName?: string;
    errorClassName?: string;
  };
}

const InputFile = ({
  name,
  label,
  isRequired = true,
  error,
  handleFileChange,
  variants = {},
  ...props
}: IInutFileProps) => {
  const { wrapperClassName, inputClassName, errorClassName } = variants;

  return (
    <>
      <div className={cn("min-w-72", wrapperClassName)}>
        {label && (
          <p className="mb-0.5 text-text-secondary flex items-center">
            {label}
            {isRequired && (
              <span className="text-error ml-2 text-base mt-1">*</span>
            )}
          </p>
        )}
        <input
          {...props}
          name={name}
          type="file"
          onChange={handleFileChange}
          className={cn(
            "w-full py-2.5 px-4 border border-gray-200 rounded-lg hover:border-gray-500",
            error
              ? "border-accent outline-error"
              : "border-gray-300 outline-primary-light",
            inputClassName
          )}
        />
        {error && (
          <p className={cn("text-error text-sm mt-1", errorClassName)}>
            {error}
          </p>
        )}
      </div>
    </>
  );
};

export default InputFile;
