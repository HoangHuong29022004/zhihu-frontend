export interface IDepositOption {
  id: number;
  amount: number;
  strawberry: number;
  cream: number;
  description: string;
}

export const amounts = [
  10000, 20000, 30000, 50000, 80000, 100000, 150000, 200000, 250000, 300000,
  400000, 500000, 700000, 1000000,
];

export const getMarkFromAmount = (amount: number) => {
  if (!amount) return 0;
  return Math.floor(amount * 0.8);
};

export const DEPOSIT_OPTIONS: IDepositOption[] = amounts.map(
  (amount, index) => {
    const strawberry = getMarkFromAmount(amount);
    const cream = strawberry;
    return {
      id: index + 1,
      amount,
      strawberry,
      cream,
      description: `Nạp ${amount.toLocaleString()}đ nhận ngay ${strawberry.toLocaleString()} dâu và tặng kèm ${cream.toLocaleString()} kem`,
    };
  }
);
