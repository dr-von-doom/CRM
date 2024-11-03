import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { ClientType } from '../../../types/client.types';
import useUpdateClient from '../../../hooks/useUpdateClients.ts'; // Asegúrate de que la ruta sea correcta

interface EditClientModalProps {
  open: boolean;
  onClose: () => void;
  clientData: ClientType;
  onUpdate: (updatedClient: ClientType) => void;
}

const EditClientModal: React.FC<EditClientModalProps> = ({
  open,
  onClose,
  clientData,
  onUpdate,
}) => {
  const { updateClientHandler } = useUpdateClient();
  const [formData, setFormData] = useState(clientData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const updatedClient = await updateClientHandler(formData.id, formData);
      onUpdate(updatedClient);
      onClose();
    } catch (error) {
      console.error("Error updating client:", error);
      // Maneja el error como prefieras
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-client-modal">
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography id="edit-client-modal" variant="h6" component="h2">
          Edit Client
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="NIT"
              name="nit"
              value={formData.nit}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button variant="outlined" onClick={onClose} color='error' sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={handleUpdate} color="primary">
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditClientModal;
