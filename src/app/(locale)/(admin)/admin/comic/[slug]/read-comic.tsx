import ButtonBase from "@/components/common/utils/button/button-base";
import { PlayIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface IProps {
  comicSlug: string;
  chapterSlug: string;
}
const ReadComic = ({ comicSlug, chapterSlug }: IProps) => {
  return (
    <Link href={`/comic/${comicSlug}/${chapterSlug}`}>
      <ButtonBase icon={<PlayIcon size={20} />}>Đọc ngay</ButtonBase>
    </Link>
  );
};

export default ReadComic;
