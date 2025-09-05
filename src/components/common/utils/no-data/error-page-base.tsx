import { memo } from "react";
import Link from "next/link";

interface IBaseErrorProps {
  statusCode?: string;
  title: string;
  description: string;
}

const ErrorPageBase = (props: IBaseErrorProps) => {
  const { statusCode, title, description } = props;
  return (
    <>
      <h1 className="max-md:text-xl md:text-4xl font-bold mb-4">
        {statusCode} | {title}
      </h1>
      <p className="text-ld text-text-secondary mb-6 max-md:max-w-72 md:max-w-96">
        {description}
      </p>
      <Link
        className="h-12 text-md px-5 rounded-md font-medium transition duration-200 ease-in-out shadow-sm hover:shadow-md flex items-center justify-center bg-primary text-white hover:bg-primary-dark"
        href={"/"}
      >
        Trở về trang chủ
      </Link>
    </>
  );
};

export default memo(ErrorPageBase);
