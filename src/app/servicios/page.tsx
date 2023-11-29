"use client";
import { Hero } from "@/components/Components/Hero/Hero";
import React, { useEffect } from "react";
import viaje from "@/assets/img/viaje.jpg";
import { useGetServiciosQuery } from "@/redux/services/servicioApi";
import { CircularProgress } from "@mui/material";
import CardService from "./CardService";
import { generateRandomKey } from "@/utils/functions";
import { useRouter } from "next/navigation";
import SimpleLoader from "@/redux/SimpleLoader";
import { useGetItinerariosQuery } from "@/redux/services/itinerario";

export default function Servicios() {
  const {
    data: servicio_data,
    isError: servicio_isError,
    error: servicio_error,
    isLoading: servicio_isLoading,
    isFetching: servicio_isFetching,
  } = useGetServiciosQuery(null);
  const servicio = {
    data: servicio_data,
    isError: servicio_isError,
    error: servicio_error,
    isLoading: servicio_isLoading,
    isFetching: servicio_isFetching,
  };

  const router = useRouter();
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

  return (
    <>
      <Hero
        img={viaje}
        title="Nuestros servicios"
        sub_title="Los mejores viajes de todo el país"
      />
      <div className="">
        <SimpleLoader data={servicio}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 p-8 mb-40 w-full">
            {servicio.data?.map((serv) => {
              const itinerario = itinerario_data?.find(
                (value) => value.id_itinerario == serv.id_itinerario
              );
              return (
                <CardService
                  key={generateRandomKey()}
                  topTitle="Viaje"
                  subTitle={`Costo aproximado: ${serv.costo_predeterminado}`}
                  title={
                    itinerario?.ciudad_destino ? itinerario?.ciudad_destino : ""
                  }
                  desc={
                    serv.disponibilidad !== null
                      ? `Cupos: ${serv.disponibilidad}`
                      : "No hay cupos disponibles"
                  }
                  onClick={() => {
                    router.push(`/servicios/${serv.id_servicio}`);
                  }}
                />
              );
            })}
          </div>
        </SimpleLoader>
      </div>
    </>
  );
}
