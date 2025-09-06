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

  // Detect Facebook WebView
  const userAgent = request.headers.get("user-agent") || "";
  const isFacebookWebView = /FBAN|FBAV|FB_IAB|FB4A/i.test(userAgent);

  // Tạo base URL an toàn
  const baseUrl = request.nextUrl.origin;

  // Facebook WebView redirect - chỉ redirect non-chapter pages
  if (isFacebookWebView && currentPath !== "/redirect") {
    // Check if this is a chapter page
    const isChapterPage = currentPath.match(/^\/comic\/([^\/]+)\/([^\/]+)$/);
    
    // Only redirect non-chapter pages
    if (!isChapterPage) {
      const redirectUrl = new URL("/redirect", baseUrl);
      redirectUrl.searchParams.set("url", request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Kiểm tra trạng thái đăng nhập từ cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isLoggedIn = Boolean(accessToken && refreshToken);

  // Kiểm tra xem đường dẫn hiện tại có thuộc privateRoutes không
  const isPrivateRoute = privateRoutes.some(
    (route) => currentPath === route || currentPath.startsWith(`${route}/`)
  );

  // Nếu chưa đăng nhập và cố gắng truy cập privateRoutes
  if (!isLoggedIn && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", baseUrl));
  }

  // Nếu đã đăng nhập và cố gắng truy cập unAuthRoutes
  if (isLoggedIn && unAuthRoutes.includes(currentPath)) {
    return NextResponse.redirect(new URL("/", baseUrl));
  }

  // Xử lý chapter slugs - không redirect, giữ nguyên URL gốc
  const comicChapterMatch = currentPath.match(/^\/comic\/([^\/]+)\/([^\/]+)$/);
  if (comicChapterMatch) {
    const [, , chapterSlug] = comicChapterMatch;
    
    // Nếu chapter slug có dấu chấm, giữ nguyên URL gốc
    if (chapterSlug.includes('.')) {
      const response = NextResponse.next();
      response.headers.set('X-Chapter-Has-Dots', 'true');
      return response;
    }
  }

  // Xử lý Facebook WebView routing
  if (isFacebookWebView) {
    // Thêm headers cho Facebook WebView
    const response = NextResponse.next();
    
    // Thêm headers để cải thiện compatibility
    response.headers.set("X-Frame-Options", "ALLOWALL");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    
    // Thêm custom header để detect Facebook WebView
    response.headers.set("X-Facebook-WebView", "true");
    
    return response;
  }

  return NextResponse.next();
}

// Cấu hình middleware để áp dụng cho tất cả routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
