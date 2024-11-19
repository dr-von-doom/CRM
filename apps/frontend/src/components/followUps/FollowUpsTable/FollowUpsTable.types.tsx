import {
  GridColDef,
  GridColumnVisibilityModel,
  GridRowParams,
} from "@mui/x-data-grid";
import { FollowUpType } from "../../../types/followUps.types";
import { ContactTypeChip } from "../ContactTypeChip";
import { ContactChip } from "../ContactChip";

/** FollowUps data grid columns definition */
export const FollowUpsDataGridColumns: GridColDef<FollowUpType>[] = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "type",
    headerName: "Type",
    renderCell: ({ row }: Partial<GridRowParams>) => {
      return <ContactTypeChip contactType={row.type} />;
    },
  },
  {
    field: "date",
    headerName: "Date",
    valueFormatter: (value: string) => new Date(value).toLocaleDateString(),
    flex: 1,
    minWidth: 120,
  },
  {
    field: "contactId",
    headerName: "Contact",
    renderCell: ({ row }: Partial<GridRowParams>) => {
      return row.contactId ? <ContactChip contactId={row.contactId} /> : null;
    },
    flex: 1,
    minWidth: 120,
  },
  {
    field: "executiveId",
    headerName: "Executive",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    minWidth: 120,
  },
];

/** FollowUps data grid visibility model */
export const FollowUpsDataGridColumnVisibility: GridColumnVisibilityModel = {
  id: false,
};
