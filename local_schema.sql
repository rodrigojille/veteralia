--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

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

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: appointment_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.appointment_status_enum AS ENUM (
    'pending',
    'confirmed',
    'completed',
    'cancelled',
    'approved',
    'rejected'
);


ALTER TYPE public.appointment_status_enum OWNER TO postgres;

--
-- Name: user_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_role_enum AS ENUM (
    'pet_owner',
    'veterinarian',
    'secretary',
    'admin'
);


ALTER TYPE public.user_role_enum OWNER TO postgres;

--
-- Name: vet_profile_pricingtier_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.vet_profile_pricingtier_enum AS ENUM (
    'basic',
    'standard',
    'premium'
);


ALTER TYPE public.vet_profile_pricingtier_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appointment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointment (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    datetime timestamp without time zone NOT NULL,
    reason character varying,
    notes character varying,
    status public.appointment_status_enum DEFAULT 'pending'::public.appointment_status_enum NOT NULL,
    "petOwnerId" uuid,
    "petId" uuid,
    "veterinarianId" uuid
);


ALTER TABLE public.appointment OWNER TO postgres;

--
-- Name: medical_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.medical_history (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    date date NOT NULL,
    condition character varying NOT NULL,
    "vetClinic" character varying NOT NULL,
    notes character varying,
    "petId" uuid
);


ALTER TABLE public.medical_history OWNER TO postgres;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: pet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pet (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    species character varying NOT NULL,
    breed character varying,
    birthdate date,
    notes character varying,
    "ownerId" uuid
);


ALTER TABLE public.pet OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    name character varying NOT NULL,
    role public.user_role_enum NOT NULL,
    language character varying DEFAULT 'es'::character varying NOT NULL,
    phone character varying,
    "isEmailVerified" boolean DEFAULT false NOT NULL,
    "emailVerificationToken" character varying,
    "passwordResetToken" character varying(255)
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: vet_profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vet_profile (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    specialty character varying NOT NULL,
    location character varying NOT NULL,
    "pricingTier" public.vet_profile_pricingtier_enum DEFAULT 'basic'::public.vet_profile_pricingtier_enum NOT NULL,
    approved boolean DEFAULT false NOT NULL,
    schedule jsonb,
    "userId" uuid,
    "createdAt" timestamp without time zone DEFAULT now()
);


ALTER TABLE public.vet_profile OWNER TO postgres;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: pet PK_b1ac2e88e89b9480e0c5b53fa60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet
    ADD CONSTRAINT "PK_b1ac2e88e89b9480e0c5b53fa60" PRIMARY KEY (id);


--
-- Name: medical_history PK_b74f21cb30300ddf41a00623568; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medical_history
    ADD CONSTRAINT "PK_b74f21cb30300ddf41a00623568" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: appointment PK_e8be1a53027415e709ce8a2db74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY (id);


--
-- Name: vet_profile PK_eeac4c705eb39774f5ea80493fe; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vet_profile
    ADD CONSTRAINT "PK_eeac4c705eb39774f5ea80493fe" PRIMARY KEY (id);


--
-- Name: vet_profile UQ_898b4cf233a830fc7fcc87e24be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vet_profile
    ADD CONSTRAINT "UQ_898b4cf233a830fc7fcc87e24be" UNIQUE ("userId");


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: appointment FK_030b5a6ec207acd02b9666db6e9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "FK_030b5a6ec207acd02b9666db6e9" FOREIGN KEY ("petOwnerId") REFERENCES public."user"(id);


--
-- Name: pet FK_20acc45f799c122ec3735a3b8b1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet
    ADD CONSTRAINT "FK_20acc45f799c122ec3735a3b8b1" FOREIGN KEY ("ownerId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: appointment FK_3333d25935de43e97a1bd3e2931; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "FK_3333d25935de43e97a1bd3e2931" FOREIGN KEY ("veterinarianId") REFERENCES public."user"(id);


--
-- Name: vet_profile FK_898b4cf233a830fc7fcc87e24be; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vet_profile
    ADD CONSTRAINT "FK_898b4cf233a830fc7fcc87e24be" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: medical_history FK_8f6640186fa4cd75de1dc424dc4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medical_history
    ADD CONSTRAINT "FK_8f6640186fa4cd75de1dc424dc4" FOREIGN KEY ("petId") REFERENCES public.pet(id) ON DELETE CASCADE;


--
-- Name: appointment FK_c4e922028ecd83c496e24aad5be; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "FK_c4e922028ecd83c496e24aad5be" FOREIGN KEY ("petId") REFERENCES public.pet(id);


--
-- PostgreSQL database dump complete
--

