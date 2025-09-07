import { ILastCompletedComic } from "@/types/comic.type";

export const DEMO_COMICS: ILastCompletedComic[] = [
  {
    id: "1",
    title: "Lục Linh Châu - 13 Tuổi Kiếp Khổ Trọn",
    slug: "luc-linh-chau-13-tuoi-kiep-kho-tron",
    description: "Câu chuyện về một cô gái 13 tuổi với cuộc sống đầy thử thách và khó khăn. Lục Linh Châu phải đối mặt với những thử thách lớn trong cuộc sống và học cách vượt qua chúng...",
    thumbnail: "/images/common/default_image.png",
    status: "Đang cập nhật",
    unitPrice: 0,
    categoryId: "1",
    category: "Ngôn tình",
    categories: [{ id: "1", slug: "ngon-tinh", name: "Ngôn tình" }],
    totalViews: 125000,
    totalOutstandings: 89,
    totalChapters: 45,
    authorId: "1",
    authorName: "Tác giả A",
    authorAvatar: "/images/common/default_avatar.jpg",
    createdAt: "2024-01-15T10:00:00Z",
    audios: []
  }
];
