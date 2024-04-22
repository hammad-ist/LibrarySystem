import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, Response } from "./userModel";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7243/api" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAuthLogin: builder.mutation<Response, User>({
      query: (user) => ({
        url: "auth",
        method: "POST",
        body: user,
        invalidatesTags: ["User"],
      }),
    }),
  }),
});
export const { useGetAuthLoginMutation } = authApi;
