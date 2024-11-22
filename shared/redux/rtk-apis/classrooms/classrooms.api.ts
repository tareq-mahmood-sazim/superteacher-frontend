import { getFromLocalStorage } from "@/shared/utils/localStorage";

import projectApi from "../api.config";
import { IClassroom, IClassroomRequest, IClassroomResponse } from "./classrooms.types";

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
      }),
    }),
    getOneClassroom: builder.query<IClassroomResponse, string>({
      query: (id: string) => ({
        url: `${CLASSROOMS_ENDPOINT}/${id}`,
        method: "GET",
      }),
    }),
    getClassroomsByTeacher: builder.query<IClassroom[], void>({
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
      { classroomid: string; studentId: string }
    >({
      query: (body) => ({
        url: `${CLASSROOMS_ENDPOINT}/addParticipant`,
        method: "POST",
        body: body,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),
    getParticipants: builder.query<IClassroom, string>({
      query: (id: string) => ({
        url: `${CLASSROOMS_ENDPOINT}/participants/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateClassroomMutation,
  useGetOneClassroomQuery,
  useGetClassroomsByTeacherQuery,
} = classroomsApi;

export default classroomsApi;
