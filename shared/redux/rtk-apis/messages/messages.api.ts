// import { TApiResponse } from "@/shared/typedefs";
// import { getFromLocalStorage } from "@/shared/utils/localStorage";

import projectApi from "../api.config";
import { IMessageType } from "./messages.types";

// const getAuthToken = () => {
//   if (typeof window !== "undefined") {
//     return getFromLocalStorage("accessToken");
//   }
//   return null;
// };

const messagesApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<IMessageType[], string>({
      query: (id) => ({
        url: `messages/${id}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetMessagesQuery, useLazyGetMessagesQuery } = messagesApi;
