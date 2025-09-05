import {
  Heart,
  CircleCheckBig,
  KeyRound,
  Search,
  UserRound,
  CircleDollarSign,
  BookCheck,
  HeartCrack,
  ListCollapse,
  History,
  Bitcoin,
  HomeIcon,
  UsersRound,
  HistoryIcon,
  KeyIcon,
  ScrollText,
  SwitchCamera,
  Bell,
  SearchIcon,
  Tags,
} from "lucide-react";

const ICON_SIZE = 18;
export interface INavItem {
  label: string;
  url: string;
  subItems?: INavItem[];
  icon?: React.ReactNode;
}

export const NAV_ITEMS: INavItem[] = [
  {
    label: "Trang chủ",
    url: "/",
    subItems: [
      {
        icon: <Heart size={ICON_SIZE} />,
        label: "Truyện mới",
        url: "#last-completed-comic-section",
      },
      {
        icon: <Search size={ICON_SIZE} />,
        label: "Truyện hot",
        url: "#section-hot-comics",
      },
      {
        icon: <CircleCheckBig size={ICON_SIZE} />,
        label: "Truyện đề cử",
        url: "#section-top-outstanding",
      },
    ],
  },
  {
    icon: <Search size={ICON_SIZE} />,
    label: "Tìm truyện",
    url: "/comic/search",
    subItems: [
      {
        icon: <SearchIcon size={ICON_SIZE} />,
        label: "Tìm kiếm truyện",
        url: "/comic/search",
      },
      {
        icon: <Tags size={ICON_SIZE} />,
        label: "Tìm theo thể loại",
        url: "/comic/search",
      },
    ],
  },
  {
    label: "Khám phá",
    url: "/notification",
    subItems: [
      // {
      //   icon: <Info size={ICON_SIZE} />,
      //   label: "Giới thiệu",
      //   url: "/introduce",
      // },
      // {
      //   icon: <Phone size={ICON_SIZE} />,
      //   label: "Liên hệ",
      //   url: "/contact",
      // },
      {
        icon: <Bell size={ICON_SIZE} />,
        label: "Thông báo",
        url: "/notification",
      },
      // {
      //   icon: <List size={ICON_SIZE} />,
      //   label: "Nội quy đăng truyện",
      //   url: "/app-policy",
      // },
      {
        icon: <ScrollText size={ICON_SIZE} />,
        label: "Điều khoản sử dụng",
        url: "/term-condition",
      },
    ],
  },
];

export const USER_NAV_ITEMS: INavItem[] = [
  {
    icon: <UserRound size={ICON_SIZE} />,
    label: "Thông tin tài khoản",
    url: "/user/update-profile",
  },
  {
    icon: <BookCheck size={ICON_SIZE} />,
    label: "Quản lý truyện",
    url: "/user/manage-comic",
  },
  {
    icon: <UsersRound size={ICON_SIZE} />,
    label: "Follow",
    url: "/user/manage-follow",
  },
  {
    icon: <HeartCrack size={ICON_SIZE} />,
    label: "Truyện yêu thích",
    url: "/user/comic-favorite",
  },
  {
    icon: <History size={ICON_SIZE} />,
    label: "Truyện đã mua",
    url: "/user/purchased-comic",
  },
  {
    icon: <ListCollapse size={ICON_SIZE} />,
    label: "Nhiệm vụ",
    url: "/user/manage-mission",
  },
  {
    icon: <CircleDollarSign size={ICON_SIZE} />,
    label: "Gói nạp",
    url: "/user/deposit",
  },
  {
    icon: <SwitchCamera size={ICON_SIZE} />,
    label: "Quản lý tiền tệ",
    url: "/user/manage-currency",
  },
  {
    icon: <Bitcoin size={ICON_SIZE} />,
    label: "Rút tiền",
    url: "/user/withdraw",
  },
  {
    icon: <HistoryIcon size={ICON_SIZE} />,
    label: "Lịch sử rút tiền",
    url: "/user/manage-withdraw",
  },

  {
    icon: <KeyIcon size={ICON_SIZE} />,
    label: "Đổi mật khẩu",
    url: "/change-password",
  },
  // {
  //   icon: <KeyRound size={ICON_SIZE} />,
  //   label: "Đổi mật khẩu",
  //   url: "/change-password",
  // },
];

export const ADMIN_NAV_ITEMS: INavItem[] = [
  {
    icon: <HomeIcon size={ICON_SIZE} />,
    label: "Trang chủ",
    url: "/",
  },
  {
    icon: <UserRound size={ICON_SIZE} />,
    label: "Thông tin tài khoản",
    url: "/user/update-profile",
  },
  {
    icon: <KeyRound size={ICON_SIZE} />,
    label: "Đổi mật khẩu",
    url: "/change-password",
  },
];
