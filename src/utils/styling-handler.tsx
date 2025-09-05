import {
  ARR_MISSION_STATUSES,
  CURRENCY_TYPES,
  MISSION_STATUS,
} from "@/data/constants/global";
import { cn } from "@/lib/utils";
import {
  XCircle,
  CheckCircle,
  CircleCheck,
  PauseCircle,
  Loader,
} from "lucide-react";
import Image from "next/image";

export const renderMissionStatus = (status: string) => {
  let styles = "";
  let value = "";
  let icon = null;
  switch (status) {
    case MISSION_STATUS.PENDING:
      styles = "bg-yellow-100 text-yellow-800";
      value = ARR_MISSION_STATUSES[0].label;
      icon = <Loader className="w-4 h-4 mr-1" />;
      break;
    case MISSION_STATUS.COMPLETED:
      styles = "bg-green-100 text-green-800";
      value = ARR_MISSION_STATUSES[1].label;
      icon = <CircleCheck className="w-4 h-4 mr-1" />;
      break;
    default:
      styles = "bg-slate-100 text-white";
  }
  return (
    <div
      className={cn(
        "px-2 py-1 mx-auto rounded-full text-xs font-medium text-center w-max flex items-center gap-1",
        styles
      )}
    >
      {icon}
      {value}
    </div>
  );
};

type TPaymentStatus =
  | "PENDING"
  | "PAID"
  | "RESQUESTING"
  | "APPROVED"
  | "REJECTED";

const PAYMENT_CONFIG: Record<TPaymentStatus, StatusConfig> = {
  PENDING: {
    styles: "bg-yellow-100 text-yellow-800",
    label: "Đang xử lý",
    icon: <Loader className="w-4 h-4 mr-1" />,
  },
  RESQUESTING: {
    styles: "bg-yellow-100 text-yellow-800",
    label: "Đang xử lý",
    icon: <Loader className="w-4 h-4 mr-1" />,
  },
  APPROVED: {
    styles: "bg-primary text-white",
    label: "Hoàn thành",
    icon: <CircleCheck className="w-4 h-4 mr-1" />,
  },
  PAID: {
    styles: "bg-primary text-white",
    label: "Hoàn thành",
    icon: <CircleCheck className="w-4 h-4 mr-1" />,
  },
  REJECTED: {
    styles: "bg-red-100 text-red-800",
    label: "Đã từ chối",
    icon: <XCircle className="w-4 h-4 mr-1" />,
  },
};

/**
 * Renders a comic status badge with appropriate styling and icon
 * @param status - The status of the comic
 * @param className - Optional additional CSS classes
 * @returns A styled status badge component with icon
 */
export const renderPaymentStatus = (status: string, className?: string) => {
  const config = PAYMENT_CONFIG[status as TPaymentStatus] || {
    styles: "bg-slate-100 text-slate-800",
    label: status,
    icon: null,
  };

  return (
    <div
      className={cn(
        "px-2 py-1 mx-auto rounded-full text-xs font-medium text-center w-max flex items-center gap-1",
        config.styles,
        className
      )}
    >
      {config.icon}
      {config.label}
    </div>
  );
};

type ComicStatus =
  | "REQUESTING"
  | "REJECTED"
  | "APPROVED"
  | "COMPLETED"
  | "PENDING";

interface StatusConfig {
  styles: string;
  label: string;
  icon: React.ReactNode;
}

const STATUS_CONFIG: Record<ComicStatus, StatusConfig> = {
  REQUESTING: {
    styles: "bg-yellow-100 text-yellow-800",
    label: "Chờ duyệt",
    icon: <Loader className="w-4 h-4 mr-1" />,
  },
  REJECTED: {
    styles: "bg-red-100 text-red-800",
    label: "Đã từ chối",
    icon: <XCircle className="w-4 h-4 mr-1" />,
  },
  APPROVED: {
    styles: "bg-green-100 text-green-800",
    label: "Đã duyệt",
    icon: <CheckCircle className="w-4 h-4 mr-1" />,
  },
  COMPLETED: {
    styles: "bg-primary text-white",
    label: "Hoàn thành",
    icon: <CircleCheck className="w-4 h-4 mr-1" />,
  },
  PENDING: {
    styles: "bg-slate-100 text-text-main",
    label: "Tạm ngưng",
    icon: <PauseCircle className="w-4 h-4 mr-1" />,
  },
};

/**
 * Renders a comic status badge with appropriate styling and icon
 * @param status - The status of the comic
 * @param className - Optional additional CSS classes
 * @returns A styled status badge component with icon
 */
export const renderComicStatus = (status: string, className?: string) => {
  const config = STATUS_CONFIG[status as ComicStatus] || {
    styles: "bg-slate-100 text-slate-800",
    label: status,
    icon: null,
  };

  return (
    <div
      className={cn(
        "px-2 py-1 mx-auto rounded-full text-xs font-medium text-center w-max flex items-center gap-1",
        config.styles,
        className
      )}
    >
      {config.icon}
      {config.label}
    </div>
  );
};

export const renderCurrencyLabel = (currency: string) => {
  if (!currency) return "Not found";
  const result = CURRENCY_TYPES.find((item) => item.value === currency);
  return result?.label;
};

export const renderCurrencyIcon = (currency: string) => {
  if (!currency) return null;
  if (currency === "STRAWBERRY") {
    return (
      <Image
        unoptimized
        src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/strawberry.png`}
        alt="strawberry-icon"
        width={16}
        height={16}
        className="object-contain object-center"
      />
    );
  } else if (currency === "FLOWER") {
    return (
      <Image
        unoptimized
        src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/flower.png`}
        alt="flower-icon"
        width={16}
        height={16}
        className="object-contain object-center"
      />
    );
  } else if (currency === "CREAM") {
    return (
      <Image
        unoptimized
        src={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/cream.png`}
        alt="cream-icon"
        width={16}
        height={16}
        className="object-contain object-center"
      />
    );
  }
  return null;
};
