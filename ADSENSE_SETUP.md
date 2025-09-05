# Hướng dẫn tích hợp Google AdSense

## Bước 1: Tạo tài khoản Google AdSense

1. Truy cập [Google AdSense](https://www.google.com/adsense)
2. Đăng ký tài khoản với domain chính: `zhihu-frontend.vercel.app`
3. Hoàn thành quá trình xác minh và chờ Google phê duyệt
4. Sau khi được phê duyệt, bạn sẽ nhận được:
   - Client ID (format: `ca-pub-xxxxxxxxxx`) ✅ **ĐÃ CÓ: ca-pub-9429981491740615**

## Bước 2: Tạo Ad Units trong Google AdSense

1. Đăng nhập vào [Google AdSense](https://www.google.com/adsense)
2. Vào **Ads** > **By ad unit**
3. Click **Create new ad unit**
4. Tạo các Ad Units sau:

### Header Banner

- **Name**: Header Banner
- **Ad size**: Responsive hoặc 728x90
- **Copy Ad unit ID** (sẽ có format như: `1234567890`)

### Footer Banner

- **Name**: Footer Banner
- **Ad size**: Responsive hoặc 728x90
- **Copy Ad unit ID**

### Content Banner

- **Name**: Content Banner
- **Ad size**: Responsive hoặc 728x90
- **Copy Ad unit ID**

### Sidebar Rectangle

- **Name**: Sidebar Rectangle
- **Ad size**: 300x250
- **Copy Ad unit ID**

### In-Article

- **Name**: In-Article
- **Ad size**: Responsive
- **Copy Ad unit ID**

## Bước 3: Cập nhật Ad Slot IDs

Sau khi có các Ad Unit IDs, cập nhật file `src/configs/adsense.ts`:

```typescript
AD_SLOTS: {
  HEADER: process.env.NEXT_PUBLIC_ADSENSE_HEADER_SLOT || "YOUR_HEADER_SLOT_ID", // Thay YOUR_HEADER_SLOT_ID
  SIDEBAR: process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || "YOUR_SIDEBAR_SLOT_ID", // Thay YOUR_SIDEBAR_SLOT_ID
  CONTENT: process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT || "YOUR_CONTENT_SLOT_ID", // Thay YOUR_CONTENT_SLOT_ID
  FOOTER: process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT || "YOUR_FOOTER_SLOT_ID", // Thay YOUR_FOOTER_SLOT_ID
  IN_ARTICLE: process.env.NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT || "YOUR_IN_ARTICLE_SLOT_ID", // Thay YOUR_IN_ARTICLE_SLOT_ID
},
```

## Bước 4: Cấu hình Environment Variables (Tùy chọn)

Tạo file `.env.local` và thêm các biến môi trường:

```env
# Google AdSense Configuration
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-9429981491740615
NEXT_PUBLIC_ADSENSE_HEADER_SLOT=YOUR_HEADER_SLOT_ID
NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT=YOUR_SIDEBAR_SLOT_ID
NEXT_PUBLIC_ADSENSE_CONTENT_SLOT=YOUR_CONTENT_SLOT_ID
NEXT_PUBLIC_ADSENSE_FOOTER_SLOT=YOUR_FOOTER_SLOT_ID
NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT=YOUR_IN_ARTICLE_SLOT_ID
```

## Bước 5: Cấu hình cho các môi trường

### Local Development

- Ads sẽ bị tắt tự động (enabled: false)
- Không cần cấu hình gì thêm

### Demo (Vercel)

- Cần thêm environment variables trong Vercel dashboard
- Ads sẽ hiển thị bình thường (enabled: true)

### Production (thanhnhacchau.com)

- Cần thêm environment variables trong hosting provider
- Ads sẽ hiển thị bình thường (enabled: true)

## Bước 6: Sử dụng các component AdSense

### Import components

```tsx
import {
  HeaderAd,
  SidebarAd,
  ContentAd,
  FooterAd,
  InArticleAd,
} from "@/components/common/adsense";
```

### Sử dụng trong layout

```tsx
// Header
<HeaderAd />

// Sidebar
<SidebarAd />

// Content
<ContentAd />

// Footer
<FooterAd />

// Trong bài viết
<InArticleAd />
```

## Bước 7: Kiểm tra và theo dõi

1. **Kiểm tra Console**: Mở Developer Tools > Console để xem debug logs
2. **Kiểm tra Network**: Xem có call đến Google AdSense API không
3. **Sử dụng Google AdSense Debugger**: Cài extension để debug
4. **Theo dõi performance**: Trong AdSense dashboard
5. **Đảm bảo tuân thủ AdSense policies**

## Troubleshooting

### Ads không hiển thị

1. **Kiểm tra Ad Slot IDs**: Đảm bảo đã thay thế bằng slot IDs thật
2. **Kiểm tra Console**: Xem có lỗi gì không
3. **Kiểm tra Network**: Xem có call đến `https://ep1.adtrafficquality.google/getconfig/sodar` không
4. **Đảm bảo domain đã được phê duyệt**: `zhihu-frontend.vercel.app`

### Ads hiển thị nhưng không có quảng cáo

- Cần thời gian để Google phục vụ quảng cáo (có thể mất vài giờ)
- Kiểm tra traffic và nội dung website
- Đảm bảo tuân thủ policies

### Performance issues

- Sử dụng lazy loading cho ads
- Tối ưu kích thước ads
- Kiểm tra Core Web Vitals

## Lưu ý quan trọng

1. **Tuân thủ chính sách**: Đảm bảo website tuân thủ [AdSense Program Policies](https://support.google.com/adsense/answer/48182)
2. **Nội dung chất lượng**: Tạo nội dung chất lượng, không copy
3. **Tối ưu UX**: Không đặt quá nhiều ads, ảnh hưởng trải nghiệm người dùng
4. **Mobile-friendly**: Đảm bảo ads hiển thị tốt trên mobile
5. **Loading speed**: Ads không làm chậm website

## Debug Commands

Để debug, mở Console và chạy:

```javascript
// Kiểm tra AdSense script đã load chưa
console.log("AdSense available:", !!window.adsbygoogle);

// Kiểm tra các ad slots
document.querySelectorAll(".adsbygoogle").forEach((ad, index) => {
  console.log(`Ad ${index}:`, ad.getAttribute("data-ad-slot"));
});
```
