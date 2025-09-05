import React from "react";

interface DotBounceLoaderProps {
  wrapperClassName?: string;
  dotClassName?: string;
}

const DotLoader: React.FC<DotBounceLoaderProps> = ({
  wrapperClassName = "flex min-h-screen items-center justify-center bg-slate-50 rounded-xl",
  dotClassName = "h-4 w-4 bg-primary",
}) => {
  return (
    <div className={wrapperClassName}>
      <div className="flex space-x-2">
        <div className={`${dotClassName} animate-bounce rounded-full`} />
        <div
          className={`${dotClassName} animate-bounce rounded-full delay-200`}
        />
        <div
          className={`${dotClassName} animate-bounce rounded-full delay-400`}
        />
      </div>
    </div>
  );
};

export default DotLoader;
