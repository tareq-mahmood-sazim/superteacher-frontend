
import projectApi from "../api.config";
import { IMessageType } from "./messages.types";

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
