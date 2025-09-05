import { Footer } from "@/components/client/footer";
import { HeaderDesktop } from "@/components/client/header/desktop";
import { ScrollToTop } from "@/components/common/utils/common";
import AppSupportGroup from "@/components/common/utils/common/messenger-link";
import { Toaster } from "@/components/ui/toaster";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderDesktop />
      <main className="mt-20">{children}</main>
      <Toaster />
      <AppSupportGroup />
      <ScrollToTop />
      <Footer />
    </>
  );
};
export default MainLayout;
