import { getFromLocalStorage } from "@/shared/utils/localStorage";

import projectApi from "../api.config";
import { TMaterialRequest, TMaterialResponse, TMaterial } from "./materials.types";

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
        invalidatesTags: ["materials"],
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
        invalidatesTags: ["materials"],
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
        invalidatesTags: ["materials"],
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),
    getAssignmentByClassroom: builder.query<TMaterial[], number>({
      query: (classroomId) => ({
        url: `materials/assignment/${classroomId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      providesTags: () => ["materials"],
    }),
    getStudyMaterialsByClassroom: builder.query<TMaterial[], number>({
      query: (classroomId) => ({
        url: `materials/study-materials/${classroomId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      providesTags: () => ["materials"],
    }),
    getScheduleExamByClassroom: builder.query<TMaterial[], number>({
      query: (classroomId) => ({
        url: `materials/schedule-exam/${classroomId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      providesTags: () => ["materials"],
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
