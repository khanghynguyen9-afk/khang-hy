# Phân tích ý tưởng — Web XNT Chang Kang Kung CKK05

Chuyển file `XNT_NEW_CKk05_da_sua.xlsx` thành web dùng lâu dài, giao diện 3D chuyển động, chỉ hiện các ô nhập liệu, mọi công thức giữ nguyên và tự tính chênh lệch.

## 1. Mô hình công thức (giữ nguyên logic Excel)

Các ô **hiện ra để nhập** (theo yêu cầu):

| Mục nhập | Nguồn trong file |
|---|---|
| Tồn đầu kỳ | Sheet 1 |
| Nhập mua | Sheet 1 |
| Nhập điều chuyển | Sheet 1 |
| Xuất điều chuyển | Sheet 1 |
| Xuất hủy | Sheet 1 |
| Xuất test | Sheet 1 |
| Kiểm kê | Sheet 1 |
| Số món bán theo ngày (1 → 31) | Sheet 2 |

Các ô **ẩn, tự tính** (công thức chạy ngầm, chỉ hiện kết quả cuối):

```
Xuất bán          = TỔNG(số món bán ngày 1..31)            ← sheet 2
Tồn cuối lý thuyết = Tồn đầu kỳ + Nhập mua + Nhập điều chuyển
                     − Xuất điều chuyển − Xuất hủy − Xuất test − Xuất bán
CHÊNH LỆCH        = Kiểm kê − Tồn cuối lý thuyết
```

- Chênh lệch **âm** → hiện dấu `−` trước số, **màu đỏ** (thiếu hàng).
- Chênh lệch **dương** → hiện dấu `+`, **màu xanh lá** (thừa hàng).
- Bằng 0 → "Khớp số ✔".
- Chênh lệch chỉ hiện khi đã nhập đủ mục (tối thiểu phải có Kiểm kê), đúng ý "nhập đủ toàn bộ mới hiện".

> ⚠️ File Excel gốc nằm trên máy của bạn nên chưa đọc được trực tiếp. Công thức trên là logic XNT chuẩn của mẫu CKK. Khi bạn tải file `.xlsx` vào repo (hoặc gửi vào phiên làm việc), tôi sẽ đối chiếu từng ô công thức và danh sách tên vật tư thật để khớp 100%, kể cả các cột đặc thù nếu file có thêm.

## 2. Các thành phần giao diện đã làm đúng yêu cầu

1. **Khung tên vật tư**: hình chữ nhật bo cạnh, tự co giãn theo độ dài chữ. **Lia chuột** (hoặc chạm trên điện thoại) → hiện bảng nhập gồm đúng 7 mục + lưới 31 ngày của sheet 2.
2. **Mục chênh lệch nằm phía dưới** các ô tên vật tư, theo dõi từng mặt hàng một.
3. **Nút 3 gạch cố định góc trên trái** (không trôi theo khi cuộn). Bấm vào hiện lần lượt từ trên xuống: **Thanh tìm kiếm → Doanh thu**.
4. **Tìm kiếm**: gõ tên vật tư → kết quả hiện dạng **tấm kính mờ đè lên trên** các mục khác; bấm vào kết quả sẽ cuộn tới đúng ô vật tư và tự mở bảng nhập.
5. **Hiệu ứng cuộn**: khối nào rời khỏi vùng nhìn sẽ **thu nhỏ + mờ kiểu kính**, lướt lên xuống mượt, cảm giác tương lai.
6. **Logo cá 3D**: giữ nguyên màu đỏ và bố cục ảnh gốc (vây trên – thân cá mắt trắng – đĩa cong dưới), dựng 3 lớp chiều sâu, tự xoay nhẹ liên tục.
7. **Dùng lâu dài**: số liệu lưu tự động trong trình duyệt (localStorage) — đóng web mở lại vẫn còn; có nút thêm/xoá vật tư.

## 3. Hai mẫu để kiểm tra

| | Mẫu 1 — Neon Đêm (`mau-1-neon.html`) | Mẫu 2 — Kính Sáng (`mau-2-kinh-sang.html`) |
|---|---|---|
| Nền | Tối xanh-than, sao lấp lánh, quầng đỏ/cyan | Sứ trắng ấm, sương aurora đỏ nhạt trôi |
| Ô vật tư | Chữ nhật bo cạnh, kính tối, viền đỏ phát sáng | Viên thuốc bo tròn, kính trắng, đổ bóng mềm |
| Chênh lệch | Thẻ lớn từng món, số phát sáng đỏ/xanh | Sổ đối chiếu dạng dòng + thanh lệch + bộ đếm Khớp/Lệch |
| Cảm giác | Tương lai, ban đêm, nổi bật | Sang, sạch, dễ đọc ban ngày |

Hai mẫu **dùng chung một lõi công thức** — chọn mẫu nào thì số liệu vẫn tính y hệt nhau.

## 4. Việc tiếp theo

- Bạn chọn 1 trong 2 mẫu (hoặc trộn: ví dụ bố cục Mẫu 2 + màu Mẫu 1).
- Đưa file `XNT_NEW_CKk05_da_sua.xlsx` vào repo để tôi nạp đúng danh sách vật tư + đối chiếu từng công thức thật.
- Nếu cần dùng chung nhiều máy/nhiều người: nâng cấp lưu trữ từ trình duyệt lên cơ sở dữ liệu (bước sau).
