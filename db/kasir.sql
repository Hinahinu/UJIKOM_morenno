PGDMP     #                    |            db_kasir    14.9    14.9 .               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                        0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            !           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            "           1262    57731    db_kasir    DATABASE     h   CREATE DATABASE db_kasir WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_Indonesia.1252';
    DROP DATABASE db_kasir;
                postgres    false            �            1259    66001    admin    TABLE     O  CREATE TABLE public.admin (
    id integer NOT NULL,
    nama_toko character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.admin;
       public         heap    postgres    false            �            1259    66000    admin_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.admin_id_seq;
       public          postgres    false    210            #           0    0    admin_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;
          public          postgres    false    209            �            1259    74275    kategori    TABLE     �   CREATE TABLE public.kategori (
    id integer NOT NULL,
    id_admin integer NOT NULL,
    kategori character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.kategori;
       public         heap    postgres    false            �            1259    74274    kategori_id_seq    SEQUENCE     �   CREATE SEQUENCE public.kategori_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.kategori_id_seq;
       public          postgres    false    214            $           0    0    kategori_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.kategori_id_seq OWNED BY public.kategori.id;
          public          postgres    false    213            �            1259    82485    pesanan    TABLE     Z  CREATE TABLE public.pesanan (
    id integer NOT NULL,
    id_admin integer NOT NULL,
    id_pesanan character varying(255) NOT NULL,
    id_produk integer NOT NULL,
    jumlah_produk integer NOT NULL,
    subtotal double precision NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.pesanan;
       public         heap    postgres    false            �            1259    82483    pesanan_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pesanan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.pesanan_id_seq;
       public          postgres    false    218            %           0    0    pesanan_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.pesanan_id_seq OWNED BY public.pesanan.id;
          public          postgres    false    217            �            1259    66012    petugas    TABLE     A  CREATE TABLE public.petugas (
    id integer NOT NULL,
    id_admin integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.petugas;
       public         heap    postgres    false            �            1259    66011    petugas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.petugas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.petugas_id_seq;
       public          postgres    false    212            &           0    0    petugas_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.petugas_id_seq OWNED BY public.petugas.id;
          public          postgres    false    211            �            1259    82467    produk    TABLE     �  CREATE TABLE public.produk (
    id integer NOT NULL,
    id_admin integer NOT NULL,
    name character varying(255),
    image character varying(255),
    url character varying(255),
    kategori character varying(255) NOT NULL,
    harga double precision NOT NULL,
    stok integer NOT NULL,
    keuntungan double precision NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.produk;
       public         heap    postgres    false            �            1259    82466    produk_id_seq    SEQUENCE     �   CREATE SEQUENCE public.produk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.produk_id_seq;
       public          postgres    false    216            '           0    0    produk_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.produk_id_seq OWNED BY public.produk.id;
          public          postgres    false    215            p           2604    66004    admin id    DEFAULT     d   ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);
 7   ALTER TABLE public.admin ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    210    210            r           2604    74278    kategori id    DEFAULT     j   ALTER TABLE ONLY public.kategori ALTER COLUMN id SET DEFAULT nextval('public.kategori_id_seq'::regclass);
 :   ALTER TABLE public.kategori ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    214    214            t           2604    82488 
   pesanan id    DEFAULT     h   ALTER TABLE ONLY public.pesanan ALTER COLUMN id SET DEFAULT nextval('public.pesanan_id_seq'::regclass);
 9   ALTER TABLE public.pesanan ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            q           2604    66015 
   petugas id    DEFAULT     h   ALTER TABLE ONLY public.petugas ALTER COLUMN id SET DEFAULT nextval('public.petugas_id_seq'::regclass);
 9   ALTER TABLE public.petugas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            s           2604    82470 	   produk id    DEFAULT     f   ALTER TABLE ONLY public.produk ALTER COLUMN id SET DEFAULT nextval('public.produk_id_seq'::regclass);
 8   ALTER TABLE public.produk ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216                      0    66001    admin 
   TABLE DATA           _   COPY public.admin (id, nama_toko, email, password, role, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    210   �5                 0    74275    kategori 
   TABLE DATA           T   COPY public.kategori (id, id_admin, kategori, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    214   �6                 0    82485    pesanan 
   TABLE DATA           y   COPY public.pesanan (id, id_admin, id_pesanan, id_produk, jumlah_produk, subtotal, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   7                 0    66012    petugas 
   TABLE DATA           `   COPY public.petugas (id, id_admin, email, password, role, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    212   BN                 0    82467    produk 
   TABLE DATA           }   COPY public.produk (id, id_admin, name, image, url, kategori, harga, stok, keuntungan, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   �O       (           0    0    admin_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.admin_id_seq', 5, true);
          public          postgres    false    209            )           0    0    kategori_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.kategori_id_seq', 15, true);
          public          postgres    false    213            *           0    0    pesanan_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.pesanan_id_seq', 218, true);
          public          postgres    false    217            +           0    0    petugas_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.petugas_id_seq', 29, true);
          public          postgres    false    211            ,           0    0    produk_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.produk_id_seq', 13, true);
          public          postgres    false    215            v           2606    66010    admin admin_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_email_key;
       public            postgres    false    210            x           2606    66008    admin admin_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_pkey;
       public            postgres    false    210            ~           2606    74280    kategori kategori_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.kategori
    ADD CONSTRAINT kategori_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.kategori DROP CONSTRAINT kategori_pkey;
       public            postgres    false    214            �           2606    82490    pesanan pesanan_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.pesanan
    ADD CONSTRAINT pesanan_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.pesanan DROP CONSTRAINT pesanan_pkey;
       public            postgres    false    218            z           2606    66021    petugas petugas_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.petugas
    ADD CONSTRAINT petugas_email_key UNIQUE (email);
 C   ALTER TABLE ONLY public.petugas DROP CONSTRAINT petugas_email_key;
       public            postgres    false    212            |           2606    66019    petugas petugas_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.petugas
    ADD CONSTRAINT petugas_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.petugas DROP CONSTRAINT petugas_pkey;
       public            postgres    false    212            �           2606    82475    produk produk_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.produk
    ADD CONSTRAINT produk_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.produk DROP CONSTRAINT produk_pkey;
       public            postgres    false    216            �           2606    74284    kategori kategori_id_admin_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.kategori
    ADD CONSTRAINT kategori_id_admin_fkey FOREIGN KEY (id_admin) REFERENCES public.admin(id);
 I   ALTER TABLE ONLY public.kategori DROP CONSTRAINT kategori_id_admin_fkey;
       public          postgres    false    3192    210    214            �           2606    82491    pesanan pesanan_id_admin_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.pesanan
    ADD CONSTRAINT pesanan_id_admin_fkey FOREIGN KEY (id_admin) REFERENCES public.admin(id);
 G   ALTER TABLE ONLY public.pesanan DROP CONSTRAINT pesanan_id_admin_fkey;
       public          postgres    false    3192    218    210            �           2606    82497    pesanan pesanan_id_produk_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pesanan
    ADD CONSTRAINT pesanan_id_produk_fkey FOREIGN KEY (id_produk) REFERENCES public.produk(id);
 H   ALTER TABLE ONLY public.pesanan DROP CONSTRAINT pesanan_id_produk_fkey;
       public          postgres    false    218    216    3200            �           2606    66022    petugas petugas_id_admin_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.petugas
    ADD CONSTRAINT petugas_id_admin_fkey FOREIGN KEY (id_admin) REFERENCES public.admin(id);
 G   ALTER TABLE ONLY public.petugas DROP CONSTRAINT petugas_id_admin_fkey;
       public          postgres    false    3192    210    212            �           2606    82476    produk produk_id_admin_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.produk
    ADD CONSTRAINT produk_id_admin_fkey FOREIGN KEY (id_admin) REFERENCES public.admin(id);
 E   ALTER TABLE ONLY public.produk DROP CONSTRAINT produk_id_admin_fkey;
       public          postgres    false    216    210    3192               �   x�}�A�0��ͯ�],M���'�^/^��n��ĿoYU�6�����BP��(ۦ�m'O�Ϟ?�m��\+��@��:�+�R�O$��MVV�v��7k�*���"��w7����.4�vFK$�7�J���X�.]CLg^?�|�)�.�u�Җ��E`����'�9���	i<;���T3��(��Z|L         �   x�}α�0��9~�쨖ώ��gaɈP���P��ň�?}:HҴ�ǘc&-��"5C��.��"�O"`'����S��Q8��?�YZ7�ꬭ���%y� ����W?1|'�^|v�����qHtc"zv�E	            x��\[�$)��N?E����a<�,����GX5"�����������L4 {���e�2��*��u�T�:��Zb7�6�|1~���_F�4+��1�e�˥=r����zמR^���Y��^�hY��4� ��"� J/kvOaAt�6����O�%�'j*���^]/%��c�+�����bBGh�Oy��}������;8LrQ�l��{UL��F5�����yٴ�����D�E���{"�6�_&�D����Ue}.� os%7�ɔ�܋y�Dh�O�����{"��$K�C�;ř��:j����S��B�!����;�Մ�F�o��K�����F$D1w�jP9���hFEkY��4{jo{��DW��r�۴���l$��\�?�#,TUl�+S](&�d˴�/��X~��S\����S���|�v�󦑨��Ӏ���aZW)PQ��Pt��M�����D�؟#��DD�̌xj!�4���U�km�j�w�q{5�$�"/��F�����/h#�c��i�k�Add�\�i��ϡ���,`<d#q�����ݱ�I[亊!0�j��)M�[�G/��`��� m���)�2�S&3�B6��2��DnJ���u�T8�S��h~=Gs���m������u�L�i���O��3:��U0�QT��+��a,5�C��ҕɱq:-��?e2���u�3Il��P���#�)������u&W_�N��Y�����3�'��6��=�e2��0�rUd�d8�+�����nAt�6#���y��R�d�5$�-k�]�Nѳ�?o��pQb���Lxʴ��?`����)51�B�H�\�Ň�dޚ��uNd_w���t��9�#&��{�Ŝ���b��Vr�
 �Һ�डu��Ֆ�9y�/���1=e����h
!� ��c����
B7�c6���-5��XE��p�g���>���)b�Y��'z�Hxp3�:��l$�bՒA�%����Dw^+	5�qe�Ghc	1>3e
�Ȗ_�e%��]]�����nOn�t�6�F�iE�,�Ȩ�b����i��0�i���� m��N�{������D��	�@�0�X��?!��5��Ni�_��p�6NO�n<�)���`r��8IZr(�R/IQm�N�i�<t��s4��{���t�6KO�nf�k������W�],êQ���	Uy%|��{���[��
%�b��f�vpݏ��)#+Y�m.�)�쫃�Y�w.kߵ�_,�ڬ}Jtcu����/C�8*�'"��9��.F�6'�b���(>�ͺ�D���t�t��'�ٙ�{˾��5�j�]]��av���(��wa�B__x>�͆�4K��=�%�}B��3|�-�w��PZSŰW���A�ױ��E�;qGzb:A�MO�VVw�\W���ͺ���HrP�����q �+�ZA&�Aؤ�1��r�z�L�l�<�Y��a��u����OL��V���m����d��)��6'[!�R@��)#�zv
�K��nݢ����#��ݭ�����S������,j���������V�#���:��u=�e���F���t�'hs�)�V��=���?���c��C��@�Eu�6TLͣlrΘ�xX^�(H��A)����y��D0.Ғ�_h���D�E�{��������Z��y���x&�y�4f���ͻ �{�&�m^C�E{"��������!�b!�����Cx}��	�|�"{NGgd��h���/h�3*@qC4(`g�hU�A\Vn����i���dP1��M:��	���r.l��o`%V��%�Ao��p�%�9s6��z�t�uF4�$�P4(�(���a��K-�K_���y@��An���}���Å�<G7#�vc �e�꼵zǌ�W���9�ur�O��mAD�v�J�*�PE>�ME��j�SO�p�vN����U/��0Q�����mA�z�����Vu���j�	�7�<d;�.D��$��͙�����#������*��1j� '��9�\u�xM�$6�ü�M'1bl�G�OD'L�)��5�y�㝷�m4#z��$�� KP� H&�Z*k|�"�����;���Æ+�Q��&�Z��i�U�eL�e���x?�B���G�׬�w�?v�
m�rD��N{,XM0qfL�@�s���F�f���"�yz��ٙN�jVd-��+F~i�T�9��J�⡎�Lj�M�PC�џ��m4/����!1�� ��<��
��p�t{F�3�/蘢�jX'��.��{�Ȏ����)����I������ڈ�; (�@l��sߴ�5ei�^��_�j}����d.��	�*=�������=�<e��Q��K��C��X�n~9B�PV�ų��`����ֱ��E���=C���h�C��[�4�d$�#jN�M7�֌��2,5%԰q�Y� Ĥy^ܨ&F%ǓH�X�2`��m��p�ռ
��^���ƸB�<����e����:B�I��W��Y�� ����8�$"����?$����3���F��#K�ᐴF�3�������
}V d��"��gv��s�xNDO�.*�x�eB�48v�� %ad2Šb���Rb.�z��oX�m�" �Y:-�cZU��B&��5tF'v�N�އ"/�i�Y�U|����o��w���J*��O��!#�F��]��������n��1-#�Sz�t+�RE���16�7Sdpv�K�9��m@�&��[���r!k.���q��Fm`e��M����P$��=�@fܭh���G�TG.%�(���ׁr=�jP��@��z�=�Y�������:@`�Lk)�{�tO��'7Oۊ.~v�94J�Tv�r� �T^�	��'�;�K�����O��"�{�xq�O�+�W�GM��6wXz˨�GT���>l��Z�}G�$-PD+�r�6������1�e�>��}-fܰ�@�!v����cL�Kmk��$$�̶R�<��B�������KP�D�K]�9@�c����r]��w0 $���q�mq�a�Q�kv�Q����Us*l����It�]��E�{�&�l�Qw���P=�B1*qm�B�5c{,�|�!�]�0�U�bo���ygD������Nj�yz�E2���c).�_N�!�����T6$ך�\«Or؋��7�N������V���} �qOynK���V�{�`��*?��K
9�K�+6
��4ŀ�R��X��S���~BMi�ȣVL�9�����C-*��I�5�<�G�S�T��N+[A-U�����]W������=�E6<B[�?��qi����_3�<��c�#�E�LP�q�zh��g��^�PGh��g��Y�PG1v�����B�Q�D����~�I��m�-!��|jw�@�b�g��Hs[0)J���_�x��%�;%�HnX/��B䛧�>�S�V<�FE�(ѩzQer���#�\��V�GL�)�m��o�b�}c�J�w �0}B�����7Z�b��.!�6�C��c�/�����
!�·%X�D���.g:�U*(��TB���/��#��ܚ>ۺ���##7L7#�`	�B)���Q�gn��e!����\�^ ��Eʐ�Ѡ��]�	*Cu|�b�i�����~�
����S���9�=��[u�`��EA߽��k/���J�B82�JdW=�o{6r
q�p�B0u��sC-/I*���'[Uљgg�ZN�y��Wr� ��g) ��ԋ��dG����5�c���[S��>�WS?B0��X+T6���K.l�7����d�l,��y��9���[X�odK��B��P�Ϣd+G���L��Q��̓G䎅��yV9� ��fP�]��o�0{70�dT�C�A��)X���I�΅����`�ӝ<�5�y�N�<=��c�_��HGf�]D���˅�'3�U�)�#�CJy�hPX�6�f�@�X�݈-[�֜OAN���ݮ0�V�*S�,R?�D�F��T���z4�˖-�֯��{��d���?e"}�����\3���{}��S!K�0R]���^-y   ��H��C]�mXI����c�.�_�\����M�UUs[������l�u��>�m4�n�ƥ����i��m��5��d����,Y�ީ\�]
�B��k ��(mu2�vH<�S:�����T!^rPgH���"�k�a�S��������p�m�<5�kC쇍��v�F�S2>XG���{�*�P����G��F��Č��&ZN!؄̩�b;�jMS!��Ɋ���s����`}��l.�?e�7.���>�BHZ?���<U�LhM,� \�g)�O�{="
�,/�����U�8@��y��!1�R���"�*�������p[���a�m��Y�PQC��CRE?�ֱr1r3�7}okfy"hyQ�!�~j��8�G�>us	�x�0�U��(�s�)����l�r�����RbB0
��(n��{��p6!ij�k�F��: �XGA�U�� 0�����$T��5���	m�}8V ��S=�?$x��q.�«b���6X��V����/C��iJ;hZ�SK�L;(߲�x����ң���p�#��ӥ\(�,_��/j��M�&4e��M�<�
P'��O1�Vh���[lc�Pp�+�����ɾG������� �|�CuW�Xz�u*��
�`�uY��7��.��ڒ{j7}��M����m�xl�MܵW���U�8@0��@lٖ8�Qd���s�D�7;zsw��i�ښ�AG6!z��pY.���g�6�ާ�u��j{��	9��o��#*�ʯJ��L���fmZ�Fi(.ՓN�2��l���
o��~��~#��zĳ�;�mu6v�`��k�l,t��!���$5 c
c�tv_u��~)D?��4f��CI�?��`享�tH��6f��P}Af�v���N��S����=��q?��泡GL�`�L����ޥ�_޹(n��Iz��&� o�6�L(0�S"/�(�,]'Ww"$��ɝE�	�}Le.[��T�1/N'��j�"���=Jb��$y��d�b�q�z,���P�׍}G�;��si��2��:T:0�W��(5���IsX�^�B0��@4��j���;���zг��<�Gѷ���.-M� ��<eZ�o�xr�6�G���I�/��'������a
����KI�BE׽�|f��3�rv��tNR'\�1��b�{�s��	U|L%����T���"�witB�!)q@���:?��F���(�|}xs�6��;�������i~�G�=�0J[�A�e ft���5�(۳ݲ����Ň\���p����I5١�ey3Ǩ|#�IP�8o���Q�^��.|��:S}{΢�8Bةw�$���Y�U�n��(NUG�C@[���Jz�ޭ[U[%S�Ә�d�|o�G5PAe�p��kw�H~6��\��w|B�*�t�n����\��O{5o{W&��|�"��T7����S�q���!A^����vJ�,�
e$+W��>Jة�$���,R����1�_��!,���QPU�+LAn`��*�׀ڌ����L�kKO�b�2{ ���Ԡ،7�*a�Yɗ~8H甒�vT]b[�?Y�8ϥ�a�����\B�Z�E9p��z������-z1��o~׃����T�*yH�H�!#�e��n�f	qqu�x��~o��B�y�fz�l��YV8~ͯ�[nf~]@�+�;@�rO��9��!�|�m,-�(JC���6H��p%�h�;K��w���r��	a����ׇw���/i�Sh�7������;~?:��t>A���۶��l{s         d  x����N�0�s�{76��/��;x��JX�nٸ���إh$�f�/�?SBEJ�K7}��U���{ 
b����A����32u��?��ɼ�gu�އ_Xf4p��Z�(h"�*Ƭ�1�Ǳp��A��@�le/��E��Kn�ܷ�!����6��t#��иJ�W�{^��5	W��ex�c�+Fox�%k,�ŵ�=��]Jek�����ˆ7qT-�>��.�>��n| g���&/Ɔ�ܭCL�!�r�(�%�[�����$2?�I%,����p�W-MAY�<�9�_+5��<4o���R�4�uO�k��Rأ���̜��z���(�M`��*i� <�[����~2Z�O'1
B         �  x���Mo�0����}�C����;C�[���I��NЦ�tִ��ai�S�z�>&)J+�~���k�ŏ�K�o�N�1�k��u�UA��]&g-��Ɂr�B�3���Fm�}\.�wUz��^�`�viӼ.o���S�S�H�+~>��јH�p&|7	�E��PF#ڇ��U�U�xMЬ=ciu(ɹJkK�)�1����?�7�>�Hy@w3R1D�%���Pf��C�R�9��+������ޗu�zb�c9�e�j�\��`���,�IPuc���]�/�랐3տXxN��$$��MC�ѥTeMTVB�������6�t���P��y��i4�?�"S�d��s�q(�r��6L#���1G�]ۿu��J�i�$k�c"DBiׂ�8�<���q.�K��o�ܹRs���P���p��ud. Ü��[Ws��Xڠ�z��/�[�+��f����N@5̊�rՐ4�.�5гP6|&U�O��!�\����\� ��5xkC@[Oܸ\����nV�2��)"����A-��rQd�������A�/$����;r�ڍ��와z�J!��0�r�C����m鰻���~|Np�R�U'7�$>J*�%�Q(C �ܢ�='�M`�)$NI�elp�T�*Z���~��Y�t��o���I�!3�2��BA��"˲?p��T     