import { DataGrid } from "@mui/x-data-grid";
import BackdropLoader from "@/components/Layout/BackdropLoader";
import { useGetServiciosQuery } from "@/redux/services/servicioApi";
// import { usePDF } from "react-to-pdf";

export const ServicioTable = () => {
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

  const columnsCurso = [
    {
      field: "id",
      headerName: "Servicio ID",
      minWidth: 100,
      type: "number",
    },
    {
      field: "id_itinerario",
      headerName: "Itinerario ID",
      minWidth: 100,
      type: "number",
    },
    {
      field: "id_unidad",
      headerName: "Unidad ID",
      minWidth: 100,
      type: "number",
    },
    {
      field: "disponibilidad",
      headerName: "Disponibilidad",
      minWidth: 250,
    },
    {
      field: "costo",
      headerName: "Costo Predeterminado",
      minWidth: 200,
    },
    {
      field: "destino",
      headerName: "Destino",
      minWidth: 200,
    },
  ];
  const rowsColumns: any[] = [];

  !servicio.isLoading &&
    servicio.data &&
    servicio.data.forEach((serv) => {
      rowsColumns.unshift({
        id: serv.id_servicio,
        id_itinerario: serv.id_servicio,
        id_unidad: serv.id_unidadTransporte,
        disponibilidad:
          serv.disponibilidad == null ? "No hay cupos" : serv.disponibilidad,
        costo: serv.costo_predeterminado,
      });
    });

  return (
    <>
      {servicio.isLoading && <BackdropLoader />}
      <div className="flex justify-between items-center gap-2 sm:gap-12 mb-4">
        <h1 className="titles text-lg font-medium uppercase">Servicios</h1>
      </div>
      <div
        className="bg-white rounded-xl shadow-lg w-full"
        style={{ height: 470 }}
      >
        <DataGrid
          rows={rowsColumns}
          columns={columnsCurso}
          pageSize={10}
          disableSelectIconOnClick
          sx={{
            boxShadow: 0,
            border: 0,
          }}
        />
      </div>
    </>
  );
};
