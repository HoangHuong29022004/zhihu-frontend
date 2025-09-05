// src/stores/useAuthStore.ts
import { IUserProfile } from "@/types/user.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IPermissionLogin {
  _id: string;
  name: string;
  apiPath: string;
  module: string;
  method: string;
}

interface IAuthState {
  user: IUserProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  isExpiredTimeVerify: boolean;
  isAccessTokenExpired: boolean;
  verifySecret: string | null;
  setIsExpiredTimeVerify: (value: boolean) => void;
  setIsAccessTokenExpired: (value: boolean) => void;
  setUser: (user: IUserProfile) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setVerifySecret: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isExpiredTimeVerify: false,
      verifySecret: null,
      isAccessTokenExpired: false,
      setUser: (user) => set({ user }),
      setIsExpiredTimeVerify: (value) => set({ isExpiredTimeVerify: value }),
      setIsAccessTokenExpired: (value) => set({ isAccessTokenExpired: value }),
      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      setVerifySecret: (value) => set({ verifySecret: value }),
      logout: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
