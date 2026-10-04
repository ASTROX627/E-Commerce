import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import notificationReducer from "./notification-slice";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>
