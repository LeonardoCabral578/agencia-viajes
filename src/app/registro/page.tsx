"use client";
import { useState } from "react";
import educar from "@/render/assets/img/educar.jpg";
import AnswerButton from "../../components/Form/AnswerButton/AnswerButton";
import {
  verifyDNI,
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
import { useRouter } from "next/router";
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
    const dni = verifyDNI(dniInput);
    const tel = verifyTel(telInput);

    if (
      email.status &&
      name.status &&
      tel.status &&
      pass.status &&
      dni.status
    ) {
      return true;
    } else {
      setDniError(dni.error);
      setEmailError(email.error);
      setTelError(tel.error);
      setPasswordError(pass.error);
      setNameError(name.error);
      return false;
    }
  };

  const registerUser = () => {
    const newUser = {
      dni: dniInput,
      nombreCompleto: nameInput,
      correo: emailInput,
      fechaNacimientoSolicitante: birthDate.format("L"),
      telefono: telInput,
      contraseña: passwordInput,
      rolesUsuarios: {
        tipo_rol: rolInput,
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
          toast.error("Error del servidor", {
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
      <div className="register__content container max-w-5xl mx-auto mt-24">
        <div className="flex p-4 bg-white gap-4 rounded-xl shadow-md">
          <div className="w-1/2 flex items-center justify-center">
            {/* <Image className="logo-ypf" src={educar} alt="Logo YPF Gas" /> */}
          </div>
          <div className="w-1/2">
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
                <div className="education-level">
                  <TextField
                    label="Rol:"
                    select
                    variant="outlined"
                    required
                    value={rolInput}
                    onChange={(e) => setRolInput(e.target.value)}
                    className="w-full"
                  >
                    <MenuItem value={"Alumno"} key={generateRandomKey()}>
                      Alumno
                    </MenuItem>
                    <MenuItem value={"Padre"} key={generateRandomKey()}>
                      Padre
                    </MenuItem>
                  </TextField>
                </div>
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
                  variant="contained"
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
