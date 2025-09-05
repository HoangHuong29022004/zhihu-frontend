// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Danh sách các route yêu cầu đăng nhập
const privateRoutes = ["/profile", "/comic-history"];

// Danh sách các route không cho phép truy cập nếu đã đăng nhập
const unAuthRoutes = ["/login", "/register", "/verify"];

export function middleware(request: NextRequest) {
  // Lấy đường dẫn hiện tại
  const currentPath = request.nextUrl.pathname;

  // Kiểm tra trạng thái đăng nhập từ cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isLoggedIn = Boolean(accessToken && refreshToken);

  // Kiểm tra xem đường dẫn hiện tại có thuộc privateRoutes không
  const isPrivateRoute = privateRoutes.some(
    (route) => currentPath === route || currentPath.startsWith(`${route}/`)
  );

  // Tạo base URL an toàn
  const baseUrl = request.nextUrl.origin;

  // Nếu chưa đăng nhập và cố gắng truy cập privateRoutes
  if (!isLoggedIn && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", baseUrl));
  }

  // Nếu đã đăng nhập và cố gắng truy cập unAuthRoutes
  if (isLoggedIn && unAuthRoutes.includes(currentPath)) {
    return NextResponse.redirect(new URL("/", baseUrl));
  }

  return NextResponse.next();
}

// Cấu hình middleware để áp dụng cho các route cụ thể
export const config = {
  matcher: [
    "/admin/:path*",
    "/profile",
    "/comic-history",
    "/login",
    "/register",
    "/verify",
    "/forgot-password",
  ],
};
