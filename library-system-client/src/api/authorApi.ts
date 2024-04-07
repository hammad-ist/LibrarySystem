// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Author } from './types/author'

// Define a service using a base URL and expected endpoints
export const authorApi = createApi({
  reducerPath: 'authorApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7243/api' }),
  endpoints: (builder) => ({
    getAll: builder.query<Author[], void>({
      query: (name) => `author`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllQuery } = authorApi