/* ============================================================
   CẤU HÌNH FIREBASE — dán cấu hình dự án của bạn vào đây.
   Lấy tại: Firebase Console → Project settings → General
   → Your apps → SDK setup and configuration → Config.
   Khi chưa dán (còn chữ PASTE), web tự chạy ở chế độ máy lẻ
   (lưu localStorage như cũ), không báo lỗi.
   Lưu ý: các khóa này KHÔNG phải bí mật — bảo mật thật nằm ở
   Security Rules trên máy chủ Firebase (xem HUONG-DAN-FIREBASE.md).
   ============================================================ */
window.FIREBASE_CONFIG = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_PROJECT.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};
