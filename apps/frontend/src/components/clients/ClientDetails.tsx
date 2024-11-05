import { useEffect, useState } from 'react';
import { ClientType } from '../../types/client.types';
import { getClients } from '../../services/client.service';
import {
  Box, CircularProgress, Typography, Card, CardContent, Chip,
} from '@mui/material';

interface ClientDetailsProps {
  clientId: string | null;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ clientId }) => {
  const [client, setClient] = useState<ClientType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      if (clientId) {
        try {
          const response = await getClients(1);
          const foundClient = response.clients.find(c => c.id === clientId);
          setClient(foundClient || null);
        } catch (err) {
          setError('Error fetching client details');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchClient();
  }, [clientId]);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box color="error.main" textAlign="center">
      <Typography variant="h6">{error}</Typography>
    </Box>
  );

  if (!client) return (
    <Box textAlign="center">
      <Typography variant="h6">No client found.</Typography>
    </Box>
  );

  return (
    <Box display="flex" justifyContent="center" sx={{ marginTop: 0.5 }}> 
      <Card sx={{ margin: 1, width: '100%', maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {client.name}
          </Typography>
          <Typography variant="body2"><strong>NIT:</strong> {client.nit}</Typography>
          <Typography variant="body2"><strong>Address:</strong> {client.address}</Typography>
          <Typography variant="body2"><strong>City:</strong> {client.city}</Typography>
          <Typography variant="body2"><strong>Country:</strong> {client.country}</Typography>
          <Typography variant="body2"><strong>Phone:</strong> {client.phone}</Typography>
          <Typography variant="body2"><strong>Email:</strong> {client.email}</Typography>
          <Chip
            label={client.isActive ? 'Active' : 'Inactive'}
            color={client.isActive ? 'success' : 'error'}
            variant="filled" 
            sx={{ marginTop: 1 }} 
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClientDetails;
