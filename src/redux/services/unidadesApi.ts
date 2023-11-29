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
    updateUnidad: builder.mutation<
      TUnidad,
      { id_unidadTransporte: number; data: Partial<TUnidad> }
    >({
      query: ({ id_unidadTransporte, data }) => ({
        url: `${unidadesEP.update}${id_unidadTransporte}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUnidad: builder.mutation<void, { id_unidadTransporte: number }>({
      query: ({ id_unidadTransporte }) => ({
        url: `${unidadesEP.delete}${id_unidadTransporte}`,
        method: "DELETE",
      }),
    }),
    createUnidad: builder.mutation<TUnidad, { data: Partial<TUnidad> }>({
      query: ({ data }) => ({
        url: unidadesEP.post,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUnidadesQuery,
  useGetUnidadByIdQuery,
  useCreateUnidadMutation,
  useUpdateUnidadMutation,
  useDeleteUnidadMutation,
} = unidadApi;
