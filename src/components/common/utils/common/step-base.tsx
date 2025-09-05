"use client";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const StepBaseProgress = ({
  index,
  step,
  currentActive,
  isMobile,
  separatorClassName,
}: {
  step: string;
  index: number;
  currentActive: number;
  isMobile?: boolean;
  separatorClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (containerRef.current) {
        setHeight(containerRef.current.clientHeight);
      }
    }
  }, []);

  return (
    <>
      <div
        className={cn(
          "flex gap-2",
          isMobile ? "flex-col items-center justify-center" : "items-center"
        )}
      >
        <div
          ref={containerRef}
          className={`flex h-6 w-6 items-center justify-center rounded-full ${
            currentActive == index
              ? "bg-primary"
              : index < currentActive
              ? "bg-primary"
              : "bg-primary opacity-30"
          }`}
        >
          {currentActive > index ? (
            <Check size={16} color={"#ffffff"} className="font-bold" />
          ) : (
            <p className={`text-sm text-white font-semibold`}>{index + 1}</p>
          )}
        </div>
        <div className={"w-full flex-1 text-pretty text-center"}>
          <span
            className={` ${
              currentActive == index
                ? "text-primary font-semibold"
                : index < currentActive
                ? "text-text-secondary"
                : "text-neutral opacity-30"
            }`}
          >
            {step}
          </span>
        </div>
      </div>
      {index !== 2 && (
        <div
          className={"flex h-full flex-1 items-center justify-center"}
          style={{
            height: height + "px",
          }}
        >
          <div
            className={cn(
              "h-[1px] w-full bg-gray-300 xl:w-32",
              separatorClassName
            )}
          />
        </div>
      )}
    </>
  );
};

export default StepBaseProgress;
