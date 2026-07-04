# Web Xuất Nhập Tồn — Chang Kang Kung CKK05

Bản chính thức: `index.html` — **đã nạp danh mục và công thức thật** từ `XNT_NEW_CKk05_da_sua.xlsx` (lưu kèm trong repo): 35 vật tư, 63 món bán (6 nhóm), 151 dòng định mức, đơn giá từng vật tư.

Engine đã được kiểm chứng tự động: chạy bộ số ngẫu nhiên qua cả công thức Excel (mô phỏng SUMIF/VLOOKUP/SUM đúng từng ô) và engine web — **khớp 100%** trên 35 vật tư × 4 chỉ số (Xuất định mức, Tồn cuối kỳ, Chênh lệch, Thành tiền) và tổng thành tiền.

## Công thức (sao chép nguyên văn từ file)

```
Tổng bán món (AH, sheet 2)  = SUM(ngày 1 → 31)
Xuất định mức vật tư (H)    = Σ(Định lượng chuẩn × Tổng bán món)  ← bảng định mức dòng 45-195
                              (riêng Giò sống cộng thêm định mức mã ATHI0125)
Tồn cuối kỳ (K)             = Tồn đầu + Nhập mua + Nhập ĐC − Xuất ĐC
                              − Xuất định mức − Xuất hủy − Xuất test
CHÊNH LỆCH (M)              = Kiểm kê − Tồn cuối kỳ
Thành tiền (O)              = Đơn giá × Chênh lệch ; Tổng = SUM(O)
```

- Chênh lệch **âm** → dấu `−`, **màu đỏ** (thiếu hàng). **Dương** → dấu `+`, **màu xanh lá** (thừa). Bằng 0 → "Khớp số ✔".
- Khối "Tổng quan xu hướng chênh lệch" (số mặt hàng dương/âm, kết luận) hiển thị phía trên khu chênh lệch, tự cập nhật.

## Cách sử dụng

### Hai khu nhập liệu (đúng cấu trúc 2 sheet của file)
1. **Tên vật tư (sheet CKK05)** — lia chuột (giữ ~¼ giây) hoặc bấm vào ô tên → bảng riêng hiện giữa màn hình, nhập 7 mục: Tồn đầu kỳ, Nhập mua, Nhập điều chuyển, Xuất điều chuyển, Xuất hủy, Xuất test, Kiểm kê. Xuất định mức **không nhập tay** — tự tính từ số bán (đúng như ô công thức trong file).
2. **Số món bán theo ngày (sheet 2)** — 63 món chia 6 nhóm (Hải sản hồ, Thịt, Hải sản đông, Tôm, Combo, Nhân dimsum). Mở ô món → nhập số bán từng ngày 1–31, cột Tổng cộng tự tính và tự "nhảy" vào xuất định mức của các vật tư liên quan.

Chấm trạng thái trên ô: vàng = nhập một phần, xanh = đủ (vật tư đủ 7 mục / món đã có số bán).

### Menu 3 gạch (góc trên trái, cố định)
- **Tìm kiếm**: tìm cả vật tư lẫn món bán theo tên hoặc mã — kết quả dạng tấm kính đè lên trên, bấm là cuộn tới và mở bảng nhập.
- **Doanh thu (thành tiền chênh lệch)**: bảng Đơn giá × Chênh lệch từng vật tư + Tổng thành tiền (đơn giá nạp sẵn từ file, sửa được và được lưu).
- **Sao lưu / Khôi phục**: tải file `.json` về máy và đổ lại khi cần.
- **Xoá số liệu, bắt đầu kỳ mới**: xoá số nhập (giữ đơn giá đã sửa) — nhớ sao lưu trước.

## Lưu ý dữ liệu
Số liệu lưu trong trình duyệt từng máy (localStorage). Đổi máy/trình duyệt → dùng Sao lưu + Khôi phục. Nên sao lưu cuối mỗi kỳ.

## GitHub Pages (làm 1 lần)
Settings → Pages → Source: **GitHub Actions**. Workflow `.github/workflows/pages.yml` tự deploy; web tại `https://khanghynguyen9-afk.github.io/khang-hy/`.

## Khi file Excel đổi danh mục/định mức
Gửi file mới — chạy lại bộ trích xuất (script tại phiên làm việc) để cập nhật khối `CATALOG` trong `index.html`, chạy lại kiểm chứng khớp số rồi đẩy code.
