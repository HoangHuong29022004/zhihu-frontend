"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { formatTextDescription } from "@/utils/common";

interface IProps {
  description: string;
}

const ComicDescription = ({ description }: IProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      window.scrollTo({ top: 100, behavior: "smooth" });
    }
  };

  const formattedDescription = formatTextDescription(description || "_");

  return (
    <div className="text-gray-600 mb-4 text-base leading-relaxed italic select-none">
      <div
        className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "h-auto opacity-100" : "h-28"
        }`}
      >
        <div
          className="text-justify"
          dangerouslySetInnerHTML={{ __html: formattedDescription }}
        />
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 rounded-bl-xl right-0 h-28 bg-gradient-to-br from-transparent to-[#FDF2F8]" />
        )}
      </div>
      <div className="flex w-full justify-center mt-1">
        <button
          onClick={handleToggle}
          className="flex items-center text-primary text-sm font-semibold"
        >
          <span className="mr-2">{isExpanded ? "Thu gọn" : "Xem thêm"}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={18} className="text-primary" />
          </motion.div>
        </button>
      </div>
    </div>
  );
};

export default ComicDescription;
