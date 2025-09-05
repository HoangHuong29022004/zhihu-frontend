/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { SectionWrapper } from "@/components/common/utils/common";
import { IChapterComicDetail, IComicDetail } from "@/types/comic.type";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderComicDetails from "./header-comic";
import TableCell from "@/components/common/data-table/data-table-cell";
import ImageBase from "@/components/common/image-base/image-base";
import DataTableComponent from "@/components/common/data-table/data-table";
import { CircleDollarSign, CirclePlus } from "lucide-react";
import ButtonBase from "@/components/common/utils/button/button-base";
import Link from "next/link";
import SearchBase from "@/components/common/search-base/search-base";
import DeleteChapter from "./delete-chapter";
import QuantityBox from "@/components/common/total-price/total-price";
import useMediaQuery from "@/hooks/use-screen-size";

interface IProps {
  data: IComicDetail;
  comicSlug: string;
}

const getSortedChapter = (data: IComicDetail) => {
  // Sort chapters by extracting the first number from title
  const sortedChapters = [...data.chapters].sort((a, b) => {
    const getChapterNumber = (title: string) => {
      const match = title.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    };
    return getChapterNumber(a.title) - getChapterNumber(b.title);
  });
  return sortedChapters;
};

const ComicDetailAdminPage = ({ data, comicSlug }: IProps) => {
  const router = useRouter();
  const [deletedItem, setDeletedItem] = useState<any>(null);
  const [chapters, setChapters] = useState<IChapterComicDetail[]>(
    getSortedChapter(data) ?? []
  );
  const { isMobile } = useMediaQuery();

  const handleSearch = (value: string) => {
    if (value) {
      setChapters(
        data.chapters.filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  return (
    <SectionWrapper className="mt-0 max-sm:p-0">
      {/* Header Section */}
      <HeaderComicDetails data={data} className="max-sm:mt-0" />

      {/* Chapters Section */}
      <section className="flex flex-col gap-4 mt-6">
        {/* Page Heading */}
        <div className="flex justify-between flex-wrap gap-4 bg-white px-4 py-6 rounded-xl">
          <div className="flex max-sm:flex-wrap gap-2 items-end">
            <SearchBase
              placeholder="Tên chương..."
              onGetValue={handleSearch}
              variants={{
                wrapperClassName: "max-sm:w-full",
                inputClassName: "max-sm:min-w-[130px]",
              }}
            />
            <QuantityBox quantity={data?.chapters?.length || 0} />
          </div>
          <div className="flex gap-2">
            <Link
              href={`/admin/add-chapter?comic=${data.id}&title=${data.title}&slug=${data.slug}&lastChapter=${data.chapters.length}`}
            >
              <ButtonBase size={isMobile ? "md" : "lg"} icon={<CirclePlus />}>
                Đăng chương
              </ButtonBase>
            </Link>
            <DeleteChapter
              item={deletedItem}
              setItem={setDeletedItem}
              comicSlug={comicSlug}
            />
          </div>
        </div>

        {/* Data table */}
        <DataTableComponent
          headers={["Tên chương", "Ảnh bìa", "Giá", "Chương VIP"]}
          data={chapters}
          isLoading={!data}
          onDelete={(item, options) => {
            setDeletedItem({
              id: item,
              options,
            });
          }}
          onUpdate={(item) =>
            router.push(
              `/admin/update-chapter?chapter=${item}&comicSlug=${data.slug}`
            )
          }
          renderCells={(row: IChapterComicDetail) => (
            <>
              <TableCell
                className="text-text-secondary font-medium max-w-24 cursor-pointer hover:text-primary transition-all duration-300"
                onClick={() => {
                  router.push(`/admin/comic/${row.slug}`);
                }}
              >
                {row.title || "_"}
              </TableCell>
              <TableCell
                className="text-center cursor-pointer"
                onClick={() => {
                  router.push(`/admin/comic/${row.slug}`);
                }}
              >
                <ImageBase
                  src={row.thumbnail}
                  alt="thumbnail-image"
                  width={60}
                  height={60}
                  fallbackSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/default_image.png`}
                  className="object-cover object-center rounded-md w-20 h-24 text-center mx-auto"
                />
              </TableCell>
              <TableCell className="mx-auto text-center">
                <p className="font-bold text-text-secondary">
                  {row.unitPrice ?? "_"}
                </p>
              </TableCell>
              <TableCell className="mx-auto text-center">
                {row.unitPrice > 0 ? (
                  <p className="text-sm mx-auto text-primary bg-primary-light px-4 py-1 rounded-full flex justify-center items-center gap-1 shadow w-fit">
                    <CircleDollarSign size={16} />
                    VIP
                  </p>
                ) : (
                  <p className="text-sm mx-auto bg-green-100 text-green-800 px-4 py-1 rounded-full flex justify-center items-center gap-1 shadow w-fit">
                    Miễn phí
                  </p>
                )}
              </TableCell>
            </>
          )}
        />
      </section>
    </SectionWrapper>
  );
};

export default ComicDetailAdminPage;
