"use client";
import ButtonBase from "@/components/common/utils/button/button-base";
import React, { useState } from "react";
import ConfirmModal from "./confirm-modal";
import {
  ShoppingCart,
  ChevronDown,
  RotateCcwIcon,
  LandmarkIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { InputLabelBase } from "@/components/common/utils/input";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import { getMarkFromAmount } from "@/data/mocks/deposit-options.mock";
import ImageBase from "@/components/common/image-base/image-base";
import { formatToVND } from "@/utils/common";

// Animation variants for the form
const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2, ease: "easeIn" } },
};

const DEFAULT_AMOUNT = 10000;

const AddPaymentForm = () => {
  const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT);
  const [showForm, setShowForm] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleAmountChange = (value: number) => {
    setAmount(value);
    setShowModal(false);
  };

  return (
    <>
      {showModal && <ConfirmModal item={amount} setItem={setAmount} />}
      <div className="px-4 py-4 border rounded-2xl mb-6 mt-2">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => setShowForm(!showForm)}
        >
          <h2 className="text-base font-semibold text-text-secondary">
            Nhập số tiền bạn mong muốn
          </h2>
          <button>
            <ChevronDown
              size={18}
              className={`text-primary ${
                showForm && "-rotate-180"
              } transition-transform duration-300`}
            />
          </button>
        </div>
        {showForm && (
          <motion.form
            action="post"
            className="max-h-[76vh] overflow-y-auto border-t border-slate-200"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-wrap gap-2 items-end mt-4">
              <div className="mb-3 sm:w-1/2 max-sm:w-full">
                <InputLabelBase label="Nhập số tiền (từ 10,000 VND)" />
                <input
                  type="number"
                  value={amount}
                  min={DEFAULT_AMOUNT}
                  step={5000}
                  max={1000000}
                  onChange={(e) => handleAmountChange(Number(e.target.value))}
                  className="h-12 w-full px-4 border border-gray-200 rounded-lg"
                />
              </div>
              <p className="font-semibold mb-2.5">
                <span>Số tiền: </span>
                <span className="font-semibold text-primary">
                  {formatToVND(amount)}
                </span>
              </p>
            </div>
            <div className="flex gap-3 max-sm:flex-wrap flex-1">
              <div className="sm:w-1/2 max-sm:w-full">
                <InputLabelBase label={"Quy đổi số dâu :"} isRequired={false} />
                <div className="w-full h-12 leading-[48px] px-4 border border-gray-200 rounded-lg mt-2 bg-slate-50">
                  +{getMarkFromAmount(amount)}
                </div>
              </div>
              <div className="sm:w-1/2 max-sm:w-full">
                <InputLabelBase
                  label={"Quy đổi số kem (tặng kèm):"}
                  isRequired={false}
                />
                <div className="w-full h-12 leading-[48px] px-4 border border-gray-200 rounded-lg mt-2 bg-slate-50">
                  +{getMarkFromAmount(amount)}
                </div>
              </div>
            </div>

            <InlineHint message="Hãy kiểm tra kĩ thông tin trước khi thao tác" />
            <div className="mt-6 flex flex-wrap justify-between gap-4">
              <div className="flex gap-2 items-center">
                <span className="font-semibold">Thanh toán: </span>
                <div className="p-2 border rounded-lg bg-green-100 text-green-800 flex gap-1 items-center flex-nowrap whitespace-nowrap">
                  <LandmarkIcon size={16} />
                  chuyển khoản
                </div>
                <div className="p-2 border rounded-lg">
                  <ImageBase
                    src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/sepay-logo.png`}
                    alt="sePay-logo"
                    width={60}
                    height={60}
                    className="object-cover object-center rounded-md text-center mx-auto"
                  />
                </div>
              </div>
              <div className="flex gap-3 max-sm:w-full max-sm:justify-end">
                <ButtonBase
                  className={`font-semibold  ${
                    amount === DEFAULT_AMOUNT && "opacity-60"
                  }`}
                  type="button"
                  variants="outline"
                  onClick={() => handleAmountChange(DEFAULT_AMOUNT)}
                  disabled={amount === DEFAULT_AMOUNT}
                >
                  <div className="flex gap-1 items-center flex-nowrap whitespace-nowrap">
                    <RotateCcwIcon size={16} />
                    Đặt lại
                  </div>
                </ButtonBase>
                <ButtonBase type="button" onClick={() => setShowModal(true)}>
                  <div className="flex gap-1 items-center flex-nowrap whitespace-nowrap">
                    <ShoppingCart size={16} />
                    Nạp ngay
                  </div>
                </ButtonBase>
              </div>
            </div>
          </motion.form>
        )}
      </div>
    </>
  );
};

export default AddPaymentForm;
