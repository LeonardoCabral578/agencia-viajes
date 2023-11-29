"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import { generateRandomKey } from "@/utils/functions";
import { toast } from "react-toastify";
import {
  useCreateUnidadMutation,
  useDeleteUnidadMutation,
  useGetUnidadesQuery,
  useUpdateUnidadMutation,
} from "@/redux/services/unidadesApi";

const initialRows: GridRowsProp = [];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id: id, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Agregar Unidad
      </Button>
    </GridToolbarContainer>
  );
}

export default function UnidadTable() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
    const findedRow = rows.find((row) => row.id === id);
    findedRow && deleteMutation(findedRow.id_unidad);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const [updateModel] = useUpdateUnidadMutation();
  const updateMutation = async (newRow: GridRowModel) => {
    await updateModel({
      id_unidadTransporte: Number(newRow.id_unidadTransporte),
      data: {
        tipo_unidad: newRow.tipo_unidad,
        categoria: newRow.categoria,
        asientos: newRow.asientos,
      },
    })
      .unwrap()
      .then((payload) => {
        toast.success("El registro fue actualizado", {
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
      .catch((error) => {
        // toast.error(error.message, {
        //   position: "top-center",
        //   autoClose: 3000,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });
      });
  };

  const [deleteModel] = useDeleteUnidadMutation();
  const deleteMutation = async (id: GridRowId) => {
    await deleteModel({
      id_unidadTransporte: Number(id),
    })
      .unwrap()
      .then((payload) => {
        toast.success("El registro fue eliminado", {
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
      .catch((error) => {
        toast.error(error.message, {
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

  const [addNewModel] = useCreateUnidadMutation();
  const addMutation = async (newRow: GridRowModel) => {
    if (!newRow.id_unidadTransporte) {
      await addNewModel({ data: newRow })
        .unwrap()
        .then((payload) => {
          toast.success("Registro agregado exitosamente", {
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
          console.log(error);
          // toast.error(error.error, {
          //   position: "top-center",
          //   autoClose: 3000,
          //   hideProgressBar: true,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "colored",
          // });
        });
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    const findedRow = rows.find((row) =>
      row.id === newRow.id ? updatedRow : row
    );
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    updateMutation(newRow);
    addMutation(newRow);
    unidad_refetch();

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const {
    data: unidad_data,
    isError: unidad_isError,
    error: unidad_error,
    isLoading: unidad_isLoading,
    isFetching: unidad_isFetching,
    refetch: unidad_refetch,
  } = useGetUnidadesQuery(null);
  const unidad = {
    data: unidad_data,
    isError: unidad_isError,
    error: unidad_error,
    isLoading: unidad_isLoading,
    isFetching: unidad_isFetching,
    refecth: unidad_refetch,
  };

  const columns: GridColDef[] = [
    {
      field: "id_unidadTransporte",
      headerName: "Unidad ID",
      width: 200,
      editable: false,
    },
    {
      field: "tipo_unidad",
      headerName: "Tipo",
      type: "string",
      align: "left",
      headerAlign: "left",
      width: 200,
      editable: true,
    },
    {
      field: "categoria",
      headerName: "Categoría",
      width: 200,
      align: "left",
      headerAlign: "left",
      type: "singleSelect",
      valueOptions: ["Cochecama", "Semicama", "Comun"],
      editable: true,
    },
    {
      field: "asientos",
      headerName: "Asientos",
      align: "left",
      headerAlign: "left",
      width: 220,
      editable: true,
      type: "number",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={generateRandomKey()}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={generateRandomKey()}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={generateRandomKey()}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={generateRandomKey()}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  React.useEffect(() => {
    if (Array.isArray(unidad.data)) {
      const updatedRows = unidad.data.map((dataItem) => ({
        id: randomId(),
        id_unidadTransporte: dataItem.id_unidadTransporte,
        tipo_unidad: dataItem.tipo_unidad,
        categoria: dataItem.categoria,
        asientos: dataItem.asientos,
      }));
      setRows(updatedRows);
    }
  }, [unidad.data]);

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
