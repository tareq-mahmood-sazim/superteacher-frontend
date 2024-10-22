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
