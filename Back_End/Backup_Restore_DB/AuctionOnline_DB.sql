--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: tbl_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_account_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tbl_account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_account (
                                    acc_id integer DEFAULT nextval('public.tbl_account_id_seq'::regclass) NOT NULL,
                                    acc_password character varying(100),
                                    acc_token character varying(100),
                                    acc_email character varying(100),
                                    acc_phone_number character varying(15),
                                    acc_full_name character varying(100),
                                    acc_role character varying(5),
                                    acc_avatar text,
                                    acc_status integer DEFAULT 2,
                                    acc_created_date character varying(100),
                                    acc_updated_date character varying(100),
                                    acc_token_forgot character varying(100),
                                    acc_refresh_token character varying(100),
                                    acc_rating_score integer,
                                    acc_is_upgrade integer,
                                    acc_exp_upgrade character varying(100),
                                    acc_birthday character varying(100),
                                    acc_like_bidder integer DEFAULT 0,
                                    acc_dis_like_bidder integer DEFAULT 0,
                                    acc_like_seller integer DEFAULT 0,
                                    acc_dis_like_seller integer DEFAULT 0
);


ALTER TABLE public.tbl_account OWNER TO postgres;

--
-- Name: tbl_account_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_account_comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_account_comments_id_seq OWNER TO postgres;

--
-- Name: tbl_account_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_account_comments (
                                             acom_id integer DEFAULT nextval('public.tbl_account_comments_id_seq'::regclass) NOT NULL,
                                             acom_note character varying(1500),
                                             acom_assessor integer,
                                             acom_receiver integer,
                                             acom_product_id integer,
                                             acom_status_rating integer,
                                             acom_created_date character varying(100),
                                             acom_updated_date character varying(100)
);


ALTER TABLE public.tbl_account_comments OWNER TO postgres;

--
-- Name: tbl_account_request; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_account_request (
                                            are_acc_id integer NOT NULL,
                                            are_verifier integer,
                                            are_request integer,
                                            are_status integer,
                                            are_created_date character varying(100),
                                            are_updated_date character varying(100)
);


ALTER TABLE public.tbl_account_request OWNER TO postgres;

--
-- Name: tbl_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_categories_id_seq OWNER TO postgres;

--
-- Name: tbl_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_categories (
                                       cate_id integer DEFAULT nextval('public.tbl_categories_id_seq'::regclass) NOT NULL,
                                       cate_name character varying(100),
                                       cate_status integer DEFAULT 0,
                                       cate_father integer,
                                       cate_created_date character varying(100),
                                       cate_updated_date character varying(100),
                                       ts tsvector GENERATED ALWAYS AS (setweight(to_tsvector('english'::regconfig, (COALESCE(cate_name, ''::character varying))::text), 'A'::"char")) STORED
);


ALTER TABLE public.tbl_categories OWNER TO postgres;

--
-- Name: tbl_favorite_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_favorite_product_id_seq
    START WITH 3
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 3;


ALTER TABLE public.tbl_favorite_product_id_seq OWNER TO postgres;

--
-- Name: tbl_favorite_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_favorite_product (
                                             fav_id integer DEFAULT nextval('public.tbl_favorite_product_id_seq'::regclass) NOT NULL,
                                             fav_product_id integer,
                                             fav_account_id integer
);


ALTER TABLE public.tbl_favorite_product OWNER TO postgres;

--
-- Name: tbl_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_product_id_seq OWNER TO postgres;

--
-- Name: tbl_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_product (
                                    prod_id integer DEFAULT nextval('public.tbl_product_id_seq'::regclass) NOT NULL,
                                    prod_name character varying(60),
                                    prod_category_id integer,
                                    prod_amount integer,
                                    prod_price character varying(100),
                                    prod_price_current character varying(100),
                                    prod_price_starting character varying(100),
                                    prod_price_highest character varying(100),
                                    prod_price_step character varying(100),
                                    prod_price_holder integer,
                                    prod_seller_id integer,
                                    prod_description text,
                                    prod_status integer DEFAULT 0,
                                    prod_created_date character varying(100),
                                    prod_updated_date character varying(100),
                                    prod_end_date character varying(100),
                                    prod_auto_extend integer,
                                    prod_main_image text,
                                    ts tsvector GENERATED ALWAYS AS (setweight(to_tsvector('english'::regconfig, (COALESCE(prod_name, ''::character varying))::text), 'A'::"char")) STORED
);


ALTER TABLE public.tbl_product OWNER TO postgres;

--
-- Name: tbl_product_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_product_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_product_history_id_seq OWNER TO postgres;

--
-- Name: tbl_product_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_product_history (
                                            his_id integer DEFAULT nextval('public.tbl_product_history_id_seq'::regclass) NOT NULL,
                                            his_product_id integer NOT NULL,
                                            his_account_id integer,
                                            his_price character varying(100),
                                            his_status integer DEFAULT 0,
                                            his_created_date character varying(100),
                                            his_updated_date character varying(100)
);


ALTER TABLE public.tbl_product_history OWNER TO postgres;

--
-- Name: tbl_product_image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_product_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_product_image_id_seq OWNER TO postgres;

--
-- Name: tbl_product_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_product_images (
                                           prod_img_id integer DEFAULT nextval('public.tbl_product_image_id_seq'::regclass) NOT NULL,
                                           prod_img_product_id integer NOT NULL,
                                           prod_img_data text,
                                           prod_img_status integer DEFAULT 0
);


ALTER TABLE public.tbl_product_images OWNER TO postgres;

--
-- Name: tbl_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_roles (
                                  rol_id character varying(5) NOT NULL,
                                  rol_name character varying(50),
                                  rol_status integer DEFAULT 0,
                                  rol_create_date date,
                                  rol_update_date date
);


