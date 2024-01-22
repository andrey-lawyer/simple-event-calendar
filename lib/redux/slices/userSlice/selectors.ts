import type { ReduxState } from "@/lib/redux";

export const selectStatus = (state: ReduxState) => state.user.loading;
export const selectToken = (state: ReduxState) => state.user.token;
export const selectEmail = (state: ReduxState) => state.user.email;
