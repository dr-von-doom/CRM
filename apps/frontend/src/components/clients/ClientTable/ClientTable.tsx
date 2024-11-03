import Button from "@mui/material/Button";
import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridRowParams,
} from "@mui/x-data-grid";
import { useState } from "react";
import useGetClients from "../../../hooks/useGetClients";
import { ClientType } from "../../../types/client.types";
import { CLIENTS_PAGE_SIZE } from "../../../utils/conts";
import EditClientModal from './EditClientModal'; // Asegúrate de que la ruta sea correcta

/** Client data grid columns definition */
const ClientDataGridColumns: GridColDef<ClientType>[] = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "nit",
    headerName: "NIT",
  },
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "address",
    headerName: "Address",
  },
  {
    field: "city",
    headerName: "City",
  },
  {
    field: "country",
    headerName: "Country",
  },
  {
    field: "phone",
    headerName: "Phone",
  },
  {
    field: "email",
    headerName: "Email",
  },
  {
    field: "isActive",
    headerName: "Is Active",
    flex: 1,
  },
  {
    field: "edit",
    headerName: "Edit",
    sortable: false,
    renderCell: ({ row }: Partial<GridRowParams>) => {
      return <EditButton client={row} />;
    },
  },
  {
    field: "delete",
    headerName: "Delete",
    sortable: false,
    width: 150,
    renderCell: ({ row }: Partial<GridRowParams>) => {
      return <DeleteButton clientId={row.id} isActive={row.isActive} />;
    },
  },
];

/** Client data grid visibility model */
const ClientDataGridColumnVisibility: GridColumnVisibilityModel = {
  id: false,
  isActive: false,
};

/**
 * Client edit button component
 */
const EditButton = ({ client }: { client: ClientType }) => {
  const [open, setOpen] = useState(false);

  const handleUpdate = (updatedClient: ClientType) => {
    // Aquí debes implementar la lógica para actualizar el cliente en la API
    console.log("[EditButton] Updating client:", updatedClient);
    // Puedes hacer la llamada a la API aquí
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        className="w-full"
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>
      <EditClientModal
        open={open}
        onClose={() => setOpen(false)}
        clientData={client}
        onUpdate={handleUpdate}
      />
    </>
  );
};

/**
 * Client delete button component
 */
const DeleteButton = ({
  clientId,
  isActive,
}: {
  clientId: string;
  isActive: boolean;
}) => {
  return (
    <Button
      variant="outlined"
      color={isActive ? "error" : "success"}
      className="w-full"
      onClick={() => console.log("[ClientTable] DeleteButton", clientId)}
    >
      {isActive ? "Deactivate" : "Activate"}
    </Button>
  );
};

/**
 * Client table component
 */
export const ClientTable = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError } = useGetClients(page);
  const { clients, totalPage } = data || {};

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error...</>;
  }

  return (
    <div>
      <h2>Clients List</h2>
      <DataGrid
        rows={clients || []}
        columns={ClientDataGridColumns}
        columnVisibilityModel={ClientDataGridColumnVisibility}
        paginationModel={{
          page: page,
          pageSize: CLIENTS_PAGE_SIZE,
        }}
        pageSizeOptions={[10, 20, 30]}
        rowCount={totalPage ? totalPage * CLIENTS_PAGE_SIZE : clients?.length}
        loading={isLoading}
        paginationMode="server"
        onPaginationModelChange={(newPaginationModel) => {
          setPage(newPaginationModel.page); // Update page on change
        }}
      />
    </div>
  );
};

export default ClientTable;
