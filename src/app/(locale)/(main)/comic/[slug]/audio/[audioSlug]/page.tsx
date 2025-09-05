import React from "react";
import NotFound from "@/app/not-found";
import AudioDetailsPage from "./audio-details-page";

interface IProps {
  params: Promise<{ audioSlug: string }>;
}

export async function generateMetadata({ params }: IProps) {
  const { audioSlug } = await params;
  return {
    title: `Nội dung audio - ${audioSlug}`,
    description: `Thông tin chi tiết về ${audioSlug}`,
    keywords: `Truyện tranh, audio, ${audioSlug}`,
  };
}

const AudioDetails = async ({ params }: IProps) => {
  const { audioSlug } = await params;
  if (!audioSlug) {
    return <NotFound />;
  }

  return <AudioDetailsPage slug={audioSlug} />;
};

export default AudioDetails;
