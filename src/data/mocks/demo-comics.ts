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

// Tạo thêm dữ liệu để có đủ items cho mỗi section (duplicate với title khác nhau)
export const EXTENDED_DEMO_COMICS: ILastCompletedComic[] = [
  ...DEMO_COMICS,
  ...DEMO_COMICS.map((comic, index) => ({
    ...comic,
    id: `${comic.id}-copy-${index + 1}`,
    title: `${comic.title} - Phần ${index + 2}`,
    slug: `${comic.slug}-phan-${index + 2}`,
    totalViews: comic.totalViews + Math.floor(Math.random() * 50000),
    totalOutstandings: comic.totalOutstandings + Math.floor(Math.random() * 30),
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }))
];