import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { FC, useState } from "react";
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

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedFollowUpId, setSelectedFollowUpId] = useState<string | null>(null);
  const [selectedIsActive, setSelectedIsActive] = useState<boolean>(false);

  const handleDeleteClick = (followUpId: string, isActive: boolean) => {
    setSelectedFollowUpId(followUpId);
    setSelectedIsActive(isActive);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedFollowUpId !== null) {
      onDelete(selectedFollowUpId, selectedIsActive);
      setOpenConfirmDialog(false);
      setSelectedFollowUpId(null);
    }
  };

  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedFollowUpId(null);
  };

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
    isActive,
  }: {
    followUpId: string;
    isActive: boolean;
  }) => {
    return (
      <IconButton color="error" onClick={() => handleDeleteClick(followUpId, isActive)}>
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
        return <DeleteButton followUpId={row.id} isActive={row.isActive} />;
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

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseDialog}
        aria-labelledby="confirm-delete-dialog"
      >
        <DialogTitle id="confirm-delete-dialog">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this follow-up? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FollowUpsTable;