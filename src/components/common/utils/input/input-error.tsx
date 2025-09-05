import { cn } from "@/lib/utils";

interface IInputLabelProps {
  message: string;
  className?: string;
}
const InputErrorBase = ({ message, className }: IInputLabelProps) => {
  return <p className={cn("text-error text-sm mt-1", className)}>{message}</p>;
};

export default InputErrorBase;
