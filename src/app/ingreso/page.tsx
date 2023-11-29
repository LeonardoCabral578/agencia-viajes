"use client";
import { useAppDispatch } from "@/redux/hooks";
import { logIn } from "@/redux/features/userSlice";
import { useGetUsersQuery } from "@/redux/services/userApi";
import { verifyEmail } from "@/utils/verify";
import { useState } from "react";
import { toast } from "react-toastify";
// import educar from "@/render/assets/img/educar.jpg";
import AnswerButton from "@/components/Form/AnswerButton/AnswerButton";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    data: allUsersData,
    isError: allUsersIsError,
    error: allUsersError,
    isLoading: allUsersIsLoading,
    isFetching: allUsersIsFetching,
  } = useGetUsersQuery(null);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [emailError, setEmailError] = useState("");

  const InputsVerify = () => {
    const email = verifyEmail(emailInput);

    if (!email.status) {
      setEmailError(email.error);
      return false;
    } else {
      if (!allUsersIsLoading && allUsersData) {
        const userFind = allUsersData.find(
          (value: any) => value.correo == emailInput
        );

        if (!userFind) {
          toast.error("No se ha encontrado la cuenta", {
            position: "top-center",
            autoClose: 3000,
            // hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          return false;
        } else {
          if (userFind.contraseña !== passwordInput) {
            toast.error("Credenciales incorrectas", {
              position: "top-center",
              autoClose: 3000,
              // hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            return false;
          } else {
            dispatch(logIn(userFind));
            toast.success("Se ha logueado correctamente", {
              position: "top-center",
              autoClose: 3000,
              // hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            return true;
          }
        }
      }
    }
  };

  return (
    <div className="page page__form login h-full">
      <div className="login__content container max-w-[800px] mx-auto m-8">
        <div className="flex flex-col p-8 gap-4 rounded-xl shadow-md bg-blue-100 w-full">
          {/* <div className="sm:w-1/2 flex items-center justify-center"> */}
          {/* <Image
              className="logo"
              src={educar}
              alt="Logo EDUCAR"
              width={300}
            /> */}
          {/* </div> */}
          <div className="">
            <div className="inputs flex flex-col gap-6 mt-6 w-full">
              <h3 className="title is-4 text-center mt-2">
                Te damos la bienvenida
              </h3>
              <p className="text-center mb-3">
                Por favor, introduzca su correo electrónico y su contraseña para
                acceder.
              </p>
              <TextField
                label="Email"
                variant="outlined"
                error={emailError !== ""}
                helperText={emailError !== "" ? emailError : ""}
                className="w-full"
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  setEmailError("");
                }}
              />
              <FormControl variant="outlined" className="w-full">
                <InputLabel htmlFor="login-password">Contraseña</InputLabel>
                <OutlinedInput
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Contraseña"
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                  }}
                />
              </FormControl>
              <Button
                className="mt-4"
                onClick={() => {
                  InputsVerify() && router.push("/");
                }}
              >
                Continuar
              </Button>
            </div>
            <AnswerButton
              label="¿No tienes una cuenta?"
              classname="my-5"
              buttonLabel="Registrarse"
              onClick={() => {
                router.push("/registro");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
