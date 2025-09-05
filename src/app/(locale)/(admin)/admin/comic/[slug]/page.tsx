import React from "react";
import { IApiResponse } from "@/types/global";
import { getComicDetailBySlug } from "@/services/comic-service";
import { isSuccessResponse } from "@/utils/api-handler";
import { IComicDetail } from "@/types/comic.type";
import NotFound from "@/app/not-found";
import ComicDetailAdminPage from "./comic-detail-admin";

interface IProps {
  params: Promise<{ slug: string }>;
}

async function fetchDetails(slug: string) {
  try {
    const res: IApiResponse<IComicDetail> = await getComicDetailBySlug(
      slug,
      ""
    );
    if (res && isSuccessResponse(res?.statusCode, res?.success)) {
      return res.data;
    }
  } catch (error) {
    console.error("Error when fetching comic details: ", error);
  }
}

const ComicDetail = async ({ params }: IProps) => {
  const { slug } = await params;
  if (!slug) {
    return <NotFound />;
  }

  const data = await fetchDetails(slug);
  return <ComicDetailAdminPage data={data as IComicDetail} comicSlug={slug} />;
};

export default ComicDetail;
