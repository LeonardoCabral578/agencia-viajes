import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, puntoIntermedioEP } from "../const";

export type TPuntoIntermedio = {
  id_puntoIntermedio: 0;
  nombre_ciudad: "string";
};

export const puntoIntermedioApi = createApi({
  reducerPath: "puntoIntermedioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["PuntoIntermedios"],
  endpoints: (builder) => ({
    getPuntoIntermedios: builder.query<TPuntoIntermedio[], null>({
      query: () => puntoIntermedioEP.getall,
      providesTags: ["PuntoIntermedios"],
    }),
    getPuntoIntermedioById: builder.query<TPuntoIntermedio, { id: number }>({
      query: ({ id }) => `${puntoIntermedioEP.getById}${id}`,
    }),
    createPuntoIntermedio: builder.mutation({
      query: (newPuntoIntermedio: TPuntoIntermedio) => ({
        url: puntoIntermedioEP.post,
        method: "POST",
        body: newPuntoIntermedio,
      }),
      invalidatesTags: ["PuntoIntermedios"],
    }),
  }),
});

export const {
  useGetPuntoIntermediosQuery,
  useGetPuntoIntermedioByIdQuery,
  useCreatePuntoIntermedioMutation,
} = puntoIntermedioApi;
