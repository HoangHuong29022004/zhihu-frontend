export interface IDepositOption {
  id: string;
  name: string;
  logo: string;
  minAmount: number;
  maxAmount: number;
  fee: number;
  isActive: boolean;
  amount: number;
  strawberry: number;
  cream: number;
}

export const DEPOSIT_OPTIONS: IDepositOption[] = [
  {
    id: "1",
    name: "ViettelPay",
    logo: "/images/common/default_image.png",
    minAmount: 10000,
    maxAmount: 5000000,
    fee: 0,
    isActive: true,
    amount: 50000,
    strawberry: 50,
    cream: 25
  },
  {
    id: "2", 
    name: "Momo",
    logo: "/images/common/default_image.png",
    minAmount: 10000,
    maxAmount: 5000000,
    fee: 0,
    isActive: true,
    amount: 100000,
    strawberry: 100,
    cream: 50
  },
  {
    id: "3",
    name: "ZaloPay",
    logo: "/images/common/default_image.png", 
    minAmount: 10000,
    maxAmount: 5000000,
    fee: 0,
    isActive: true,
    amount: 200000,
    strawberry: 200,
    cream: 100
  }
];

export const getMarkFromAmount = (amount: number): number => {
  // Logic tính mark từ amount
  return Math.floor(amount / 1000);
};
