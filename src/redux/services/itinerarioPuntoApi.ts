import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, itinerarioPuntoEP } from "../const";

export type TItinerarioPunto = {
  id: 0;
  id_itinerario: 0;
  id_puntoIntermedio: 0;
  hora_llegada_PI: "string";
  hora_salida_PI: "string";
};

export const itinerarioPuntoApi = createApi({
  reducerPath: "itinerarioPuntoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["ItinerarioPuntoes"],
  endpoints: (builder) => ({
    getItinerarioPuntos: builder.query<TItinerarioPunto[], null>({
      query: () => itinerarioPuntoEP.getall,
      providesTags: ["ItinerarioPuntoes"],
    }),
    getItinerarioPuntoById: builder.query<TItinerarioPunto, { id: number }>({
      query: ({ id }) => `${itinerarioPuntoEP.getById}${id}`,
    }),
    createItinerarioPunto: builder.mutation({
      query: (newItinerarioPunto: TItinerarioPunto) => ({
        url: itinerarioPuntoEP.post,
        method: "POST",
        body: newItinerarioPunto,
      }),
      invalidatesTags: ["ItinerarioPuntoes"],
    }),
  }),
});

export const {
  useGetItinerarioPuntosQuery,
  useGetItinerarioPuntoByIdQuery,
  useCreateItinerarioPuntoMutation,
} = itinerarioPuntoApi;
