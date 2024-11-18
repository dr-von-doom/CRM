import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { FC } from "react";
import useGetFollowUps from "../../../hooks/followUp/useGetFollowUps";
import { ErrorAlert } from "../../common/alerts";
import {
  FollowUpsDataGridColumns,
  FollowUpsDataGridColumnVisibility,
} from "./FollowUpsTable.types";

export type FollowUpsTableProps = {
  opportunityId: string;
  onSelect: (clientId: string) => void;
  onEdit: (clientId: string) => void;
  onDelete: (clientId: string, isActive: boolean) => void;
};
/**
 * FollowUps table component
 */
export const FollowUpsTable: FC<FollowUpsTableProps> = ({
  opportunityId,
  onSelect,
  onEdit,
  onDelete,
}: FollowUpsTableProps) => {
  const {
    data: followUps,
    isLoading,
    isError,
  } = useGetFollowUps(opportunityId);

  /**
   * FollowUps open button component
   */
  const OpenButton = ({ followUpId }: { followUpId: string }) => {
    return (
      <IconButton color="primary" onClick={() => onSelect(followUpId)}>
        <OpenInNewIcon />
      </IconButton>
    );
  };

  /**
   * FollowUps edit button component
   */
  const EditButton = ({ followUpId }: { followUpId: string }) => {
    return (
      <IconButton color="primary" onClick={() => onEdit(followUpId)}>
        <EditIcon />
      </IconButton>
    );
  };

  /**
   * FollowUps delete button component
   */
  const DeleteButton = ({
    followUpId,
    isDeleted,
  }: {
    followUpId: string;
    isDeleted: boolean;
  }) => {
    return (
      <IconButton color="error" onClick={() => onDelete(followUpId, isDeleted)}>
        <DeleteForeverIcon />
      </IconButton>
    );
  };

  const columns = [
    {
      field: "open",
      headerName: "Open",
      sortable: false,
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return <OpenButton followUpId={row.id} />;
      },
    },
    ...FollowUpsDataGridColumns,
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return <EditButton followUpId={row.id} />;
      },
    },
    {
      field: "delete",
      headerName: "Active",
      sortable: false,
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return <DeleteButton followUpId={row.id} isDeleted={row.isDeleted} />;
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
        <CircularProgress />
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
        rows={followUps || []}
        columns={columns}
        columnVisibilityModel={FollowUpsDataGridColumnVisibility}
        disableColumnMenu
      />
    </Box>
  );
};

export default FollowUpsTable;
