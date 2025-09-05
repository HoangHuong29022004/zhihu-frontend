# Hướng dẫn khắc phục lỗi cho Zhihu Frontend

## Tổng quan các lỗi đã được khắc phục

### 1. Lỗi Google AdSense (ERR_BLOCKED_BY_CLIENT)

**Nguyên nhân:**
- Ad blocker đang chặn script Google AdSense
- Cấu hình environment variables chưa đúng
- Domain chưa được phê duyệt trong Google AdSense

**Giải pháp đã áp dụng:**
- ✅ Tạo file `.env` chính với đầy đủ cấu hình AdSense
- ✅ Sửa lỗi syntax trong `src/configs/adsense.ts`
- ✅ Cấu hình đúng Client ID và Ad Slot IDs

**Cách kiểm tra:**
1. Tắt ad blocker trong trình duyệt
2. Kiểm tra Console không còn lỗi `ERR_BLOCKED_BY_CLIENT`
3. Xem Network tab có request đến `pagead2.googlesyndication.com`

### 2. Lỗi hình ảnh undefined (404 Not Found)

**Nguyên nhân:**
- `process.env.NEXT_PUBLIC_URL_IMAGES_COMMON` trả về `undefined`
- Thiếu file `.env` chính

**Giải pháp đã áp dụng:**
- ✅ Tạo file `.env` với đầy đủ biến môi trường
- ✅ Cấu hình đúng đường dẫn hình ảnh:
  ```
  NEXT_PUBLIC_URL_IMAGES_COMMON="/images/common"
  NEXT_PUBLIC_URL_IMAGES_HOME="/images/home"
  NEXT_PUBLIC_URL_IMAGES_JOB="/images/job"
  NEXT_PUBLIC_URL_IMAGES_COMPANY="/images/company"
  NEXT_PUBLIC_URL_IMAGES_CAROUSEL="/images/carousel"
  ```

**Cách kiểm tra:**
1. Kiểm tra Console không còn lỗi `undefined/default_image.png`
2. Hình ảnh hiển thị bình thường trên trang web

### 3. Lỗi API endpoints (404 Not Found)

**Nguyên nhân:**
- API base URL không được cấu hình đúng
- Environment variables chưa được load

**Giải pháp đã áp dụng:**
- ✅ Cấu hình đúng API URLs trong file `.env`:
  ```
  NEXT_PUBLIC_API_URL_DEV="https://staging.api.thanhnhacchau.com/api/v1"
  NEXT_PUBLIC_API_URL_PRO="https://api.thanhnhacchau.com/api/v1"
  NEXT_PUBLIC_ENV_NODE=production
  ```
- ✅ Sửa lỗi syntax trong `src/data/constants/api-endpoints.ts`
- ✅ Sửa lỗi trong `src/configs/axios-interceptor.ts`

**Cách kiểm tra:**
1. Kiểm tra Console không còn lỗi 404 cho API calls
2. Dữ liệu truyện hiển thị bình thường

## Các file đã được sửa

### 1. `.env` (mới tạo)
- Chứa tất cả environment variables cần thiết
- Cấu hình đúng cho production environment

### 2. `src/configs/adsense.ts`
- Sửa lỗi syntax (dấu phẩy thừa)
- Cấu hình đúng AdSense Client ID và Ad Slots

### 3. `src/data/constants/api-endpoints.ts`
- Sửa lỗi syntax (dấu phẩy thiếu)
- Thêm endpoint bị thiếu
- Sửa lỗi trong API_MODULE

### 4. `src/configs/axios-interceptor.ts`
- Sửa lỗi sử dụng sai biến trong Authorization header

## Cách deploy và test

### 1. Local Development
```bash
# Copy file .env
cp .env .env.local

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Production Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

### 3. Vercel Deployment
1. Thêm environment variables trong Vercel dashboard
2. Deploy từ GitHub repository
3. Kiểm tra domain đã được phê duyệt trong Google AdSense

## Kiểm tra sau khi deploy

### 1. Kiểm tra Console
- Không còn lỗi `ERR_BLOCKED_BY_CLIENT`
- Không còn lỗi `undefined/default_image.png`
- Không còn lỗi 404 cho API calls

### 2. Kiểm tra chức năng
- Hình ảnh hiển thị bình thường
- Dữ liệu truyện load được
- Google AdSense hoạt động (nếu không có ad blocker)

### 3. Kiểm tra Performance
- Trang web load nhanh
- Không có lỗi JavaScript
- API calls thành công

## Lưu ý quan trọng

1. **Google AdSense**: Cần đảm bảo domain `zhihu-frontend-delta.vercel.app` đã được phê duyệt trong Google AdSense
2. **Environment Variables**: Đảm bảo tất cả biến môi trường đã được cấu hình đúng trong hosting provider
3. **API Backend**: Đảm bảo API backend đang hoạt động và accessible
4. **Images**: Đảm bảo thư mục `public/images/` chứa đầy đủ hình ảnh cần thiết

## Troubleshooting

### Nếu vẫn còn lỗi AdSense:
1. Kiểm tra domain đã được phê duyệt chưa
2. Tắt ad blocker
3. Kiểm tra Ad Slot IDs có đúng không

### Nếu vẫn còn lỗi hình ảnh:
1. Kiểm tra file `.env` có được load đúng không
2. Kiểm tra thư mục `public/images/` có đầy đủ file không
3. Restart development server

### Nếu vẫn còn lỗi API:
1. Kiểm tra API backend có hoạt động không
2. Kiểm tra CORS configuration
3. Kiểm tra network connectivity
