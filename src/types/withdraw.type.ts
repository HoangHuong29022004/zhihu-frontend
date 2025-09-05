export interface IWithdrawAdmin {
  id: string;
  amount: number;
  status: string;
  bankName: string;
  bankAccount: string;
  bankAccountName: string;
  createdAt: string;
}

export interface IWithdrawMe {
  id: string;
  amount: number;
  status: string;
  bankName: string;
  bankAccount: string;
  bankAccountName: string;
  createdAt: string;
}

export interface IWithDrawRequest {
  amount: number;
  bankName: string;
  bankAccount: string;
  bankAccountName: string;
}
