import Chip from "@mui/material/Chip";
import {
  OpportunityBusinessType,
  opportunityBusinessTypeMap,
} from "../../../types/opportunity.types";

export type BusinessTypeChipProps = {
  businessType: OpportunityBusinessType;
};

const colorMap: Record<
  OpportunityBusinessType,
  "primary" | "info" | "success" | "default" | "secondary" | "error" | "warning"
> = {
  [OpportunityBusinessType.OUTSOURCING]: "primary",
  [OpportunityBusinessType.WEB_DEV]: "warning",
  [OpportunityBusinessType.MOBILE_DEV]: "success",
  [OpportunityBusinessType.IT_CONSULTING]: "secondary",
};

export const BusinessTypeChip = ({ businessType }: BusinessTypeChipProps) => {
  return (
    <Chip
      label={opportunityBusinessTypeMap[businessType]}
      color={colorMap[businessType]}
    />
  );
};

export default BusinessTypeChip;
