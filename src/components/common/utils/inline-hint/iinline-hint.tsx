import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import React from "react";

interface IProps {
  className?: string;
  message?: string;
  icon?: React.ReactNode;
}

const InlineHint = ({ message, icon, className }: IProps) => {
  return (
    <div
      className={cn(
        "px-3 py-2 bg-gray-200 rounded-md text-text-secondary flex items-center gap-1 mt-4 max-sm:text-sm",
        className
      )}
    >
      {icon || <InfoIcon size={16} />}
      <span>
        {message || (
          <span>
            <b>Lưu ý: </b> Hãy kiểm tra kỹ thông tin trước khi thao tác!
          </span>
        )}
      </span>
    </div>
  );
};

export default InlineHint;
