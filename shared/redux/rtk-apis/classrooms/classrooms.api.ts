import projectApi from "../api.config";
import { IClassroomRequest, IClassroomResponse } from "./classrooms.types";

const CLASSROOMS_ENDPOINT = "/classrooms";
const classroomsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    createClassroom: builder.mutation<IClassroomResponse, IClassroomRequest>({
      query: (credentials) => ({
        url: `${CLASSROOMS_ENDPOINT}`,
        method: "POST",
        body: credentials,
      }),
    }),
    getOneClassroom: builder.mutation<IClassroomResponse, string>({
      query: (id: string) => ({
        url: `${CLASSROOMS_ENDPOINT}/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateClassroomMutation, useGetOneClassroomMutation } = classroomsApi;

export default classroomsApi;
