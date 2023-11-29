import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUserApi } from "../services/userApi";

export type TUserState = {
  userSelected: TUserApi;
  isAuthenticated: boolean;
};

let savedUserLogged = {
  userSelected: {
    id_dni: "0",
    nombreCompleto: "",
    correo: "",
    fechaNacimiento: "",
    telefono: "0",
    direccion: "",
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
        id_dni: action.payload.id_dni,
        fechaNacimiento: action.payload.fechaNacimiento,
        direccion: action.payload.direccion,
        nombreCompleto: action.payload.nombreCompleto,
        rolesUsuarios: { tipo_rol: action.payload.rolesUsuarios.tipo_rol },
        telefono: action.payload.telefono,
      };
      state.isAuthenticated = true;
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
