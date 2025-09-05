export interface IUserProfile {
  id: string;
  fullName: string;
  avatar: string;
  role: string;
  email?: string;
  roleId?: number;
  currencyStrawberry?: number;
  currencyFlower?: number;
  currencyCream?: number;
}

export interface IUserFollow {
  id: string;
  fullName: string;
  avatar: string;
}

export interface IUserResetPassword {
  id: string;
  email: string;
}
