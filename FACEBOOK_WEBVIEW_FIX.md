# Facebook WebView Fix - Hướng dẫn khắc phục lỗi 404

## Vấn đề
Khi truy cập link từ Facebook app trên iPhone, trang web bị lỗi 404, nhưng khi truy cập từ trình duyệt thông thường thì hoạt động bình thường.

## Nguyên nhân
Facebook in-app browser (WebView) có những hạn chế đặc biệt:
- User-Agent khác biệt
- JavaScript execution bị hạn chế  
- Caching behavior khác biệt
- Network requests bị filter

## Giải pháp đã áp dụng

### 1. Thêm Meta Tags cho Facebook WebView
Đã thêm vào `src/app/layout.tsx`:
- `viewport` với `user-scalable=no`
- `format-detection` để tắt auto-detect số điện thoại
- `mobile-web-app-capable` và `apple-mobile-web-app-capable`
- Facebook Open Graph tags
- Twitter Card tags

### 2. Tạo Facebook WebView Detector Component
File: `src/components/common/facebook-webview-detector.tsx`
- Tự động detect Facebook WebView
- Hiển thị banner khuyến khích mở trong trình duyệt
- Button "Mở trong trình duyệt" để redirect user

### 3. Utility Functions
File: `src/utils/facebook-webview.ts`
- `isFacebookWebView()`: Detect Facebook WebView
- `openInExternalBrowser()`: Mở link trong trình duyệt external
- `hasDismissedFacebookBanner()`: Check user đã dismiss banner chưa
- `dismissFacebookBanner()`: Mark banner đã được dismiss

### 4. Cập nhật Next.js Config
File: `next.config.ts`
- Thêm security headers
- Cấu hình cache cho Facebook WebView compatibility

## Cách deploy

### Bước 1: Build và test local
```bash
npm run build
npm start
```

### Bước 2: Deploy lên server
```bash
# SSH vào server
ssh root@linhthanhnguyet

# Di chuyển đến thư mục project
cd /path/to/your/project

# Build Docker image
docker build -t zhihu-client:latest .

# Stop container cũ
docker stop zhihu_client
docker rm zhihu_client

# Start container mới
docker run -d --name zhihu_client -p 3000:3000 zhihu-client:latest
```

### Bước 3: Test
1. Truy cập từ Facebook app trên iPhone
2. Kiểm tra banner hiển thị
3. Test button "Mở trong trình duyệt"
4. Kiểm tra không còn lỗi 404

## Các file đã thay đổi

1. `src/app/layout.tsx` - Thêm meta tags và Facebook WebView detector
2. `src/components/common/facebook-webview-detector.tsx` - Component mới
3. `src/utils/facebook-webview.ts` - Utility functions mới  
4. `next.config.ts` - Cập nhật headers

## Lưu ý

- Banner chỉ hiển thị lần đầu, user có thể dismiss
- Button "Mở trong trình duyệt" sẽ mở link trong Safari/Chrome
- Meta tags giúp Facebook WebView hiểu rõ hơn về trang web
- Security headers cải thiện compatibility

## Test Cases

1. ✅ Truy cập từ Safari/Chrome - hoạt động bình thường
2. ✅ Truy cập từ Facebook app - hiển thị banner
3. ✅ Click "Mở trong trình duyệt" - redirect đúng
4. ✅ Dismiss banner - không hiển thị lại
5. ✅ Direct access từ Facebook - không còn 404
