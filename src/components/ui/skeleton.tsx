import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

type SkeletonProps = {
  delay?: number;
  duration?: number;
  repeatDelay?: number;
} & React.HTMLAttributes<HTMLDivElement>;

function Skeleton({
  delay = 0,
  duration = 2,
  className,
  repeatDelay,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative animate-pulse overflow-hidden bg-slate-200 rounded-md",
        className
      )}
      {...props}
    >
      <motion.div
        className={
          "size-full bg-gradient-to-r from-slate-200 from-20% via-[#b7bec4] via-50% to-slate-200 to-80%"
        }
        initial={{
          translateX: "-100%",
        }}
        animate={{
          translateX: "100%",
        }}
        transition={{
          repeat: Infinity,
          duration,
          delay,
          repeatDelay,
        }}
      >
        <div className={"h-full w-6"} />
      </motion.div>
      {props.children}
    </div>
  );
}

export { Skeleton };
