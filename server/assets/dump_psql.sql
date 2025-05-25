--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: material_types; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE public.material_types (
    material_type_id integer NOT NULL,
    material_type_name character varying(100) NOT NULL,
    defect_percentage numeric(5,2) NOT NULL
);


ALTER TABLE public.material_types OWNER TO test;

--
-- Name: material_types_material_type_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE public.material_types_material_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.material_types_material_type_id_seq OWNER TO test;

--
-- Name: material_types_material_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE public.material_types_material_type_id_seq OWNED BY public.material_types.material_type_id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    partner_id integer NOT NULL,
    order_date timestamp without time zone DEFAULT now() NOT NULL,
    status character varying(50) NOT NULL,
    "partnerPartnerId" integer
);


ALTER TABLE public.orders OWNER TO test;

--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_order_id_seq OWNER TO test;

--
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- Name: partners; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE public.partners (
    partner_id integer NOT NULL,
    partner_name character varying(100) NOT NULL,
    partner_type character varying(50) NOT NULL,
    rating integer NOT NULL,
    address character varying(255) NOT NULL,
    director_name character varying(100) NOT NULL,
    phone character varying(20) NOT NULL,
    email character varying(100) NOT NULL
);


ALTER TABLE public.partners OWNER TO test;

--
-- Name: partners_partner_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE public.partners_partner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.partners_partner_id_seq OWNER TO test;

--
-- Name: partners_partner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE public.partners_partner_id_seq OWNED BY public.partners.partner_id;


--
-- Name: product_types; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE public.product_types (
    product_type_id integer NOT NULL,
    product_type_name character varying NOT NULL,
    coefficient numeric NOT NULL
);


ALTER TABLE public.product_types OWNER TO test;

--
-- Name: product_types_product_type_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE public.product_types_product_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_types_product_type_id_seq OWNER TO test;

--
-- Name: product_types_product_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE public.product_types_product_type_id_seq OWNED BY public.product_types.product_type_id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    product_name character varying(100) NOT NULL,
    product_type_id integer NOT NULL,
    quantity_in_stock integer NOT NULL,
    price numeric(10,2) NOT NULL,
    "productTypeProductTypeId" integer
);


ALTER TABLE public.products OWNER TO test;

--
-- Name: products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE public.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_product_id_seq OWNER TO test;

--
-- Name: products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;


--
-- Name: sales_history; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE public.sales_history (
    sale_id integer NOT NULL,
    partner_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    sale_date timestamp without time zone NOT NULL,
    "partnerPartnerId" integer,
    "productProductId" integer
);


ALTER TABLE public.sales_history OWNER TO test;

--
-- Name: sales_history_sale_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE public.sales_history_sale_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sales_history_sale_id_seq OWNER TO test;

--
-- Name: sales_history_sale_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE public.sales_history_sale_id_seq OWNED BY public.sales_history.sale_id;


--
-- Name: material_types material_type_id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY public.material_types ALTER COLUMN material_type_id SET DEFAULT nextval('public.material_types_material_type_id_seq'::regclass);


--
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- Name: partners partner_id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY public.partners ALTER COLUMN partner_id SET DEFAULT nextval('public.partners_partner_id_seq'::regclass);


--
-- Name: product_types product_type_id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY public.product_types ALTER COLUMN product_type_id SET DEFAULT nextval('public.product_types_product_type_id_seq'::regclass);


--
-- Name: products product_id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_product_id_seq'::regclass);


--
-- Name: sales_history sale_id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY public.sales_history ALTER COLUMN sale_id SET DEFAULT nextval('public.sales_history_sale_id_seq'::regclass);


--
-- Data for Name: material_types; Type: TABLE DATA; Schema: public; Owner: test
--

COPY public.material_types (material_type_id, material_type_name, defect_percentage) FROM stdin;
1	Тип материала 2	0.01
2	Тип материала 3	0.00
3	Тип материала 1	0.00
4	Тип материала 5	0.00
5	Тип материала 4	0.01
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: test
--

COPY public.orders (order_id, partner_id, order_date, status, "partnerPartnerId") FROM stdin;
\.


--
-- Data for Name: partners; Type: TABLE DATA; Schema: public; Owner: test
--

COPY public.partners (partner_id, partner_name, partner_type, rating, address, director_name, phone, email) FROM stdin;
1	Стройсервис	ПАО	7	188910, Ленинградская область, город Приморск, ул. Парковая, 21	Соловьев Андрей Николаевич	812 223 32 00	ansolovev@st.ru
2	МонтажПро	ЗАО	10	309500, Белгородская область, город Старый Оскол, ул. Рабочая, 122	Степанов Степан Сергеевич	912 888 33 33	stepanov@stepan.ru
3	Ремонт и отделка	ОАО	5	143960, Московская область, город Реутов, ул. Свободы, 51	Воробьева Екатерина Валерьевна	444 222 33 11	ekaterina.vorobeva@ml.ru
4	База Строитель	ЗАО	7	652050, Кемеровская область, город Юрга, ул. Лесная, 15	Иванова Александра Ивановна	493 123 45 67	aleksandraivanova@ml.ru
5	Паркет 29	ООО	7	164500, Архангельская область, город Северодвинск, ул. Строителей, 18	Петров Василий Петрович	987 123 56 78	vppetrov@vl.ru
\.


