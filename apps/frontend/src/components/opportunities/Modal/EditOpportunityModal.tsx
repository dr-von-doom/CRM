import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { OpportunityType } from "../../../types/opportunity";
import useGetOpportunityById from "../../../hooks/useGetOpportunityById";
import useUpdateOpportunity from "../../../hooks/useUpdateOpportunity";

interface EditOpportunityModalProps {
  open: boolean;
  opportunityId: string;
  onClose: () => void;
}

const EditOpportunityModal: React.FC<EditOpportunityModalProps> = ({
  open,
  opportunityId,
  onClose,
}) => {
  const { data: opportunityData } = useGetOpportunityById(opportunityId);
  const { mutate: updateOpportunityHandler, isError } = useUpdateOpportunity();

  const { control, handleSubmit, reset } = useForm<OpportunityType>({
    defaultValues: opportunityData,
  });

  useEffect(() => {
    reset(opportunityData);
  }, [opportunityData, reset]);

  const onSubmit = (data: OpportunityType) => {
    updateOpportunityHandler(
      { id: data.id, opportunityData: data },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          console.error("Error updating opportunity:", error);
        },
      }
    );
  };

  if (!opportunityData) return null;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-opportunity-modal">
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
        <Typography id="edit-opportunity-modal" variant="h6" component="h2">
          Edit Opportunity
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {[
              "title",
              "description",
              "value",
              "status",
              "clientId",
              "contactPerson",
            ].map((field) => (
              <Grid item xs={12} key={field}>
                <Controller
                  name={field as keyof OpportunityType}
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
              Error updating opportunity. Please try again.
            </Typography>
          )}
        </form>
      </Box>
    </Modal>
  );
};

export default EditOpportunityModal;
