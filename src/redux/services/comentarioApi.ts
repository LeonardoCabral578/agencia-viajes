import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, comentariosEP } from "../const";

export type TComentario = {
  id_noticia: string;
  nombre: string;
  contenido: string;
  fechaHoraComentario: string;
};

export const comentarioApi = createApi({
  reducerPath: "comentarioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getComentarios: builder.query<TComentario[], null>({
      query: () => comentariosEP.getall,
      providesTags: ["Comments"],
    }),
    getComentarioById: builder.query<TComentario, { id: string }>({
      query: ({ id }) => `${comentariosEP.getById}${id}`,
    }),
    createComment: builder.mutation({
      query: (newComment: TComentario) => ({
        url: comentariosEP.post,
        method: "POST",
        body: newComment,
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetComentariosQuery,
  useGetComentarioByIdQuery,
  useCreateCommentMutation,
} = comentarioApi;
