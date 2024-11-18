import { contactType } from "../../../types/followUps.types";
import Chip from "@mui/material/Chip";

export interface ContactTypeChipProps {
  contactType: contactType;
}

const colorMap: Record<
  contactType,
  "primary" | "info" | "success" | "default" | "secondary" | "error" | "warning"
> = {
  [contactType.CALL]: "primary",
  [contactType.EMAIL]: "warning",
  [contactType.MEETING]: "success",
};

export const ContactTypeChip = ({ contactType }: ContactTypeChipProps) => {
  return <Chip label={contactType} color={colorMap[contactType]} />;
};

export default ContactTypeChip;
