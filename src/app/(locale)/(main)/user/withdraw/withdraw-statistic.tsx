"use client";

import SummaryBox from "@/components/common/summary-box/summary-box";
import { DotLoader } from "@/components/common/utils/loading";
import { useGetWithdrawStatistic } from "@/queries/withdraw.query";
import { getAccessToken } from "@/utils/api-handler";
import { DollarSignIcon, Eye, Wallet, Banknote, MoveRight } from "lucide-react";
import React from "react";
import AddWithDrawForm from "./add-form";
import { ButtonBase } from "@/components/common/utils/button";
import { formatThreeDigit, formatToVND } from "@/utils/common";

const WithDrawStatistic = () => {
  const { isLoading, data } = useGetWithdrawStatistic({
    token: getAccessToken() ?? "",
  });
  if (isLoading) {
    return <DotLoader />;
  }

  const handleNavigateManageWithdraw = () => {
    window.location.href = "/user/manage-withdraw";
  };
  return (
    <div className="my-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-base text-text-secondary font-bold flex items-center gap-2">
          Thông số thống kê của bạn
        </h1>
        <ButtonBase
          variants="outline"
          className="gap-2 max-sm:w-full"
          size="sm"
          onClick={handleNavigateManageWithdraw}
        >
          <MoveRight /> Xem lịch sử
        </ButtonBase>
      </div>
      <div className="grid max-md:grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl mb-10">
        <SummaryBox
          title="Tổng lượt xem"
          value={formatThreeDigit(data?.totalView) || 0}
          icon={<Eye size={30} />}
        />
        <SummaryBox
          title="Tổng thu nhập (VND)"
          value={formatToVND(data?.totalPurchased) || 0}
          icon={<DollarSignIcon size={30} />}
          bgColor="bg-green-300"
        />
        <SummaryBox
          title="Số tiền được rút (VND)"
          value={formatToVND(data?.withdrawable) || 0}
          icon={<Banknote size={30} />}
          bgColor="bg-blue-300"
        />
        <SummaryBox
          title="Số tiền đã rút (VND)"
          value={formatToVND(data?.totalWithdrawn) || 0}
          icon={<Wallet size={30} />}
          bgColor="bg-orange-300"
        />
      </div>
      <AddWithDrawForm withdrawable={data?.withdrawable} />
    </div>
  );
};

export default WithDrawStatistic;
