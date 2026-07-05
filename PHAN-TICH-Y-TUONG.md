# Web Xuất Nhập Tồn — Chang Kang Kung CKK05 (bản hoàn chỉnh)

Web chính thức: `index.html` — by Nguyễn Khang Hy.
Danh mục và công thức nạp từ `XNT_NEW_CKk05_da_sua.xlsx` (lưu kèm repo): **35 vật tư, 63 món bán (6 nhóm), 151 dòng định mức, đơn giá từng vật tư**. Giao diện theo design system Apple (`DESIGN.md`).

## Công thức (đúng nguyên văn file Excel — đã kiểm chứng khớp 100%)

```
Tổng bán món (AH, sheet 2)  = SUM(ngày 1 → 31)
Xuất định mức vật tư (H)    = Σ(Định lượng chuẩn × Tổng bán món)   ← bảng định mức dòng 45–195
                              (riêng Giò sống cộng thêm định mức mã ATHI0125)
Tồn cuối kỳ (K)             = Tồn đầu + Nhập mua + Nhập ĐC − Xuất ĐC
                              − Xuất định mức − Xuất hủy − Xuất test
CHÊNH LỆCH (M)              = Kiểm kê − Tồn cuối kỳ
TỔNG THÀNH TIỀN             = Σ(Đơn giá × Chênh lệch)              ← SUM(O6:O40)
```

Kiểm chứng tự động: bộ số ngẫu nhiên chạy song song qua mô phỏng công thức Excel (SUM/SUMIF/VLOOKUP từng ô) và engine web — khớp tuyệt đối 35 vật tư × 4 chỉ số + tổng thành tiền.

## Cách dùng

- **Tổng thành tiền** hiện nổi bật giữa trang, dưới logo cá 3D — xanh khi dương, đỏ khi âm, cập nhật tức thì.
- **Lia chuột** vào ô (vật tư hoặc món bán) = xem nhanh, rời chuột tự ẩn. **Nhấp** = mở bảng nhập.
  - Vật tư: nhập 7 mục (Tồn đầu kỳ, Nhập mua, Nhập ĐC, Xuất ĐC, Xuất hủy, Xuất test, Kiểm kê). Xuất định mức tự tính.
  - Món bán: nhập số bán ngày 1–31, tổng tự cộng và tự trừ vào vật tư theo định mức.
- **Chênh lệch từng vật tư** ở dải tối cuối trang: âm đỏ (thiếu), dương xanh (thừa), "Khớp số ✔"; kèm tổng quan số mặt hàng dương/âm + kết luận.
- **Menu 3 gạch** (cố định góc trái):
  - *Tìm kiếm*: gõ tên/mã → Enter để ẩn menu và xem kết quả → nhấp kết quả để mở bảng nhập.
  - *Đơn giá vật tư*: thanh bên liệt kê 35 giá, sửa trực tiếp, lưu vĩnh viễn.
  - *Sao lưu / Khôi phục*: file `.json`. *Bắt đầu kỳ mới*: xoá số nhập, giữ đơn giá.
- Số liệu tự lưu trong trình duyệt từng máy (localStorage). Đổi máy → dùng Sao lưu + Khôi phục.

## Đưa web lên địa chỉ cố định (làm 1 lần)

GitHub → **Settings → Pages → Source: GitHub Actions**. Workflow `.github/workflows/pages.yml` tự deploy; web tại `https://khanghynguyen9-afk.github.io/khang-hy/`.

## Khi danh mục/định mức/giá trong Excel thay đổi lớn

Gửi file Excel mới — chạy lại bộ trích xuất để cập nhật khối `CATALOG` trong `index.html`, chạy kiểm chứng khớp số rồi đẩy code. (Giá lẻ tẻ thì sửa ngay trong thanh Đơn giá trên web, không cần đổi code.)

## Tệp trong repo

| Tệp | Vai trò |
|---|---|
| `index.html` | Web chính thức (chạy độc lập, không cần cài gì) |
| `XNT_NEW_CKk05_da_sua.xlsx` | File Excel gốc — nguồn danh mục & công thức |
| `DESIGN.md` | Đặc tả design system Apple (từ `npx getdesign add apple`) |
| `.github/workflows/pages.yml` | Tự deploy GitHub Pages |
| `mau-1-neon.html`, `mau-2-kinh-sang.html` | 2 bản demo giai đoạn chọn mẫu (tham khảo) |
