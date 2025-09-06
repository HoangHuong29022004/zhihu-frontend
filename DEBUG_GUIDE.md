# Debug Guide - Hướng dẫn sử dụng Debug Panel

## Cách sử dụng Debug Panel

### 1. Truy cập Debug Page
- Mở trình duyệt và truy cập: `https://thanhnhacchau.com/debug`
- Hoặc click vào button bug icon ở góc dưới bên phải

### 2. Test Routes
- Sử dụng **Route Tester** để kiểm tra các route có hoạt động không
- Click "Test" để kiểm tra response time và status code
- Click icon external link để mở route trong tab mới

### 3. Lấy Debug Info
- Click button bug icon ở góc dưới bên phải
- Click "Copy Debug Info" để copy thông tin debug
- Gửi thông tin này cho developer để phân tích

### 4. Test trên Facebook App
1. Mở Facebook app trên iPhone
2. Truy cập link: `https://thanhnhacchau.com/debug`
3. Test các route trong Route Tester
4. Lấy debug info và gửi cho developer

## Thông tin Debug bao gồm

```
=== DEBUG INFO ===
Time: 2025-01-06T11:30:00.000Z
URL: https://thanhnhacchau.com/debug
User Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBAV/400.0.0.37.70;]
Is Facebook WebView: true
Screen: 1170x2532
Viewport: 375x812
=== END ===
```

## Các vấn đề thường gặp

### ❌ 404 Error
- **Nguyên nhân**: Route không tồn tại hoặc Nginx config sai
- **Giải pháp**: Kiểm tra Nginx config và rebuild container

### ⚠️ Slow Response (>1000ms)
- **Nguyên nhân**: Server overloaded hoặc network issues
- **Giải pháp**: Kiểm tra server resources và network

### ℹ️ Facebook WebView Issues
- **Nguyên nhân**: Facebook WebView có hạn chế JavaScript
- **Giải pháp**: Sử dụng meta tags và fallback mechanisms

## Cách gửi Debug Info

1. **Copy Debug Info** từ debug panel
2. **Paste vào message** gửi cho developer
3. **Kèm theo**:
   - Mô tả vấn đề gặp phải
   - Các bước để reproduce
   - Screenshot nếu có thể

## Test Cases

### ✅ Test Cases cần pass
- [ ] Truy cập `/debug` từ Safari/Chrome
- [ ] Truy cập `/debug` từ Facebook app
- [ ] Test route `/comic/test-comic/chapter-1`
- [ ] Copy debug info thành công
- [ ] Facebook WebView detection hoạt động

### ❌ Test Cases cần fail (expected)
- [ ] Route không tồn tại trả về 404
- [ ] Invalid URL trả về error

## Troubleshooting

### Nếu Debug Panel không hiển thị
1. Kiểm tra console có lỗi JavaScript không
2. Thử refresh trang
3. Kiểm tra network connection

### Nếu Copy Debug Info không hoạt động
1. Thử download thay vì copy
2. Kiểm tra browser permissions
3. Thử trên browser khác

### Nếu Route Tester không hoạt động
1. Kiểm tra network connection
2. Thử test route đơn giản trước
3. Kiểm tra server status

## Contact

Gửi debug info và mô tả vấn đề cho developer để được hỗ trợ.
