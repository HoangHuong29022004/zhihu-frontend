import React from "react";

import { AdminFooter } from "@/components/admin/footer";
import { AdminHeader } from "@/components/admin/header";
import { AdminNavbar } from "@/components/admin/navbar";
import NextTopLoader from "nextjs-toploader";
import GetUserProfile from "../(main)/user/check-user";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <NextTopLoader
        speed={800}
        showSpinner={false}
        height={2}
        zIndex={5000}
        color="#F472B6"
      />
      <AdminNavbar />
      <div className="flex-1 h-screen overflow-y-auto">
        <AdminHeader />
        <GetUserProfile />
        <main className="w-full mt-16 max-sm:p-2.5 sm:p-6 bg-slate-100 min-h-[80vh]">
          {children}
        </main>
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
