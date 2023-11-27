import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUserApi } from "../services/userApi";

export type TUserState = {
  userSelected: TUserApi;
  isAuthenticated: boolean;
};

let savedUserLogged = {
  userSelected: {
    dni: "0",
    nombreCompleto: "",
    correo: "",
    fechaNacimientoSolicitante: "",
    telefono: "0",
    rolesUsuarios: {
      tipo_rol: "",
    },
  },
  isAuthenticated: false,
};

// const storedUserLogged = localStorage.getItem("userLogged");
// if (storedUserLogged !== null) {
//   const diferenciaEnMilisegundos =
//     new Date().getTime() -
//     new Date(JSON.parse(storedUserLogged).userSelected.loginDate).getTime();
//   const diasPasados = diferenciaEnMilisegundos / (1000 * 3600 * 24);

//   savedUserLogged = JSON.parse(storedUserLogged);
//   console.log(savedUserLogged);
// }

const initialState: TUserState = savedUserLogged;
export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logIn: (state, action: PayloadAction<TUserApi>) => {
      state.userSelected = {
        correo: action.payload.correo,
        dni: action.payload.dni,
        fechaNacimientoSolicitante: action.payload.fechaNacimientoSolicitante,
        nombreCompleto: action.payload.nombreCompleto,
        rolesUsuarios: { tipo_rol: action.payload.rolesUsuarios.tipo_rol },
        telefono: action.payload.telefono,
      };
      state.isAuthenticated = true;
      localStorage.setItem(
        "userLogged",
        JSON.stringify({
          userSelected: {
            correo: action.payload.correo,
            dni: action.payload.dni,
            fechaNacimientoSolicitante:
              action.payload.fechaNacimientoSolicitante,
            nombreCompleto: action.payload.nombreCompleto,
            RolesUsuarios: { tipo_rol: action.payload.rolesUsuarios.tipo_rol },
            telefono: action.payload.telefono,
            loginDate: new Date().toISOString(),
          },
          isAuthenticated: true,
        })
      );
    },
    logOut: (state) => {
      state.userSelected = initialState.userSelected;
      state.isAuthenticated = false;
      localStorage.removeItem("userLogged");
    },
  },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
