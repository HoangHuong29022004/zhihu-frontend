"use client";

import DataTableComponent from "@/components/common/data-table/data-table";
import TableCell from "@/components/common/data-table/data-table-cell";
import ImageBase from "@/components/common/image-base/image-base";
import ButtonBase from "@/components/common/utils/button/button-base";
import {
  DEPOSIT_OPTIONS,
  IDepositOption,
} from "@/data/mocks/deposit-options.mock";
import { formatToVND } from "@/utils/common";
import { LandmarkIcon, ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import ConfirmModal from "./confirm-modal";
import Image from "next/image";

const DepositOptionsTable = () => {
  const [amount, setAmount] = useState<number>(0);

  const renderActions = (row: IDepositOption) => {
    return (
      <ButtonBase size="sm" onClick={() => setAmount(row.amount)}>
        <div className="flex gap-1 items-center flex-nowrap whitespace-nowrap">
          <ShoppingCart size={16} />
          Nạp ngay
        </div>
      </ButtonBase>
    );
  };

  return (
    <>
      <ConfirmModal item={amount} setItem={setAmount} />
      <DataTableComponent
        headers={["Số tiền", "Số dâu", "Số kem (tặng kèm)", "Hình thức"]}
        data={DEPOSIT_OPTIONS}
        isLoading={false}
        renderActions={renderActions}
        renderCells={(row: IDepositOption) => (
          <>
            <TableCell className="mx-auto text-center font-semibold max-w-48 text-primary whitespace-nowrap">
              {formatToVND(row.amount) || "_"}
            </TableCell>
            <TableCell className="mx-auto text-center font-semibold">
              <div className="flex justify-center">
                + {row.strawberry}
                <Image
                  unoptimized
                  src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/strawberry.png`}
                  alt="strawberry-icon"
                  width={14}
                  height={14}
                  className="object-contain object-center ml-2"
                />
              </div>
            </TableCell>
            <TableCell className="mx-auto text-center font-semibold">
              <div className="flex justify-center">
                + {row.cream}
                <Image
                  unoptimized
                  src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/cream.png`}
                  alt="strawberry-icon"
                  width={16}
                  height={16}
                  className="object-contain object-center ml-2"
                />
              </div>
            </TableCell>
            {/* <TableCell className="w-[200px] truncate">
              {row.description || "_"}
            </TableCell> */}
            <TableCell className="mx-auto text-center">
              <div className="px-2 py-1 border rounded-lg bg-green-100 text-green-800 flex gap-1 items-center flex-nowrap whitespace-nowrap mb-2">
                <LandmarkIcon size={16} />
                chuyển khoản
              </div>
              <div className="px-2 py-1 border rounded-lg">
                <ImageBase
                  src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/sepay-logo.png`}
                  alt="sePay-logo"
                  width={60}
                  height={60}
                  className="object-cover object-center rounded-md text-center mx-auto"
                />
              </div>
            </TableCell>
          </>
        )}
      />
    </>
  );
};

export default DepositOptionsTable;
