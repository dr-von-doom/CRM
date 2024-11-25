import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
} from "@mui/material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { FC, useState } from "react";
import useGetFollowUps from "../../../hooks/followUp/useGetFollowUps";
import useUpdateFollowUp from "../../../hooks/followUp/useUpdateFollowUp";
import { ErrorAlert } from "../../common/alerts";
import {
  FollowUpsDataGridColumns,
  FollowUpsDataGridColumnVisibility,
} from "./FollowUpsTable.types";
import EditFollowUpModal from "../EditFollowUpModal/EditFollowUpModal.tsx";

export type FollowUpsTableProps = {
  opportunityId: string;
  onSelect: (followUpId: string) => void;
};

export const FollowUpsTable: FC<FollowUpsTableProps> = ({
  opportunityId,
  onSelect,
}) => {
  const {
    data: followUps,
    isLoading,
    isError,
  } = useGetFollowUps(opportunityId);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedFollowUpId, setSelectedFollowUpId] = useState<string | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { mutate: updateFollowUp, isPending } = useUpdateFollowUp();

  const onDelete = (followUpId: string) => {
    updateFollowUp(
      { id: followUpId, followUpData: { isDeleted: true } },
      {
        onError: () => {
          setOpenSnackbar(true);
        },
        onSettled: () => {
          // Close the confirmation dialog after the mutation settles
          setOpenConfirmDialog(false);
          setSelectedFollowUpId(null);
        },
      }
    );
  };

  const handleDeleteClick = (followUpId: string) => {
    setSelectedFollowUpId(followUpId);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedFollowUpId) {
      onDelete(selectedFollowUpId);
    }
  };

  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedFollowUpId(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleEditClick = (followUpId: string) => {
    setSelectedFollowUpId(followUpId);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
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
      <IconButton color="primary" onClick={() => handleEditClick(followUpId)}>
        <EditIcon />
      </IconButton>
    );
  };

  /**
   * FollowUps delete button component
   */
  const DeleteButton = ({ followUpId }: { followUpId: string }) => {
    return (
      <IconButton color="error" onClick={() => handleDeleteClick(followUpId)}>
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
      headerName: "Delete",
      sortable: false,
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return <DeleteButton followUpId={row.id} />;
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
        loading={isLoading || isPending}
        rows={followUps || []}
        columns={columns}
        columnVisibilityModel={FollowUpsDataGridColumnVisibility}
        disableColumnMenu
        autoHeight
      />

      {/* Edit Follow-Up Modal */}
      {selectedFollowUpId && (
        <EditFollowUpModal
          open={isEditModalOpen}
          followUpId={selectedFollowUpId}
          onClose={handleCloseEditModal}
        />
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseDialog}
        aria-labelledby="confirm-delete-dialog"
      >
        <DialogTitle id="confirm-delete-dialog">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this follow-up? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Error deleting follow-up
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FollowUpsTable;
