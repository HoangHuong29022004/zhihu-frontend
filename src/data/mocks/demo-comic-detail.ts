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

// Thêm thông tin chi tiết cho các truyện mới
export const DEMO_COMIC_DETAILS: Record<string, IComicDetail> = {
  "luc-linh-chau-13-tuoi-kiep-kho-tron": DEMO_COMIC_DETAIL,
  
  "ba-vuong-hoc-vien": {
    ...DEMO_COMIC_DETAIL,
    id: "2",
    title: "Bá Vương Học Viện",
    slug: "ba-vuong-hoc-vien",
    description: "Học viện dành cho những người có khả năng đặc biệt. Câu chuyện về cuộc sống học đường đầy thú vị và những cuộc phiêu lưu kỳ thú...",
    category: "Học đường",
    categories: [{ id: "2", slug: "hoc-duong", name: "Học đường" }],
    totalViews: 98000,
    totalOutstandings: 67,
    totalChapters: 32,
    authorName: "Tác giả B",
    author: "Tác giả B",
    chapters: [
      {
        id: "6",
        title: "Chương 1: Nhập học",
        slug: "chuong-1-nhap-hoc",
        thumbnail: "/images/common/comic_chapter.png",
        unitPrice: 0,
      },
      {
        id: "7",
        title: "Chương 2: Thử thách đầu tiên",
        slug: "chuong-2-thu-thach-dau-tien",
        thumbnail: "/images/common/comic_chapter.png",
        unitPrice: 0,
      }
    ]
  },
  
  "thien-tai-tieu-thu": {
    ...DEMO_COMIC_DETAIL,
    id: "3",
    title: "Thiên Tài Tiểu Thư",
    slug: "thien-tai-tieu-thu",
    description: "Câu chuyện về một thiên tài nhỏ tuổi với khả năng đặc biệt. Cô gái này sẽ thay đổi thế giới như thế nào?",
    category: "Huyền huyễn",
    categories: [{ id: "3", slug: "huyen-huyen", name: "Huyền huyễn" }],
    totalViews: 156000,
    totalOutstandings: 112,
    totalChapters: 28,
    authorName: "Tác giả C",
    author: "Tác giả C",
    chapters: [
      {
        id: "8",
        title: "Chương 1: Thiên tài xuất hiện",
        slug: "chuong-1-thien-tai-xuat-hien",
        thumbnail: "/images/common/comic_chapter.png",
        unitPrice: 0,
      }
    ]
  },
  
  "ma-vuong-tai-sinh": {
    ...DEMO_COMIC_DETAIL,
    id: "4",
    title: "Ma Vương Tái Sinh",
    slug: "ma-vuong-tai-sinh",
    description: "Ma vương tái sinh với sức mạnh vượt trội. Câu chuyện về sự trả thù và tình yêu trong thế giới huyền huyễn...",
    category: "Huyền huyễn",
    categories: [{ id: "4", slug: "huyen-huyen", name: "Huyền huyễn" }],
    totalViews: 89000,
    totalOutstandings: 45,
    totalChapters: 41,
    authorName: "Tác giả D",
    author: "Tác giả D",
    chapters: [
      {
        id: "9",
        title: "Chương 1: Tái sinh",
        slug: "chuong-1-tai-sinh",
        thumbnail: "/images/common/comic_chapter.png",
        unitPrice: 0,
      }
    ]
  },
  
  "cong-chua-bang-gia": {
    ...DEMO_COMIC_DETAIL,
    id: "5",
    title: "Công Chúa Băng Giá",
    slug: "cong-chua-bang-gia",
    description: "Câu chuyện về công chúa với sức mạnh băng. Một câu chuyện tình yêu lãng mạn và đầy cảm động...",
    category: "Ngôn tình",
    categories: [{ id: "5", slug: "ngon-tinh", name: "Ngôn tình" }],
    totalViews: 203000,
    totalOutstandings: 156,
    totalChapters: 38,
    authorName: "Tác giả E",
    author: "Tác giả E",
    chapters: [
      {
        id: "10",
        title: "Chương 1: Công chúa băng",
        slug: "chuong-1-cong-chua-bang",
        thumbnail: "/images/common/comic_chapter.png",
        unitPrice: 0,
      }
    ]
  },
  
  "thien-long-bat-bo": {
    ...DEMO_COMIC_DETAIL,
    id: "6",
    title: "Thiên Long Bát Bộ",
    slug: "thien-long-bat-bo",
    description: "Võ lâm giang hồ với những cao thủ võ lâm. Câu chuyện về tình bạn, tình yêu và sự trung thành...",
    category: "Võ lâm",
    categories: [{ id: "6", slug: "vo-lam", name: "Võ lâm" }],
    totalViews: 178000,
    totalOutstandings: 98,
    totalChapters: 52,
    authorName: "Tác giả F",
    author: "Tác giả F",
    chapters: [
      {
        id: "11",
        title: "Chương 1: Võ lâm giang hồ",
        slug: "chuong-1-vo-lam-giang-ho",
        thumbnail: "/images/common/comic_chapter.png",
        unitPrice: 0,
      }
    ]
  }
};