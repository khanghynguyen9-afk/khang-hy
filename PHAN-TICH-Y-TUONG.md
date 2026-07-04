# Web Xuất Nhập Tồn — Chang Kang Kung CKK05

Bản chính thức: `index.html` (giao diện Neon Đêm đã chốt). Hai bản demo tham khảo: `mau-1-neon.html`, `mau-2-kinh-sang.html`.

## Cách sử dụng

### Lần đầu: nạp danh sách vật tư
1. Mở web, bấm nút **"📋 Dán danh sách vật tư"**.
2. Mở file Excel, copy nguyên cột **Tên vật tư**, dán vào ô, bấm **"Thêm toàn bộ"**. Tên trùng tự động bỏ qua.
3. Muốn thêm lẻ từng món: bấm **"＋ Thêm vật tư"**. Muốn đổi tên/xoá: mở bảng nhập của món đó, bấm ✏️ hoặc 🗑.

### Nhập số liệu hằng kỳ
- **Lia chuột** vào ô tên vật tư (giữ ~¼ giây) hoặc **bấm** vào ô → bảng nhập riêng hiện giữa màn hình.
- Nhập 7 mục: Tồn đầu kỳ, Nhập mua, Nhập điều chuyển, Xuất điều chuyển, Xuất hủy, Xuất test, Kiểm kê.
- Bấm **"📅 Số món bán theo ngày"** để mở lưới 31 ngày (sheet 2) và nhập số bán từng ngày.
- Đóng bảng bằng ✕, phím Esc, hoặc bấm ra ngoài. Mọi số nhập vào **tự lưu ngay**.

### Đọc kết quả chênh lệch (khu vực dưới danh sách vật tư)
```
Xuất bán           = TỔNG số món bán ngày 1..31
Tồn cuối lý thuyết = Tồn đầu kỳ + Nhập mua + Nhập điều chuyển
                     − Xuất điều chuyển − Xuất hủy − Xuất test − Xuất bán
CHÊNH LỆCH         = Kiểm kê − Tồn cuối lý thuyết
```
- Số **âm, màu đỏ** (có dấu −): thiếu hàng so với sổ sách.
- Số **dương, màu xanh lá** (có dấu +): thừa hàng.
- **"Khớp số ✔"**: kiểm kê đúng bằng tồn lý thuyết.
- Chấm trên ô vật tư: vàng = nhập một phần, xanh = đã nhập đủ 7 mục.

### Menu 3 gạch (góc trên trái, luôn cố định)
- **Thanh tìm kiếm**: gõ tên vật tư → kết quả hiện dạng tấm kính đè lên trên, bấm vào là cuộn tới món và mở bảng nhập.
- **Doanh thu**: nhập đơn giá một lần cho từng món (được lưu), web tự tính Thành tiền = tổng bán × đơn giá và Tổng doanh thu.
- **Sao lưu số liệu**: tải file `.json` về máy. **Khôi phục**: chọn file sao lưu để đổ lại toàn bộ số liệu.

## Lưu ý về dữ liệu
Số liệu lưu trong **trình duyệt của từng máy** (localStorage) — đóng web mở lại vẫn còn. Khi đổi máy/đổi trình duyệt hoặc trước khi xoá lịch sử duyệt web: dùng **Sao lưu** rồi **Khôi phục** trên máy mới. Nên sao lưu định kỳ cuối mỗi kỳ kiểm kê.

## Đưa web lên địa chỉ cố định (GitHub Pages — làm 1 lần)
1. Vào repo trên GitHub → **Settings → Pages**.
2. Mục **Source** chọn **GitHub Actions**.
3. Workflow `.github/workflows/pages.yml` (có sẵn) sẽ tự deploy mỗi lần đẩy code. Địa chỉ web: `https://khanghynguyen9-afk.github.io/khang-hy/`.

## Việc còn chờ
File `XNT_NEW_CKk05_da_sua.xlsx` chưa được đưa vào repo/chat nên:
- Danh sách vật tư thật chưa được nạp sẵn (tạm thời tự dán bằng nút 📋).
- Công thức đang là logic XNT chuẩn nêu trên; khi có file sẽ đối chiếu từng ô công thức trong sheet 1 + sheet 2 và chỉnh lại nếu file gốc tính khác.
