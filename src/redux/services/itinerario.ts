import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, itinerarioEP } from "../const";

export type TItinerario = {
  id_itinerario?: number;
  ciudad_origen: string;
  ciudad_destino: string;
  fecha_partida: string;
  fecha_llegada: string;
  hora_partida: string;
  hora_llegada: string;
};

export const itinerarioApi = createApi({
  reducerPath: "itinerarioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["Itinerarios"],
  endpoints: (builder) => ({
    getItinerarios: builder.query<TItinerario[], null>({
      query: () => itinerarioEP.getall,
      providesTags: ["Itinerarios"],
    }),
    getItinerarioById: builder.query<TItinerario, { id: number }>({
      query: ({ id }) => `${itinerarioEP.getById}${id}`,
    }),
    createItinerario: builder.mutation({
      query: (newItinerario: TItinerario) => ({
        url: itinerarioEP.post,
        method: "POST",
        body: newItinerario,
      }),
      invalidatesTags: ["Itinerarios"],
    }),
  }),
});

export const {
  useGetItinerariosQuery,
  useGetItinerarioByIdQuery,
  useCreateItinerarioMutation,
} = itinerarioApi;
