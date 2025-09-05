"use client";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center space-x-1 text-sm">
      <Link
        href="/admin/comic"
        className="flex items-center text-muted-foreground hover:text-foreground"
      >
        <Home className="h-4 w-4" />
      </Link>
      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;

        return (
          <div key={path} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link
              href={path}
              className={cn(
                "ml-1 text-sm font-medium",
                isLast
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
