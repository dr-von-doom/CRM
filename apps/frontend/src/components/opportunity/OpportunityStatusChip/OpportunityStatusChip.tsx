import Chip from "@mui/material/Chip";
import {
  OpportunityStatus,
  opportunityStatusMap,
} from "../../../types/opportunity.types";

export type OpportunityStatusChipProps = {
  status: OpportunityStatus;
};

const colorMap: Record<
  OpportunityStatus,
  "primary" | "info" | "success" | "default" | "secondary" | "error" | "warning"
> = {
  [OpportunityStatus.OPEN]: "primary",
  [OpportunityStatus.IN_STUDY]: "secondary",
  [OpportunityStatus.PURCHASE_ORDER]: "warning",
  [OpportunityStatus.COMPLETED]: "success",
};

export const OpportunityStatusChip = ({
  status,
}: OpportunityStatusChipProps) => {
  return <Chip label={opportunityStatusMap[status]} color={colorMap[status]} />;
};

export default OpportunityStatusChip;
