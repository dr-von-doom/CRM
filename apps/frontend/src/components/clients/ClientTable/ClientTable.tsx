import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew"; // Icon for "Open"
import { Box, IconButton, Switch } from "@mui/material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { useState } from "react";
import useGetClients from "../../../hooks/useGetClients";
import { CLIENTS_PAGE_SIZE } from "../../../utils/const";
import {
  ClientDataGridColumns,
  ClientDataGridColumnVisibility,
} from "./ClientTable.types";

export interface ClientTableProps {
  onSelect?: (clientId: string) => void;
  onEdit?: (clientId: string) => void;
  onDelete?: (clientId: string) => void;
}

/**
 * Client table component
 */
export const ClientTable = ({
  onSelect = () => {},
  onEdit = () => {},
  onDelete = () => {},
}: ClientTableProps) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetClients(page);
  const { clients, totalPage } = data || {};

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

  if (isError) {
    return <>Error...</>;
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
        onPaginationModelChange={(newPaginationModel) => {
          setPage(newPaginationModel.page + 1);
        }}
        disableColumnMenu
      />
    </Box>
  );
};

export default ClientTable;
