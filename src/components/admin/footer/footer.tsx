import { APP_INFO } from "@/data/app/app-info";
import React from "react";

export default function AdminFooter() {
  return (
    <footer className="w-full text-center rounded-xl px-8 py-6">
      <p className="text-text-secondary dark:text-white">
        &copy; {new Date().getFullYear()}
        <span className="text-primary font-semibold ml-1">
          {APP_INFO.appName}
        </span>
        . All rights reserved.
      </p>
    </footer>
  );
}
