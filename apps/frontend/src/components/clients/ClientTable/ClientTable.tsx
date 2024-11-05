import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Snackbar,
  Switch,
} from "@mui/material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { FC, useState } from "react";
import useGetClients from "../../../hooks/useGetClients";
import useUpdateClient from "../../../hooks/useUpdateClients";
import { CLIENTS_PAGE_SIZE } from "../../../utils/const";
import { ErrorAlert } from "../../common/alerts";
import {
  ClientDataGridColumns,
  ClientDataGridColumnVisibility,
} from "./ClientTable.types";

export type ClientTableProps = {
  onSelect: (clientId: string) => void;
  onEdit: (clientId: string) => void;
};

/**
 * Client table component
 */
export const ClientTable: FC<ClientTableProps> = ({
  onSelect,
  onEdit,
}: ClientTableProps) => {
  const [page, setPage] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { data, isLoading, isError } = useGetClients(page);
  const { mutate: updateClient, isPending } = useUpdateClient();

  const { clients, totalPage } = data || {};

  const onDelete = (clientId: string, isActive: boolean) => {
    updateClient(
      { id: clientId, clientData: { isActive: !isActive } },
      {
        onError: () => {
          setOpenSnackbar(true);
        },
      }
    );
  };

  const handleClose = () => {
    setOpenSnackbar(false);
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
      <IconButton color="primary" onClick={() => onEdit(clientId)}>
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
    return (
      <Switch
        checked={isActive}
        onChange={() => onDelete(clientId, isActive)}
      />
    );
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
        loading={isLoading || isPending}
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

      <Snackbar
        open={openSnackbar}
        onClose={handleClose}
        autoHideDuration={3000}
        message="Note archived"
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Error updating client
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClientTable;
