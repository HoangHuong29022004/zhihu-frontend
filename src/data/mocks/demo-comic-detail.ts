import { IComicDetail } from "@/types/comic.type";

export const DEMO_COMIC_DETAIL: IComicDetail = {
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
  totalAudios: 12,
  authorId: "1",
  authorName: "Tác giả A",
  author: "Tác giả A",
  authorAvatar: "/images/common/default_avatar.jpg",
  isPurchased: false,
  salaryType: "NON_EXCLUSIVE",
  createdAt: "2024-01-15T10:00:00Z",
  chapters: [
    {
      id: "1",
      title: "Chương 1: Khởi đầu",
      slug: "chuong-1-khoi-dau",
      thumbnail: "/images/common/comic_chapter.png",
      unitPrice: 0,
    },
    {
      id: "2", 
      title: "Chương 2: Gặp gỡ",
      slug: "chuong-2-gap-go",
      thumbnail: "/images/common/comic_chapter.png",
      unitPrice: 0,
    },
    {
      id: "3",
      title: "Chương 3: Thử thách",
      slug: "chuong-3-thu-thach",
      thumbnail: "/images/common/comic_chapter.png",
      unitPrice: 0,
    },
    {
      id: "4",
      title: "Chương 4: Bí mật",
      slug: "chuong-4-bi-mat",
      thumbnail: "/images/common/comic_chapter.png",
      unitPrice: 50,
    },
    {
      id: "5",
      title: "Chương 5: Khám phá",
      slug: "chuong-5-kham-pha",
      thumbnail: "/images/common/comic_chapter.png",
      unitPrice: 50,

    }
  ],
  audios: [
    {
      id: "1",
      title: "Audio Chương 1",
      slug: "audio-chuong-1",
      unitPrice: 0,
    },
    {
      id: "2",
      title: "Audio Chương 2", 
      slug: "audio-chuong-2",
      unitPrice: 0,
    }
  ]
};

// Tạo thêm dữ liệu cho các truyện khác
export const DEMO_COMIC_DETAILS: Record<string, IComicDetail> = {
  "luc-linh-chau-13-tuoi-kiep-kho-tron": DEMO_COMIC_DETAIL,
  "thien-tai-tieu-thu": {
    ...DEMO_COMIC_DETAIL,
    id: "2",
    title: "Thiên Tài Tiểu Thư",
    slug: "thien-tai-tieu-thu",
    description: "Câu chuyện về một thiên tài nhỏ tuổi với khả năng đặc biệt...",
    category: "Huyền huyễn",
    categories: [{ id: "2", slug: "huyen-huyen", name: "Huyền huyễn" }],
    totalViews: 98000,
    totalOutstandings: 67,
    totalChapters: 32,
    authorName: "Tác giả B",
    author: "Tác giả B",
    chapters: [
      {
        id: "6",
        title: "Chương 1: Thiên tài xuất hiện",
        slug: "chuong-1-thien-tai-xuat-hien",
        thumbnail: "/images/common/comic_chapter.png",
        unitPrice: 0,
      },
      {
        id: "7",
        title: "Chương 2: Khả năng đặc biệt",
        slug: "chuong-2-kha-nang-dac-biet",
        thumbnail: "/images/common/comic_chapter.png",
        unitPrice: 0,
      }
    ]
  },
  "ba-vuong-hoc-vien": {
    ...DEMO_COMIC_DETAIL,
    id: "3",
    title: "Bá Vương Học Viện",
    slug: "ba-vuong-hoc-vien",
    description: "Học viện dành cho những người có khả năng đặc biệt...",
    category: "Học đường",
    categories: [{ id: "3", slug: "hoc-duong", name: "Học đường" }],
    totalViews: 156000,
    totalOutstandings: 112,
    totalChapters: 28,
    authorName: "Tác giả C",
    author: "Tác giả C",
    chapters: [
      {
        id: "8",
        title: "Chương 1: Nhập học",
        slug: "chuong-1-nhap-hoc",
        thumbnail: "/images/common/comic_chapter.png",
        unitPrice: 0,
      }
    ]
  }
};
