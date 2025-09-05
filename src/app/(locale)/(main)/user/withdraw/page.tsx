import { ButtonBase } from "@/components/common/utils/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import WithDrawSteps from "./withdraw-step";
import WithDrawStatistic from "./withdraw-statistic";

const WithdrawPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center gap-2 flex-wrap mb-4">
        <div>
          <h1 className="text-lg text-text-secondary font-bold flex items-center gap-2">
            Rút tiền
          </h1>
          <p className="text-text-secondary italic">
            Cùng khám phá tính năng rút tiền tại hệ thống
          </p>
        </div>
        <Link href={`/`}>
          <ButtonBase size="sm" icon={<ArrowLeft />} variants="outline">
            Quay lại
          </ButtonBase>
        </Link>
      </div>
      <div className="bg-slate-100 rounded-2xl p-4 my-4">
        <WithDrawSteps />
      </div>
      <WithDrawStatistic />
    </div>
  );
};

export default WithdrawPage;
