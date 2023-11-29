import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import vehicleReducer from "./features/userSlice";
import userReducer from "./features/userSlice";
import { userApi } from "./services/userApi";
import { servicioApi } from "./services/servicioApi";
import { unidadApi } from "./services/unidadesApi";
import { inscripcionApi } from "./services/inscripcionApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    vehicleReducer,
    userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [servicioApi.reducerPath]: servicioApi.reducer,
    [unidadApi.reducerPath]: unidadApi.reducer,
    [inscripcionApi.reducerPath]: inscripcionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      servicioApi.middleware,
      unidadApi.middleware,
      inscripcionApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
