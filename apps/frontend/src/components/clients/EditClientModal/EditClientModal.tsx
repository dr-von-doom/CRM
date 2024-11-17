import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import useGetClientById from "../../../hooks/clients/useGetClientById";
import useUpdateClient from "../../../hooks/clients/useUpdateClients";
import useGetContactsByClientId from "../../../hooks/contact/useGetContactByClientId";
import useUpdateContact from "../../../hooks/contact/useUpdateContact";
import { ClientType, ContactType } from "../../../types/client.types";

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
  const { data: contacts, isLoading: contactsLoading } =
    useGetContactsByClientId(clientId);
  const { mutate: updateContactHandler } = useUpdateContact();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<ClientType>({
    defaultValues: clientData,
  });

  const [selectedContact, setSelectedContact] = useState<ContactType | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);

  useEffect(() => {
    reset(clientData);
  }, [clientData, reset]);

  const onSubmit: SubmitHandler<ClientType> = (data) => {
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
            width: { xs: "90%", sm: "500px" },
            maxHeight: "90vh",
            overflowY: "auto",
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
              {/* Client field */}
              {[
                { name: "nit", label: "Nit", pattern: /^[0-9]+$/, helperText: "Must contain only numbers" },
                { name: "name", label: "Name" },
                { name: "address", label: "Address" },
                { name: "city", label: "City" },
                { name: "country", label: "Country" },
                { name: "phone", label: "Phone", pattern: /^[0-9]+$/, helperText: "Must contain only numbers" },
                { name: "email", label: "Email", pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, helperText: "Invalid email format" },
              ].map(({ name, label, pattern, helperText }) => (
                <Grid item xs={12} key={name}>
                  <Controller
                    name={name as keyof ClientType}
                    control={control}
                    rules={{
                      required: "This field is required",
                      pattern: pattern ? { value: pattern, message: helperText } : undefined,
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label={label}
                        error={!!errors[name as keyof ClientType]}
                        helperText={errors[name as keyof ClientType]?.message || helperText}
                      />
                    )}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Contact list */}
            <Typography variant="h6" sx={{ mt: 3 }}>
              Contacts
            </Typography>
            {contactsLoading ? (
              <Typography>Loading contacts...</Typography>
            ) : (
              <List sx={{ maxHeight: "150px", overflowY: "auto" }}>
                {contacts?.map((contact: ContactType) => (
                  <ListItem key={contact.id}>
                    <Button
                      onClick={() => handleContactClick(contact)}
                      sx={{
                        width: "100%",
                        textAlign: "left",
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

            {/* Action button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button variant="outlined" onClick={onClose} color="error" sx={{ mr: 2 }}>
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

      {/* Contact edition modal */}
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
              width: { xs: "90%", sm: "500px" },
              maxHeight: "90vh",
              overflowY: "auto",
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
                {["firstName", "lastName", "email", "phone"].map((field) => (
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

              {/* Action button */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button variant="outlined" onClick={() => setContactModalOpen(false)} color="error" sx={{ mr: 2 }}>
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
