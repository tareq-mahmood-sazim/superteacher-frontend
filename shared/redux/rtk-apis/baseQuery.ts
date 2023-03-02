import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "@/shared/env.constants";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
});

export default baseQuery;
