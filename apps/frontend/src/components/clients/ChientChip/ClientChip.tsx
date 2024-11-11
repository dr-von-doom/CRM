import FaceIcon from "@mui/icons-material/Face";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import useGetClientById from "../../../hooks/clients/useGetClientById";

export const ClientChip = ({ clientId }: { clientId: string }) => {
  const { data, isLoading, isError } = useGetClientById(clientId);

  if (isLoading) return <CircularProgress />;

  if (isError) return <Chip label="Error" color="error" />;

  const { name } = data || {};

  return <Chip icon={<FaceIcon />} label={name} />;
};

export default ClientChip;
