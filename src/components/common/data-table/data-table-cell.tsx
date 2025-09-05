import { cn } from "@/lib/utils";
import React from "react";

interface IProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const TableCell = (props: IProps) => {
  const { children, className, onClick } = props;
  return (
    <td
      onClick={onClick}
      className={cn(
        "py-4 px-4 text-sm text-text-main max-w-44 break-words text-pretty border",
        className
      )}
    >
      {children}
    </td>
  );
};

export default TableCell;