--
-- Data for Name: product_types; Type: TABLE DATA; Schema: public; Owner: test
--

COPY public.product_types (product_type_id, product_type_name, coefficient) FROM stdin;
1	Пробковое покрытие	1.5
2	Ламинат	2.35
3	Массивная доска	5.15
4	Паркетная доска	4.34
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: test
--

COPY public.products (product_id, product_name, product_type_id, quantity_in_stock, price, "productTypeProductTypeId") FROM stdin;
1	Ламинат Дуб дымчато-белый 33 класс 12 мм	2	10	1799.33	2
2	Ламинат Дуб серый 32 класс 8 мм с фаской	2	10	3890.41	2
3	Паркетная доска Ясень темный однополосная 14 мм	4	10	4456.90	4
4	Пробковое напольное клеевое покрытие 32 класс 4 мм	1	10	5450.59	1
5	Инженерная доска Дуб Французская елка однополосная 12 мм	4	10	7330.99	4
\.


--
-- Data for Name: sales_history; Type: TABLE DATA; Schema: public; Owner: test
--

COPY public.sales_history (sale_id, partner_id, product_id, quantity, sale_date, "partnerPartnerId", "productProductId") FROM stdin;
1	3	2	59050	2023-03-20 00:00:00	3	2
2	3	1	37200	2024-03-12 00:00:00	3	1
3	3	4	4500	2024-05-14 00:00:00	3	4
4	1	5	2500	2024-07-05 00:00:00	1	5
5	5	3	7550	2024-07-01 00:00:00	5	3
6	5	5	35000	2022-12-02 00:00:00	5	5
7	4	3	15500	2023-03-23 00:00:00	4	3
8	5	4	1250	2023-05-17 00:00:00	5	4
10	4	2	37400	2024-06-07 00:00:00	4	2
11	5	1	1000	2024-06-07 00:00:00	5	1
9	4	1	12350	2023-12-18 00:00:00	4	1
12	1	3	7250	2023-01-22 00:00:00	1	3
13	2	1	50000	2023-09-19 00:00:00	2	1
14	2	2	670000	2023-11-10 00:00:00	2	2
15	2	3	35000	2024-04-15 00:00:00	2	3
16	2	5	25000	2024-06-12 00:00:00	2	5
\.


--
-- Name: material_types_material_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('public.material_types_material_type_id_seq', 5, true);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 1, false);


--
-- Name: partners_partner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('public.partners_partner_id_seq', 5, true);


--
-- Name: product_types_product_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('public.product_types_product_type_id_seq', 4, true);


--
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('public.products_product_id_seq', 5, true);


--
-- Name: sales_history_sale_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('public.sales_history_sale_id_seq', 16, true);


--
-- Name: partners PK_45bafb3afbd882ff6f8d502d518; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY public.partners
    ADD CONSTRAINT "PK_45bafb3afbd882ff6f8d502d518" PRIMARY KEY (partner_id);


--
-- Name: sales_history PK_61c5b6a383c23ed6b72ae784969; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY public.sales_history
    ADD CONSTRAINT "PK_61c5b6a383c23ed6b72ae784969" PRIMARY KEY (sale_id);


--
-- Name: product_types PK_91a2058eff2209e67033c7378dd; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY public.product_types
    ADD CONSTRAINT "PK_91a2058eff2209e67033c7378dd" PRIMARY KEY (product_type_id);


--
-- Name: products PK_a8940a4bf3b90bd7ac15c8f4dd9; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "PK_a8940a4bf3b90bd7ac15c8f4dd9" PRIMARY KEY (product_id);


--
-- Name: orders PK_cad55b3cb25b38be94d2ce831db; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" PRIMARY KEY (order_id);


--
-- Name: material_types PK_d9ffe63446b594e383f5bfc7429; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY public.material_types
    ADD CONSTRAINT "PK_d9ffe63446b594e383f5bfc7429" PRIMARY KEY (material_type_id);


--
-- Name: sales_history FK_478ecea8fad44dd8a838c568551; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY public.sales_history
    ADD CONSTRAINT "FK_478ecea8fad44dd8a838c568551" FOREIGN KEY ("productProductId") REFERENCES public.products(product_id);


--
-- Name: sales_history FK_6007fe974053c85f08138b7e7af; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY public.sales_history
    ADD CONSTRAINT "FK_6007fe974053c85f08138b7e7af" FOREIGN KEY ("partnerPartnerId") REFERENCES public.partners(partner_id);


--
-- Name: products FK_b9810545a4661ca0066a6c25472; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_b9810545a4661ca0066a6c25472" FOREIGN KEY ("productTypeProductTypeId") REFERENCES public.product_types(product_type_id);


--
-- Name: orders FK_f73c0cb9f28445ba8fc1b4be5b1; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_f73c0cb9f28445ba8fc1b4be5b1" FOREIGN KEY ("partnerPartnerId") REFERENCES public.partners(partner_id);


--
-- PostgreSQL database dump complete
--

