import { SectionWrapper } from "@/components/common/utils/common";
import React from "react";
import AppIntroduceHeader from "./app-introduce-header";
import AppIntroduceList from "./app-introduce-list";

const AppIntroduceSection = () => {
  return (
    <section
      id="app-introduce-section"
      className="bg-cover bg-center bg-no-repeat h-max w-full bg-gradient-to-l from-primary-dark to-primary-light"
    >
      {/* Content */}
      <SectionWrapper className="py-16">
        {/* Header */}
        <AppIntroduceHeader />
        {/* List */}
        <AppIntroduceList />
      </SectionWrapper>
    </section>
  );
};

export default AppIntroduceSection;
