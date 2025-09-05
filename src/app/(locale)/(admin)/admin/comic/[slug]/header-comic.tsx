import { cn } from "@/lib/utils";
import { IComicDetail } from "@/types/comic.type";
import { renderTimeCreatedAt } from "@/utils/time-handler";
import {
  CheckCircle,
  Clock9,
  Eye,
  FilePen,
  Headphones,
  InfoIcon,
  List,
  Star,
  Tag,
  User,
  UserCheck,
} from "lucide-react";
import React from "react";
import AddComicToFavorite from "./add-to-favorite";
import OutStandingComic from "./outstanding-comic";
import ImageBase from "@/components/common/image-base/image-base";
import AddToFollow from "./add-to-follow";
import ComicDescription from "./comic-description";
import ReadComic from "./read-comic";
import { renderComicStatus } from "@/utils/styling-handler";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SALARY_TYPE_OPTIONS } from "@/data/constants/global";
import Link from "next/link";

interface IProps {
  data: IComicDetail;
  className?: string;
  renderAction?: React.ReactNode;
  hot?: number;
  outstanding?: number;
  isUserView?: boolean;
  isAdminPage?: boolean;
  isLogin?: boolean;
}

const HeaderComicDetails = ({
  data,
  className,
  renderAction,
  isUserView = false,
  isLogin = true,
}: IProps) => {
  return (
    <section
      className={cn(
        "bg-gradient-to-r from-white to-[#FDF2F8] shadow-xl p-6 lg:rounded-tr-[64px] max-lg:rounded-xl mx-auto mt-6 w-full",
        className
      )}
    >
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-full md:w-1/4 text-center">
          <div className="h-[300px] w-full ">
            <ImageBase
              width={180}
              height={274}
              src={data.thumbnail}
              alt={data?.title}
              fallbackSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/default_image.png`}
              className="w-fit h-full mx-auto text-center shadow-xl object-contain object-center transition-transform duration-300 ease-in-out hover:scale-105 border-2 border-primary rounded-tr-[42px]"
            />
          </div>
          <div className="mt-4 flex gap-2 w-full">
            {renderAction ? (
              renderAction
            ) : isUserView && isLogin ? (
              <>
                <AddComicToFavorite comicId={data?.id} />
                <AddToFollow authorId={data.authorId} />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="w-full md:w-2/3 text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-4">
            {data?.title}
          </h1>

          <div className="flex gap-1 flex-wrap justify-start mb-2">
            {data?.categories.map((item, index) => (
              <span
                key={index}
                className="text-xs font-semibold bg-primary text-white px-4 py-1 rounded-full flex justify-center items-center gap-1 shadow w-fit"
              >
                {item.name}
              </span>
            ))}
          </div>
          <ComicDescription description={data?.description} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="text-gray-500 w-5 h-5" />
              <span>
                Tác giả:{" "}
                <span className="text-primary font-medium">{data?.author}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="text-gray-500 w-5 h-5" />
              <span>
                Người đăng:{" "}
                <span className="text-primary font-medium">
                  {data?.authorName}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Eye className="text-gray-500 w-5 h-5" />
              <span>
                Lượt xem:{" "}
                <span className="text-primary font-medium">
                  {data?.totalViews?.toLocaleString()}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock9 className="text-gray-500 w-5 h-5" />
              <span>
                Thời gian:{" "}
                <span className="text-primary font-medium">
                  {renderTimeCreatedAt(data?.createdAt)}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-gray-500 w-5 h-5" />
              <div className="flex gap-1">
                <span>Đề cử: </span>
                <span className="text-primary font-medium">
                  {data?.totalOutstandings?.toLocaleString()}
                </span>
                <Image
                  unoptimized
                  src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/cream.png`}
                  alt="strawberry-icon"
                  width={14}
                  height={14}
                  className="object-contain object-center ml-1"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-gray-500 w-5 h-5" />
              <div className="flex items-center gap-2">
                Trạng thái: {renderComicStatus(data.status)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <List className="text-gray-500 w-5 h-5" />
              <span>
                Chương:{" "}
                <span className="text-primary font-medium">
                  {data?.totalChapters}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="text-gray-500 w-5 h-5" />
              <span>
                Audio:{" "}
                <span className="text-primary font-medium">
                  {data?.totalAudios}
                </span>
              </span>
            </div>
            {!isUserView && (
              <>
                <div className="flex items-center gap-2">
                  <Tag className="text-gray-500 w-5 h-5" />
                  <div className="flex items-center">
                    Loại truyện:
                    <span className="text-primary font-medium ml-2">
                      {data?.salaryType === "ZHIHU"
                        ? "Zhihu"
                        : data?.salaryType === "EXCLUSIVE"
                        ? "Độc quyền"
                        : data?.salaryType === "NON_EXCLUSIVE"
                        ? "Không độc quyền"
                        : "_"}
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="ml-2 mt-0.5">
                          <InfoIcon size={16} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="flex justify-between mb-1">
                            <p>Chế độ chia lương</p>
                            <Link
                              href={"/term-condition"}
                              className="text-primary underline font-semibold text-xs"
                            >
                              Chi tiết
                            </Link>
                          </div>
                          {SALARY_TYPE_OPTIONS.map((item) => (
                            <li className="text-xs italic" key={item.value}>
                              {item.label}
                            </li>
                          ))}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            {renderAction ? (
              renderAction
            ) : isUserView && isLogin ? (
              <>
                <ReadComic
                  comicSlug={data.slug}
                  chapterSlug={data?.chapters[0]?.slug}
                />
                <OutStandingComic comicId={data?.id} />
              </>
            ) : (
              ""
            )}
            {data.status === "REJECTED" && (
              <div className="flex items-center gap-2">
                <FilePen className="text-gray-500 w-5 h-5" />
                <div className="flex items-center">
                  <span className="min-w-[40px] text-gray-500 w-5 h-5">
                    Lý do:
                  </span>
                  <span className="text-primary font-medium ml-2 break-words w-full">
                    {data?.note}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderComicDetails;
