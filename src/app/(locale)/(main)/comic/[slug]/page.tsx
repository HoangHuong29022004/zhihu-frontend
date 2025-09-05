import React from "react";
import ComicDetailPage from "./comic-detail-page";
import NotFound from "@/app/not-found";

interface IProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: IProps) {
  const { slug } = await params;

  return {
    title: `Chi tiết truyện trang tại Thanh Nhac Chau`,
    description: `Thông tin chi tiết về truyện tranh ${slug}`,
    openGraph: {
      title: `Chi tiết truyện trang tại Thanh Nhac Chau`,
      description: `Thông tin chi tiết về truyện tranh ${slug}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/default_image.png`,
          width: 1200,
          height: 630,
          alt: `Hình ảnh truyện ${slug}`,
        },
      ],
      type: "website",
    },
  };
}

const ComicDetail = async ({ params }: IProps) => {
  const { slug } = await params;
  if (!slug) {
    return <NotFound />;
  }

  return <ComicDetailPage comicSlug={slug} />;
};

export default ComicDetail;
