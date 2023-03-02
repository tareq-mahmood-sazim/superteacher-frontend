import { createApi } from "@reduxjs/toolkit/query/react";

import { TApiResponse } from "@/shared/index.types";
import baseQuery from "@/shared/redux/rtk-apis/baseQuery";

export type TUser = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export const exampleApi = createApi({
  reducerPath: "exampleApi",
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<TUser[], void>({
      query: () => "users",
      transformResponse: (response: TApiResponse<TUser[]>) => response.data,
    }),
  }),
});

export const { useGetUsersQuery, useLazyGetUsersQuery } = exampleApi;
