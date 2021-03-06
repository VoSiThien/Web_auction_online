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
3	$2b$04$hivdEPMJKZT9nDcYOIR4ne.NImgBehfOpFbez4nrCyQ79LSKfVEt2		vsthien1212@gmail.com	0123456789	L?? Thanh B??nh	SEL	\N	0	2021-10-09 12:00:00	2021-11-15 08:54:43	\N	lKKzvFeCMnEC7Uufc83e3xXeqeEu7QO1FE6KBXuGgr4OXkXCtOwP3xBNUpzT7HtUoe5QIJZyCWRztmecsy0MmtRgm5uJTLN2f42W	0	\N	\N	1999-01-10	8	2	2	0
1	$2b$04$1xLCWvMndShcC7Dx2A3jDe.N41klZTK.eHqt9QICi87nG5PVDcrm.		vosithien12345@gmail.com	012345678	Tr???n Minh Ch???	ADM	\N	0	2021-10-09 12:00:00	\N	\N	Q1pSlyrHzApcmyDv9CLNKF0Gpq7v9DpmQVTWf6mG2qkxvwHeOtM5JCtzFgxoxv9IM1qQq8RGpQLpxGxVYgDfOLl9YHp1S1c7erad	0	\N	\N	1999-01-02	8	2	1	0
2	$2b$04$1xLCWvMndShcC7Dx2A3jDe.N41klZTK.eHqt9QICi87nG5PVDcrm.		vosithien1551999@gmail.com	012345678	L??n V??n T??nh	BID	\N	0	2021-10-09 12:00:00	\N	\N	nYJE9H5kC9eT8aF8TYuLTnC6GLVaDxHo5TVQKMf574qrh9vkauNXUUBvZKIzeOXMpYRppq1Q4JvQI9kW5wvj8FtedqFpHpiOvPYv	0	\N	\N	1999-01-02	8	2	\N	\N
4	$2a$12$x0129Q5nr6.VBmti1lpFMe6eTJoGfwt4Er/5tYCmEJOMOE.nldMSe		mennguyenbid@gmail.com	012345678	L??n V??n T??nh	BID	\N	0	2021-10-09 12:00:00	\N	\N	nYJE9H5kC9eT8aF8TYuLTnC6GLVaDxHo5TVQKMf574qrh9vkauNXUUBvZKIzeOXMpYRppq1Q4JvQI9kW5wvj8FtedqFpHpiOvPYv	0	\N	\N	1999-01-02	8	2	\N	\N
5	$2a$12$x0129Q5nr6.VBmti1lpFMe6eTJoGfwt4Er/5tYCmEJOMOE.nldMSe		mennguyensel@gmail.com	012345678	L??n V??n T??nh	SEL	\N	0	2021-10-09 12:00:00	\N	\N	nYJE9H5kC9eT8aF8TYuLTnC6GLVaDxHo5TVQKMf574qrh9vkauNXUUBvZKIzeOXMpYRppq1Q4JvQI9kW5wvj8FtedqFpHpiOvPYv	0	\N	\N	1999-01-02	8	2	\N	\N
6	$2a$12$x0129Q5nr6.VBmti1lpFMe6eTJoGfwt4Er/5tYCmEJOMOE.nldMSe		mennguyenadm@gmail.com	012345678	L??n V??n T??nh	ADM	\N	0	2021-10-09 12:00:00	\N	\N	nYJE9H5kC9eT8aF8TYuLTnC6GLVaDxHo5TVQKMf574qrh9vkauNXUUBvZKIzeOXMpYRppq1Q4JvQI9kW5wvj8FtedqFpHpiOvPYv	0	\N	\N	1999-01-02	8	2	\N	\N
7	$2a$12$x0129Q5nr6.VBmti1lpFMe6eTJoGfwt4Er/5tYCmEJOMOE.nldMSe		giaovienAdm@gmail.com	012345678	Ng?? Ng???c ????ng Khoa	ADM	\N	0	2021-10-09 12:00:00	\N	\N	nYJE9H5kC9eT8aF8TYuLTnC6GLVaDxHo5TVQKMf574qrh9vkauNXUUBvZKIzeOXMpYRppq1Q4JvQI9kW5wvj8FtedqFpHpiOvPYv	0	\N	\N	1999-01-02	8	2	\N	\N
\.


