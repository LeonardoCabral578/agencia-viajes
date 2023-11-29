"use client";
import { Hero } from "@/components/Components/Hero/Hero";
import { useGetServicioByIdQuery } from "@/redux/services/servicioApi";
import React from "react";
import viaje from "@/assets/img/viaje.jpg";
import SimpleLoader from "@/redux/SimpleLoader";

export default function Reserva({ params }: { params: { id: string } }) {
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

  return (
    <>
      <Hero
        img={viaje}
        title="Reserva"
        sub_title="¡Apurate antes que se terminen los cupos!"
      />
      <div className="container p-8">
        <SimpleLoader data={servicio}>
          <div className="w-full bg-blue-50 h-60 p-4 rounded-xl">
            <p className="text-4xl font-semibold text-center">Itinerario</p>
          </div>
        </SimpleLoader>
      </div>
    </>
  );
}
