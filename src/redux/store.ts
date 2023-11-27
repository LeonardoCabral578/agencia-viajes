import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import vehicleReducer from "./features/userSlice";
import userReducer from "./features/userSlice";
import { userApi } from "./services/userApi";
import { noticiaApi } from "./services/noticiaApi";
import { comentarioApi } from "./services/comentarioApi";
import { inscripcionApi } from "./services/inscripcionApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    vehicleReducer,
    userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [noticiaApi.reducerPath]: noticiaApi.reducer,
    [comentarioApi.reducerPath]: comentarioApi.reducer,
    [inscripcionApi.reducerPath]: inscripcionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      noticiaApi.middleware,
      comentarioApi.middleware,
      inscripcionApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
