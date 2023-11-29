import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import vehicleReducer from "./features/userSlice";
import userReducer from "./features/userSlice";
import { userApi } from "./services/userApi";
import { servicioApi } from "./services/servicioApi";
import { unidadApi } from "./services/unidadesApi";
import { itinerarioPuntoApi } from "./services/itinerarioPuntoApi";
import { puntoIntermedioApi } from "./services/puntoIntermedio";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { servicioUsuarioApi } from "./services/servicioUsuario";
import { itinerarioApi } from "./services/itinerario";

export const store = configureStore({
  reducer: {
    vehicleReducer,
    userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [servicioApi.reducerPath]: servicioApi.reducer,
    [unidadApi.reducerPath]: unidadApi.reducer,
    [itinerarioPuntoApi.reducerPath]: itinerarioPuntoApi.reducer,
    [puntoIntermedioApi.reducerPath]: puntoIntermedioApi.reducer,
    [servicioUsuarioApi.reducerPath]: servicioUsuarioApi.reducer,
    [itinerarioApi.reducerPath]: itinerarioApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      servicioApi.middleware,
      unidadApi.middleware,
      itinerarioPuntoApi.middleware,
      puntoIntermedioApi.middleware,
      servicioUsuarioApi.middleware,
      itinerarioApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
