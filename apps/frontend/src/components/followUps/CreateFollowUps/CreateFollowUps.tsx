import React, { useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useCreateFollowUp } from "../../../hooks/followUp/useCreateFollowUps";
import useGetContactsByClientId from "../../../hooks/contact/useGetContactByClientId";
import { contactType, FollowUpType } from "../../../types/followUps.types";
import { ContactType } from "../../../types/client.types";



interface CreateFollowUpModalProps {
  open: boolean;
  clientId: string;
  onClose: () => void;
}

const CreateFollowUpModal: React.FC<CreateFollowUpModalProps> = ({
  open,
  clientId,
  onClose,
}) => {
  const { data: contactsData } = useGetContactsByClientId(clientId);
  const { mutate: createFollowUpHandler, isError } = useCreateFollowUp();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Pick<FollowUpType, "type" | "date" | "contactId" | "executiveId" | "description">>({
    defaultValues: {
      type:  contactType.CALL,
      date: "",
      contactId: null,
      executiveId: "",
      description: [""],
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = (data: Pick<FollowUpType, "type" | "date" | "contactId" | "executiveId" | "description">) => {
    const fullFollowUpData: FollowUpType = {
      id: '',
      opportunityId: '', 
      isDeleted: false,
      ...data, 
    };
  
    createFollowUpHandler(fullFollowUpData, {
      onSuccess: () => {
        onClose();
      },
      onError: (error: unknown) => console.error("Error creating follow-up:", error),
    });
  };
  
  

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="create-follow-up-modal">
      <Box
        sx={{
          position: "absolute",
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
        <Typography id="create-follow-up-modal" variant="h6" component="h2">
          Create Follow-Up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Controller
                name="type"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select {...field} fullWidth error={!!errors.type}>
                    {Object.values(contactType).map((type) => (
                      <MenuItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <Typography color="error" variant="body2">
                {errors.type?.message}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="date"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Contact Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.date}
                    helperText={errors.date?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="contactId"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select {...field} fullWidth error={!!errors.contactId}>
                    {contactsData?.map((contact: ContactType) => (
                      <MenuItem key={contact.id} value={contact.id}>
                        {`${contact.firstName} ${contact.lastName}`}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <Typography color="error" variant="body2">
                {errors.contactId?.message}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="executiveId"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Sales Executive ID"
                    error={!!errors.executiveId}
                    helperText={errors.executiveId?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Follow-Up Description"
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
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
              Save
            </Button>
          </Box>

          {isError && (
            <Typography color="error" sx={{ mt: 2 }}>
              Error creating follow-up. Please try again.
            </Typography>
          )}
        </form>
      </Box>
    </Modal>
  );
};

export default CreateFollowUpModal;
