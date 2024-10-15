import { TApiResponse } from "@/shared/typedefs";
import { getFromLocalStorage } from "@/shared/utils/localStorage";

import projectApi from "../api.config";
import { TTokenizedUser } from "../auth/auth.types";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return getFromLocalStorage("accessToken");
  }
  return null;
};

const usersApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<TTokenizedUser, void>({
      query: () => ({
        url: "users/me",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      transformResponse: (response: TApiResponse<TTokenizedUser>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useMeQuery, useLazyMeQuery } = usersApi;