ALTER TABLE public.tbl_roles OWNER TO postgres;

--
-- Data for Name: tbl_account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_account (acc_id, acc_password, acc_token, acc_email, acc_phone_number, acc_full_name, acc_role, acc_avatar, acc_status, acc_created_date, acc_updated_date, acc_token_forgot, acc_refresh_token, acc_rating_score, acc_is_upgrade, acc_exp_upgrade, acc_birthday, acc_like_bidder, acc_dis_like_bidder, acc_like_seller, acc_dis_like_seller) FROM stdin;
3	$2b$04$hivdEPMJKZT9nDcYOIR4ne.NImgBehfOpFbez4nrCyQ79LSKfVEt2		vsthien1212@gmail.com	0123456789	Lê Thanh Bình	SEL	\N	0	2021-10-09 12:00:00	2021-11-15 08:54:43	\N	lKKzvFeCMnEC7Uufc83e3xXeqeEu7QO1FE6KBXuGgr4OXkXCtOwP3xBNUpzT7HtUoe5QIJZyCWRztmecsy0MmtRgm5uJTLN2f42W	0	\N	\N	1999-01-10	8	2	2	0
1	$2b$04$1xLCWvMndShcC7Dx2A3jDe.N41klZTK.eHqt9QICi87nG5PVDcrm.		vosithien12345@gmail.com	012345678	Trần Minh Chủ	ADM	\N	0	2021-10-09 12:00:00	\N	\N	Q1pSlyrHzApcmyDv9CLNKF0Gpq7v9DpmQVTWf6mG2qkxvwHeOtM5JCtzFgxoxv9IM1qQq8RGpQLpxGxVYgDfOLl9YHp1S1c7erad	0	\N	\N	1999-01-02	8	2	1	0
2	$2b$04$1xLCWvMndShcC7Dx2A3jDe.N41klZTK.eHqt9QICi87nG5PVDcrm.		vosithien1551999@gmail.com	012345678	Lên Văn Tính	BID	\N	0	2021-10-09 12:00:00	\N	\N	nYJE9H5kC9eT8aF8TYuLTnC6GLVaDxHo5TVQKMf574qrh9vkauNXUUBvZKIzeOXMpYRppq1Q4JvQI9kW5wvj8FtedqFpHpiOvPYv	0	\N	\N	1999-01-02	8	2	\N	\N
4	$2a$12$x0129Q5nr6.VBmti1lpFMe6eTJoGfwt4Er/5tYCmEJOMOE.nldMSe		mennguyenbid@gmail.com	012345678	Lên Văn Tính	BID	\N	0	2021-10-09 12:00:00	\N	\N	nYJE9H5kC9eT8aF8TYuLTnC6GLVaDxHo5TVQKMf574qrh9vkauNXUUBvZKIzeOXMpYRppq1Q4JvQI9kW5wvj8FtedqFpHpiOvPYv	0	\N	\N	1999-01-02	8	2	\N	\N
5	$2a$12$x0129Q5nr6.VBmti1lpFMe6eTJoGfwt4Er/5tYCmEJOMOE.nldMSe		mennguyensel@gmail.com	012345678	Lên Văn Tính	SEL	\N	0	2021-10-09 12:00:00	\N	\N	nYJE9H5kC9eT8aF8TYuLTnC6GLVaDxHo5TVQKMf574qrh9vkauNXUUBvZKIzeOXMpYRppq1Q4JvQI9kW5wvj8FtedqFpHpiOvPYv	0	\N	\N	1999-01-02	8	2	\N	\N
6	$2a$12$x0129Q5nr6.VBmti1lpFMe6eTJoGfwt4Er/5tYCmEJOMOE.nldMSe		mennguyenadm@gmail.com	012345678	Lên Văn Tính	ADM	\N	0	2021-10-09 12:00:00	\N	\N	nYJE9H5kC9eT8aF8TYuLTnC6GLVaDxHo5TVQKMf574qrh9vkauNXUUBvZKIzeOXMpYRppq1Q4JvQI9kW5wvj8FtedqFpHpiOvPYv	0	\N	\N	1999-01-02	8	2	\N	\N
7	$2a$12$x0129Q5nr6.VBmti1lpFMe6eTJoGfwt4Er/5tYCmEJOMOE.nldMSe		giaovienAdm@gmail.com	012345678	Ngô Ngọc Đăng Khoa	ADM	\N	0	2021-10-09 12:00:00	\N	\N	nYJE9H5kC9eT8aF8TYuLTnC6GLVaDxHo5TVQKMf574qrh9vkauNXUUBvZKIzeOXMpYRppq1Q4JvQI9kW5wvj8FtedqFpHpiOvPYv	0	\N	\N	1999-01-02	8	2	\N	\N
\.


--
-- Data for Name: tbl_account_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_account_comments (acom_id, acom_note, acom_assessor, acom_receiver, acom_product_id, acom_status_rating, acom_created_date, acom_updated_date) FROM stdin;
16	Nhận hàng	3	2	52	0	2021-10-09 12:00:00	\N
18	Sản phẩm rất tốt	2	3	52	0	2021-11-15 15:31:17	\N
\.


--
-- Data for Name: tbl_account_request; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_account_request (are_acc_id, are_verifier, are_request, are_status, are_created_date, are_updated_date) FROM stdin;
\.


