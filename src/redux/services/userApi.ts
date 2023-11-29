import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, usuariosEP } from "../const";

export type TUserApi = {
  id?: number;
  dni: string;
  nombreCompleto: string;
  correo: string;
  fechaNacimiento: string;
  telefono: string;
  direccion: string;
  contraseña?: string;
  rolesUsuarios: {
    tipo_rol: string;
  };
};

export const userApi = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<TUserApi[], null>({
      query: () => usuariosEP.getall,
      providesTags: ["Users"],
    }),
    getUserById: builder.query<TUserApi, { id: string }>({
      query: ({ id }) => `${usuariosEP.getById}${id}`,
    }),
    createUser: builder.mutation({
      query: (newUser: TUserApi) => ({
        url: usuariosEP.post,
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation, useGetUserByIdQuery } =
  userApi;
