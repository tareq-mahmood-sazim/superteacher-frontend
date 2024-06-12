import { createApi } from "@reduxjs/toolkit/query/react";

import baseQuery from "@/shared/redux/rtk-apis/baseQuery";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});

export default projectApi;
