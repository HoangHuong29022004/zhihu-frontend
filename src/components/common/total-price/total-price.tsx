import { Sigma } from "lucide-react";
import React from "react";

interface IProps {
  quantity: number;
}
const QuantityBox = ({ quantity }: IProps) => {
  return (
    <div className="w-full h-12 px-4 bg-slate-100 rounded-full shadow flex items-center gap-1.5">
      <Sigma size={20} />
      <p className="text-sm font-semibold">Tổng: {quantity || 0}</p>
    </div>
  );
};

export default QuantityBox;
