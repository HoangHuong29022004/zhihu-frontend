import {
  // LayoutDashboard,
  BookOpen,
  // List,
  Tag,
  Users,
  // UserCog,
  Bell,
  Settings,
  CheckCheckIcon,
  DollarSignIcon,
  Bitcoin,
  // BanIcon,
} from "lucide-react";

export interface IAdminNavItem {
  title: string;
  path: string;
  label?: {
    variant: "success" | "warning" | "error" | "dark";
    text: string;
  };
  icon: React.ReactNode;
  layout: "DashboardLayout" | "AuthLayout" | "OtherLayout";
  subItems?: IAdminNavItem[];
}

export const ADMIN_NAV_ITEMS: IAdminNavItem[] = [
  // {
  //   title: "Dashboard",
  //   path: "/admin/dashboard",
  //   icon: <LayoutDashboard />,
  //   layout: "DashboardLayout",
  // },
  {
    title: "Truyện đã duyệt",
    path: "/admin/comic",
    icon: <CheckCheckIcon />,
    layout: "DashboardLayout",
  },
  {
    title: "Truyện chờ duyệt",
    path: "/admin/comic/requesting",
    icon: <BookOpen />,
    layout: "DashboardLayout",
  },
  // {
  //   title: "Truyện từ chối",
  //   path: "/admin/comic/rejected",
  //   icon: <BanIcon />,
  //   layout: "DashboardLayout",
  // },
  {
    title: "Thể loại truyện",
    path: "/admin/category",
    label: {
      variant: "success",
      text: "New",
    },
    icon: <Tag />,
    layout: "DashboardLayout",
  },
  {
    title: "Quản lý nạp tiền",
    path: "/admin/transaction",
    label: {
      variant: "success",
      text: "New",
    },
    icon: <DollarSignIcon />,
    layout: "DashboardLayout",
  },
  {
    title: "Quản lý rút tiền",
    path: "/admin/withdraw",
    label: {
      variant: "success",
      text: "New",
    },
    icon: <Bitcoin />,
    layout: "DashboardLayout",
  },
  // {
  //   title: "Nhiệm vụ",
  //   path: "/admin/missions",
  //   label: {
  //     variant: "success",
  //     text: "New",
  //   },
  //   icon: <List />,
  //   layout: "DashboardLayout",
  // },
  {
    title: "Người dùng",
    path: "/admin/user",
    icon: <Users />,
    layout: "DashboardLayout",
  },
  {
    title: "Thông báo",
    path: "/admin/notification",
    label: {
      variant: "success",
      text: "New",
    },
    icon: <Bell />,
    layout: "DashboardLayout",
  },
  // {
  //   title: "Vai trò",
  //   path: "/admin/role",
  //   icon: <UserCog />,
  //   layout: "DashboardLayout",
  // },
  {
    title: "Cài đặt",
    path: "/admin/setting",
    icon: <Settings />,
    layout: "DashboardLayout",
  },
];
