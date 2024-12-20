import projectApi from "../api.config";

const TEACHERS_ENDPOINT = "/users/teacher";

const teachersApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: () => TEACHERS_ENDPOINT,
    }),
    getTeacher: builder.query({
      query: (id) => `users/profile/${id}`,
    }),
    createTeacher: builder.mutation({
      query: (data) => ({
        url: "users",
        method: "POST",
        body: data,
      }),
    }),
    updateTeacher: builder.mutation({
      query: (data) => ({
        url: `${TEACHERS_ENDPOINT}/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/${TEACHERS_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const { useGetTeachersQuery, useGetTeacherQuery, useCreateTeacherMutation } = teachersApi;
