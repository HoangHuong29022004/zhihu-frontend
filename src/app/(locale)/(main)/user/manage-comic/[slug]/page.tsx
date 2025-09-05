import React from "react";
import NotFound from "@/app/not-found";
import ComicDetailUserPage from "./comic-detail-user";

interface IProps {
  params: Promise<{ slug: string }>;
}

const ComicDetail = async ({ params }: IProps) => {
  const { slug } = await params;
  if (!slug) {
    return <NotFound />;
  }

  // const data = await fetchDetails(slug);
  return <ComicDetailUserPage comicSlug={slug} />;
};

export default ComicDetail;
