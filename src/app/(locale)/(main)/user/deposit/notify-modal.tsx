/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { memo, useEffect, useState } from "react";
import { ButtonBase } from "@/components/common/utils/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogPortal,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import Link from "next/link";
import Confetti from "react-confetti";
import Image from "next/image";

interface IProps {
  item: boolean;
  setItem: (value: boolean) => void;
  renderHeading: () => React.ReactNode;
  modalTitle?: string;
  imgSrc?: string;
  description?: string;
  isShowAnimation?: boolean;
  renderAction?: () => React.ReactNode;
}

export const NotifyModal = ({
  item,
  setItem,
  modalTitle,
  description,
  renderHeading,
  isShowAnimation = true,
  imgSrc,
  renderAction,
}: IProps) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 300 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <Dialog open={item} onOpenChange={setItem}>
      <DialogPortal>
        {isShowAnimation && (
          <div className="fixed inset-0 z-[51] pointer-events-none">
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={700}
              tweenDuration={5000}
              initialVelocityY={10}
              initialVelocityX={4}
              run={true}
              colors={["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"]}
            />
          </div>
        )}
        <DialogContent className="w-max max-sm:w-[90%]">
          <DialogHeader>
            <DialogTitle>{modalTitle ? modalTitle : "Thông báo"}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col mt-4">
            <Image
              unoptimized
              src={
                imgSrc
                  ? imgSrc
                  : `${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/check_process.svg`
              }
              alt="notify-img"
              width={300}
              height={80}
              className="object-contain object-center rounded-md text-center mx-auto"
            />
            {renderHeading()}
            {description && (
              <p className="text-center text-text-secondary w-full">
                {description}
              </p>
            )}
          </div>
          <DialogFooter className="mt-2 gap-2">
            {renderAction ? (
              renderAction()
            ) : (
              <Link href={"/user/manage-currency"} className="w-full">
                <ButtonBase className="w-full">
                  <div className="flex items-center gap-2">
                    <Eye size={16} /> Lịch sử giao dịch
                  </div>
                </ButtonBase>
              </Link>
            )}
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default memo(NotifyModal);
