import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: userSliceState = {
  loading: false,
  token: null,
  email: null,
};

export const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    tokenUser: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    emailUser: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
    statusApp: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export interface userSliceState {
  loading: boolean;
  token: string | null;
  email: string | null;
}
