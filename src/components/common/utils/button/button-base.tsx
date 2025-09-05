import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, memo } from "react";

interface IButtonComponentProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  variants?:
    | "primary"
    | "info"
    | "success"
    | "warning"
    | "accent"
    | "light"
    | "dark"
    | "outline";
  icon?: React.ReactNode;
  className?: string;
}

const ButtonBase = ({
  children,
  size = "md",
  variants = "primary",
  className,
  icon,
  ...props
}: IButtonComponentProps) => {
  const sizeClasses = {
    sm: "h-8 text-sm px-3",
    md: "h-10 text-sm px-4",
    lg: "h-12 text-md px-5",
    xl: "h-14 text-md px-6",
  };

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    info: "bg-blue-500 text-white hover:bg-blue-700",
    success: "bg-green-100 text-green-800 hover:bg-green-300",
    warning: "bg-warning text-white hover:bg-orange-600",
    accent: "bg-red-400 text-white hover:bg-red-700",
    light: "bg-slate-100 text-gray-900 hover:bg-slate-50",
    dark: "bg-gray-800 text-white hover:bg-gray-900",
    outline: "bg-white text-primary border border-primary",
  };

  return (
    <button
      {...props}
      aria-label={`${children}`}
      className={cn(
        "rounded-md font-medium transition duration-200 ease-in-out shadow-sm hover:shadow-md flex items-center justify-center whitespace-nowrap",
        sizeClasses[size],
        variantClasses[variants],
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default memo(ButtonBase);
