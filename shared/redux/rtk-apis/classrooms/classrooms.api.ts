import { getFromLocalStorage } from "@/shared/utils/localStorage";

import projectApi from "../api.config";
import { IClassroomRequest, IClassroomResponse } from "./classrooms.types";

const CLASSROOMS_ENDPOINT = "/classrooms";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return getFromLocalStorage("accessToken");
  }
  return null;
};

const classroomsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    createClassroom: builder.mutation<IClassroomResponse, IClassroomRequest>({
      query: (classroom) => ({
        url: `${CLASSROOMS_ENDPOINT}`,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
        method: "POST",
        body: classroom,
        invalidatesTags: ["classroom"],
      }),
    }),
    getOneClassroom: builder.query<IClassroomResponse, string>({
      query: (id: string) => ({
        url: `${CLASSROOMS_ENDPOINT}/${id}`,
        method: "GET",
        invalidatesTags: ["classroom"],
      }),
      providesTags: () => ["classroom"],
    }),
    getClassroomsByTeacher: builder.query<IClassroomResponse[], void>({
      query: () => ({
        url: `${CLASSROOMS_ENDPOINT}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),
    addStudentInClassroom: builder.mutation<
      IClassroomResponse,
      { classroomId: number; studentIds: number[] }
    >({
      query: (body) => ({
        url: `${CLASSROOMS_ENDPOINT}/addParticipant`,
        method: "POST",
        body: body,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      invalidatesTags: ["classroom"],
    }),
    getParticipants: builder.query<IClassroomResponse, string>({
      query: (id: string) => ({
        url: `${CLASSROOMS_ENDPOINT}/participants/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      providesTags: () => ["classroom"],
    }),
    removeParticipantFromClassroom: builder.mutation<
      IClassroomResponse,
      { classroomId: number; studentId: number }
    >({
      query: (body) => ({
        url: `${CLASSROOMS_ENDPOINT}/participants/remove`,
        method: "POST",
        body: body,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      invalidatesTags: ["classroom"],
    }),
    addMeetLink: builder.mutation<IClassroomResponse, { classroomId: number; meetLink: string }>({
      query: (body) => ({
        url: `${CLASSROOMS_ENDPOINT}/addMeetLink`,
        method: "POST",
        body: body,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),
    isParticipant: builder.query({
      query: (id: string) => ({
        url: `${CLASSROOMS_ENDPOINT}/isParticipant/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      transformResponse: (response: { statusCode: number; data: boolean; message: string }) =>
        response.data,
    }),
  }),
});

export const {
  useCreateClassroomMutation,
  useGetOneClassroomQuery,
  useLazyGetOneClassroomQuery,
  useGetClassroomsByTeacherQuery,
  useAddStudentInClassroomMutation,
  useRemoveParticipantFromClassroomMutation,
  useAddMeetLinkMutation,
  useLazyIsParticipantQuery,
} = classroomsApi;

export default classroomsApi;
