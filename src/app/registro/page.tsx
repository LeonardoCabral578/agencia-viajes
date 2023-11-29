"use client";
import { useState } from "react";
import educar from "@/render/assets/img/educar.jpg";
import AnswerButton from "../../components/Form/AnswerButton/AnswerButton";
import {
  verifyDNI,
  verifyDireccion,
  verifyEmail,
  verifyName,
  verifyPassword,
  verifyTel,
} from "@/utils/verify";
import { useCreateUserMutation } from "@/redux/services/userApi";
import { toast } from "react-toastify";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  MenuItem,
  InputLabel,
  OutlinedInput,
  TextField,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { generateRandomKey } from "@/utils/functions";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Register() {
  const router = useRouter();
  const [createUser, { error }] = useCreateUserMutation();

  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");

  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [nameInput, setNameInput] = useState("");
  const [nameError, setNameError] = useState("");

  const [direccionInput, setDireccionInput] = useState("");
  const [direccionError, setDireccionError] = useState("");

  const [telInput, setTelInput] = useState("");
  const [telError, setTelError] = useState("");

  const [dniInput, setDniInput] = useState("");
  const [dniError, setDniError] = useState("");

  const [birthDate, setBirthDate] = useState(dayjs());
  const [rolInput, setRolInput] = useState("Alumno");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const InputsVerify = () => {
    const email = verifyEmail(emailInput);
    const pass = verifyPassword(passwordInput);
    const name = verifyName(nameInput);
    const direc = verifyDireccion(direccionInput);
    const dni = verifyDNI(dniInput);
    const tel = verifyTel(telInput);

    if (
      email.status &&
      name.status &&
      tel.status &&
      pass.status &&
      dni.status &&
      direc.status
    ) {
      return true;
    } else {
      setDniError(dni.error);
      setEmailError(email.error);
      setTelError(tel.error);
      setPasswordError(pass.error);
      setNameError(name.error);
      setDireccionError(direc.error);
      return false;
    }
  };

  const registerUser = () => {
    const newUser = {
      id_dni: dniInput,
      nombreCompleto: nameInput,
      correo: emailInput,
      fechaNacimiento: birthDate.format("L"),
      telefono: telInput,
      direccion: direccionInput,
      contraseña: passwordInput,
      rolesUsuarios: {
        tipo_rol: "Cliente",
      },
    };
    console.log(newUser);
    createUser(newUser)
      .unwrap()
      .then((payload) => {
        router.push("/ingreso");
        toast.success("Usuario registrado", {
          position: "top-center",
          autoClose: 3000,
          // hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        if (error.data == "Usuario creado con éxito.") {
          router.push("/");
          toast.success("Usuario registrado", {
            position: "top-center",
            autoClose: 3000,
            // hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          console.log(error);
          toast.error("Error del servidor: " + error.data.title, {
            position: "top-center",
            autoClose: 3000,
            // hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };

  return (
    <div className="page page__form register">
      <div className="register__content container mx-auto m-8 max-w-[800px]">
        <div className="flex p-8 gap-4 rounded-xl shadow-md bg-blue-100">
          {/* <div className="w-1/2 flex items-center justify-center"> */}
          {/* <Image className="logo-ypf" src={educar} alt="Logo YPF Gas" /> */}
          {/* </div> */}
          <div className="w-full">
            <div className="inputs mt-6 w-full">
              <h3 className="title is-4 text-center mt-2 mb-2">
                Vamos a registrarte
              </h3>
              <p className="text-center mb-6">
                Los campos con * son requeridos
              </p>
              <div className="flex flex-col gap-6">
                <TextField
                  error={emailError !== ""}
                  helperText={emailError !== "" ? emailError : ""}
                  className="w-full"
                  label="Email"
                  required
                  variant="outlined"
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    setEmailError("");
                  }}
                />
                <FormControl variant="outlined" className="w-full">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Contraseña
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    error={passwordError !== ""}
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
                      setPasswordError("");
                    }}
                  />
                  {passwordError !== "" && (
                    <FormHelperText error id="accountId-error">
                      {passwordError}
                    </FormHelperText>
                  )}
                </FormControl>
                <TextField
                  error={nameError !== ""}
                  helperText={nameError !== "" ? nameError : ""}
                  className="w-full"
                  label="Nombre Completo"
                  required
                  variant="outlined"
                  onChange={(e) => {
                    setNameInput(e.target.value);
                    setNameError("");
                  }}
                />
                <TextField
                  error={direccionError !== ""}
                  helperText={direccionError !== "" ? direccionError : ""}
                  className="w-full"
                  label="Direccion"
                  required
                  variant="outlined"
                  onChange={(e) => {
                    setDireccionInput(e.target.value);
                    setDireccionError("");
                  }}
                />
                <TextField
                  error={dniError !== ""}
                  helperText={dniError !== "" ? dniError : ""}
                  className="w-full"
                  label="DNI"
                  required
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    setDniInput(e.target.value);
                    setDniError("");
                  }}
                />
                <TextField
                  error={telError !== ""}
                  helperText={telError !== "" ? telError : ""}
                  className="w-full"
                  label="Teléfono"
                  required
                  variant="outlined"
                  type="tel"
                  onChange={(e) => {
                    setTelInput(e.target.value);
                    setTelError("");
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    defaultValue={birthDate}
                    onChange={(newValue) => {
                      newValue && setBirthDate(newValue);
                    }}
                    format="DD/MM/YYYY"
                  />
                </LocalizationProvider>
              </div>
              <div className="mt-6">
                <Button
                  className="w-full"
                  onClick={() => {
                    InputsVerify() && registerUser();
                  }}
                >
                  Registrarse
                </Button>
              </div>
            </div>
            <AnswerButton
              label="¿Ya tienes una cuenta?"
              classname="my-5"
              buttonLabel="Ingresar"
              onClick={() => {
                router.push("/ingreso");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