--
-- Data for Name: tbl_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_categories (cate_id, cate_name, cate_status, cate_father, cate_created_date, cate_updated_date) FROM stdin;
16	Điện tử	0	\N	2021-11-15T08:42:41.113+07:00	2021-11-15T08:42:41.113+07:00
17	Thời trang	0	\N	2021-11-15T08:46:48.371+07:00	2021-11-15T08:46:48.371+07:00
18	Bếp	0	\N	2021-11-15T08:48:52.102+07:00	2021-11-15T08:48:52.102+07:00
19	Điện thoại	0	16	2021-11-15T08:49:37.071+07:00	2021-11-15T08:49:37.071+07:00
20	Máy tính	0	16	2021-11-15T08:50:02.305+07:00	2021-11-15T08:50:02.305+07:00
21	Quần Áo	0	17	2021-11-15T08:51:36.027+07:00	2021-11-15T08:51:36.027+07:00
22	Giày	0	17	2021-11-15T08:51:55.113+07:00	2021-11-15T08:51:55.113+07:00
23	Dụng cụ bếp	0	18	2021-11-15T08:53:23.805+07:00	2021-11-15T08:53:23.805+07:00
\.


--
-- Data for Name: tbl_favorite_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_favorite_product (fav_id, fav_product_id, fav_account_id) FROM stdin;
40	43	3
41	42	3
43	43	2
44	47	2
\.


