import projectApi from "../api.config";
import { LoginResponse, LoginRequest, LogoutResponse } from "./login.types";

const AUTH_ENDPOINT = "/auth";
const authApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: `${AUTH_ENDPOINT}/login`,
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: `${AUTH_ENDPOINT}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;

export default authApi;
