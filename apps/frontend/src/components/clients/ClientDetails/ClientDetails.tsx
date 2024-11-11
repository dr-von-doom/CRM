import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Typography,
} from "@mui/material";
import useGetClientById from "../../../hooks/clients/useGetClientById";
import useGetOpportunitiesByClientId from "../../../hooks/opportunity/useGetOpportunitiesByClientId";
import useGetContactsByClientId from "../../../hooks/clients/useGetContactByClientId";
import { ErrorAlert } from "../../common/alerts";

interface ClientDetailsProps {
  clientId: string;
}

export const ClientDetails: React.FC<ClientDetailsProps> = ({ clientId }) => {
  const { data: client, isLoading, isError } = useGetClientById(clientId);
  const { data: opportunities } = useGetOpportunitiesByClientId(clientId);
  const { data: contacts } = useGetContactsByClientId(clientId);

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );

  if (isError) return <ErrorAlert />;

  if (!client) return <ErrorAlert title="Client not found" description="" />;

  return (
    <Box display="flex" flexDirection="column" gap={2} justifyContent="center" sx={{ marginTop: 0.5 }}>
      <Card sx={{ margin: 1, width: "100%", maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {client.name}
          </Typography>
          <Typography variant="body2">
            <strong>NIT:</strong> {client.nit}
          </Typography>
          <Typography variant="body2">
            <strong>Address:</strong> {client.address}
          </Typography>
          <Typography variant="body2">
            <strong>City:</strong> {client.city}
          </Typography>
          <Typography variant="body2">
            <strong>Country:</strong> {client.country}
          </Typography>
          <Typography variant="body2">
            <strong>Phone:</strong> {client.phone}
          </Typography>
          <Typography variant="body2">
            <strong>Email:</strong> {client.email}
          </Typography>
          <Chip
            label={client.isActive ? "Active" : "Inactive"}
            color={client.isActive ? "success" : "error"}
            variant="filled"
            sx={{ marginTop: 1 }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Opportunities
          </Typography>
          {opportunities?.map((opportunity) => (
            <Chip
              key={opportunity.id}
              label={opportunity.businessName}
              color="primary"
              sx={{ marginRight: 1, marginBottom: 1 }}
            />

          ))}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Contacts
          </Typography>
          {contacts?.map((contact) => (
            <Chip
              key={contact.id}
              label={contact.firstName + " " + contact.lastName}
              color="primary"
              sx={{ marginRight: 1, marginBottom: 1 }}
            />
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClientDetails;
