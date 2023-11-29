"use client";
import { Hero } from "@/components/Components/Hero/Hero";
import { useGetServicioByIdQuery } from "@/redux/services/servicioApi";
import React, { useEffect, useState } from "react";
import viaje from "@/assets/img/viaje.jpg";
import SimpleLoader from "@/redux/SimpleLoader";
import {
  TItinerarioPunto,
  useGetItinerarioPuntosQuery,
} from "@/redux/services/itinerarioPuntoApi";
import { generateRandomKey } from "@/utils/functions";
import CardService from "../CardService";
import {
  TPuntoIntermedio,
  useGetPuntoIntermediosQuery,
} from "@/redux/services/puntoIntermedio";
import { validateConfig } from "next/dist/server/config-shared";
import { useRouter } from "next/navigation";
import {
  TItinerario,
  useGetItinerariosQuery,
} from "@/redux/services/itinerario";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { toast } from "react-toastify";
import { useCreateServicioUsuarioMutation } from "@/redux/services/servicioUsuario";
import { useAppSelector } from "@/redux/hooks";

export default function Reserva({ params }: { params: { id: string } }) {
  const router = useRouter();
  const user = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (!user.isAuthenticated) {
      router.push("/ingreso");
    }
  }, [user]);

  const [puntoSelected, setPuntoSelected] = useState<null | TPuntoIntermedio>(
    null
  );
  const [itiPunSelected, setItiPunSelected] = useState<null | TItinerarioPunto>(
    null
  );
  const [itinerarioSelected, setItinerarioSelected] =
    useState<null | TItinerario>(null);
  const [tipoAtencion, setTipoAtencion] = useState("Común");

  const {
    data: servicio_data,
    isError: servicio_isError,
    error: servicio_error,
    isLoading: servicio_isLoading,
    isFetching: servicio_isFetching,
  } = useGetServicioByIdQuery({ id_servicio: params.id });
  const servicio = {
    data: servicio_data,
    isError: servicio_isError,
    error: servicio_error,
    isLoading: servicio_isLoading,
    isFetching: servicio_isFetching,
  };

  const {
    data: itinerarioPunto_data,
    isError: itinerarioPunto_isError,
    error: itinerarioPunto_error,
    isLoading: itinerarioPunto_isLoading,
    isFetching: itinerarioPunto_isFetching,
  } = useGetItinerarioPuntosQuery(null);
  const itinerarioPuntos = {
    data: itinerarioPunto_data,
    isError: itinerarioPunto_isError,
    error: itinerarioPunto_error,
    isLoading: itinerarioPunto_isLoading,
    isFetching: itinerarioPunto_isFetching,
  };

  const {
    data: puntoIntermedio_data,
    isError: puntoIntermedio_isError,
    error: puntoIntermedio_error,
    isLoading: puntoIntermedio_isLoading,
    isFetching: puntoIntermedio_isFetching,
  } = useGetPuntoIntermediosQuery(null);
  const puntoIntermedios = {
    data: puntoIntermedio_data,
    isError: puntoIntermedio_isError,
    error: puntoIntermedio_error,
    isLoading: puntoIntermedio_isLoading,
    isFetching: puntoIntermedio_isFetching,
  };

  const {
    data: itinerario_data,
    isError: itinerario_isError,
    error: itinerario_error,
    isLoading: itinerario_isLoading,
    isFetching: itinerario_isFetching,
  } = useGetItinerariosQuery(null);
  const itinerario = {
    data: itinerario_data,
    isError: itinerario_isError,
    error: itinerario_error,
    isLoading: itinerario_isLoading,
    isFetching: itinerario_isFetching,
  };

  const [addNewModel] = useCreateServicioUsuarioMutation();
  const addMutation = async () => {
    await addNewModel({
      data: {
        dni_usuario: user.userSelected.id_dni,
        id_servicio: Number(params.id),
        id_puntoIntermedio: puntoSelected?.id_puntoIntermedio,
        tipo_atencion: tipoAtencion,
        venta: false,
      },
    })
      .unwrap()
      .then((payload) => {
        router.push("/servicios");
        toast.success("Reserva agregada exitosamente", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error: any) => {
        console.log(error.data);
        toast.error(error.error, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  if (itinerario.data) {
    const itinerarioSel = itinerario.data.find(
      (value) => value.id_itinerario == servicio_data?.id_itinerario
    );

    itinerarioSel && setItinerarioSelected(itinerarioSel);
  }

  useEffect(() => {
    if (itinerario.data) {
      const itinerarioSel = itinerario.data.find(
        (value) => value.id_itinerario == servicio_data?.id_itinerario
      );

      itinerarioSel && setItinerarioSelected(itinerarioSel);
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setTipoAtencion(event.target.value);
  };

  return (
    <>
      <Hero
        img={viaje}
        title="Reserva"
        sub_title="¡Apurate antes que se terminen los cupos!"
      />
      <SimpleLoader data={servicio}>
        <div className="p-8">
          {puntoSelected == null ? (
            <>
              <h1>Selecciona un punto intermedio:</h1>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 p-8 mb-40 w-full">
                {itinerarioPuntos.data
                  ?.filter(
                    (value1) =>
                      value1.id_itinerario === servicio_data?.id_itinerario
                  )
                  .map((itipun) => {
                    const puntoIntermedio = puntoIntermedio_data?.find(
                      (value2) =>
                        itipun.id_puntoIntermedio == value2.id_puntoIntermedio
                    );

                    return (
                      <CardService
                        key={generateRandomKey()}
                        topTitle={`Horario de salida: ${itipun.hora_salida_PI}`}
                        subTitle={`Horario de llegada: ${itipun.hora_llegada_PI}`}
                        title={
                          puntoIntermedio?.nombre_ciudad
                            ? puntoIntermedio?.nombre_ciudad
                            : ""
                        }
                        onClick={() => {
                          setPuntoSelected(
                            puntoIntermedio ? puntoIntermedio : null
                          );
                          setItiPunSelected(itipun);
                        }}
                      />
                    );
                  })}
              </div>
            </>
          ) : (
            <>
              <div className="bg-blue-50 p-4 rounded-xl">
                <h1 className="text-center text-xl mb-4">
                  Datos de tu reserva:
                </h1>
                <div className="rounded-xl bg-white p-8 flex flex-col gap-4">
                  <p>
                    <b>Ciudad Origen y Fecha de salida:</b>{" "}
                    {itinerarioSelected?.ciudad_origen} |{" "}
                    {itinerarioSelected?.fecha_partida} -{" "}
                    {itinerarioSelected?.hora_partida}
                  </p>
                  <p>
                    <b>Ciudad Destino y Fecha de llegada:</b>{" "}
                    {itinerarioSelected?.ciudad_destino} |{" "}
                    {itinerarioSelected?.fecha_llegada} -{" "}
                    {itinerarioSelected?.hora_llegada}
                  </p>
                  <p>
                    <b>Disponibilidad restante:</b>{" "}
                    {servicio_data?.disponibilidad}
                  </p>
                  <p>
                    <b>Costo predeterminado:</b>{" "}
                    {servicio_data?.costo_predeterminado}
                  </p>
                  <hr />
                  <p>
                    <b>Punto seleccionado:</b> {puntoSelected?.nombre_ciudad}
                  </p>
                  <p>
                    <b>Horario de Salida:</b> {itiPunSelected?.hora_salida_PI}
                  </p>
                  <p>
                    <b>Horario de Llegada:</b> {itiPunSelected?.hora_llegada_PI}
                  </p>
                  <hr />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Tipo de atención
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={tipoAtencion}
                      label="Tipo de atención"
                      onChange={handleChange}
                    >
                      <MenuItem value={"Común"}>Común</MenuItem>
                      <MenuItem value={"Ejecutivo"}>Ejecutivo</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    size="large"
                    className="text-2xl"
                    onClick={() => {
                      addMutation();
                    }}
                  >
                    Reservar
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SimpleLoader>
    </>
  );
}
