// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book, CreateOrUpdateBook, PaginatedBook } from "./bookModel";
interface PaginationOptions {
  pageNumber: number;
  pageSize: number;
  searchTerm: string | null;
}
// Define a service using a base URL and expected endpoints
export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7243/api" }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getByPageBook: builder.mutation<PaginatedBook, PaginationOptions>({
      query: ({ pageNumber, pageSize, searchTerm }) =>
        `book/page?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}`,
      invalidatesTags: ["Book"],
    }),
    getAll: builder.query<Book[], void>({
      query: (name) => `book`,
      providesTags: ["Book"],
    }),
    getBook: builder.query<Book, string>({
      query: (id) => `book/${id}`,
      providesTags: ["Book"],
    }),
    addBook: builder.mutation<Book, CreateOrUpdateBook>({
      query: (book) => ({
        url: "book",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation<void, Book>({
      query: ({ id, ...rest }) => ({
        url: `book/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation<void, number>({
      query: (id) => ({
        url: `book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetByPageBookMutation,
  useGetAllQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useGetBookQuery,
  useAddBookMutation,
} = bookApi;
