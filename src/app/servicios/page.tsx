"use client";
import { Hero } from "@/components/Components/Hero/Hero";
import React from "react";
import viaje from "@/assets/img/viaje.jpg";
import { useGetServiciosQuery } from "@/redux/services/servicioApi";
import { CircularProgress } from "@mui/material";
import CardService from "./CardService";
import { generateRandomKey } from "@/utils/functions";
import { useRouter } from "next/navigation";
import SimpleLoader from "@/redux/SimpleLoader";

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

  return (
    <>
      <Hero
        img={viaje}
        title="Nuestros servicios"
        sub_title="Los mejores viajes de todo el país"
      />
      <div className="container">
        <SimpleLoader data={servicio}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 p-8 mb-40">
            {servicio.data?.map((serv) => (
              <CardService
                key={generateRandomKey()}
                topTitle="Viaje"
                subTitle={`Costo aproximado: ${serv.costo_predeterminado}`}
                title={
                  serv.itinerario !== null ? serv.itinerario.ciudad_destino : ""
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
            ))}
          </div>
        </SimpleLoader>
      </div>
    </>
  );
}
