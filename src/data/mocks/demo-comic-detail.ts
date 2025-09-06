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
  isPurchased: false,
  authorId: "1",
  authorName: "Tác giả A",
  author: "Tác giả A",
  authorAvatar: "/images/common/default_avatar.jpg",
  createdAt: "2024-01-15T10:00:00Z",
  chapters: [
    {
      id: "1",
      title: "Chương 1: Khởi đầu",
      slug: "chuong-1-khoi-dau",
      unitPrice: 0,
      isPurchased: true,
      totalViews: 5000,
      createdAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "2", 
      title: "Chương 2: Gặp gỡ",
      slug: "chuong-2-gap-go",
      unitPrice: 0,
      isPurchased: true,
      totalViews: 4800,
      createdAt: "2024-01-16T10:00:00Z",
    },
    {
      id: "3",
      title: "Chương 3: Thử thách",
      slug: "chuong-3-thu-thach",
      unitPrice: 0,
      isPurchased: true,
      totalViews: 4600,
      createdAt: "2024-01-17T10:00:00Z",
    },
    {
      id: "4",
      title: "Chương 4: Bí mật",
      slug: "chuong-4-bi-mat",
      unitPrice: 50,
      isPurchased: false,
      totalViews: 4400,
      createdAt: "2024-01-18T10:00:00Z",
    },
    {
      id: "5",
      title: "Chương 5: Khám phá",
      slug: "chuong-5-kham-pha",
      unitPrice: 50,
      isPurchased: false,
      totalViews: 4200,
      createdAt: "2024-01-19T10:00:00Z",
    }
  ],
  audios: [
    {
      id: "1",
      title: "Audio Chương 1",
      slug: "audio-chuong-1",
      duration: 1800,
      unitPrice: 0,
      isPurchased: true,
      totalViews: 2500,
      createdAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      title: "Audio Chương 2", 
      slug: "audio-chuong-2",
      duration: 1950,
      unitPrice: 0,
      isPurchased: true,
      totalViews: 2300,
      createdAt: "2024-01-16T10:00:00Z",
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
        unitPrice: 0,
        isPurchased: true,
        totalViews: 3500,
        createdAt: "2024-01-10T14:30:00Z",
      },
      {
        id: "7",
        title: "Chương 2: Khả năng đặc biệt",
        slug: "chuong-2-kha-nang-dac-biet",
        unitPrice: 0,
        isPurchased: true,
        totalViews: 3200,
        createdAt: "2024-01-11T14:30:00Z",
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
        unitPrice: 0,
        isPurchased: true,
        totalViews: 6000,
        createdAt: "2024-01-20T09:15:00Z",
      }
    ]
  }
};
