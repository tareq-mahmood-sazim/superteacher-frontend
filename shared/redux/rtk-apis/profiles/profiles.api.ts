// todo -> add strict typing for api response using userProfile response
// todo -> check and remove <any>
import { IUserData, TApiResponse } from "@/shared/typedefs";
import { getFromLocalStorage } from "@/shared/utils/localStorage";

import projectApi from "../api.config";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return getFromLocalStorage("accessToken");
  }
  return null;
};

const profilesApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query<IUserData, string>({
      query: (id) => ({
        url: `users/profile/${id}`,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      transformResponse: (response: TApiResponse<IUserData>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useProfileQuery, useLazyProfileQuery } = profilesApi;
