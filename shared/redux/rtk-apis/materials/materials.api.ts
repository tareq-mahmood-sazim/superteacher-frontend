import { TApiResponse } from "@/shared/typedefs";
import { getFromLocalStorage } from "@/shared/utils/localStorage";

import projectApi from "../api.config";
import type { TMaterials, TMaterialResponse, TMaterialRequest } from "./materials.types";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return getFromLocalStorage("accessToken");
  }
  return null;
};

const materialsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    createAssignment: builder.mutation<TMaterials[], string>({
      query: (body) => ({
        url: `materials/assignment`,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      transformResponse: (response: TApiResponse<TMaterials[]>) => response.data,
    }),
    createStudyMaterials: builder.mutation<TMaterials[], string>({
      query: (body) => ({
        url: `materials/study-materials`,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      transformResponse: (response: TApiResponse<TMaterials[]>) => response.data,
    }),
    createScheduleExam: builder.mutation<TMaterials[], string>({
      query: (body) => ({
        url: `materials/schedule-exam`,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      transformResponse: (response: TApiResponse<TMaterials[]>) => response.data,
    }),
    getAssignmentByClassroom: builder.query<TMaterials[], number>({
      query: (classroomId) => ({
        url: `materials/assignment/${classroomId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      transformResponse: (response: TApiResponse<TMaterials[]>) => response.data,
    }),
    getStudyMaterialsByClassroom: builder.query<TMaterials[], number>({
      query: (classroomId) => ({
        url: `materials/study-materials/${classroomId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      transformResponse: (response: TApiResponse<TMaterials[]>) => response.data,
    }),
    getScheduleExamByClassroom: builder.query<TMaterials[], number>({
      query: (classroomId) => ({
        url: `materials/schedule-exam/${classroomId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      transformResponse: (response: TApiResponse<TMaterials[]>) => response.data,
    }),
    getOneMaterialById: builder.query({
      query: (id) => ({
        url: `materials/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),
    updateMaterialById: builder.mutation<TMaterialResponse, TMaterialRequest>({
      query: (body) => ({
        url: `materials/update-materials/${body.id}`,
        method: "PATCH",
        body,
        invalidatesTags: ["materials"],
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
        providesTags: ["materials"],
      }),
    }),
    deleteMaterials: builder.mutation<TMaterialResponse, number>({
      query: (id) => ({
        url: `materials/delete-materials/${id}`,
        method: "DELETE",
        invalidatesTags: ["materials"],
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateAssignmentMutation,
  useCreateStudyMaterialsMutation,
  useCreateScheduleExamMutation,
  useGetAssignmentByClassroomQuery,
  useGetStudyMaterialsByClassroomQuery,
  useGetScheduleExamByClassroomQuery,
  useGetOneMaterialByIdQuery,
  useUpdateMaterialByIdMutation,
  useDeleteMaterialsMutation,
} = materialsApi;
