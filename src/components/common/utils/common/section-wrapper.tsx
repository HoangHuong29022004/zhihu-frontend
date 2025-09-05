import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface IBoxBaseProps {
  children: React.ReactNode;
  className?: string;
}

const SectionWrapper = forwardRef<HTMLDivElement, IBoxBaseProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "py-8 max-w-[1200px] mx-auto max-md:px-4 md:px-5",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";

export default SectionWrapper;