--
-- Data for Name: tbl_account_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_account_comments (acom_id, acom_note, acom_assessor, acom_receiver, acom_product_id, acom_status_rating, acom_created_date, acom_updated_date) FROM stdin;
16	Nh???n h??ng	3	2	52	0	2021-10-09 12:00:00	\N
18	S???n ph???m r???t t???t	2	3	52	0	2021-11-15 15:31:17	\N
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
16	??i???n t???	0	\N	2021-11-15T08:42:41.113+07:00	2021-11-15T08:42:41.113+07:00
17	Th???i trang	0	\N	2021-11-15T08:46:48.371+07:00	2021-11-15T08:46:48.371+07:00
18	B???p	0	\N	2021-11-15T08:48:52.102+07:00	2021-11-15T08:48:52.102+07:00
19	??i???n tho???i	0	16	2021-11-15T08:49:37.071+07:00	2021-11-15T08:49:37.071+07:00
20	M??y t??nh	0	16	2021-11-15T08:50:02.305+07:00	2021-11-15T08:50:02.305+07:00
21	Qu???n ??o	0	17	2021-11-15T08:51:36.027+07:00	2021-11-15T08:51:36.027+07:00
22	Gi??y	0	17	2021-11-15T08:51:55.113+07:00	2021-11-15T08:51:55.113+07:00
23	D???ng c??? b???p	0	18	2021-11-15T08:53:23.805+07:00	2021-11-15T08:53:23.805+07:00
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
43	Iphone 13	19	\N	20000000	14000000	10000000	14000000	1000000	2	3	<p>IPhone 13 H??? th???ng camera k??p ti??n ti???n nh???t t???ng c?? tr??n iPhone. Chip A15 Bionic th???n t???c. B?????c nh???y v???t v??? th???i l?????ng pin. Thi???t k??? b???n b???. M???ng 5G si??u nhanh. C??ng v???i m??n h??nh Super Retina XDR s??ng h??n. </p><p>??? M??n h??nh Super Retina XDR 6.1 inch</p><p> ??? Ch??? ????? ??i???n ???nh l??m t??ng th??m ????? s??u tr?????ng ???nh n??ng v?? t??? ?????ng thay ?????i ti??u c??? trong video </p><p>??? H??? th???ng camera k??p ti??n ti???n v???i camera Wide v?? Ultra Wide 12MP; Phong C??ch Nhi???p ???nh, HDR th??ng minh th??? h??? 4, ch??? ????? Ban ????m, kh??? n??ng quay video HDR Dolby Vision 4K</p><p> ??? Camera tr?????c TrueDepth 12MP v???i ch??? ????? Ban ????m v?? kh??? n??ng quay video HDR Dolby Vision 4K </p><p>??? Chip A15 Bionic cho hi???u n??ng th???n t???c</p><p>??? Th???i gian xem video l??n ?????n 19 gi??? </p><p>??? Thi???t k??? b???n b??? v???i Ceramic Shield </p><p>??? Kh??? n??ng ch???ng n?????c ?????t chu???n IP68 ?????ng ?????u th??? tr?????ng4 </p><p>??? M???ng 5G cho t???c ????? t???i xu???ng si??u nhanh, xem video v?? nghe nh???c tr???c tuy???n ch???t l?????ng cao ??? iOS 15 t??ch h???p nhi???u t??nh n??ng m???i cho ph??p b???n l??m ???????c nhi???u vi???c h??n bao gi??? h???t v???i iPhone </p>	0	2021-11-15 09:59:34	2021-11-15 09:59:34	2021-12-12 09:57:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636945175/ykpm0iflobgzktglybiq.jpg
52	Qu???n jean	21	\N	1200000	550000	300000	600000	100000	2	3	<p>V???i si??u m???m</p><p>V???i nh???, b???n, kh??ng phai m??u</p><p>B???o h??nh uy t??n</p>	1	2021-11-15 10:55:58	2021-11-15 10:55:58	2021-11-10 13:00:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636948558/siveyz4tvpmdy1op2ho5.jpg
48	Laptop Asus Zenbook UX425EA	20	\N	18000000	12000000	10000000	12000000	1000000	2	3	<p>V??? ngo??i sang tr???ng, g???n nh??? thu???n ti???n cho kh??? n??ng di chuy???n ???? t???o n??n th????ng hi???u c???a d??ng Zenbook c???a ASUS. H??m nay, ASUS mang ?????n s???n ph???m notebook s??? h???u t???t c??? ??i???m m???nh tr??n v???i t??n <strong>ASUS ZenBook UX425EA KI817T.</strong></p><p><strong>Thi???t k??? sang tr???ng, l???ch l??m v?? m???ng nh???</strong></p><p>S??? h???u m???t thi???t k??? b??n ngo??i v?? c??ng b???t m???t c???a d??ng Zenbook x??a nay, chi???c m??y ???????c t?? ??i???m th??m b???ng l???p s??n x??m th??ng ??em ?????n s??? sang tr???ng t??? nh???ng ??nh nh??n. M???t ngo??i c???a ASUS ZenBook UX425EA KI817T t???o n??n ??i???m nh???n v?? c??ng ?????c khi v??m ??nh s??ng ???????c quy t??? v??o logo ASUS ??nh b???c kh???ng ?????nh n??n th????ng hi???u c???a d??ng notebook cao c???p n??y. H?????ng ?????n s??? thu???n ti???n khi l??m vi???c trong m??i tr?????ng v??n ph??ng, ASUS ZenBook UX425EA KI817T c?? tr???ng l?????ng ch??? 1.17 kg v?? ????? m???ng ch??? 1.39 cm, b???n c?? th??? s??? d???ng chi???c laptop n??y ch??? b???ng 1 tay.</p>	0	2021-11-15 10:34:31	2021-11-15 10:34:31	2021-12-16 10:33:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636947273/ytz2w4nmwfpxkbymdha6.jpg
55	Gi??y th??? thao	22	\N	2000000	550000	300000	550000	100000	2	3	<p>Si??u th???i trang, si??u b???n b???</p><p>Ch??nh h??ng Nike</p>	0	2021-11-15 11:10:12	2021-11-15 11:10:12	2021-12-12 11:09:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949413/oxgy5tt6vhc0iqmigiyg.jpg
62	N???i ?????t	23	\N	1000000	500000	300000	500000	100000	2	3	<p>N???i chi???u nhi???t cao</p><p>Kh??ng bong tr??c</p><p>Kh??ng ch???t ?????c h???i</p>	0	2021-11-15 11:41:09	2021-11-15 11:41:09	2021-12-12 11:39:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636951269/r0gpjbrpevls4gumcepl.jpg
44	OPPO Find X2	19	\N	6000000	2700000	2000000	2800000	100000	2	3	<p><strong>T???ng ???????ng n??t l???p l??nh, t???a s??ng</strong> </p><p>??i???n Tho???i Oppo Reno 5G (8GB/128G) c?? c???u t???o c??c khung vi???n xung quanh ho??n to??n b???ng kim lo???i cao c???p, m???t l??ng l??m t??? k??nh. Chi???c ??i???n tho???i ???????c thi???t k??? t???ng th??? nguy??n kh???i v?? c??ng r???n ch???c v?? bo cong m???m m???i ??? 4 g??c, mang ?????n ng?????i d??ng c???m gi??c c???m n???m tho???i m??i nh???t.</p><p></p><figure> </figure><p></p>	0	2021-11-15 10:09:51	2021-11-15 10:09:51	2021-12-09 10:09:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636945792/y9ddidp8r0jubmsxqcxp.jpg
60	Ch???o inox	23	\N	1500000	500000	300000	500000	100000	2	3	<p>Ch???o ch???ng d??nh Inox 304 Elmich Premium?????????c l??m t??? Inox 304, ch???ng ??n m??n cao, kh??ng t??c d???ng v???i th???c ??n, kh??ng th??i nhi???m, gi???i ph??ng c??c ch???t ?????c h???i, tuy???t ?????i an to??n cho s???c kh???e<br/>- C???u tr??c??3 l???p ????y??gi??p truy???n v?? gi??? nhi???t t???i ??u<br/>- Quai c??n b???ng inox t??n ??inh ch???c ch???n<br/>- Ch???o s??? d???ng l???p ch???ng d??nh cao c???p Whitford Eclipse, ch???u ???????c 34.000 l???n ch?? nh??m</p><p>S???n ph???m???????T TI??U CHU???N CH???T L?????NG CH??U ??U<br/>Th????ng hi???u :??Elmich<br/>Xu???t x??? : C???ng h??a S??c<br/>Ch???t li???u : Inox 304 cao c???p<br/>M??u s???c : B???c<br/>N???p vung Kinh c?????ng l???c ch???u nhi???t<br/>K??ch th?????c: 1 ch???o r??n 26cm ??? cao 5,5cm ( c??? quai 45cm )<br/>Tr???ng l?????ng??: 0.8kg<br/>B???o h??nh 05 n??m ch??nh h??ng </p>	0	2021-11-15 11:31:47	2021-11-15 11:31:47	2021-12-12 11:30:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950708/jaycqmkc57rljgxsnabg.jpg
56	Gi??y th???i trang	22	\N	1000000	500000	300000	500000	100000	2	3	<p>Hot nh???t hi???n nay, s???n ph???m m???i</p><p>S???n ph???m gi???i h???n</p><p>Ch???t l?????ng kh??ng th??? t???t h??n</p>	0	2021-11-15 11:15:07	2021-11-15 11:15:07	2021-12-12 11:14:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949708/idkbpql8cdodxaujyqw7.jpg
57	Gi??y leo n??i	22	\N	2000000	500000	300000	500000	100000	2	3	<p>Gi??y leo n??i chuy??n nghi???p</p><p>????? si??u c???ng, si??u b???n</p><p>?????t ch???t l?????ng M???</p><p>T???m l??t si??u ??m</p>	0	2021-11-15 11:19:10	2021-11-15 11:19:10	2021-12-12 11:17:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949952/ifvgbais49bseg770rur.jpg
53	Qu???n jean cao c???p	21	\N	1500000	500000	300000	500000	100000	2	3	<p>Ch??nh h??ng c???a M???</p><p>Si??u b???n b???, v???i m???m, nh???</p>	0	2021-11-15 11:00:09	2021-11-15 11:00:09	2021-12-12 10:59:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636948810/c5lodcmym3kgiffsvrbs.jpg
47	MSI GF63	20	\N	20000000	13000000	10000000	13000000	1000000	2	3	<p>MSI GF63 c?? CPU i7 th??? h??? th??? 11 v?? SSD c???c nhanh. Cung c???p kh??? n??ng t??nh to??n tuy???t v???i, th???i gian kh???i ?????ng ngay l???p t???c.</p><p>????? h???a NVIDIA mang l???i hi???u n??ng t???t h??n, l?? t?????ng ????? ch???nh s???a ???nh, l??m l???i video v?? ch??i game. Gi???i ph??ng s???c s??ng t???o c???a b???n v???i c??c ???ng d???ng ch???nh s???a ???nh v?? video tuy???t ?????p nh?? Adobe?? Lightroom?? v?? Premiere?? Pro.</p>	0	2021-11-15 10:28:38	2021-11-15 10:28:38	2021-12-11 10:26:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636946918/ikq5sgizizyy15tyjh5g.jpg
50	Laptop Gaming HP Omen 16 b0142TX	20	\N	20000000	13000000	10000000	13000000	1000000	2	3	<p><strong>Thi???t k??? m???i l???, tinh t??? </strong></p><p>L?? s???n ph???m laptop gaming m???i nh???t t??? HP, Omen 16 mang ?????n m???t thi???t k??? v?? c??ng trang nh?? v???i m???t A ??en b??ng c??ng logo Omen ?????t t???i trung t??m c???a b??? m???t, kh??ng h???m h??? nh??ng v???n r???t gaming. </p><p><strong>Hi???u n??ng ch??i game ???????c ????a l??n t???m cao m???i </strong></p><p>H?????ng ?????n tr???i nghi???m gaming tuy???t v???i nh???t, HP ???? trang b??? cho Omen d??ng CPU Intel th??? h??? 11 m???i nh???t hi???n nay gi??p t???i ??u h??a kh??? n??ng x??? l?? c??ng chi???c card ????? h???a NVIDIA RTX 3050 Ti. T???t c??? ???????c k???t h???p l???i tr??n HP Omen 16 ??em l???i kh??? n??ng gaming tuy???t v???i nh???t v?? h???a h???n s??nh vai c??ng c??c model laptop gaming c??ng ph??n kh??c.</p>	0	2021-11-15 10:43:57	2021-11-15 10:43:57	2021-12-13 10:43:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636947838/lzf7l2f6dzssqsjycyd7.jpg
41	SamSung S9	19	\N	10000000	7200000	5000000	7400000	300000	2	3	<p>??i???n tho???i ch??nh h??ng, Nguy??n seal, M???i 100%, Ch??a Active Mi???n ph?? giao h??ng to??n qu???c Thi???t k???: Nguy??n kh???i, m??n h??nh v?? c???c M??n h??nh: 5.8&quot;, 2K+ (1440 x 2960 Pixels) Camera Tr?????c/Sau: 8MP/12MP CPU: Exynos 9810 8 nh??n 64 bit, 4 nh??n 2.8 GHz &amp; 4 nh??n 1.7 GHz B??? Nh???: 64GB RAM: 4GB T??nh n??ng: Ch???ng n?????c, ch???ng b???i ?????t chu???n IP68</p>	0	2021-11-15 09:21:16	2021-11-15 09:21:16	2021-12-12 09:21:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636942877/e1hhyvmld16b5we7dqhb.jpg
54	??o jean	21	\N	1300000	500000	300000	500000	100000	2	3	<p>Si??u th???i trang</p><p>B???o h??nh 2 n??m</p><p>Cam k???t ch??nh h??ng</p>	0	2021-11-15 11:05:26	2021-11-15 11:05:26	2021-12-12 11:03:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636949127/ig0hrjmfpr3jfdwarupr.jpg
51	??o thun	21	\N	1000000	500000	300000	500000	100000	2	3	<p>Si??u b???n, si??u gi??n</p><p>B???o h??nh 10 th??ng</p>	0	2021-11-15 10:49:58	2021-11-15 10:49:58	2021-12-10 10:47:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636948198/rfvylxxow3l1nolh21hd.jpg
58	Gi??y n??? c?? t??nh	22	\N	1000000	500000	300000	500000	100000	2	3	<p>Si??u d??? th????ng, si??u th???i trang</p><p>Kh??ng b???c m??u, s???n ph???m y??u th??ch c???a h???c sinh</p><p></p>	0	2021-11-15 11:23:16	2021-11-15 11:23:16	2021-12-12 11:22:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950196/zauntljvjnrxwsl2z3uz.jpg
59	N???i inox	23	\N	2000000	500000	400000	500000	100000	2	3	<p><strong>T??NH N??NG N???I B???T: </strong></p><p>Ch???t li???u inox cao c???p s??ng b??ng, gi??p b???n d??? d??ng lau ch??i, v??? sinh. </p><p>Vung k??nh c?????ng l???c, trong su???t c?? th??? quan s??t ???????c th???c ph???m b??n trong. </p><p>Quai n???i ???????c l??m b???ng inox ?????c, ch???u l???c t???t, d??? d??ng di chuy???n trong qu?? tr??nh s??? d???ng. </p><p>Kh??ng b??? oxy h??a, c?? ????? b???n cao, kh??ng han g??? n??n r???t an to??n cho s???c kh???e ng?????i s??? d???ng. </p><p>????y n???i c?? c???u t???o 5 l???p n??n truy???n nhi???t nhanh, t???a nhi???t ?????u v?? gi??? nhi???t t???t, ti???t ki???m nhi??n li???u v?? th???i gian n???u n?????ng. V???i 3 lo???i k??ch c???, s??? d???ng ???????c v???i m???i lo???i b???p n??n ph?? h???p v???i nhu c???u c???a m???i gia ????nh.</p>	0	2021-11-15 11:27:55	2021-11-15 11:27:55	2021-12-12 11:27:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950476/p1w3ks7d1hd8lrd72fs9.jpg
42	Iphone X	19	\N	15000000	11000000	6000000	12000000	1000000	2	3	<p>iPhone 10 H??? th???ng camera k??p ti??n ti???n nh???t t???ng c?? tr??n iPhone. Chip A15 Bionic th???n t???c. B?????c nh???y v???t v??? th???i l?????ng pin. Thi???t k??? b???n b???. M???ng 5G si??u nhanh. C??ng v???i m??n h??nh Super Retina XDR s??ng h??n. </p><p>??? M??n h??nh Super Retina XDR 6.1 inch ??? Ch??? ????? ??i???n ???nh l??m t??ng th??m ????? s??u tr?????ng ???nh n??ng v?? t??? ?????ng thay ?????i ti??u c??? trong video </p><p>??? H??? th???ng camera k??p ti??n ti???n v???i camera Wide v?? Ultra Wide 12MP; Phong C??ch Nhi???p ???nh, HDR th??ng minh th??? h??? 4, ch??? ????? Ban ????m, kh??? n??ng quay video HDR Dolby Vision 4K</p><p> ??? Camera tr?????c TrueDepth 12MP v???i ch??? ????? Ban ????m v?? kh??? n??ng quay video HDR Dolby Vision 4K ??? Chip A15 Bionic cho hi???u n??ng th???n t???c</p><p> ??? Th???i gian xem video l??n ?????n 19 gi??? </p><p>??? Thi???t k??? b???n b??? v???i Ceramic Shield ??? Kh??? n??ng ch???ng n?????c ?????t chu???n IP68 ?????ng ?????u th??? tr?????ng4 ??? M???ng 5G cho t???c ????? t???i xu???ng si??u nhanh, xem video v?? nghe nh???c tr???c tuy???n ch???t l?????ng cao ??? iOS 15 t??ch h???p nhi???u t??nh n??ng m???i cho ph??p b???n l??m ???????c nhi???u vi???c h??n bao gi??? h???t v???i iPhone</p>	0	2021-11-15 09:34:48	2021-11-15 09:34:48	2021-12-12 09:34:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636943689/cqgpp5umg93tra9v6kpy.jpg
46	Laptop Dell Vostro 3500	20	\N	19000000	13000000	10000000	13000000	1000000	2	3	<p>Dell Vostro 15 3500 l?? s???n ph???m m??y t??nh ph?? h???p v???i m???i ng?????i l??m v??n ph??ng. C???u h??nh m??y ???n ?????nh, d?? s???c x??? l?? nhanh m???i c??ng vi???c t??? Word, Excel cho t???i ch???nh s???a ???nh, thi???t k??? ????? h???a 2D, 3D nh??? nh??ng. L??m vi???c m?????t m??, c??y kh???e t??c v??? ????? h???a V???i s???c m???nh c???a chip Intel th??? h??? 11 m???i nh???t, xung nh???p l??n ?????n 4.1GHz cho ph??p b???n gi???i quy???t m???i c??ng vi???c ch??? trong ch???p m???t. Kh??ng ch??? v???y, con chip n??y c??n s??? h???u l??i Willow Cove gi??p ti???t ki???m ??i???n n??ng t???i ??a, k??o d??i th???i gian s??? d???ng cho m???t l???n s???c. RAM 8GB ????a t???i kh??? n??ng l??m vi???c ??a nhi???m m?????t. B???n c?? th??? m??? c??ng l??c 10 ???ng d???ng m?? m??y kh??ng h??? b??? lag. C??n g?? tuy???t h??n khi v???a l??m vi???c v???a nghe nh???c tr??n Youtube, th???nh tho???ng chi???n tr???n game gi???i tr??? Dell Vostro 15 3500 c??n h??? tr??? khe RAM t???i ??a l??n ?????n 32GB gi??p b???n d??? d??ng n??ng c???p. ??? c???ng SSD 256GB ?????m b???o duy tr?? t???c ????? x??? l?? c??ng vi???c c???a h??? th???ng lu??n nhanh. Dung l?????ng ??? c???ng n??y c??n gi??p b???n c?? ???????c kh??ng gian l??u tr??? l???n, tho???i m??i sao l??u c??c t???p t??i li???u quan tr???ng.</p>	0	2021-11-15 10:24:38	2021-11-15 10:24:38	2021-12-06 10:22:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636946679/cuynv4kxsnqqegzu8hgl.jpg
61	B???p gas	23	\N	900000	400000	300000	400000	100000	2	3	<p>Nh?? s??? li???u h??? th???ng ???? th???ng k??, s???n ph???m </p><p>B???P GA SI??U M???NG WATASHI WA-7011K AT th????ng hi???u No Brand hi???n ??ang ???????c ????ng b??n tr???c tuy???n Sendo. </p><p>Qu?? kh??ch h??ng c?? th??? mua ???????c s???n ph???m B???P GA SI??U M???NG WATASHI WA-7011K AT ???: To??n qu???c, H??? Ch?? Minh (TP.HCM - S??i S??n), H?? N???i, ???? N???ng, C???n Th??, v.v... th??ng qua k??nh b??n h??ng Online c???a Sendo N??i b??n B???P GA SI??U M???NG WATASHI WA-7011K AT uy t??n v???i gi?? r??? nh???t l?? 440,000 ?? t???i c???a h??ng Shop ??i???n t??? EH. bigomart.info ???? v?? ??ang l?? ????n v??? b??o gi?? cung c???p th??ng tin n??i b??n, gi?? v?? ch???t l?????ng s???n ph???m t???t nh???t th??? tr?????ng, ????nh gi?? uy t??n, x??c th???c th??ng tin t??? c??c c???a h??ng. </p><p>Ch??ng t??i t???ng h???p s???n ph???m ch???t l?????ng gi???m gi??, khuy???n m???i g???i t???i kh??ch h??ng nh???ng l???a ch???n t???t nh???t. N???u b???n ph??t hi???n ra c???a h??ng n??o b??n sai gi??, c?? ch???t l?????ng s???n ph???m, th??i ????? ph???c v??? kh??ng t???t, c?? th??? ph???n ??nh l???i cho bigomart.info ????? ch??ng t??i g??? b??? s???n ph???m v?? ??i???u ch???nh ch??nh x??c ??em l???i l???i ??ch t???t nh???t mua ???????c r??? nh???t t???i kh??ch h??ng. H??y ?????t h??ng B???P GA SI??U M???NG WATASHI WA-7011K AT qua Website trung gian Lazada, Shopee, Tiki ho???c Sendo... b???ng c??ch k??o l??n tr??n v?? ch???n T???i N??i B??n ho???c So s??nh gi?? ????? ???????c gi?? t???t v?? nh???n nhi???u ??u ????i nh???t.</p>	0	2021-11-15 11:36:26	2021-11-15 11:36:26	2021-12-12 11:35:00	0	http://res.cloudinary.com/dawnfcnkd/image/upload/v1636950987/so7t4mabyxzd7vj88sej.jpg
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

