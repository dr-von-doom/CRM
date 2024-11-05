import  { FC, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, CircularProgress, IconButton, Switch } from "@mui/material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import useGetClients from "../../../hooks/useGetClients";
import { CLIENTS_PAGE_SIZE } from "../../../utils/const";
import { ErrorAlert } from "../../common/alerts";
import {
  ClientDataGridColumns,
  ClientDataGridColumnVisibility,
} from "./ClientTable.types";
import EditClientModal from "../../modals/EditClientModal"; 
import { ClientType } from "../../../types/client.types";


export type ClientTableProps = {
  onSelect: (clientId: string) => void;
  onEdit: (clientId: string) => void;
  onDelete: (clientId: string) => void;
};

/**
 * Client table component
 */
export const ClientTable: FC<ClientTableProps> = ({
  onSelect,
  onDelete,
}: ClientTableProps) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetClients(page);
  const { clients, totalPage } = data || {};
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);

  const handleEditClient = (clientId: string) => {
    const clientToEdit = clients?.find(client => client.id === clientId) || null;
    setSelectedClient(clientToEdit);
    setModalOpen(true);
  };

  const handleUpdateClient = (updatedClient: ClientType) => {
    console.log("Updated client:", updatedClient);
  };

  /**
   * Client open button component
   */
  const OpenButton = ({ clientId }: { clientId: string }) => {
    return (
      <IconButton color="primary" onClick={() => onSelect(clientId)}>
        <OpenInNewIcon />
      </IconButton>
    );
  };

  /**
   * Client edit button component
   */
  const EditButton = ({ clientId }: { clientId: string }) => {
    return (
      <IconButton color="primary" onClick={() => handleEditClient(clientId)}>
        <EditIcon />
      </IconButton>
    );
  };

  /**
   * Client delete button component
   */
  const ActiveButton = ({
    clientId,
    isActive,
  }: {
    clientId: string;
    isActive: boolean;
  }) => {
    return <Switch checked={isActive} onChange={() => onDelete(clientId)} />;
  };

  const columns = [
    {
      field: "open",
      headerName: "Open",
      sortable: false,
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return <OpenButton clientId={row.id} />;
      },
    },
    ...ClientDataGridColumns,
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return <EditButton clientId={row.id} />;
      },
    },
    {
      field: "delete",
      headerName: "Active",
      sortable: false,
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return <ActiveButton clientId={row.id} isActive={row.isActive} />;
      },
    },
  ];

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />;
      </Box>
    );
  }

  if (isError) {
    return <ErrorAlert />;
  }

  return (
    <Box>
      <DataGrid
        loading={isLoading}
        rows={clients || []}
        columns={columns}
        columnVisibilityModel={ClientDataGridColumnVisibility}
        paginationModel={{
          page: page - 1,
          pageSize: CLIENTS_PAGE_SIZE,
        }}
        pageSizeOptions={[CLIENTS_PAGE_SIZE]}
        rowCount={
          (totalPage ? totalPage * CLIENTS_PAGE_SIZE : clients?.length) ?? 0
        }
        paginationMode="server"
        onPaginationModelChange={(newPaginationModel: { page: number }) => {
          setPage(newPaginationModel.page + 1);
        }}
        disableColumnMenu
      />
       {modalOpen && (
        <EditClientModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          clientData={selectedClient!}
          onUpdate={handleUpdateClient}
        />
      )}
    </Box>
  );
};

export default ClientTable;
