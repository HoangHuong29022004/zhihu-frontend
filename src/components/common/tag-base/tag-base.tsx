import React from "react";

interface IProps {
  title: string;
}

const TagBase = ({ title }: IProps) => {
  return (
    <div className="absolute bottom-0 left-10 z-10 w-[70px] h-[20px] transform -rotate-45 origin-bottom-left">
      <div className="relative w-full h-full bg-green-600 text-white text-[10px] font-bold text-center leading-[20px] shadow-md">
        {/* Tam giác trái */}
        <div className="absolute -left-[10px] top-0 w-0 h-0 border-y-[10px] border-l-[10px] border-y-transparent border-l-green-600" />

        {/* Tam giác phải */}
        <div className="absolute -right-[10px] top-0 w-0 h-0 border-y-[10px] border-r-[10px] border-y-transparent border-r-green-600" />

        {title}
      </div>
    </div>
  );
};

export default TagBase;
