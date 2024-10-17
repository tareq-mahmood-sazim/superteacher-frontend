import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authenticatedUserSliceReducer from "./reducers/user.reducer";
import projectApi from "./rtk-apis/api.config";

const rootReducer = combineReducers({
  authenticatedUser: authenticatedUserSliceReducer,
  [projectApi.reducerPath]: projectApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authenticatedUser"],
  timeout: 500,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(projectApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type TRootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type TAppDispatch = typeof store.dispatch;
