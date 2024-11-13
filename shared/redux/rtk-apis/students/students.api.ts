import projectApi from "../api.config";

const STUDENTS_ENDPOINT = "/users/student";

const studentsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => STUDENTS_ENDPOINT,
    }),
    searchStudentsByName: builder.query({
      query: (name) => `${STUDENTS_ENDPOINT}/search/name/${name}`,
    }),
    getStudent: builder.query({
      query: (id) => `${STUDENTS_ENDPOINT}/${id}`,
    }),
    createStudent: builder.mutation({
      query: (data) => ({
        url: "users",
        method: "POST",
        body: data,
      }),
    }),
    updateStudent: builder.mutation({
      query: (data) => ({
        url: `${STUDENTS_ENDPOINT}/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/${STUDENTS_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useCreateStudentMutation,
  useLazySearchStudentsByNameQuery,
  useSearchStudentsByNameQuery,
} = studentsApi;
