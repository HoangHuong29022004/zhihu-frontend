import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAppState {
  isExpandedNavbar: boolean;
  toggleNavbar: () => void;
}

export const useAppStore = create<IAppState>()(
  persist(
    (set) => ({
      isExpandedNavbar: true,
      toggleNavbar: () =>
        set((state) => ({ isExpandedNavbar: !state.isExpandedNavbar })),
    }),
    {
      name: "app-storage",
    }
  )
);
