export interface IAudioComic {
  id: string;
  slug: string;
  title: string;
  unitPrice: number;
  index?: number;
}

export interface IAudioDetails {
  id: string;
  slug: string;
  title: string;
  url: string;
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
