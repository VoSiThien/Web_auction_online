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

COPY public.tbl_account (acc_id, acc_password, acc_token, acc_email, acc_phone_number, acc_full_name, acc_role, acc_avatar, acc_status, acc_created_date, acc_updated_date, acc_token_forgot, acc_refresh_token, acc_rating_score, acc_is_upgrade, acc_birthday, acc_like_bidder, acc_dis_like_bidder, acc_like_seller, acc_dis_like_seller) FROM stdin;
1	$2b$04$fAkkyELf9a./G2jjbKqO.e9u8p9G5hvtpBaSRymPvuT1Mnp9nLbVK		vosithien1234@gmail.com	012345678	Lên Văn Toàn	ADM	\N	0	2021-10-09 12:00:00	\N	\N	\N	0	\N	\N	\N	\N	\N	\N
2	$2b$04$fAkkyELf9a./G2jjbKqO.e9u8p9G5hvtpBaSRymPvuT1Mnp9nLbVK		vosithien1551999@gmail.com	012345678	Lên Văn Tính	BID	\N	0	2021-10-09 12:00:00	\N	\N	\N	0	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: tbl_account_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_account_comments (acom_id, acom_note, acom_assessor, acom_receiver, acom_product_id, acom_created_date, acom_updated_date) FROM stdin;
1	Tốt	1	2	\N	2021-10-09 12:00:00	\N
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
1	Điện tử	0	\N	2021-10-09 12:00:00	\N
2	Điện thoại di động	0	1	2021-10-09 12:00:00	\N
3	Laptop	0	1	2021-10-09 12:00:00	\N
4	Nội trợ	0	\N	2021-10-09 12:00:00	\N
5	Chảo	0	4	2021-10-09 12:00:00	\N
\.


--
-- Data for Name: tbl_favorite_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_favorite_product (fav_id, fav_product_id, fav_account_id) FROM stdin;
1	1	1
2	2	1
3	3	1
\.


--
-- Data for Name: tbl_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_product (prod_id, prod_name, prod_category_id, prod_amount, prod_price, prod_price_current, prod_price_starting, prod_price_highest, prod_price_step, prod_price_holder, prod_seller_id, prod_description, prod_status, prod_created_date, prod_updated_date, prod_end_date, prod_auto_extend) FROM stdin;
1	SamSung S7	2	1	100000	\N	50000	\N	1000	\N	1	Tốt	0	2021-10-09 12:00:00	\N	\N	\N
2	SamSung S9	2	1	120000	\N	80000	\N	2000	\N	1	Tốt	0	2021-10-09 12:00:00	\N	\N	\N
3	MSI G37	3	1	1500000	\N	120000	\N	5000	\N	1	Tốt	0	2021-10-09 12:00:00	\N	\N	\N
4	Chảo chống dính	5	1	20000	\N	8000	\N	1000	\N	1	Tốt	0	2021-10-09 12:00:00	\N	\N	\N
\.


--
-- Data for Name: tbl_product_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_product_history (his_id, his_product_id, his_account_id, his_price, his_status, his_created_date, his_updated_date) FROM stdin;
\.


--
-- Data for Name: tbl_product_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_product_images (prod_img_id, prod_img_product_id, prod_img_data, prod_img_status) FROM stdin;
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

SELECT pg_catalog.setval('public.tbl_account_comments_id_seq', 1, false);


--
-- Name: tbl_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_account_id_seq', 1, false);


--
-- Name: tbl_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_categories_id_seq', 1, false);


--
-- Name: tbl_favorite_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_favorite_product_id_seq', 3, true);


--
-- Name: tbl_product_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_product_history_id_seq', 1, false);


--
-- Name: tbl_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_product_id_seq', 1, false);


--
-- Name: tbl_product_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_product_image_id_seq', 1, false);


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

