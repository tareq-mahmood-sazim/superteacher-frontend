import { getFromLocalStorage } from "@/shared/utils/localStorage";

import projectApi from "../api.config";
import {
  TCreateSubmissionRequest,
  TSubmissionResponse,
  TSubmission,
  TUpdateSubmissionRequest,
} from "./submission.types";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return getFromLocalStorage("accessToken");
  }
  return null;
};

const submissionsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubmission: builder.mutation<TSubmissionResponse, TCreateSubmissionRequest>({
      query: (body) => ({
        url: `submissions`,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),

    findSubmissionsForMaterial: builder.query<TSubmission[], number>({
      query: (materialId) => ({
        url: `submissions/material/${materialId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),

    findSubmissionsByUser: builder.query<TSubmission[], number>({
      query: (userId) => ({
        url: `submissions/user/${userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),

    updateSubmission: builder.mutation<
      TSubmissionResponse,
      { id: number; data: TUpdateSubmissionRequest }
    >({
      query: ({ id, data }) => ({
        url: `submissions/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),

    deleteSubmission: builder.mutation<void, number>({
      query: (id) => ({
        url: `submissions/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateSubmissionMutation,
  useFindSubmissionsForMaterialQuery,
  useFindSubmissionsByUserQuery,
  useUpdateSubmissionMutation,
  useDeleteSubmissionMutation,
} = submissionsApi;
