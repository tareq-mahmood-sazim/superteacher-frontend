import { TApiResponse } from "@/shared/typedefs";
import { getFromLocalStorage } from "@/shared/utils/localStorage";

import projectApi from "../api.config";
import type { TMaterialRequest } from "./materials.types";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return getFromLocalStorage("accessToken");
  }
  return null;
};

const materialsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    createAssignment: builder.mutation<TMaterialRequest, string>({
      query: (body) => ({
        url: `materials/assignment`,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      transformResponse: (response: TApiResponse<TMaterialRequest>) => response.data,
    }),
    createStudyMaterials: builder.mutation<TMaterialRequest, string>({
      query: (body) => ({
        url: `materials/study-materials`,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      transformResponse: (response: TApiResponse<TMaterialRequest>) => response.data,
    }),
    createScheduleExam: builder.mutation<TMaterialRequest, string>({
      query: (body) => ({
        url: `materials/schedule-exam`,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      transformResponse: (response: TApiResponse<TMaterialRequest>) => response.data,
    }),
    getAssignmentByClassroom: builder.query<TMaterialRequest, string>({
      query: (classroomId) => ({
        url: `materials/assignment/${classroomId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      transformResponse: (response: TApiResponse<TMaterialRequest>) => response.data,
    }),
    getStudyMaterialsByClassroom: builder.query<TMaterialRequest, string>({
      query: (classroomId) => ({
        url: `materials/study-materials/${classroomId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      transformResponse: (response: TApiResponse<TMaterialRequest>) => response.data,
    }),
    getScheduleExamByClassroom: builder.query<TMaterialRequest, string>({
      query: (classroomId) => ({
        url: `materials/schedule-exam/${classroomId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      transformResponse: (response: TApiResponse<TMaterialRequest>) => response.data,
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
} = materialsApi;
