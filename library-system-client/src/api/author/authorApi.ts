// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Author, CreateOrUpdateAuthor } from "./authorModel";

// Define a service using a base URL and expected endpoints
export const authorApi = createApi({
  reducerPath: "authorApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7243/api" }),
  tagTypes: ["Author"],
  endpoints: (builder) => ({
    getAll: builder.query<Author[], void>({
      query: (name) => `author`,
      providesTags: ["Author"],
    }),
    getAuthor: builder.query<Author, string>({
      query: (id) => `author/${id}`,
      providesTags: ["Author"],
    }),
    addAuthor: builder.mutation<Author, CreateOrUpdateAuthor>({
      query: (author) => ({
        url: "author",
        method: "POST",
        body: author,
      }),
      invalidatesTags: ["Author"],
    }),
    updateAuthor: builder.mutation<void, Author>({
      query: ({ id, ...rest }) => ({
        url: `author/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Author"],
    }),
    deleteAuthor: builder.mutation<void, number>({
      query: (id) => ({
        url: `author/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Author"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllQuery,
  useDeleteAuthorMutation,
  useUpdateAuthorMutation,
  useGetAuthorQuery,
  useAddAuthorMutation,
} = authorApi;
