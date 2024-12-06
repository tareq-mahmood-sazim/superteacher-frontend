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
        invalidatesTags: ["materials"],
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    createStudyMaterial: builder.mutation<TMaterialResponse, TMaterialRequest>({
      query: (body) => ({
        url: `materials/study-materials`,
        method: "POST",
        body,

        invalidatesTags: ["materials"],
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    scheduleExam: builder.mutation<TMaterialResponse, TMaterialRequest>({
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
    getAssignmentByClassroom: builder.query<TMaterials[], number>({
      query: (classroomId) => ({
        url: `materials/assignment/${classroomId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      providesTags: () => ["materials"],
    }),
    getStudyMaterialByClassroomId: builder.query<TMaterials[], number>({
      query: (classroomId) => ({
        url: `materials/study-materials/${classroomId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      providesTags: () => ["materials"],
    }),
      transformResponse: (response: TApiResponse<TMaterials[]>) => response.data,
    }),
    getScheduleExamByClassroomId: builder.query<TMaterials[], number>({
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
  useCreateStudyMaterialMutation,
  useScheduleExamMutation,
  useGetAssignmentByClassroomQuery,
  useGetStudyMaterialsByClassroomIdQuery,
  useGetScheduleExamByClassroomIdQuery,
  useGetOneMaterialByIdQuery,
  useUpdateMaterialByIdMutation,
  useDeleteMaterialsMutation,
} = materialsApi;
