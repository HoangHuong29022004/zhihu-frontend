import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ButtonBase from "@/components/common/utils/button/button-base";

export default function HeaderNotifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Open notifications"
        >
          <Bell className="h-5 w-5" />
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center"
          >
            3
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h4 className="font-medium">Notifications</h4>
        </div>
        <ul className="max-h-[300px] overflow-y-auto">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 p-4 hover:bg-slate-50 cursor-pointer"
            >
              <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  New notification {item}
                </p>
                <p className="text-sm ">This is a notification message</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="p-2 border-t">
          <ButtonBase className="w-full justify-center">
            View all notifications
          </ButtonBase>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
