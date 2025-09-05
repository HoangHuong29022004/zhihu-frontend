"use client";
import { CountUpBase } from "@/components/common/utils/count-up";
import { useOnScreen } from "@/hooks/use-on-screen";
import React from "react";

interface IAppIntroduceItem {
  title: string;
  description: string;
  quantity: number | string;
}

interface IAppIntroduceItemProps {
  data: IAppIntroduceItem;
  index: number;
}

const AppIntroduceItem = ({ data, index }: IAppIntroduceItemProps) => {
  const { ref, isVisible } = useOnScreen<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`text-text-main max-sm:p-3 sm:p-8 border-2 border-primary shadow-sm hover:border-primary-dark transition-all hover:shadow-lg rounded-3xl  flex gap-1.5 flex-col justify-center bg-white ${
        isVisible &&
        (index % 2 === 0 ? "animationSlipFromLeft" : "animationSlipFromRight")
      }`}
    >
      <h3 className="text-3xl font-bold text-primary-dark">
        {isVisible ? (
          <CountUpBase
            start={0}
            end={Number(data?.quantity ?? 0)}
            duration={4}
            suffix=" +"
            className="font-semibold"
          />
        ) : (
          0
        )}
      </h3>
      <p className="text-base font-semibold">{data.title}</p>
      <p>{data.description}</p>
    </div>
  );
};

export default AppIntroduceItem;
