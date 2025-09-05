"use client";
import ButtonBase from "@/components/common/utils/button/button-base";
import React, { useState } from "react";
import { CheckIcon, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { InputItem, InputLabelBase } from "@/components/common/utils/input";
import InlineHint from "@/components/common/utils/inline-hint/iinline-hint";
import ConfirmModal from "./confirm-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TWithDrawRequest, WithDrawSchema } from "@/schemas/withdraw.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BANK_NAME_OPTIONS } from "@/data/constants/global";
import { IWithDrawRequest } from "@/types/withdraw.type";
import { toast } from "@/hooks/use-toast";
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

interface IProps {
  withdrawable: number;
}

const MIN_WITHDRAW = 50000;

const AddWithDrawForm = ({ withdrawable }: IProps) => {
  const [showForm, setShowForm] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bankName, setBankName] = useState<string>(BANK_NAME_OPTIONS[0].value);
  const [withDrawRequest, setWithDrawRequest] =
    useState<IWithDrawRequest | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TWithDrawRequest>({
    resolver: zodResolver(WithDrawSchema),
  });

  // Handle logic login
  const onSubmit = async (request: TWithDrawRequest) => {
    try {
      if (withdrawable < MIN_WITHDRAW) {
        toast({
          variant: "destructive",
          title: "Bạn chưa thể rút tiền!",
          description: `Số tiền được rút phải đủ 50,000 VND!`,
        });
        return;
      }
      if (request.amount > withdrawable) {
        toast({
          variant: "destructive",
          title: "Số tiền yêu cầu không hợp lệ!",
          description: `Số tiền phải nhỏ hơn ${formatToVND(withdrawable)} !`,
        });
        return;
      }
      if (request && bankName) {
        setShowModal(true);
        setWithDrawRequest({
          amount: request.amount,
          bankAccount: request.bankAccount,
          bankName: bankName,
          bankAccountName: request.bankAccountName,
        });
      }
    } catch (error) {
      console.log("Login failed! ", error);
    }
  };

  return (
    <>
      {showModal && (
        <ConfirmModal
          isOpen={showModal}
          setIsOpen={setShowModal}
          data={withDrawRequest}
        />
      )}
      <div className="px-4 py-4 border rounded-2xl mb-6 mt-2">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => setShowForm(!showForm)}
        >
          <h2 className="text-base font-semibold text-text-secondary">
            Nhập thông tin rút tiền
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
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full flex max-sm:flex-wrap gap-3 items-start mt-4">
              <div className="max-sm:w-full sm:w-1/2">
                <InputLabelBase label="Ngân hàng" />
                <Select
                  value={bankName}
                  onValueChange={(value) => setBankName(value)}
                >
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Ngân hàng..." />
                  </SelectTrigger>
                  <SelectContent className="h-52">
                    {BANK_NAME_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <InputItem
                type="text"
                name="bankAccountName"
                label="Tên chủ thẻ"
                register={register}
                placeholder="THANH NHAC CHAU..."
                error={errors.bankAccountName}
                variants={{
                  wrapperClassName: "max-sm:w-full sm:w-1/2",
                }}
              />
            </div>
            <div className="w-full flex max-sm:flex-wrap gap-3 items-start">
              <InputItem
                type="text"
                name="bankAccount"
                label="Số tài khoản"
                register={register}
                placeholder="101234567..."
                error={errors.bankAccount}
                variants={{
                  wrapperClassName: "max-sm:w-full sm:w-1/2",
                }}
              />
              <InputItem
                type="number"
                defaultValue={0}
                min={0}
                step={1000}
                max={withdrawable}
                name="amount"
                label={`Số tiền (Max ${formatToVND(withdrawable)})`}
                register={register}
                error={errors.amount}
                variants={{
                  wrapperClassName: "max-sm:w-full sm:w-1/2",
                }}
              />
            </div>

            {withdrawable >= MIN_WITHDRAW ? (
              <InlineHint
                icon={<CheckIcon />}
                message="Xin chúc mừng bạn đã đủ 50.000 VND để rút tiền!"
                className="bg-green-400 text-white"
              />
            ) : (
              <InlineHint
                message="Lưu ý số tiền được rút phải tối thiều 50.000 VND"
                className="bg-yellow-100"
              />
            )}

            <div className="mt-6 flex justify-end gap-2">
              <ButtonBase
                className="font-semibold"
                type="button"
                variants="outline"
                onClick={() => {
                  setBankName(BANK_NAME_OPTIONS[0].value);
                  reset();
                }}
              >
                Hủy bỏ
              </ButtonBase>
              <ButtonBase className="font-semibold" type="submit">
                Xác nhận
              </ButtonBase>
            </div>
          </motion.form>
        )}
      </div>
    </>
  );
};

export default AddWithDrawForm;
