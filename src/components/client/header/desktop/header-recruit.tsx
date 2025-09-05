import React from "react";
import Link from "next/link";
import { ChevronsRight, PenIcon } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";

const HeaderRecruit = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="max-md:hidden md:block text-sm">
      <p className="text-text-secondary">
        {user?.role === "Admin" ? "Chào mừng admin" : "Bạn là tác giả?"}
      </p>
      {user?.role === "Admin" ? (
        <Link href={`/admin/comic`}>
          <p className="flex items-center font-semibold hover:text-primary gap-1">
            <span>Đến trang quản trị?</span>
            <ChevronsRight size={18} className="mt-1" />
          </p>
        </Link>
      ) : (
        <Link href={`/user/manage-comic/add-new`}>
          <p className="flex items-center font-semibold hover:text-primary gap-1">
            <PenIcon size={12} className="mt-1" />
            <span>Đăng truyện ngay</span>
            <ChevronsRight size={18} className="mt-1" />
          </p>
        </Link>
      )}
    </div>
  );
};

export default HeaderRecruit;
