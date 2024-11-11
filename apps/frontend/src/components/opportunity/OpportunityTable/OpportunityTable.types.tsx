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
  },
  {
    field: "businessName",
    headerName: "Business Name",
  },
  {
    field: "businessType",
    headerName: "Business Type",
    renderCell: ({ row }: Partial<GridRowParams>) => {
      return <BusinessTypeChip businessType={row.businessType} />;
    },
  },
  {
    field: "description",
    headerName: "Description",
  },
  {
    field: "status",
    headerName: "Status",
    renderCell: ({ row }: Partial<GridRowParams>) => {
      return <OpportunityStatusChip status={row.status} />;
    },
  },
  {
    field: "estimatedDate",
    headerName: "Estimated Date",
    valueFormatter: (value: string) => new Date(value).toLocaleDateString(),
  },
  {
    field: "estimatedValue",
    headerName: "Estimated Value",
    valueFormatter: (value: number) => `COP ${value ?? "-"}`,
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
