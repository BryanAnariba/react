import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/ui.slice";
import { calendarSlice } from "./calendar/calendarSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
  },
  middleware: (GetDefaultMiddleware) => GetDefaultMiddleware({
    serializableCheck: false,
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;