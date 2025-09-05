"use client";
import { Progress } from "@/components/ui/progress";
import * as React from "react";

interface ProgressBarProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
  isDone?: boolean;
  reset?: boolean;
}

const ProgressBar = ({
  value,
  className,
  indicatorClassName,
  isDone,
}: ProgressBarProps) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (isDone) {
        setProgress(0);
      } else {
        setProgress((oldProgress) => {
          if (oldProgress === value) {
            return value;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, value);
        });
      }
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [isDone]);

  return (
    <Progress
      value={isDone ? 100 : progress}
      className={className ?? "w-[60%]"}
      indicatorClassName={indicatorClassName}
    />
  );
};

export default ProgressBar;