--
-- Data for Name: tbl_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_product (prod_id, prod_name, prod_category_id, prod_amount, prod_price, prod_price_current, prod_price_starting, prod_price_highest, prod_price_step, prod_price_holder, prod_seller_id, prod_description, prod_status, prod_created_date, prod_updated_date, prod_end_date, prod_auto_extend, prod_main_image) FROM stdin;
43	Iphone 13	19	\N	20000000	14000000	10000000	14000000	1000000	2	3	<p>IPhone 13 Hệ thống camera kép tiên tiến nhất từng có trên iPhone. Chip A15 Bionic thần tốc. Bước nhảy vọt về thời lượng pin. Thiết kế bền bỉ. Mạng 5G siêu nhanh. Cùng với màn hình Super Retina XDR sáng hơn. </p><p>• Màn hình Super Retina XDR 6.1 inch</p><p> • Chế độ Điện Ảnh làm tăng thêm độ sâu trường ảnh nông và tự động thay đổi tiêu cự trong video </p><p>• Hệ thống camera kép tiên tiến với camera Wide và Ultra Wide 12MP; Phong Cách Nhiếp Ảnh, HDR thông minh thế hệ 4, chế độ Ban Đêm, khả năng quay video HDR Dolby Vision 4K</p><p> • Camera trước TrueDepth 12MP với chế độ Ban Đêm và khả năng quay video HDR Dolby Vision 4K </p><p>• Chip A15 Bionic cho hiệu năng thần tốc</p><p>• Thời gian xem video lên đến 19 giờ </p><p>• Thiết kế bền bỉ với Ceramic Shield </p><p>• Khả năng chống nước đạt chuẩn IP68 đứng đầu thị trường4 </p><p>• Mạng 5G cho tốc độ tải xuống siêu nhanh, xem video và nghe nhạc trực tuyến chất lượng cao • iOS 15 tích hợp nhiều tính năng mới cho phép bạn làm được nhiều việc hơn bao giờ hết với iPhone </p>	0	2021-11-15 09:59:34	2021-11-15 09:59:34	2021-12-12 09:57:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636945175/ykpm0iflobgzktglybiq.jpg
52	Quần jean	21	\N	1200000	550000	300000	600000	100000	2	3	<p>Vải siêu mềm</p><p>Vải nhẹ, bền, không phai màu</p><p>Bảo hành uy tín</p>	1	2021-11-15 10:55:58	2021-11-15 10:55:58	2021-11-10 13:00:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636948558/siveyz4tvpmdy1op2ho5.jpg
48	Laptop Asus Zenbook UX425EA	20	\N	18000000	12000000	10000000	12000000	1000000	2	3	<p>Vẻ ngoài sang trọng, gọn nhẹ thuận tiện cho khả năng di chuyển đã tạo nên thương hiệu của dòng Zenbook của ASUS. Hôm nay, ASUS mang đến sản phẩm notebook sở hữu tất cả điểm mạnh trên với tên <strong>ASUS ZenBook UX425EA KI817T.</strong></p><p><strong>Thiết kế sang trọng, lịch lãm và mỏng nhẹ</strong></p><p>Sở hữu một thiết kế bên ngoài vô cùng bắt mắt của dòng Zenbook xưa nay, chiếc máy được tô điểm thêm bằng lớp sơn xám thông đem đến sự sang trọng từ những ánh nhìn. Mặt ngoài của ASUS ZenBook UX425EA KI817T tạo nên điểm nhấn vô cùng đặc khi vòm ánh sáng được quy tụ vào logo ASUS ánh bạc khẳng định nên thương hiệu của dòng notebook cao cấp này. Hướng đến sự thuận tiện khi làm việc trong môi trường văn phòng, ASUS ZenBook UX425EA KI817T có trọng lượng chỉ 1.17 kg và độ mỏng chỉ 1.39 cm, bạn có thể sử dụng chiếc laptop này chỉ bằng 1 tay.</p>	0	2021-11-15 10:34:31	2021-11-15 10:34:31	2021-12-16 10:33:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636947273/ytz2w4nmwfpxkbymdha6.jpg
55	Giày thể thao	22	\N	2000000	550000	300000	550000	100000	2	3	<p>Siêu thời trang, siêu bền bỉ</p><p>Chính hãng Nike</p>	0	2021-11-15 11:10:12	2021-11-15 11:10:12	2021-12-12 11:09:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949413/oxgy5tt6vhc0iqmigiyg.jpg
62	Nồi đất	23	\N	1000000	500000	300000	500000	100000	2	3	<p>Nồi chiệu nhiệt cao</p><p>Không bong tróc</p><p>Không chất độc hại</p>	0	2021-11-15 11:41:09	2021-11-15 11:41:09	2021-12-12 11:39:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636951269/r0gpjbrpevls4gumcepl.jpg
44	OPPO Find X2	19	\N	6000000	2700000	2000000	2800000	100000	2	3	<p><strong>Từng đường nét lấp lánh, tỏa sáng</strong> </p><p>Điện Thoại Oppo Reno 5G (8GB/128G) có cấu tạo các khung viền xung quanh hoàn toàn bằng kim loại cao cấp, mặt lưng làm từ kính. Chiếc điện thoại được thiết kế tổng thể nguyên khối vô cùng rắn chắc và bo cong mềm mại ở 4 góc, mang đến người dùng cảm giác cầm nắm thoải mái nhất.</p><p></p><figure> </figure><p></p>	0	2021-11-15 10:09:51	2021-11-15 10:09:51	2021-12-09 10:09:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636945792/y9ddidp8r0jubmsxqcxp.jpg
60	Chảo inox	23	\N	1500000	500000	300000	500000	100000	2	3	<p>Chảo chống dính Inox 304 Elmich Premium được làm từ Inox 304, chống ăn mòn cao, không tác dụng với thức ăn, không thôi nhiễm, giải phóng các chất độc hại, tuyệt đối an toàn cho sức khỏe<br/>- Cấu trúc 3 lớp đáy giúp truyền và giữ nhiệt tối ưu<br/>- Quai cán bằng inox tán đinh chắc chắn<br/>- Chảo sử dụng lớp chống dính cao cấp Whitford Eclipse, chịu được 34.000 lần chà nhám</p><p>Sản phẩm ĐẠT TIÊU CHUẨN CHẤT LƯỢNG CHÂU ÂU<br/>Thương hiệu : Elmich<br/>Xuất xứ : Cộng hòa Séc<br/>Chất liệu : Inox 304 cao cấp<br/>Màu sắc : Bạc<br/>Nắp vung Kinh cường lực chịu nhiệt<br/>Kích thước: 1 chảo rán 26cm – cao 5,5cm ( cả quai 45cm )<br/>Trọng lượng : 0.8kg<br/>Bảo hành 05 năm chính hãng </p>	0	2021-11-15 11:31:47	2021-11-15 11:31:47	2021-12-12 11:30:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950708/jaycqmkc57rljgxsnabg.jpg
56	Giày thời trang	22	\N	1000000	500000	300000	500000	100000	2	3	<p>Hot nhật hiện nay, sản phẩm mới</p><p>Sản phẩm giới hạn</p><p>Chất lượng không thể tốt hơn</p>	0	2021-11-15 11:15:07	2021-11-15 11:15:07	2021-12-12 11:14:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949708/idkbpql8cdodxaujyqw7.jpg
57	Giày leo núi	22	\N	2000000	500000	300000	500000	100000	2	3	<p>Giày leo núi chuyên nghiệp</p><p>Đế siêu cứng, siêu bền</p><p>Đạt chất lượng Mỹ</p><p>Tấm lót siêu êm</p>	0	2021-11-15 11:19:10	2021-11-15 11:19:10	2021-12-12 11:17:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949952/ifvgbais49bseg770rur.jpg
53	Quần jean cao cấp	21	\N	1500000	500000	300000	500000	100000	2	3	<p>Chính hãng của Mỹ</p><p>Siêu bền bỉ, vải mềm, nhẹ</p>	0	2021-11-15 11:00:09	2021-11-15 11:00:09	2021-12-12 10:59:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636948810/c5lodcmym3kgiffsvrbs.jpg
47	MSI GF63	20	\N	20000000	13000000	10000000	13000000	1000000	2	3	<p>MSI GF63 có CPU i7 thế hệ thứ 11 và SSD cực nhanh. Cung cấp khả năng tính toán tuyệt vời, thời gian khởi động ngay lập tức.</p><p>Đồ họa NVIDIA mang lại hiệu năng tốt hơn, lý tưởng để chỉnh sửa ảnh, làm lại video và chơi game. Giải phóng sức sáng tạo của bạn với các ứng dụng chỉnh sửa ảnh và video tuyệt đẹp như Adobe® Lightroom® và Premiere® Pro.</p>	0	2021-11-15 10:28:38	2021-11-15 10:28:38	2021-12-11 10:26:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636946918/ikq5sgizizyy15tyjh5g.jpg
50	Laptop Gaming HP Omen 16 b0142TX	20	\N	20000000	13000000	10000000	13000000	1000000	2	3	<p><strong>Thiết kế mới lạ, tinh tế </strong></p><p>Là sản phẩm laptop gaming mới nhất từ HP, Omen 16 mang đến một thiết kế vô cùng trang nhã với mặt A đen bóng cùng logo Omen đặt tại trung tâm của bề mặt, không hầm hố nhưng vẫn rất gaming. </p><p><strong>Hiệu năng chơi game được đưa lên tầm cao mới </strong></p><p>Hướng đến trải nghiệm gaming tuyệt vời nhất, HP đã trang bị cho Omen dòng CPU Intel thế hệ 11 mới nhất hiện nay giúp tối ưu hóa khả năng xử lý cùng chiếc card đồ họa NVIDIA RTX 3050 Ti. Tất cả được kết hợp lại trên HP Omen 16 đem lại khả năng gaming tuyệt vời nhất và hứa hẹn sánh vai cùng các model laptop gaming cùng phân khúc.</p>	0	2021-11-15 10:43:57	2021-11-15 10:43:57	2021-12-13 10:43:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636947838/lzf7l2f6dzssqsjycyd7.jpg
41	SamSung S9	19	\N	10000000	7200000	5000000	7400000	300000	2	3	<p>Điện thoại chính hãng, Nguyên seal, Mới 100%, Chưa Active Miễn phí giao hàng toàn quốc Thiết kế: Nguyên khối, màn hình vô cực Màn hình: 5.8&quot;, 2K+ (1440 x 2960 Pixels) Camera Trước/Sau: 8MP/12MP CPU: Exynos 9810 8 nhân 64 bit, 4 nhân 2.8 GHz &amp; 4 nhân 1.7 GHz Bộ Nhớ: 64GB RAM: 4GB Tính năng: Chống nước, chống bụi đạt chuẩn IP68</p>	0	2021-11-15 09:21:16	2021-11-15 09:21:16	2021-12-12 09:21:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636942877/e1hhyvmld16b5we7dqhb.jpg
54	Áo jean	21	\N	1300000	500000	300000	500000	100000	2	3	<p>Siêu thời trang</p><p>Bảo hành 2 năm</p><p>Cam kết chính hãng</p>	0	2021-11-15 11:05:26	2021-11-15 11:05:26	2021-12-12 11:03:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949127/ig0hrjmfpr3jfdwarupr.jpg
51	Áo thun	21	\N	1000000	500000	300000	500000	100000	2	3	<p>Siêu bền, siêu giãn</p><p>Bảo hành 10 tháng</p>	0	2021-11-15 10:49:58	2021-11-15 10:49:58	2021-12-10 10:47:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636948198/rfvylxxow3l1nolh21hd.jpg
58	Giày nữ cá tính	22	\N	1000000	500000	300000	500000	100000	2	3	<p>Siêu dễ thương, siêu thời trang</p><p>Không bạc màu, sản phẩm yêu thích của học sinh</p><p></p>	0	2021-11-15 11:23:16	2021-11-15 11:23:16	2021-12-12 11:22:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950196/zauntljvjnrxwsl2z3uz.jpg
59	Nồi inox	23	\N	2000000	500000	400000	500000	100000	2	3	<p><strong>TÍNH NĂNG NỔI BẬT: </strong></p><p>Chất liệu inox cao cấp sáng bóng, giúp bạn dễ dàng lau chùi, vệ sinh. </p><p>Vung kính cường lực, trong suốt có thể quan sát được thực phẩm bên trong. </p><p>Quai nồi được làm bằng inox đặc, chịu lực tốt, dễ dàng di chuyển trong quá trình sử dụng. </p><p>Không bị oxy hóa, có độ bền cao, không han gỉ nên rất an toàn cho sức khỏe người sử dụng. </p><p>Đáy nồi có cấu tạo 5 lớp nên truyền nhiệt nhanh, tỏa nhiệt đều và giữ nhiệt tốt, tiết kiệm nhiên liệu và thời gian nấu nướng. Với 3 loại kích cỡ, sử dụng được với mọi loại bếp nên phù hợp với nhu cầu của mọi gia đình.</p>	0	2021-11-15 11:27:55	2021-11-15 11:27:55	2021-12-12 11:27:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950476/p1w3ks7d1hd8lrd72fs9.jpg
42	Iphone X	19	\N	15000000	11000000	6000000	12000000	1000000	2	3	<p>iPhone 10 Hệ thống camera kép tiên tiến nhất từng có trên iPhone. Chip A15 Bionic thần tốc. Bước nhảy vọt về thời lượng pin. Thiết kế bền bỉ. Mạng 5G siêu nhanh. Cùng với màn hình Super Retina XDR sáng hơn. </p><p>• Màn hình Super Retina XDR 6.1 inch • Chế độ Điện Ảnh làm tăng thêm độ sâu trường ảnh nông và tự động thay đổi tiêu cự trong video </p><p>• Hệ thống camera kép tiên tiến với camera Wide và Ultra Wide 12MP; Phong Cách Nhiếp Ảnh, HDR thông minh thế hệ 4, chế độ Ban Đêm, khả năng quay video HDR Dolby Vision 4K</p><p> • Camera trước TrueDepth 12MP với chế độ Ban Đêm và khả năng quay video HDR Dolby Vision 4K • Chip A15 Bionic cho hiệu năng thần tốc</p><p> • Thời gian xem video lên đến 19 giờ </p><p>• Thiết kế bền bỉ với Ceramic Shield • Khả năng chống nước đạt chuẩn IP68 đứng đầu thị trường4 • Mạng 5G cho tốc độ tải xuống siêu nhanh, xem video và nghe nhạc trực tuyến chất lượng cao • iOS 15 tích hợp nhiều tính năng mới cho phép bạn làm được nhiều việc hơn bao giờ hết với iPhone</p>	0	2021-11-15 09:34:48	2021-11-15 09:34:48	2021-12-12 09:34:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636943689/cqgpp5umg93tra9v6kpy.jpg
46	Laptop Dell Vostro 3500	20	\N	19000000	13000000	10000000	13000000	1000000	2	3	<p>Dell Vostro 15 3500 là sản phẩm máy tính phù hợp với mọi người làm văn phòng. Cấu hình máy ổn định, dư sức xử lý nhanh mọi công việc từ Word, Excel cho tới chỉnh sửa ảnh, thiết kế đồ họa 2D, 3D nhẹ nhàng. Làm việc mượt mà, cày khỏe tác vụ đồ họa Với sức mạnh của chip Intel thế hệ 11 mới nhất, xung nhịp lên đến 4.1GHz cho phép bạn giải quyết mọi công việc chỉ trong chớp mắt. Không chỉ vậy, con chip này còn sở hữu lõi Willow Cove giúp tiết kiệm điện năng tối đa, kéo dài thời gian sử dụng cho một lần sạc. RAM 8GB đưa tới khả năng làm việc đa nhiệm mượt. Bạn có thể mở cùng lúc 10 ứng dụng mà máy không hề bị lag. Còn gì tuyệt hơn khi vừa làm việc vừa nghe nhạc trên Youtube, thỉnh thoảng chiến trận game giải trí? Dell Vostro 15 3500 còn hỗ trợ khe RAM tối đa lên đến 32GB giúp bạn dễ dàng nâng cấp. Ổ cứng SSD 256GB đảm bảo duy trì tốc độ xử lý công việc của hệ thống luôn nhanh. Dung lượng ổ cứng này còn giúp bạn có được không gian lưu trữ lớn, thoải mái sao lưu các tệp tài liệu quan trọng.</p>	0	2021-11-15 10:24:38	2021-11-15 10:24:38	2021-12-06 10:22:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636946679/cuynv4kxsnqqegzu8hgl.jpg
61	Bếp gas	23	\N	900000	400000	300000	400000	100000	2	3	<p>Như số liệu hệ thống đã thống kê, sản phẩm </p><p>BẾP GA SIÊU MỎNG WATASHI WA-7011K AT thương hiệu No Brand hiện đang được đăng bán trực tuyến Sendo. </p><p>Quý khách hàng có thể mua được sản phẩm BẾP GA SIÊU MỎNG WATASHI WA-7011K AT ở: Toàn quốc, Hồ Chí Minh (TP.HCM - Sài Sòn), Hà Nội, Đà Nẵng, Cần Thơ, v.v... thông qua kênh bán hàng Online của Sendo Nơi bán BẾP GA SIÊU MỎNG WATASHI WA-7011K AT uy tín với giá rẻ nhất là 440,000 đ tại cửa hàng Shop điện tử EH. bigomart.info đã và đang là đơn vị báo giá cung cấp thông tin nơi bán, giá và chất lượng sản phẩm tốt nhất thị trường, đánh giá uy tín, xác thực thông tin từ các cửa hàng. </p><p>Chúng tôi tổng hợp sản phẩm chất lượng giảm giá, khuyến mại gửi tới khách hàng những lựa chọn tốt nhất. Nếu bạn phát hiện ra cửa hàng nào bán sai giá, có chất lượng sản phẩm, thái độ phục vụ không tốt, có thể phản ánh lại cho bigomart.info để chúng tôi gỡ bỏ sản phẩm và điều chỉnh chính xác đem lại lợi ích tốt nhất mua được rẻ nhất tới khách hàng. Hãy đặt hàng BẾP GA SIÊU MỎNG WATASHI WA-7011K AT qua Website trung gian Lazada, Shopee, Tiki hoặc Sendo... bằng cách kéo lên trên và chọn Tới Nơi Bán hoặc So sánh giá để được giá tốt và nhận nhiều ưu đãi nhất.</p>	0	2021-11-15 11:36:26	2021-11-15 11:36:26	2021-12-12 11:35:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950987/so7t4mabyxzd7vj88sej.jpg
\.


