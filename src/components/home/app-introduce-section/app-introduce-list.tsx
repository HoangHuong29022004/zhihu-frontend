import React from "react";
import AppIntroduceItem from "./app-introduce-item";
import { APP_INTRODUCE_STATISTICS } from "@/data/app/app-info";

const AppIntroduceList = () => {
  return (
    <div className="grid grid-cols-12 gap-4 mt-8">
      {APP_INTRODUCE_STATISTICS.map((item, index) => (
        <div key={index} className="max-md:col-span-12 md:col-span-6">
          <AppIntroduceItem data={item} index={index} />
        </div>
      ))}
    </div>
  );
};

export default AppIntroduceList;
