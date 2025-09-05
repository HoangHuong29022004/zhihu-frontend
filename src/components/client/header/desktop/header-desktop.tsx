import React from "react";

import HeaderLeft from "./header-left";
import HeaderRight from "./header-right";

const HeaderDesktop = () => {
  return (
    <>
      <header className="fixed top-0 w-full bg-white box-border max-md:px-4 md:px-5 py-1.5 flex justify-between items-center shadow-lg z-30">
        <HeaderLeft />
        <HeaderRight />
      </header>
    </>
  );
};

export default HeaderDesktop;