--
-- Data for Name: tbl_product_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_product_history (his_id, his_product_id, his_account_id, his_price, his_status, his_created_date, his_updated_date) FROM stdin;
209	51	2	350000	0	2021-11-15 15:02:41	\N
208	51	2	300000	0	2021-11-15 15:02:36	\N
211	51	2	450000	0	2021-11-15 15:02:55	\N
210	51	2	400000	0	2021-11-15 15:02:48	\N
212	51	2	500000	1	2021-11-15 15:03:01	\N
153	43	2	10000000	0	2021-11-15 11:50:56	\N
155	43	2	11500000	0	2021-11-15 11:51:38	\N
154	43	2	13000000	0	2021-11-15 11:51:17	\N
156	43	2	14000000	1	2021-11-15 11:52:02	\N
157	43	2	13500000	0	2021-11-15 11:52:39	\N
158	42	2	6000000	0	2021-11-15 11:54:06	\N
160	42	2	8000000	0	2021-11-15 11:54:34	\N
159	42	2	9000000	0	2021-11-15 11:54:25	\N
161	42	2	12000000	1	2021-11-15 12:03:08	\N
162	42	2	11000000	0	2021-11-15 12:03:25	\N
163	41	2	5000000	0	2021-11-15 12:09:06	\N
165	41	2	6000000	0	2021-11-15 12:09:56	\N
166	41	2	6300000	0	2021-11-15 12:11:20	\N
164	41	2	6900000	0	2021-11-15 12:09:35	\N
167	41	2	7400000	1	2021-11-15 12:11:43	\N
168	44	2	2000000	0	2021-11-15 12:14:08	\N
170	44	2	2200000	0	2021-11-15 12:14:26	\N
169	44	2	2500000	0	2021-11-15 12:14:18	\N
171	44	2	2800000	1	2021-11-15 12:14:40	\N
172	44	2	2700000	0	2021-11-15 12:14:48	\N
173	47	2	10000000	0	2021-11-15 14:50:56	\N
174	47	2	11000000	0	2021-11-15 14:51:05	\N
176	47	2	11000000	0	2021-11-15 14:51:28	\N
175	47	2	12000000	0	2021-11-15 14:51:18	\N
177	47	2	13000000	1	2021-11-15 14:51:38	\N
178	50	2	10000000	0	2021-11-15 14:53:12	\N
179	50	2	11000000	0	2021-11-15 14:53:22	\N
181	50	2	11000000	0	2021-11-15 14:53:34	\N
180	50	2	12000000	0	2021-11-15 14:53:28	\N
182	50	2	13000000	1	2021-11-15 14:53:40	\N
183	46	2	10000000	0	2021-11-15 14:55:10	\N
184	46	2	11000000	0	2021-11-15 14:55:18	\N
186	46	2	11100000	0	2021-11-15 14:55:39	\N
185	46	2	12000000	0	2021-11-15 14:55:23	\N
187	46	2	13000000	1	2021-11-15 14:55:45	\N
188	48	2	10000000	0	2021-11-15 14:56:48	\N
190	48	2	11500000	0	2021-11-15 14:57:01	\N
189	48	2	11000000	0	2021-11-15 14:56:55	\N
191	48	2	12000000	1	2021-11-15 14:57:06	\N
192	48	2	12500000	0	2021-11-15 14:57:20	\N
193	53	2	300000	0	2021-11-15 14:58:54	\N
195	53	2	350000	0	2021-11-15 14:59:08	\N
196	53	2	450000	0	2021-11-15 14:59:14	\N
194	53	2	400000	0	2021-11-15 14:59:02	\N
197	53	2	500000	1	2021-11-15 14:59:20	\N
199	54	2	350000	0	2021-11-15 15:00:21	\N
198	54	2	300000	0	2021-11-15 15:00:12	\N
200	54	2	400000	0	2021-11-15 15:00:30	\N
201	54	2	500000	1	2021-11-15 15:00:37	\N
202	54	2	450000	0	2021-11-15 15:00:43	\N
203	52	2	350000	0	2021-11-15 15:01:08	\N
204	52	2	450000	0	2021-11-15 15:01:26	\N
205	52	2	600000	1	2021-11-15 15:01:39	\N
206	52	2	420000	0	2021-11-15 15:01:47	\N
207	52	2	400000	0	2021-11-15 15:02:13	\N
213	55	2	300000	0	2021-11-15 15:03:34	\N
215	55	2	500000	0	2021-11-15 15:03:45	\N
214	55	2	450000	0	2021-11-15 15:03:39	\N
216	55	2	550000	1	2021-11-15 15:03:52	\N
217	55	2	600000	0	2021-11-15 15:03:58	\N
219	57	2	350000	0	2021-11-15 15:04:57	\N
218	57	2	300000	0	2021-11-15 15:04:50	\N
220	57	2	400000	0	2021-11-15 15:05:02	\N
221	57	2	500000	1	2021-11-15 15:05:17	\N
222	57	2	450000	0	2021-11-15 15:05:22	\N
223	57	2	420000	0	2021-11-15 15:05:28	\N
225	56	2	320000	0	2021-11-15 15:06:52	\N
224	56	2	300000	0	2021-11-15 15:06:47	\N
227	56	2	450000	0	2021-11-15 15:07:03	\N
226	56	2	400000	0	2021-11-15 15:06:57	\N
228	56	2	500000	1	2021-11-15 15:07:10	\N
230	58	2	324000	0	2021-11-15 15:08:05	\N
229	58	2	300000	0	2021-11-15 15:07:55	\N
232	58	2	450000	0	2021-11-15 15:08:16	\N
231	58	2	400000	0	2021-11-15 15:08:11	\N
233	58	2	500000	1	2021-11-15 15:08:21	\N
234	59	2	300000	0	2021-11-15 15:08:57	\N
235	59	2	340000	0	2021-11-15 15:09:04	\N
236	59	2	400000	0	2021-11-15 15:09:09	\N
237	59	2	500000	1	2021-11-15 15:09:23	\N
238	59	2	550000	0	2021-11-15 15:09:30	\N
239	60	2	300000	0	2021-11-15 15:10:11	\N
241	60	2	330000	0	2021-11-15 15:10:26	\N
240	60	2	400000	0	2021-11-15 15:10:22	\N
242	60	2	500000	1	2021-11-15 15:10:31	\N
243	60	2	430000	0	2021-11-15 15:10:37	\N
245	62	2	340000	0	2021-11-15 15:11:55	\N
244	62	2	300000	0	2021-11-15 15:11:47	\N
247	62	2	450000	0	2021-11-15 15:12:04	\N
246	62	2	400000	0	2021-11-15 15:11:59	\N
248	62	2	500000	1	2021-11-15 15:12:09	\N
250	61	2	330000	0	2021-11-15 15:12:30	\N
251	61	2	390000	0	2021-11-15 15:12:35	\N
249	61	2	300000	0	2021-11-15 15:12:25	\N
252	61	2	400000	1	2021-11-15 15:12:40	\N
253	61	2	330000	0	2021-11-15 15:12:51	\N
\.


