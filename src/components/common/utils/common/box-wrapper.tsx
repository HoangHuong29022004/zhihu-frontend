import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface IBoxBaseProps {
  children: React.ReactNode;
  className?: string;
}

const BoxWrapper = forwardRef<HTMLDivElement, IBoxBaseProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn("p-2 text-center", className)}>
        {children}
      </div>
    );
  }
);

BoxWrapper.displayName = "BoxWrapper";

export default BoxWrapper;
