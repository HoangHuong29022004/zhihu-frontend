import {
  IChapterComicDetail,
  IComicDetail,
  ILastCompletedComic,
} from "@/types/comic.type";
import { IUserFollow } from "@/types/user.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TComicState = {
  isLoading: boolean;
  comicDetail: IComicDetail | null;
  currentSortedChapters: IChapterComicDetail[] | null;
  comicFavorites: ILastCompletedComic[] | null;
  followedUsers: IUserFollow[] | [];
  lastCompletedComic: ILastCompletedComic[] | null;
};

export type TComicAction = {
  setIsLoading: (value: boolean) => void;
  setComicDetail: (value: IComicDetail | null) => void;
  setCurrentSortedChapters: (value: IChapterComicDetail[] | null) => void;
  setComicFavorites: (value: ILastCompletedComic[] | null) => void;
  setFollowedUsers: (value: IUserFollow[]) => void;
  setLastCompletedComic: (value: ILastCompletedComic[] | null) => void;
};

export const useComicStore = create<TComicState & TComicAction>()(
  persist(
    (set) => ({
      isLoading: false,
      comicDetail: null,
      comicFavorites: [],
      followedUsers: [],
      lastCompletedComic: [],
      currentSortedChapters: [],
      setIsLoading: (value) => set({ isLoading: value }),
      setComicDetail: (value) => set({ comicDetail: value }),
      setCurrentSortedChapters: (value) =>
        set({ currentSortedChapters: value }),
      setComicFavorites: (value) => set({ comicFavorites: value }),
      setFollowedUsers: (value) => set({ followedUsers: value }),
      setLastCompletedComic: (value) => set({ lastCompletedComic: value }),
    }),
    {
      name: "comic-storage",
    }
  )
);
