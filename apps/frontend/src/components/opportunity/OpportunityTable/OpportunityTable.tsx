import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Snackbar,
} from "@mui/material";
import { DataGrid} from "@mui/x-data-grid";
import { FC, useState } from "react";
import useGetOpportunities from "../../../hooks/opportunity/useGetOpportunities";
import { OPPORTUNITIES_PAGE_SIZE } from "../../../utils/const";
import { ErrorAlert } from "../../common/alerts";
import {
  OpportunityDataGridColumns,
  OpportunityDataGridColumnVisibility,
} from "./OpportunityTable.types";
import EditOpportunityModal from "../Modal/EditOpportunityModal";

export type OpportunityTableProps = {
  onSelect: (OpportunityId: string) => void;
  onEdit: (OpportunityId: string) => void;
};

export const OpportunityTable: FC<OpportunityTableProps> = ({
  onSelect,
}: OpportunityTableProps) => {
  const [page, setPage] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);

  const { data, isLoading, isError } = useGetOpportunities(page);
  const { mutate: updateOpportunity, isPending } = {
    mutate: (args1: any, args2: any) => {
      console.log(args1, args2);
    },
    isPending: false,
  };

  const { opportunities, totalCount } = data || {};

  const onDelete = (OpportunityId: string, isActive: boolean) => {
    updateOpportunity(
      { id: OpportunityId, OpportunityData: { isActive: !isActive } },
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

  // Abrir modal de edición
  const handleEdit = (OpportunityId: string) => {
    setSelectedOpportunityId(OpportunityId);
    setIsEditModalOpen(true);
  };

  // Cerrar modal de edición
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedOpportunityId(null);
  };

  const OpenButton = ({ OpportunityId }: { OpportunityId: string }) => {
    return (
      <IconButton color="primary" onClick={() => onSelect(OpportunityId)}>
        <OpenInNewIcon />
      </IconButton>
    );
  };

  const EditButton = ({ OpportunityId }: { OpportunityId: string }) => {
    return (
      <IconButton color="primary" onClick={() => handleEdit(OpportunityId)}>
        <EditIcon />
      </IconButton>
    );
  };

  const DeleteButton = ({
    OpportunityId,
    isActive,
  }: {
    OpportunityId: string;
    isActive: boolean;
  }) => {
    return (
      <IconButton
        color="error"
        onClick={() => onDelete(OpportunityId, isActive)}
      >
        <DeleteForeverIcon />
      </IconButton>
    );
  };

  const columns = [
    {
      field: "open",
      headerName: "Open",
      sortable: false,
      renderCell: ({ row }: any) => {
        return <OpenButton OpportunityId={row.id} />;
      },
    },
    ...OpportunityDataGridColumns,
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      renderCell: ({ row }: any) => {
        return <EditButton OpportunityId={row.id} />;
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      renderCell: ({ row }: any) => {
        return <DeleteButton OpportunityId={row.id} isActive={row.isActive} />;
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
        rows={opportunities || []}
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
          Error updating Opportunity
        </Alert>
      </Snackbar>

      {/* Modal de edición */}
      {selectedOpportunityId && (
        <EditOpportunityModal
          open={isEditModalOpen}
          opportunityId={selectedOpportunityId}
          onClose={handleCloseEditModal}
        />
      )}
    </Box>
  );
};

export default OpportunityTable;
