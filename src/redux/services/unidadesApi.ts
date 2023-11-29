import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, unidadesEP } from "../const";

export type TUnidad = {
  id_unidadTransporte: number;
  tipo_unidad: string;
  categoria: string;
  asientos: number;
};

export const unidadApi = createApi({
  reducerPath: "unidadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["Unidades"],
  endpoints: (builder) => ({
    getUnidades: builder.query<TUnidad[], null>({
      query: () => unidadesEP.getall,
      providesTags: ["Unidades"],
    }),
    getUnidadById: builder.query<TUnidad, { id: string }>({
      query: ({ id }) => `${unidadesEP.getById}${id}`,
    }),
    createComment: builder.mutation({
      query: (newUnidad: TUnidad) => ({
        url: unidadesEP.post,
        method: "POST",
        body: newUnidad,
      }),
      invalidatesTags: ["Unidades"],
    }),
  }),
});

export const {
  useGetUnidadesQuery,
  useGetUnidadByIdQuery,
  useCreateCommentMutation,
} = unidadApi;
