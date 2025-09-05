"use client";
import React from "react";
import { StepBaseProgress } from "@/components/common/utils/common";
import { SHORT_WITHDRAW_STEPS, WITHDRAW_STEPS } from "@/data/constants/global";
import useMediaQuery from "@/hooks/use-screen-size";

const WithDrawSteps = () => {
  const { isMobile } = useMediaQuery();
  const steps = isMobile ? SHORT_WITHDRAW_STEPS : WITHDRAW_STEPS;
  return (
    <div className="flex mt-4">
      {steps.map((item, index: number) => (
        <StepBaseProgress
          isMobile={true}
          key={index}
          step={item}
          index={index}
          currentActive={2}
        />
      ))}
    </div>
  );
};

export default WithDrawSteps;
