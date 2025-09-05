import { SectionWrapper } from "@/components/common/utils/common";
import { HeadContainer } from "@/components/common/utils/header-container/header-container";
import React from "react";
import { TERM_CONDITION_DATA } from "../data";

const TermConditionPage = () => {
  return (
    <section
      id="section-contact"
      className="bg-gradient-to-b from-slate-50 to-white min-h-screen"
    >
      {/* Header */}
      <HeadContainer
        title="Điều khoản sử dụng"
        description="Điều khoản sử dụng dịch vụ của Thanh Nhạc Châu"
      />

      {/*  Body here */}
      <SectionWrapper className="py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[24px] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="p-8">
              <div className="space-y-8">
                {TERM_CONDITION_DATA.map((section, index) => (
                  <div
                    key={section.id}
                    className="border-b border-gray-100 last:border-0 pb-8 last:pb-0"
                  >
                    <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                        {index + 1}
                      </span>
                      {section.title}
                    </h2>
                    <div className="text-gray-600 leading-relaxed text-base">
                      {Array.isArray(section.content) ? (
                        <ul className="list-disc pl-5 space-y-2">
                          {section.content.map((item, idx) => (
                            <li key={idx} className="text-gray-700">
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-700 whitespace-pre-line">
                          {section.content}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
};

export default TermConditionPage;