--
-- Data for Name: tbl_product_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_product_images (prod_img_id, prod_img_product_id, prod_img_data, prod_img_status) FROM stdin;
70	42	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636943689/cqgpp5umg93tra9v6kpy.jpg	0
71	42	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636943690/wtbiyjgqmevuotz9ekuu.jpg	0
72	42	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636943690/tspsahk8f1bcswqvjn9u.png	0
73	43	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636945175/ykpm0iflobgzktglybiq.jpg	0
74	43	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636945175/m10ynwrpaub5wr0s9guw.jpg	0
75	43	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636945176/p0une1njnxbysjvt1avy.jpg	0
76	44	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636945792/y9ddidp8r0jubmsxqcxp.jpg	0
77	44	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636945792/ihcj5t1dmcy7wohye8jr.jpg	0
78	44	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636945794/y9ybiooytrqpdmxyn1kh.png	0
82	46	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636946679/cuynv4kxsnqqegzu8hgl.jpg	0
83	46	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636946679/o7alzfoi1bht5tl0ga6x.jpg	0
84	46	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636946679/mwt7ojnhx1wczvi1394t.jpg	0
85	47	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636946918/ikq5sgizizyy15tyjh5g.jpg	0
86	47	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636946918/qypdapbsf5tsovfqyj83.jpg	0
87	47	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636946919/ptngav1ynaqirr9guoma.jpg	0
88	48	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636947273/ytz2w4nmwfpxkbymdha6.jpg	0
89	48	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636947274/pcqkpxrdx1oy5n7ur7fm.jpg	0
90	48	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636947274/skfhj04sfyhyzm1p1vvz.jpg	0
94	50	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636947838/lzf7l2f6dzssqsjycyd7.jpg	0
95	50	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636947838/ezmfv4xuyj4n2lewimus.jpg	0
96	50	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636947838/y8i25xxvzcho9prsxzpg.jpg	0
97	51	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636948198/rfvylxxow3l1nolh21hd.jpg	0
98	51	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636948199/nvewghchv4tr98cvblpn.jpg	0
99	51	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636948199/h2czj5lkcuzlbox8nhsi.jpg	0
100	52	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636948558/siveyz4tvpmdy1op2ho5.jpg	0
101	52	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636948559/okorqwb9paccisizbb4r.jpg	0
102	52	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636948559/izbtjjl2fjnuyw32weo9.jpg	0
103	53	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636948810/c5lodcmym3kgiffsvrbs.jpg	0
104	53	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636948811/z916q3gzb7o0hdkmcxwp.jpg	0
105	53	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636948811/zhvd80iphinftqawy5gr.jpg	0
106	54	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949127/ig0hrjmfpr3jfdwarupr.jpg	0
107	54	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949128/zfs0phy2xth19zd3pe24.jpg	0
108	54	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949128/mtjf65ogt6wpkdy5kbmr.jpg	0
109	55	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949413/oxgy5tt6vhc0iqmigiyg.jpg	0
110	55	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949413/j1hohghtmmhr5fo7eabx.jpg	0
111	55	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949414/ayqw5dd02t3sjpqnudya.jpg	0
112	56	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949708/idkbpql8cdodxaujyqw7.jpg	0
113	56	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949709/ihty44wa6tbo00qs1fqf.jpg	0
114	56	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949709/ycduipshtlxhkfqtadwc.jpg	0
115	57	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949952/ifvgbais49bseg770rur.jpg	0
116	57	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949952/wm0rmeapwl8kzbwdbujk.jpg	0
117	57	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949952/hmwxvvtsxmgfkii6jvqx.jpg	0
118	58	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950196/zauntljvjnrxwsl2z3uz.jpg	0
119	58	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950196/tdpbzcwlemhytuvoxopx.jpg	0
120	58	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950196/lidin1dpgbuj6fdlfltd.jpg	0
121	59	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950476/p1w3ks7d1hd8lrd72fs9.jpg	0
122	59	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950476/dcjcjzm4oiq42bixubgo.jpg	0
123	59	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950476/pmdtxzi5phg3clyip2xm.jpg	0
124	60	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950708/jaycqmkc57rljgxsnabg.jpg	0
125	60	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950708/do7jy8x4r9jzhgdjsldc.jpg	0
126	60	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950709/ymxy4lvagpxgeusslhip.jpg	0
127	61	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950987/so7t4mabyxzd7vj88sej.jpg	0
128	61	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950987/uubaev3od2nlaeidfbbk.jpg	0
129	61	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950987/hugrrlyouejzwtpac7tf.jpg	0
130	62	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636951269/r0gpjbrpevls4gumcepl.jpg	0
131	62	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636951269/pjmihui1msqkgu3egby1.jpg	0
132	62	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636951269/efo7czcw9ancvbe7y7pk.jpg	0
67	41	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636942877/e1hhyvmld16b5we7dqhb.jpg	0
68	41	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636942877/jagnu5ekjaoiebpso3gm.jpg	0
69	41	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636942877/mgqrhynqngwezqwz79dr.jpg	0
\.


