"use client";
import React from "react";
import TopCategoryItem from "./top-category-item";
import { SectionWrapper } from "@/components/common/utils/common";
import ButtonBase from "@/components/common/utils/button/button-base";
import Link from "next/link";

const fakeCategories = [
  {
    name: "Hành động",
    image:
      "https://truyentranh3q.com/_next/image?url=https%3A%2F%2Fs1.truyentranh3q.com%2Fimages%2Fthumbnails%2Fdai-quan-gia-la-ma-hoang.jpg&w=384&q=75",
    count: 120,
  },
  {
    name: "Phiêu lưu",
    image:
      "https://truyentranh3q.com/_next/image?url=https%3A%2F%2Fs1.truyentranh3q.com%2Fimages%2Fthumbnails%2Fkho-do-danh.jpg&w=384&q=75",
    count: 95,
  },
  {
    name: "Hài hước",
    image:
      "https://truyentranh3q.com/_next/image?url=https%3A%2F%2Fs1.truyentranh3q.com%2Fimages%2Fthumbnails%2Fvua-vo-dai.jpg&w=1200&q=75",
    count: 80,
  },
  {
    name: "Ngôn tình",
    image:
      "https://truyentranh3q.com/_next/image?url=https%3A%2F%2Fs1.truyentranh3q.com%2Fimages%2Fthumbnails%2Fkho-do-danh.jpg&w=384&q=75",
    count: 150,
  },
  {
    name: "Kinh dị",
    image:
      "https://truyentranh3q.com/_next/image?url=https%3A%2F%2Fs1.truyentranh3q.com%2Fimages%2Fthumbnails%2Fkho-do-danh.jpg&w=384&q=75",
    count: 60,
  },
  {
    name: "Học đường",
    image:
      "https://truyentranh3q.com/_next/image?url=https%3A%2F%2Fs1.truyentranh3q.com%2Fimages%2Fthumbnails%2Fcua-hang-vo-danh.jpg&w=1200&q=75",
    count: 70,
  },
  {
    name: "Huyền bí",
    image:
      "https://truyentranh3q.com/_next/image?url=https%3A%2F%2Fs1.truyentranh3q.com%2Fimages%2Fthumbnails%2Fta-mot-nguoi-di-duong-at-chu-bai-nhieu-uc-diem-rat-hop-ly.jpg&w=1200&q=75",
    count: 50,
  },
  {
    name: "Siêu nhiên",
    image:
      "https://truyentranh3q.com/_next/image?url=https%3A%2F%2Fs1.truyentranh3q.com%2Fimages%2Fthumbnails%2Fta-mot-nguoi-di-duong-at-chu-bai-nhieu-uc-diem-rat-hop-ly.jpg&w=1200&q=75",
    count: 40,
  },
  {
    name: "Thể thao",
    image:
      "https://truyentranh3q.com/_next/image?url=https%3A%2F%2Fs1.truyentranh3q.com%2Fimages%2Fthumbnails%2Fvua-vo-dai.jpg&w=1200&q=75",
    count: 30,
  },
  {
    name: "Xuyên không",
    image:
      "https://truyentranh3q.com/_next/image?url=https%3A%2F%2Fs1.truyentranh3q.com%2Fimages%2Fthumbnails%2Fkho-do-danh.jpg&w=384&q=75",
    count: 45,
  },
  {
    name: "Cổ đại",
    image:
      "https://truyentranh3q.com/_next/image?url=https%3A%2F%2Fs1.truyentranh3q.com%2Fimages%2Fthumbnails%2Fvua-vo-dai.jpg&w=1200&q=75",
    count: 55,
  },
  {
    name: "Trinh thám",
    image:
      "https://truyentranh3q.com/_next/image?url=https%3A%2F%2Fs1.truyentranh3q.com%2Fimages%2Fthumbnails%2Ftoi-mot-tay-thong-tri-tro-choi.jpg&w=1200&q=75",
    count: 35,
  },
];

const TopCategorySection = () => {
  return (
    <section id="section-top-companies" className="bg-white">
      <SectionWrapper>
        <div className="shadow-xl rounded-3xl overflow-hidden">
          <div className="bg-primary-dark px-6 py-8 flex justify-between">
            <div className="text-left">
              <h3 className="text-2xl font-semibold text-white mb-1">
                Thể loại truyện hot
              </h3>
              <p className="text-white">
                Những thương hiệu tuyển dụng đã khẳng định được vị thế trên thị
                trường.
              </p>
            </div>
          </div>
          <div className="p-6">
            {/* List company */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {fakeCategories.map((category, index) => (
                <TopCategoryItem key={index} data={category} index={index} />
              ))}
            </div>
            <div className="w-full text-center mt-6 flex justify-center">
              <ButtonBase variants="outline" className="gap-2">
                <Link href="/genres">Xem tất cả thể loại</Link>
              </ButtonBase>
            </div>
            {/* Pagination controls
            {paginatedData && paginatedData.length > 0 && (
              <div className="flex justify-center items-center gap-3 mt-5">
                <button
                  aria-label="Previous button"
                  onClick={() => {
                    setPage(currentPage - 1);
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 rounded-full border border-primary text-primary grid place-items-center transition-colors ${
                    currentPage === 1
                      ? "opacity-30"
                      : "hover:bg-primary hover:text-white"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <p className="text-text-secondary text-base">
                  <b className="text-primary">{currentPage}</b>
                  <span className="mx-1">/</span>
                  <span>{totalPages} trang</span>
                </p>
                <button
                  aria-label="Next button"
                  onClick={() => {
                    setPage(currentPage + 1);
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 rounded-full border border-primary text-primary grid place-items-center transition-colors ${
                    currentPage === totalPages
                      ? "opacity-30"
                      : "hover:bg-primary hover:text-white"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )} */}
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
};

export default TopCategorySection;
