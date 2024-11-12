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
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import useGetOpportunityById from "../../../hooks/opportunity/useGetOpportunityById";
import useUpdateOpportunity from "../../../hooks/opportunity/useUpdateOpportunity";
import {
  opportunityBusinessTypeMap,
  opportunityStatusMap,
  OpportunityType,
} from "../../../types/opportunity.types";
import { formatDate } from "../../../utils/dates";

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
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-opportunity-modal"
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
                    {Object.entries(opportunityBusinessTypeMap).map(
                      ([value, label]) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      )
                    )}
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
                  <TextField
                    {...field}
                    fullWidth
                    label="Description"
                    multiline
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="estimatedDate"
                control={control}
                render={({ field }) => {
                  const value = field.value
                    ? formatDate(new Date(field.value))
                    : "";

                  console.log(value);
                  return (
                    <TextField
                      {...field}
                      value={value}
                      fullWidth
                      label="Estimated Date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="estimatedValue"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Estimated Value"
                    type="number"
                  />
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
                    {Object.entries(opportunityStatusMap).map(
                      ([key, label]) => (
                        <MenuItem key={key} value={key}>
                          {label}
                        </MenuItem>
                      )
                    )}
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
