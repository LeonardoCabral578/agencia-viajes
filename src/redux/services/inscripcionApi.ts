import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, inscripcionEP } from "../const";

export type TInscripcion = {
  nombreCompletoSolicitante: string;
  correoSolicitante: string;
  nivelEducativoSolicitante: string;
  fechaNacimientoSolicitante: string;
  id_usuario: string;
};

export const inscripcionApi = createApi({
  reducerPath: "inscripcionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["Inscripciones"],
  endpoints: (builder) => ({
    getInscripcions: builder.query<TInscripcion[], null>({
      query: () => inscripcionEP.getall,
      providesTags: ["Inscripciones"],
    }),
    getInscripcionById: builder.query<TInscripcion, { id: number }>({
      query: ({ id }) => `${inscripcionEP.getById}${id}`,
    }),
    createInscripcion: builder.mutation({
      query: (newInscripcion: TInscripcion) => ({
        url: inscripcionEP.post,
        method: "POST",
        body: newInscripcion,
      }),
      invalidatesTags: ["Inscripciones"],
    }),
  }),
});

export const {
  useGetInscripcionsQuery,
  useGetInscripcionByIdQuery,
  useCreateInscripcionMutation,
} = inscripcionApi;
