import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import authenticatedUserSliceReducer from "./reducers/user.reducer";
import { exampleApi } from "./rtk-apis/example/example.api";

export const store = configureStore({
  reducer: {
    authenticatedUser: authenticatedUserSliceReducer,
    [exampleApi.reducerPath]: exampleApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(exampleApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type TRootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type TAppDispatch = typeof store.dispatch;
