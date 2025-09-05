import { IAudioComic } from "./audio.type";
import { ICategoryItem } from "./category.type";

export type TSalaryType = "ZHIHU" | "NON_EXCLUSIVE" | "EXCLUSIVE";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ILastCompletedComic {
  id: string;
  title: string;
  slug?: string;
  description: string;
  thumbnail: string;
  status: string;
  unitPrice: number;
  categoryId: string;
  category: string;
  categories: ICategoryItem[];
  totalViews: number;
  totalOutstandings: number;
  totalChapters: number;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  salaryType?: TSalaryType;
  audios: IAudioComic[];
}

export interface IComicDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  status: string;
  unitPrice: number;
  categoryId: string;
  category: string;
  categories: ICategoryItem[];
  totalViews: number;
  totalOutstandings: number;
  totalChapters: number;
  totalAudios: number;
  isPurchased: boolean;
  authorId: string;
  authorName: string;
  author?: string;
  authorAvatar: string;
  createdAt: string;
  chapters: IChapterComicDetail[];
  salaryType: TSalaryType;
  audios: IAudioComic[];
  note?: string;
}

export interface IChapterComicDetail {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  unitPrice: number;
  index?: number;
}

export interface IChapterDetail {
  id: string;
  slug: any;
  title: string;
  content: string;
  thumbnail: string;
  unitPrice: number;
  totalViews: number;
  isPurchased: boolean;
  comicId: string;
  comicTitle: string;
  comicSlug: string;
  comicThumbnail: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
}
