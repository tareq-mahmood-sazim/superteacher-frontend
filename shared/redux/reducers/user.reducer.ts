import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TRootState } from "@/shared/redux/store";

interface IAuthenticatedUser {
  userId: number | null;
}

const initialState: IAuthenticatedUser = {
  userId: 1,
};

export const authenticatedUserSlice = createSlice({
  name: "authenticatedUser",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },

    logOut: (state) => {
      state.userId = null;
    },
  },
});

export const { logIn, logOut } = authenticatedUserSlice.actions;

export const selectUserId = (state: TRootState) => state.authenticatedUser.userId;

export default authenticatedUserSlice.reducer;
