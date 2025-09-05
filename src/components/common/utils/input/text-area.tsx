import React, { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import InputLabelBase from "./input-label";

interface ITextAreaItemProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  name?: string; // Optional, in case you still want to use it
  value: string; // Controlled value
  onChange: (value: string) => void; // Callback to pass value to parent
  label?: string;
  isRequired?: boolean;
  variants?: {
    wrapperClassName?: string;
    textareaClassName?: string;
  };
}

const TextAreaBase = ({
  name,
  label,
  isRequired = true,
  value,
  onChange,
  variants = {},
  ...props
}: ITextAreaItemProps) => {
  const { wrapperClassName, textareaClassName } = variants;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value); // Pass the new value to the parent
  };

  return (
    <div className={cn("mb-3 min-w-72", wrapperClassName)}>
      {label && <InputLabelBase label={label} isRequired={isRequired} />}
      <textarea
        {...props}
        name={name}
        value={value}
        onChange={handleChange}
        className={cn(
          "w-full h-12 px-4 py-3 border border-gray-200 rounded-lg resize-none hover:border-gray-500 outline-primary",
          textareaClassName
        )}
      />
    </div>
  );
};

export default TextAreaBase;
