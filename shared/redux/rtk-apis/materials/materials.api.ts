import { getFromLocalStorage } from "@/shared/utils/localStorage";

import projectApi from "../api.config";
import { TMaterialRequest, TMaterialResponse, TMaterials } from "./materials.types";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return getFromLocalStorage("accessToken");
  }
  return null;
};

const materialsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    createAssignment: builder.mutation<TMaterialResponse, TMaterialRequest>({
      query: (body) => ({
        url: `materials/assignment`,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),
    createStudyMaterials: builder.mutation<TMaterialResponse, TMaterialRequest>({
      query: (body) => ({
        url: `materials/study-materials`,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),
    createScheduleExam: builder.mutation<TMaterialResponse, TMaterialRequest>({
      query: (body) => ({
        url: `materials/schedule-exam`,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),
    getAssignmentByClassroom: builder.query<TMaterials[], number>({
      query: (classroomId) => ({
        url: `materials/assignment/${classroomId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),
    getStudyMaterialsByClassroom: builder.query<TMaterials[], number>({
      query: (classroomId) => ({
        url: `materials/study-materials/${classroomId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),
    getScheduleExamByClassroom: builder.query<TMaterials[], number>({
      query: (classroomId) => ({
        url: `materials/schedule-exam/${classroomId}`,
        method: "GET",
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
} = materialsApi;
