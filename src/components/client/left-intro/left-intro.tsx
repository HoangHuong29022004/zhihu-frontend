import Link from "next/link";

import { APP_INFO } from "@/data/app/app-info";
import { CopyRightApp } from "../footer";

interface ILeftIntroProps {
  logoImg?: string;
  title?: string;
  description?: string;
  desImage?: string;
}

const LeftIntro = (props: ILeftIntroProps) => {
  const { description } = props;
  return (
    <div
      className="max-md:hidden md:block md:col-span-5 h-screen w-full relative text-white p-10 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/right_bg.jpg)`,
      }}
    >
      <div className="absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-70 inset-0"></div>
      <div className="text-left absolute top-1/2 left-10 transform -translate-y-1/2">
        <h3 className="text-5xl font-bold mb-6">
          <Link href="/" className={`font-bold text-primary-dark`}>
            {APP_INFO.appName}
          </Link>
        </h3>
        <p className="text-4xl mb-6 w-1/2 break-words font-bold">
          {APP_INFO.appSlogan}
        </p>
        <p className="text-sm font-semibold mb-6 w-1/2 text-pretty">
          {description || APP_INFO.description}
        </p>
      </div>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
        <CopyRightApp />
      </div>
      {/* <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <Image
          src={`${process.env.NEXT_PUBLIC_URL_IMAGES_HOME}/auth_arrow.webp`}
          alt={"auth-arrow-img"}
          width={212}
          height={608}
        />
      </div> */}
    </div>
  );
};

export default LeftIntro;
