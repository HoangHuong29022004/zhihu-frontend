import { APP_INFO } from "@/data/app/app-info";
import React from "react";

const AppIntroduceHeader = () => {
  return (
    <div className="w-full mx-auto flex flex-col gap-4 items-center">
      <h2 className="animationShowItem text-xl sm:text-2xl lg:text-3xl font-bold mb-2 leading-tight drop-shadow-lg">
        Thành tựu của ZhihuComic
      </h2>
      <p className="text-text-dark max-w-[80%] text-pretty text-center animationShowItem">
        {APP_INFO.description[0]}
      </p>
      {/* <p className="text-white max-w-[80%] text-pretty text-center animationShowItem">
        {APP_INFO.description[1]}
      </p> */}
    </div>
  );
};

export default AppIntroduceHeader;
