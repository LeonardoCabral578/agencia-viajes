import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, servicioUsuarioEP } from "../const";

export type TServicioUsuario = {
  id?: number;
  dni_usuario: string;
  id_servicio: number;
  id_puntoIntermedio: number;
  tipo_atencion: string;
  venta: boolean;
  costo_final: number;
};

export const servicioUsuarioApi = createApi({
  reducerPath: "servicioUsuarioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["ServicioUsuarios"],
  endpoints: (builder) => ({
    getServicioUsuarios: builder.query<TServicioUsuario[], null>({
      query: () => servicioUsuarioEP.getall,
      providesTags: ["ServicioUsuarios"],
    }),
    getServicioUsuarioById: builder.query<TServicioUsuario, { id: number }>({
      query: ({ id }) => `${servicioUsuarioEP.getById}${id}`,
    }),
    createServicioUsuario: builder.mutation<
      TServicioUsuario,
      { data: Partial<TServicioUsuario> }
    >({
      query: ({ data }) => ({
        url: servicioUsuarioEP.post,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetServicioUsuariosQuery,
  useGetServicioUsuarioByIdQuery,
  useCreateServicioUsuarioMutation,
} = servicioUsuarioApi;
