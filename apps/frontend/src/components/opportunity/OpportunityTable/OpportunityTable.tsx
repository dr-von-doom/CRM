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
import useGetOpportunities from "../../../hooks/opportunity/useGetOpportunities";
import useUpdateOpportunity from "../../../hooks/opportunity/useUpdateOpportunity";
import { OPPORTUNITIES_PAGE_SIZE } from "../../../utils/const";
import { ErrorAlert } from "../../common/alerts";
import {
  OpportunityDataGridColumns,
  OpportunityDataGridColumnVisibility,
} from "./OpportunityTable.types";

export type OpportunityTableProps = {
  onSelect: (opportunityId: string) => void;
  onEdit: (opportunityId: string) => void;
};

/**
 * Opportunity table component
 */
export const OpportunityTable: FC<OpportunityTableProps> = ({
  onSelect,
  onEdit,
}: OpportunityTableProps) => {
  const [page, setPage] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);

  const { data, isLoading, isError } = useGetOpportunities(page);
  const { mutate: updateOpportunity, isPending } = useUpdateOpportunity();

  const { opportunities, totalCount } = data || {};

  // Filter opportunities where isDeleted is false
  const filteredOpportunities = (opportunities || []).filter(
    (opportunity) => !opportunity.isDeleted
  );

  const onDelete = (opportunityId: string) => {
    updateOpportunity(
      { id: opportunityId, opportunityData: { isDeleted: true } },
      {
        onError: () => {
          setOpenSnackbar(true);
        },
        onSettled: () => {
          // Close the confirmation dialog after the mutation settles
          setOpenConfirmDialog(false);
          setSelectedOpportunityId(null);
        },
      }
    );
  };

  const handleDeleteClick = (opportunityId: string) => {
    setSelectedOpportunityId(opportunityId);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedOpportunityId) {
      onDelete(selectedOpportunityId);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedOpportunityId(null);
  };

  /**
   * Opportunity open button component
   */
  const OpenButton = ({ opportunityId }: { opportunityId: string }) => {
    return (
      <IconButton color="primary" onClick={() => onSelect(opportunityId)}>
        <OpenInNewIcon />
      </IconButton>
    );
  };

  /**
   * Opportunity edit button component
   */
  const EditButton = ({ opportunityId }: { opportunityId: string }) => {
    return (
      <IconButton color="primary" onClick={() => onEdit(opportunityId)}>
        <EditIcon />
      </IconButton>
    );
  };

  /**
   * Opportunity delete button component
   */
  const DeleteButton = ({ opportunityId }: { opportunityId: string }) => {
    return (
      <IconButton color="error" onClick={() => handleDeleteClick(opportunityId)}>
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
        return <OpenButton opportunityId={row.id} />;
      },
    },
    ...OpportunityDataGridColumns,
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return <EditButton opportunityId={row.id} />;
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      renderCell: ({ row }: Partial<GridRowParams>) => {
        return <DeleteButton opportunityId={row.id} />;
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
        rows={filteredOpportunities}
        columns={columns}
        columnVisibilityModel={OpportunityDataGridColumnVisibility}
        paginationModel={{
          page: page - 1,
          pageSize: OPPORTUNITIES_PAGE_SIZE,
        }}
        pageSizeOptions={[OPPORTUNITIES_PAGE_SIZE]}
        rowCount={totalCount ?? 0}
        paginationMode="server"
        onPaginationModelChange={(newPaginationModel: { page: number }) => {
          setPage(newPaginationModel.page + 1);
        }}
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
            Are you sure you want to delete this opportunity? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            disabled={isPending}
          >
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
          Error deleting opportunity
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OpportunityTable;