# Hướng dẫn bật hệ thống quản lý CKK05 (File Chủ + File Con)

Kiến trúc: **GitHub Pages (giữ nguyên hosting) + Firebase Auth + Firestore**.

| Tệp | Vai trò |
|---|---|
| `dashboard.html` | **File Chủ** — chỉ Admin đăng nhập được: duyệt tài khoản, xem danh sách + tổng hợp (thành tiền, mặt hàng dương/âm/khớp) của từng nhân viên, mở bảng bất kỳ. |
| `app.html` | **File Con** — nhân viên đăng nhập, mỗi người một bảng XNT riêng lưu đám mây. Admin mở `app.html?uid=<mã>` để xem/nhập hộ bảng của người khác (Dashboard có nút sẵn). |
| `firebase-config.js` | Nơi dán cấu hình Firebase. Chưa dán → `app.html` tự chạy chế độ máy lẻ (localStorage), không lỗi. |
| `index.html` | Bản cá nhân offline như cũ, không đụng chạm. |

Bảo mật thật nằm ở **Security Rules chạy trên máy chủ Google** (bước 4) — không phải ở mật khẩu giấu trong code, nên không thể lách bằng cách xem mã nguồn.

## Bước 1 — Tạo dự án Firebase (miễn phí, ~3 phút)
1. Vào https://console.firebase.google.com → đăng nhập Google → **Add project** → đặt tên (vd `ckk05`) → tắt Google Analytics → Create.
2. Ở trang dự án, bấm biểu tượng **</>** (Web) → đặt tên app (vd `ckk05-web`) → **Register app** → Firebase hiện đoạn `const firebaseConfig = {...}`.
3. **Copy các giá trị đó** dán vào file `firebase-config.js` trong repo (thay các chữ `PASTE_...`), giữ nguyên phần `window.FIREBASE_CONFIG = {...}`. (Có thể gửi đoạn config cho Claude dán giúp.)

## Bước 2 — Bật đăng nhập Email/Mật khẩu
Menu trái → **Build → Authentication** → **Get started** → tab **Sign-in method** → chọn **Email/Password** → bật công tắc đầu tiên → Save.

## Bước 3 — Tạo cơ sở dữ liệu
Menu trái → **Build → Firestore Database** → **Create database** → chọn location `asia-southeast1 (Singapore)` → **Start in production mode** → Create.

## Bước 4 — Dán luật phân quyền (QUAN TRỌNG NHẤT)
Trong Firestore → tab **Rules** → xoá hết, dán đoạn sau → **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() { return request.auth != null; }
    function me() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
    }
    function isAdmin() { return signedIn() && me().role == 'admin'; }

    // Hồ sơ người dùng
    match /users/{uid} {
      allow get:    if signedIn() && (request.auth.uid == uid || isAdmin());
      allow list:   if isAdmin();                     // chỉ Admin xem danh sách
      allow create: if signedIn() && request.auth.uid == uid
                    && request.resource.data.role == 'pending';  // tự đăng ký = chờ duyệt
      allow update, delete: if isAdmin();             // chỉ Admin duyệt/đổi quyền
    }

    // Bảng XNT của từng nhân viên
    match /sheets/{uid} {
      allow read, write: if signedIn() &&
        ((request.auth.uid == uid && me().role != 'pending') || isAdmin());
    }
  }
}
```

Ý nghĩa: nhân viên chỉ đọc/ghi được **đúng bảng của mình** (và phải được duyệt); **chỉ Admin** thấy danh sách mọi người và mọi bảng; tài khoản tự đăng ký luôn ở trạng thái `pending` và không tự nâng quyền được.

## Bước 5 — Tạo tài khoản Admin (chính bạn)
1. Đẩy code đã dán config lên GitHub (Claude làm giúp) → mở `https://khanghynguyen9-afk.github.io/khang-hy/app.html` → bấm **Đăng ký**, nhập họ tên + email + mật khẩu của bạn.
2. Quay lại Firebase Console → **Firestore Database** → collection `users` → mở document vừa xuất hiện → sửa trường `role` từ `pending` thành `admin` → Save. *(Chỉ phải làm thủ công một lần duy nhất cho chính bạn — mọi người sau duyệt bằng Dashboard.)*
3. Mở `https://khanghynguyen9-afk.github.io/khang-hy/dashboard.html` → đăng nhập → bạn là Admin.

## Bước 6 — Vận hành hằng ngày
- Gửi cấp dưới link **`.../khang-hy/app.html`** → họ bấm Đăng ký → hiện màn "Chờ duyệt".
- Bạn mở **Dashboard → Chờ duyệt → ✓ Duyệt** → họ đăng nhập lại là có bảng riêng.
- Nhân viên nhập số liệu → tự lưu đám mây → Dashboard của bạn thấy ngay Tổng thành tiền, số mặt hàng dương/âm/khớp và giờ cập nhật của từng người; bấm **Mở bảng →** để xem chi tiết hoặc nhập hộ.
- Nhân viên nghỉ việc: Dashboard → đổi vai trò về `pending` (khoá ngay lập tức).

## Lưu ý
- Đoạn config trong `firebase-config.js` **không phải bí mật** — an toàn nằm ở Rules (bước 4).
- Gói miễn phí Firebase (Spark) dư sức cho <10 người dùng, không cần thẻ.
- `app.html` mở trên iPhone/Android/máy tính đều được (chạy qua link Pages, không phải file).
- Quên mật khẩu: nút "Quên mật khẩu" trên trang đăng nhập gửi email đặt lại tự động.
