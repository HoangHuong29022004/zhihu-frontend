import Link from "next/link";
import { Rocket } from "lucide-react";
import { APP_INFO } from "@/data/app/app-info";
import { cn } from "@/lib/utils";

interface IProps {
  isExpanded: boolean;
}

export default function AdminNavbarHeader({ isExpanded }: IProps) {
  return (
    <div
      className={cn(
        "flex items-center mb-6",
        isExpanded ? "px-6" : "px-2 justify-center"
      )}
    >
      <Link
        href="/"
        className="flex items-center gap-2"
        aria-label="Go to Home page"
      >
        <Rocket className="h-6 w-6 text-primary" />
        {isExpanded && (
          <h1 className="text-2xl font-bold text-foreground">
            {APP_INFO.appName}
          </h1>
        )}
      </Link>
    </div>
  );
}
