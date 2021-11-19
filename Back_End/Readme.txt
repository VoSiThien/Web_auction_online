Cách build sourcecode back end:
1: Tạo file .env tại folder BACK_END, sau đó copy nội dung trong file .env_default qua file .env
2: Mở terminal của visual studio code và chạy lênh: npm install
3: Sau lệnh bước 2 chạy xong tiến hành start bằng lênh: npm start

Lưu ý trước khi start phải có database:
- Database sử dụng trong sourcecode là postgresql.
- script sql được lưu trong folder Backup_Restore_DB/AuctionOnline_DB.sql
1: Tạo một database tên AuctionOnline_db trong postgre.
2: Mở file restore_local.bat sửa link pg_env cho phù hợp.
3: Sau đó tiến hành chạy file restore_local.bat.

Tài khoản mặc định (Admin):
user: giaovienAdm@gmail.com
pass: 123