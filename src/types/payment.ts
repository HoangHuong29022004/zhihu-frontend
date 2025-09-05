export interface ITransactionItem {
  id: string;
  bankName: string;
  bankAccount: string;
  amount: number;
  description: string;
  status: string;
  transactionAt: string;
  accountId: string;
  accountName: string;
  accountAvatar: string;
}

export interface ICurrencyHistory {
  id: string;
  type: string;
  amount: number;
  description: string;
  createdAt: string;
}

export interface IPaymentSeePayInfoResponse {
  fullName: string;
  bankName: string;
  accountNumber: string;
  amount: number;
  note: string;
  url: string;
}
