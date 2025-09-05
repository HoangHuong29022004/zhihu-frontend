import { ButtonBase } from "@/components/common/utils/button";
import { ArrowLeft, Calculator, MoveRight, Package } from "lucide-react";
import Link from "next/link";
import React from "react";
import AddPaymentForm from "./add-form";
import DepositOptionsTable from "./deposit-options";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentSteps from "./payement-step";

const DepositPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center gap-2 flex-wrap mb-4">
        <div>
          <h1 className="text-lg text-text-secondary font-bold flex items-center gap-2">
            Gói nạp
          </h1>
          <p className="text-text-secondary italic">
            Hãy lựa chọn các gối nạp bên dưới để nạp điểm
          </p>
        </div>
        <Link href={`/`}>
          <ButtonBase size="sm" icon={<ArrowLeft />} variants="outline">
            Quay lại
          </ButtonBase>
        </Link>
      </div>
      <div className="bg-slate-100 rounded-2xl p-4 my-4">
        <PaymentSteps />
      </div>
      <Tabs defaultValue="deposit-options" className="w-full mt-6">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger
            value="deposit-options"
            className="flex items-center gap-2"
          >
            <Package className="w-4 h-4" />
            1. Chọn gói nạp
          </TabsTrigger>
          <TabsTrigger value="payment-form" className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            2. Nhập số tiền
          </TabsTrigger>
        </TabsList>
        <TabsContent value="deposit-options">
          <div className="flex gap-3 flex-wrap justify-between w-full items-center mb-6">
            <InlineHint
              className="w-fit"
              message="Hướng dẫn: Hãy chọn các gối nạp có sẵn bên dưới và nhấn `Nạp ngay`"
            />
            <ButtonBase
              variants="outline"
              className="gap-2 max-sm:w-full"
              size="sm"
            >
              <Link
                href={"/user/manage-currency"}
                className="flex items-center gap-2"
              >
                <MoveRight /> Xem lịch sử
              </Link>
            </ButtonBase>
          </div>
          <DepositOptionsTable />
        </TabsContent>
        <TabsContent value="payment-form">
          <div className="flex gap-3 flex-wrap justify-between w-full items-center mb-6">
            <InlineHint
              className="w-fit"
              message="Hướng dẫn: Nhập số tiền bạn mong muốn và nhấn `Nạp ngay`"
            />
            <ButtonBase
              variants="outline"
              className="gap-2 max-sm:w-full"
              size="sm"
            >
              <Link
                href={"/user/manage-currency"}
                className="flex items-center gap-2"
              >
                <MoveRight /> Xem lịch sử
              </Link>
            </ButtonBase>
          </div>

          <AddPaymentForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DepositPage;
