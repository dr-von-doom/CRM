import {
    Box,
    Button,
    Grid,
    MenuItem,
    Modal,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useEffect } from "react";
  import { Controller, useForm } from "react-hook-form";
  import useGetFollowUpById from "../../../hooks/followUp/useGetFollowUpById";
  import useUpdateFollowUp from "../../../hooks/followUp/useUpdateFollowUp";
  import {
    contactType,
    FollowUpType,
  } from "../../../types/followUps.types.ts";
  import { formatDate } from "../../../utils/dates";
  import useGetContactsByClientId from "../../../hooks/contact/useGetContactByClientId";
  import useGetOpportunityById from "../../../hooks/opportunity/useGetOpportunityById";
  import { ContactType } from "../../../types/client.types";
  
  interface EditFollowUpModalProps {
    open: boolean;
    followUpId: string;
    onClose: () => void;
  }
  
  const EditFollowUpModal: React.FC<EditFollowUpModalProps> = ({
    open,
    followUpId,
    onClose,
  }) => {
    const { data: followUpData } = useGetFollowUpById(followUpId);
    const { mutate: updateFollowUpHandler, isError } = useUpdateFollowUp();
  
    // Get opportunityId from followUpData
    const opportunityId = followUpData?.opportunityId || "";
  
    // Fetch opportunity data to get clientId
    const { data: opportunityData } = useGetOpportunityById(opportunityId);
  
    const clientId = opportunityData?.clientId || "";
  
    // Fetch contacts by clientId
    const { data: contactsData } = useGetContactsByClientId(clientId);
  
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<
      Pick<
        FollowUpType,
        | "id"
        | "opportunityId"
        | "type"
        | "date"
        | "contactId"
        | "executiveId"
        | "description"
        | "isDeleted"
      >
    >({
      defaultValues: {
        id: "",
        opportunityId: "",
        type: contactType.CALL,
        date: "",
        contactId: "",
        executiveId: "",
        description: [""],
        isDeleted: false,
      },
    });
  
    useEffect(() => {
      if (followUpData) {
        reset({
          id: followUpData.id,
          opportunityId: followUpData.opportunityId,
          type: followUpData.type,
          date: followUpData.date ? formatDate(new Date(followUpData.date)) : "",
          contactId: followUpData.contactId || "",
          executiveId: followUpData.executiveId,
          description: followUpData.description,
          isDeleted: followUpData.isDeleted,
        });
      }
    }, [followUpData, reset]);
  
    const onSubmit = (
      data: Pick<
        FollowUpType,
        | "id"
        | "opportunityId"
        | "type"
        | "date"
        | "contactId"
        | "executiveId"
        | "description"
        | "isDeleted"
      >
    ) => {
      const updatedData: FollowUpType = {
        ...data,
        description: data.description,
      };
  
      updateFollowUpHandler(
        { id: updatedData.id, followUpData: updatedData },
        {
          onSuccess: () => onClose(),
          onError: (error: unknown) =>
            console.error("Error updating follow-up:", error),
        }
      );
    };
  
    if (!followUpData || !opportunityData) return null;
  
    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="edit-follow-up-modal"
      >
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
          <Typography id="edit-follow-up-modal" variant="h6" component="h2">
            Edit Follow-Up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {/* Type Field */}
              <Grid item xs={12}>
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      label="Contact Type"
                      error={!!errors.type}
                      helperText={errors.type?.message}
                    >
                      <MenuItem value="" disabled>
                        Select a Contact Type
                      </MenuItem>
                      {Object.values(contactType).map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
  
              {/* Date Field */}
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
  
              {/* Contact Field */}
              <Grid item xs={12}>
                <Controller
                  name="contactId"
                  control={control}
                  rules={{
                    required:
                      contactsData && contactsData.length > 0
                        ? "This field is required"
                        : false,
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      label="Contact Client"
                      error={!!errors.contactId}
                      helperText={errors.contactId?.message}
                    >
                      {contactsData && contactsData.length > 0 ? (
                        contactsData.map((contact: ContactType) => (
                          <MenuItem key={contact.id} value={contact.id}>
                            {`${contact.firstName} ${contact.lastName}`}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No contacts available</MenuItem>
                      )}
                    </TextField>
                  )}
                />
              </Grid>
  
              {/* Executive ID Field */}
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
  
              {/* Description Field */}
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
                Update
              </Button>
            </Box>
  
            {isError && (
              <Typography color="error" sx={{ mt: 2 }}>
                Error updating follow-up. Please try again.
              </Typography>
            )}
          </form>
        </Box>
      </Modal>
    );
  };
  
  export default EditFollowUpModal;