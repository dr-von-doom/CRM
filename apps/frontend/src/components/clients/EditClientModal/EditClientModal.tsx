import { Box, Button, Grid, Modal, TextField, Typography, List, ListItem, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ClientType, ContactType } from "../../../types/client.types";
import useUpdateContact from "../../../hooks/useUpdateContact";
import useGetContactsByClientId from "../../../hooks/useGetContactsByClientId";
import useUpdateClient from "../../../hooks/clients/useUpdateClients";
import useGetClientById from "../../../hooks/clients/useGetClientById";

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
  const { data: contacts, isLoading: contactsLoading } = useGetContactsByClientId(clientId); 
  console.log("Contactos recibidos:", clientId);
  const { mutate: updateContactHandler } = useUpdateContact(); 

  const { control, handleSubmit, reset } = useForm<ClientType>({
    defaultValues: clientData,
  });

  const [selectedContact, setSelectedContact] = useState<ContactType | null>(null); 
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false); 

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

  const handleContactClick = (contact: ContactType) => {
    setSelectedContact(contact); 
    setContactModalOpen(true); 
  };

  const handleContactUpdate = (contactData: ContactType) => {
    updateContactHandler(
      { id: contactData.id, contactData: contactData }, 
      {
        onSuccess: () => {
          setContactModalOpen(false); 
          setSelectedContact(null); 
        },
        onError: (error) => {
          console.error("Error updating contact:", error);
        },
      }
    );
  };

  if (!clientData) return null;

  return (
    <>
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
                      <TextField {...field} fullWidth />
                    )}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Lista de contactos con botones antes de los botones de actualización */}
            <Typography variant="h6" sx={{ mt: 3}}>
              Contacts
            </Typography>
            {contactsLoading ? (
              <Typography>Loading contacts...</Typography>
            ) : (
              <List>
                {contacts?.map((contact: ContactType) => (
                  <ListItem key={contact.id} sx={{ mb: 1, border: "1px solid #ddd", borderRadius: "4px", padding: "8px 16px" }}>
                    <Button
                      onClick={() => handleContactClick(contact)} 
                      sx={{
                        width: "100%", 
                        textAlign: "left",
                        '&:hover': {
                          backgroundColor: "#f0f0f0",
                        },
                      }}
                    >
                      <ListItemText
                        primary={`${contact.firstName} ${contact.lastName}`}
                        secondary={contact.email}
                      />
                    </Button>
                  </ListItem>
                ))}
              </List>
            )}

            {/* Botones de acción */}
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
          </form>

          {isError && (
            <Typography color="error" sx={{ mt: 2 }}>
              Error updating client. Please try again.
            </Typography>
          )}
        </Box>
      </Modal>

      {/* Modal para editar el contacto */}
      {selectedContact && (
        <Modal
          open={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
          aria-labelledby="edit-contact-modal"
        >
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
            <Typography id="edit-contact-modal" variant="h6" component="h2">
              Edit Contact
            </Typography>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleContactUpdate(selectedContact);
              }}
            >
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {[
                  "firstName",
                  "lastName",
                  "email",
                  "phone",
                ].map((field) => (
                  <Grid item xs={12} key={field}>
                    <TextField
                      fullWidth
                      label={field}
                      value={(selectedContact as any)[field]}
                      onChange={(e) => {
                        setSelectedContact({
                          ...selectedContact,
                          [field]: e.target.value,
                        });
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Botones de acción */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button
                  variant="outlined"
                  onClick={() => setContactModalOpen(false)}
                  color="error"
                  sx={{ mr: 2 }}
                >
                  Cancel
                </Button>
                <Button variant="outlined" type="submit" color="primary">
                  Update
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default EditClientModal;
