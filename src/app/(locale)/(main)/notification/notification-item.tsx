import React from "react";
import { INotification } from "@/types/notofication.type";
import { Card, CardContent } from "@/components/ui/card";
import ImageBase from "@/components/common/image-base/image-base";
import { renderTimeCreatedAt } from "@/utils/time-handler";
import { Bell, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  notification: INotification;
  onClick?: (notification: INotification) => void;
  className?: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClick,
  className,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(notification);
    }
  };

  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all rounded-xl duration-300 hover:shadow-lg hover:shadow-primary/20 border-primary/20 hover:border-primary/40 bg-white/50 backdrop-blur-sm",
        "hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            <div className="relative">
              <ImageBase
                src={notification.thumbnail}
                alt={notification.title}
                width={80}
                height={80}
                fallbackSrc={`${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/default_image.png`}
                className="w-20 h-20 object-cover rounded-xl border-2 border-primary/20 group-hover:border-primary/40 transition-colors"
              />
              <div className="absolute -top-1 -right-1 bg-primary text-white rounded-full p-1">
                <Bell size={12} />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="font-semibold text-text-secondary text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {notification.title || "Thông báo mới"}
            </h3>

            {/* Author info */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <User size={14} className="text-primary" />
                <span className="font-medium">
                  {notification.accountName || "Hệ thống"}
                </span>
              </div>
            </div>

            {/* Time */}

            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock size={12} className="text-primary/60" />
              <span>{renderTimeCreatedAt(notification.createdAt)}</span>
            </div>
            <div></div>
          </div>

          {/* Hover indicator */}
          <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationItem;
