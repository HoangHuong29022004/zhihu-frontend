import { SectionWrapper } from "@/components/common/utils/common";
import { HeadContainer } from "@/components/common/utils/header-container/header-container";
import React from "react";
import { APP_POLICY_DATA } from "../data";
import ImageBase from "@/components/common/image-base/image-base";

const AppPolicyPage = () => {
  return (
    <section
      id="section-policy"
      className="bg-gradient-to-b from-slate-50 to-white min-h-screen"
    >
      {/* Header */}
      <HeadContainer
        title="Nội quy đăng truyện"
        description="Nội quy dành cho các tác giả/editor và nhóm dịch sắp, đã và đang hợp tác"
      />

      {/*  Body here */}
      <SectionWrapper className="py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[24px] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="p-8">
              <div className="space-y-8">
                {/* Quy định chung */}
                <div className="border-b border-gray-100 pb-8">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                      1
                    </span>
                    {APP_POLICY_DATA[0].title}
                  </h2>
                  <div className="text-gray-600 leading-relaxed text-base">
                    <ul className="list-disc pl-5 space-y-2">
                      {(APP_POLICY_DATA[0].content as string[]).map(
                        (item: string, idx: number) => (
                          <li key={idx} className="text-gray-700">
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Quy định về truyện */}
                <div className="border-b border-gray-100 pb-8">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                      2
                    </span>
                    {APP_POLICY_DATA[1].title}
                  </h2>
                  <div className="text-gray-600 leading-relaxed text-base">
                    <ul className="list-disc pl-5 space-y-2">
                      {(APP_POLICY_DATA[1].content as string[]).map(
                        (item: string, idx: number) => (
                          <li key={idx} className="text-gray-700">
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Quy định về cách trình bày */}
                <div className="border-b border-gray-100 pb-8">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                      3
                    </span>
                    {APP_POLICY_DATA[2].title}
                  </h2>
                  <div className="text-gray-600 leading-relaxed text-base">
                    <ul className="list-disc pl-5 space-y-2">
                      {(APP_POLICY_DATA[2].content as string[]).map(
                        (item: string, idx: number) => (
                          <li key={idx} className="text-gray-700">
                            {item}
                            {idx === 0 && (
                              <div className="mt-4 grid place-content-center">
                                <ImageBase
                                  width={60}
                                  height={60}
                                  src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/comic_introduce.png`}
                                  alt="comic-introduce"
                                  className="object-contain object-center rounded-md w-full text-center mt-4"
                                />
                              </div>
                            )}
                            {idx === 1 && (
                              <div className="mt-4 grid place-content-center">
                                <ImageBase
                                  width={60}
                                  height={60}
                                  src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/comic_chapter.png`}
                                  alt="comic-introduce"
                                  className="object-contain object-center rounded-md w-full text-center mt-4"
                                />
                              </div>
                            )}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Chế độ lương - thưởng */}
                <div className="border-b border-gray-100 pb-8">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                      4
                    </span>
                    {APP_POLICY_DATA[3].title}
                  </h2>
                  <div className="mt-4 grid place-content-center">
                    <ImageBase
                      width={60}
                      height={60}
                      src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/salary_policy.png`}
                      alt="comic-introduce"
                      className="object-contain object-center rounded-md w-full text-center mt-4"
                    />
                  </div>
                </div>

                {/* Hình thức xử phạt */}
                <div className="pb-8">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                      5
                    </span>
                    {APP_POLICY_DATA[4].title}
                  </h2>
                  <div className="text-gray-600 leading-relaxed text-base">
                    <ul className="list-disc pl-5 space-y-2">
                      {(APP_POLICY_DATA[4].content as string[]).map(
                        (item: string, idx: number) => (
                          <li key={idx} className="text-gray-700">
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
};

export default AppPolicyPage;
