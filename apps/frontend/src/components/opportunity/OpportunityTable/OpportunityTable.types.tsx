import {
  GridColDef,
  GridColumnVisibilityModel,
  GridRowParams,
} from "@mui/x-data-grid";
import { OpportunityType } from "../../../types/opportunity.types";
import { ClientChip } from "../../clients/ChientChip";
import { BusinessTypeChip } from "../BusinessTypeChip";
import { OpportunityStatusChip } from "../OpportunityStatusChip";

/** Opportunity data grid columns definition */
export const OpportunityDataGridColumns: GridColDef<OpportunityType>[] = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "clientId",
    headerName: "Client",
    renderCell: ({ row }: Partial<GridRowParams>) => {
      return <ClientChip clientId={row.clientId} />;
    },
    flex: 1,
    minWidth: 120,
  },
  {
    field: "businessName",
    headerName: "Business Name",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "businessType",
    headerName: "Business Type",
    renderCell: ({ row }: Partial<GridRowParams>) => {
      return <BusinessTypeChip businessType={row.businessType} />;
    },
    flex: 1,
    minWidth: 120,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "status",
    headerName: "Status",
    renderCell: ({ row }: Partial<GridRowParams>) => {
      return <OpportunityStatusChip status={row.status} />;
    },
    flex: 1,
    minWidth: 120,
  },
  {
    field: "estimatedDate",
    headerName: "Estimated Date",
    valueFormatter: (value: string) => new Date(value).toLocaleDateString(),
    flex: 1,
    minWidth: 120,
  },
  {
    field: "estimatedValue",
    headerName: "Estimated Value",
    valueFormatter: (value: number) => `COP ${value ?? "-"}`,
    flex: 1,
    minWidth: 120,
  },
  {
    field: "isDeleted",
    headerName: "Deleted",
  },
];

/** Opportunity data grid visibility model */
export const OpportunityDataGridColumnVisibility: GridColumnVisibilityModel = {
  id: false,
  isDeleted: false,
  description: false,
};
