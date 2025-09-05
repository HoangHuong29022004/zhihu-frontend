import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function AdminNavbarToggle({ isExpanded, onToggle }: IProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onToggle}
      className={cn(
        "absolute bottom-4 border rounded-full hover:bg-primary hover:text-white",
        isExpanded ? "left-[266px]" : "max-sm:left-3 sm:left-14"
      )}
      aria-label="Toggle menu"
    >
      {isExpanded ? (
        <ChevronLeft className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </Button>
  );
}
