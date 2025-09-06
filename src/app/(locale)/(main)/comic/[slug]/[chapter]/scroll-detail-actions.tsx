"use client";

import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const ScrollDetailsAction = () => {
  const handleScrollUp = () => {
    window.scrollBy({ top: -200, behavior: "smooth" });
  };
  
  const handleScrollDown = () => {
    window.scrollBy({ top: 200, behavior: "smooth" });
  };

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-50">
      <button
        className="flex items-center justify-center rounded-full bg-blue-600 w-12 h-12 text-white shadow-lg hover:bg-blue-700 transition-colors"
        onClick={handleScrollUp}
        title="Cuộn lên"
      >
        <ChevronUp size={20} />
      </button>
      
      <button
        className="flex items-center justify-center rounded-full bg-blue-600 w-12 h-12 text-white shadow-lg hover:bg-blue-700 transition-colors"
        onClick={handleScrollDown}
        title="Cuộn xuống"
      >
        <ChevronDown size={20} />
      </button>
    </div>
  );
};

export default ScrollDetailsAction;