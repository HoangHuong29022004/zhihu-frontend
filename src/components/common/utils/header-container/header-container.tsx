interface HeadContainerProps {
  title: string;
  description?: string;
  wrapperClassName?: string;
  headerClassName?: string;
  descriptionClassName?: string;
}

export const HeadContainer = ({
  description,
  title,
  wrapperClassName = "",
  headerClassName = "",
  descriptionClassName = "",
}: HeadContainerProps) => {
  return (
    <div
      className={`relative flex w-full flex-col items-center rounded-b-[80px] bg-primary-dark text-center text-white max-md:p-10 md:px-16 md:py-20 md:gap-10 max-sm:gap-2 ${wrapperClassName}`}
    >
      <h1
        className={`animationSlipBottomToCurrent font-bold max-md:text-4xl md:text-[64px] ${headerClassName}`}
      >
        {title}
      </h1>
      {description && (
        <p
          className={`animationSlipBottomToCurrent max-md:text-md text-lg max-md:w-full max-md:text-base max-md:font-normal md:font-medium ${descriptionClassName}`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
