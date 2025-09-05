import React from "react";
import ProfileBox from "./update-profile/profile-box";
import { Card, CardContent } from "@/components/ui/card";
import GetUserProfile from "./check-user";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Profile Info (3/12) */}
          <div className="col-span-12 lg:col-span-3">
            <ProfileBox />
            <GetUserProfile />
          </div>

          {/* Right Column - Comics Tabs (9/12) */}
          <div className="col-span-12 lg:col-span-9 ">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl">
              <CardContent className="max-md:p-6 md:p-10">
                {children}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
