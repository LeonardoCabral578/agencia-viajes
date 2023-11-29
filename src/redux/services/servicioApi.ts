import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, serviciosEP } from "../const";

export type TServicio = {
  id_servicio: number;
  costo_predeterminado: number;
  id_itinerario: number;
  id_unidadTransporte: number;
  disponibilidad: number;
  itinerario: {
    id_itinerario: number;
    ciudad_origen: string;
    ciudad_destino: string;
    fecha_partida: string;
    fecha_llegada: string;
    hora_partida: string;
    hora_llegada: string;
  };
  unidadTransporte: {
    id_unidadTransporte: number;
    tipo_unidad: string;
    categoria: string;
    asientos: number;
  };
};

export const API_URL_CLIENT = process.env.API_URL;

export const servicioApi = createApi({
  reducerPath: "servicioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getServicios: builder.query<TServicio[], null>({
      query: () => serviciosEP.getall,
    }),
    getServicioById: builder.query<TServicio, { id_servicio: string }>({
      query: ({ id_servicio }) => `${serviciosEP.getById}${id_servicio}`,
    }),
    updateServicio: builder.mutation<
      TServicio,
      { id_servicio: number; data: Partial<TServicio> }
    >({
      query: ({ id_servicio, data }) => ({
        url: `${serviciosEP.update}${id_servicio}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteServicio: builder.mutation<void, { id_servicio: number }>({
      query: ({ id_servicio }) => ({
        url: `${serviciosEP.delete}${id_servicio}`,
        method: "DELETE",
      }),
    }),
    createServicio: builder.mutation<TServicio, { data: Partial<TServicio> }>({
      query: ({ data }) => ({
        url: serviciosEP.post,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetServiciosQuery,
  useGetServicioByIdQuery,
  useUpdateServicioMutation,
  useDeleteServicioMutation,
  useCreateServicioMutation,
} = servicioApi;
