import { SectionWrapper } from "@/components/common/utils/common";
import { HeadContainer } from "@/components/common/utils/header-container/header-container";
import React from "react";
import { ABOUT_DATA } from "../data";

const AboutUsPage = () => {
  return (
    <section id="section-about" className="bg-slate-50">
      {/* Header */}
      <HeadContainer
        title="Giới thiệu"
        description="Giới thiệu về chúng tôi - Nền tảng đọc truyện tranh và truyện chữ trực tuyến"
      />
      {/* Body here */}
      <SectionWrapper className="py-8">
        <div className="flex flex-col gap-2 mx-auto p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300">
          {ABOUT_DATA.map((item, index) => (
            <div key={index} className="p-2 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-500 mb-3 flex items-center gap-2">
                <span>{index + 1}.</span>
                {item.title}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
};

export default AboutUsPage;
