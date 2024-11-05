import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import useGetClientById from "../../../hooks/useGetClientById.ts";
import useUpdateClient from "../../../hooks/useUpdateClients.ts";
import { ClientType } from "../../../types/client.types.ts";

interface EditClientModalProps {
  open: boolean;
  clientId: string;
  onClose: () => void;
}

const EditClientModal: React.FC<EditClientModalProps> = ({
  open,
  clientId,
  onClose,
}) => {
  const { data: clientData } = useGetClientById(clientId);
  const { mutate: updateClientHandler, isError } = useUpdateClient();

  const { control, handleSubmit, reset } = useForm<ClientType>({
    defaultValues: clientData,
  });

  useEffect(() => {
    reset(clientData);
  }, [clientData, reset]);

  const onSubmit = (data: ClientType) => {
    updateClientHandler(
      { id: data.id, clientData: data },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          console.error("Error updating client:", error);
        },
      }
    );
  };

  if (!clientData) return null;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-client-modal">
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography id="edit-client-modal" variant="h6" component="h2">
          Edit Client
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {[
              "nit",
              "name",
              "address",
              "city",
              "country",
              "phone",
              "email",
            ].map((field) => (
              <Grid item xs={12} key={field}>
                <Controller
                  name={field as keyof ClientType}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label={field.name} />
                  )}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="outlined"
              onClick={onClose}
              color="error"
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button variant="outlined" type="submit" color="primary">
              Update
            </Button>
          </Box>
          {isError && (
            <Typography color="error" sx={{ mt: 2 }}>
              Error updating client. Please try again.
            </Typography>
          )}
        </form>
      </Box>
    </Modal>
  );
};

export default EditClientModal;
