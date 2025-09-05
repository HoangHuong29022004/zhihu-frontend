import { APP_INFO } from "@/data/app/app-info";
import React from "react";

const CopyRightApp: React.FC = () => {
  return (
    <footer className="w-full text-center rounded-xl mt-6 mb-4">
      <p className="text-white">
        &copy; {new Date().getFullYear()}
        <span className="text-main font-semibold ml-1">{APP_INFO.appName}</span>
        . All rights reserved.
      </p>
    </footer>
  );
};

export default CopyRightApp;
