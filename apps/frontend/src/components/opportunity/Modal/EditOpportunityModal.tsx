import { Box, Button, Grid, Modal, TextField, Typography, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { OpportunityType } from "../../../types/opportunity.types";
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
            <Grid item xs={12}>
              <Controller
                name="businessType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    fullWidth
                    label="Business Type"
                    defaultValue={opportunityData.businessType || ""}
                  >
                    <MenuItem value="it_consulting">it_consulting</MenuItem>
                    <MenuItem value="web_dev">web_dev</MenuItem>
                    <MenuItem value="mobile_dev">mobile_dev</MenuItem>
                    <MenuItem value="outsourcing">outsourcing</MenuItem>
                  </Select>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="businessName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Business Name" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Description" multiline />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="estimatedDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Estimated Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="estimatedValue"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Estimated Value" type="number" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    fullWidth
                    label="Status"
                    defaultValue={opportunityData.status || ""}
                  >
                    <MenuItem value="open">open</MenuItem>
                    <MenuItem value="in_study">in_study</MenuItem>
                    <MenuItem value="purchase_order">purchase_order</MenuItem>
                    <MenuItem value="completed">completed</MenuItem>
                  </Select>
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
              Error updating opportunity. Please try again.
            </Typography>
          )}
        </form>
      </Box>
    </Modal>
  );
};

export default EditOpportunityModal;
