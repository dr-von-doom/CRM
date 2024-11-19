import FaceIcon from "@mui/icons-material/Face";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import useGetContactById from "../../../hooks/contact/useGetContactById";

export const ContactChip = ({ contactId }: { contactId: string }) => {
  const { data, isLoading, isError } = useGetContactById(contactId);

  if (isLoading) return <CircularProgress />;

  if (isError) return <Chip label="Error" color="error" />;

  const { firstName } = data || {};

  return <Chip icon={<FaceIcon />} label={firstName} />;
};

export default ContactChip;
