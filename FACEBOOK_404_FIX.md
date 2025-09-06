

# Facebook 404 Fix - Khắc phục lỗi 404 từ Facebook App

## Vấn đề
Khi truy cập link từ Facebook app trên iPhone, trang web bị redirect về `not-found.tsx` (404 page) thay vì hiển thị nội dung đúng.

## Nguyên nhân
Facebook in-app browser (WebView) có cách xử lý routing khác biệt:
- JavaScript execution bị hạn chế
- Client-side routing không hoạt động đúng
- Server-side rendering không được xử lý đúng cách

## Giải pháp đã áp dụng

### 1. Cập nhật Not-Found Page
File: `src/app/not-found.tsx`
- ✅ Detect Facebook WebView
- ✅ Hiển thị thông báo đặc biệt cho Facebook WebView
- ✅ Button "Mở trong trình duyệt"
- ✅ Debug info để phân tích

### 2. Cập nhật Middleware
File: `src/middleware.ts`
- ✅ Detect Facebook WebView từ User-Agent
- ✅ Thêm headers đặc biệt cho Facebook WebView
- ✅ Cấu hình cache để tránh caching issues
- ✅ Áp dụng cho tất cả routes

### 3. Thêm Facebook WebView Notice
File: `src/components/common/facebook-webview-notice.tsx`
- ✅ Banner thông báo ở top của trang
- ✅ Button "Mở trong trình duyệt"
- ✅ Có thể dismiss banner

### 4. Cập nhật Layout
File: `src/app/layout.tsx`
- ✅ Thêm meta tags cho Facebook WebView
- ✅ Facebook Open Graph tags
- ✅ Twitter Card tags

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
2. Kiểm tra banner thông báo hiển thị
3. Test button "Mở trong trình duyệt"
4. Kiểm tra không còn redirect về 404

## Test Cases

### ✅ Test Cases cần pass
- [ ] Truy cập từ Facebook app - hiển thị banner
- [ ] Click "Mở trong trình duyệt" - redirect đúng
- [ ] Dismiss banner - không hiển thị lại
- [ ] Truy cập từ Safari/Chrome - hoạt động bình thường
- [ ] Debug info hiển thị đúng

### ❌ Test Cases cần fail (expected)
- [ ] Route không tồn tại vẫn trả về 404
- [ ] Invalid URL vẫn trả về error

## Các file đã thay đổi

1. `src/app/not-found.tsx` - Cập nhật 404 page với Facebook WebView support
2. `src/middleware.ts` - Thêm Facebook WebView detection và headers
3. `src/components/common/facebook-webview-notice.tsx` - Component mới
4. `src/app/layout.tsx` - Thêm meta tags và components

## Lưu ý

- Banner chỉ hiển thị lần đầu, user có thể dismiss
- Button "Mở trong trình duyệt" sẽ mở link trong Safari/Chrome
- Middleware sẽ detect Facebook WebView và thêm headers phù hợp
- Debug info giúp phân tích vấn đề khi cần

## Troubleshooting

### Nếu vẫn bị 404
1. Kiểm tra Nginx config có đúng không
2. Kiểm tra container có chạy bình thường không
3. Kiểm tra middleware có hoạt động không

### Nếu banner không hiển thị
1. Kiểm tra JavaScript có bị block không
2. Kiểm tra localStorage có hoạt động không
3. Kiểm tra User-Agent detection

### Nếu button "Mở trong trình duyệt" không hoạt động
1. Kiểm tra popup blocker
2. Kiểm tra browser permissions
3. Thử trên browser khác

## Contact

Gửi debug info và mô tả vấn đề cho developer để được hỗ trợ.
