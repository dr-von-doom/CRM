import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { ClientType } from "../../../types/client.types";

/** Client data grid columns definition */
export const ClientDataGridColumns: GridColDef<ClientType>[] = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "nit",
    headerName: "NIT",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "address",
    headerName: "Address",
  },
  {
    field: "city",
    headerName: "City",
  },
  {
    field: "country",
    headerName: "Country",
  },
  {
    field: "phone",
    headerName: "Phone",
  },
  {
    field: "email",
    headerName: "Email",
  },
  {
    field: "isActive",
    headerName: "Is Active",
  },
];

/** Client data grid visibility model */
export const ClientDataGridColumnVisibility: GridColumnVisibilityModel = {
  id: false,
  isActive: false,
};
