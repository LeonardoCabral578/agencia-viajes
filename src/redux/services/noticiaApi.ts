import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, noticiasEP } from "../const";

export type TNoticia = {
  id_noticia: number;
  titulo: string;
  parrafos: string;
  imagenes: string;
  redactor: string;
  fecha: string;
};

export const API_URL_CLIENT = process.env.API_URL;

export const noticiaApi = createApi({
  reducerPath: "noticiaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getNoticias: builder.query<TNoticia[], null>({
      query: () => noticiasEP.getall,
    }),
    getNoticiaById: builder.query<TNoticia, { id_noticia: string }>({
      query: ({ id_noticia }) => `${noticiasEP.getById}${id_noticia}`,
    }),
  }),
});

export const { useGetNoticiasQuery, useGetNoticiaByIdQuery } = noticiaApi;
