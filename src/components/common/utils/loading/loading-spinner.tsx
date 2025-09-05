interface ILoadingSpinnerProps {
  variant?: "white" | "primary" | "red" | "blue";
  text?: string;
  type?: "default" | "button";
}

const LoadingSpinner = (props: ILoadingSpinnerProps) => {
  const { text, type = "default", variant = "white" } = props;
  return (
    <div className="flex items-center text-center justify-center">
      <div
        className={`animate-spin rounded-full border-[3px] border-t-transparent ${
          type === "button"
            ? `border-${variant} size-5`
            : "border-primary size-8"
        }`}
      ></div>
      {text && <p className={`ml-2 text-md text-${variant}`}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
