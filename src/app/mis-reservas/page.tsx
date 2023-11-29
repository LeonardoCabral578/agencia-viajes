"use client";
import { Hero } from "@/components/Components/Hero/Hero";
import React, { useEffect } from "react";
import viaje from "@/assets/img/viaje.jpg";
import { useGetServiciosQuery } from "@/redux/services/servicioApi";
import { CircularProgress } from "@mui/material";
import CardService from "../servicios/CardService";
import { generateRandomKey } from "@/utils/functions";
import { useRouter } from "next/navigation";
import SimpleLoader from "@/redux/SimpleLoader";
import { useGetItinerariosQuery } from "@/redux/services/itinerario";
import { useGetServicioUsuariosQuery } from "@/redux/services/servicioUsuario";
import { useGetPuntoIntermediosQuery } from "@/redux/services/puntoIntermedio";
import { useAppSelector } from "@/redux/hooks";

export default function Servicios() {
  const router = useRouter();
  const user = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (!user.isAuthenticated) {
      router.push("/ingreso");
    }
  }, []);

  const {
    data: servicioUsuario_data,
    isError: servicioUsuario_isError,
    error: servicioUsuario_error,
    isLoading: servicioUsuario_isLoading,
    isFetching: servicioUsuario_isFetching,
  } = useGetServicioUsuariosQuery(null);
  const servicioUsuario = {
    data: servicioUsuario_data,
    isError: servicioUsuario_isError,
    error: servicioUsuario_error,
    isLoading: servicioUsuario_isLoading,
    isFetching: servicioUsuario_isFetching,
  };

  const {
    data: puntoIntermedio_data,
    isError: puntoIntermedio_isError,
    error: puntoIntermedio_error,
    isLoading: puntoIntermedio_isLoading,
    isFetching: puntoIntermedio_isFetching,
  } = useGetPuntoIntermediosQuery(null);
  const puntoIntermedio = {
    data: puntoIntermedio_data,
    isError: puntoIntermedio_isError,
    error: puntoIntermedio_error,
    isLoading: puntoIntermedio_isLoading,
    isFetching: puntoIntermedio_isFetching,
  };

  return (
    <>
      <Hero
        img={viaje}
        title="Nuestros servicios"
        sub_title="Los mejores viajes de todo el país"
      />
      {user.isAuthenticated && user.userSelected && (
        <div className="">
          <SimpleLoader data={servicioUsuario}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 p-8 mb-40 w-full">
              {servicioUsuario.data
                ?.filter(
                  (value) => (value.dni_usuario = user.userSelected.id_dni)
                )
                .map((servUsu) => {
                  const puntoIntermedio = puntoIntermedio_data?.find(
                    (value) =>
                      value.id_puntoIntermedio == servUsu.id_puntoIntermedio
                  );
                  return (
                    <CardService
                      key={generateRandomKey()}
                      topTitle={`Estado: ${
                        servUsu.venta ? "Pagado" : "Reservado"
                      }`}
                      subTitle={`Costo total: ${servUsu.costo_final}`}
                      title={
                        puntoIntermedio?.nombre_ciudad
                          ? puntoIntermedio?.nombre_ciudad
                          : ""
                      }
                      desc={
                        servUsu.tipo_atencion !== null
                          ? `Tipo de atención: ${servUsu.tipo_atencion}`
                          : "No hay cupos disponibles"
                      }
                      onClick={() => {
                        console.log("Click en reserva");
                      }}
                    />
                  );
                })}
            </div>
          </SimpleLoader>
        </div>
      )}
    </>
  );
}
