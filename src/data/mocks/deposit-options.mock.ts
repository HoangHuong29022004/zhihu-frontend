export const DEPOSIT_OPTIONS = [
  {
    id: "1",
    name: "ViettelPay",
    logo: "/images/common/default_image.png",
    minAmount: 10000,
    maxAmount: 5000000,
    fee: 0,
    isActive: true
  },
  {
    id: "2", 
    name: "Momo",
    logo: "/images/common/default_image.png",
    minAmount: 10000,
    maxAmount: 5000000,
    fee: 0,
    isActive: true
  },
  {
    id: "3",
    name: "ZaloPay",
    logo: "/images/common/default_image.png", 
    minAmount: 10000,
    maxAmount: 5000000,
    fee: 0,
    isActive: true
  }
];

export const getMarkFromAmount = (amount: number): number => {
  // Logic tính mark từ amount
  return Math.floor(amount / 1000);
};