--
-- Data for Name: tbl_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_roles (rol_id, rol_name, rol_status, rol_create_date, rol_update_date) FROM stdin;
ADM	Admin	0	2021-10-09	\N
BID	Bidder	0	2021-10-09	\N
SEL	Seller	0	2021-10-09	\N
\.


--
-- Name: tbl_account_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_account_comments_id_seq', 18, true);


--
-- Name: tbl_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_account_id_seq', 11, true);


--
-- Name: tbl_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_categories_id_seq', 23, true);


--
-- Name: tbl_favorite_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_favorite_product_id_seq', 45, true);


--
-- Name: tbl_product_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_product_history_id_seq', 253, true);


--
-- Name: tbl_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_product_id_seq', 62, true);


--
-- Name: tbl_product_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_product_image_id_seq', 132, true);


--
-- Name: tbl_account_comments tbl_account_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_account_comments
    ADD CONSTRAINT tbl_account_comments_pkey PRIMARY KEY (acom_id);


--
-- Name: tbl_account tbl_account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_account
    ADD CONSTRAINT tbl_account_pkey PRIMARY KEY (acc_id);


--
-- Name: tbl_account_request tbl_account_request_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_account_request
    ADD CONSTRAINT tbl_account_request_pkey PRIMARY KEY (are_acc_id);


--
-- Name: tbl_categories tbl_categiries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_categories
    ADD CONSTRAINT tbl_categiries_pkey PRIMARY KEY (cate_id);


--
-- Name: tbl_favorite_product tbl_favorite_product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_favorite_product
    ADD CONSTRAINT tbl_favorite_product_pkey PRIMARY KEY (fav_id);


--
-- Name: tbl_product_history tbl_product_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_product_history
    ADD CONSTRAINT tbl_product_history_pkey PRIMARY KEY (his_id);


--
-- Name: tbl_product_images tbl_product_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_product_images
    ADD CONSTRAINT tbl_product_images_pkey PRIMARY KEY (prod_img_id, prod_img_product_id);


--
-- Name: tbl_product tbl_product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_product
    ADD CONSTRAINT tbl_product_pkey PRIMARY KEY (prod_id);


--
-- Name: tbl_roles tbl_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_roles
    ADD CONSTRAINT tbl_roles_pkey PRIMARY KEY (rol_id);


--
-- PostgreSQL database dump complete
--

