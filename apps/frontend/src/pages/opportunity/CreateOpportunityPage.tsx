import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateOpportunity } from "../../hooks/opportunity/useCreateOpportunity";
import useGetAllClients from "../../hooks/opportunity/useGetAllClients";
import { ClientType } from "../../types/client.types";
import {
  OpportunityStatus,
  OpportunityType,
  opportunityStatusMap,
  opportunityBusinessTypeMap,
} from "../../types/opportunity.types";
import BaseLayout from "../../layout/BaseLayout";

type FormValues = Omit<OpportunityType, "id" | "isDeleted">;

const CreateOpportunity = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();
  const createOpportunityMutation = useCreateOpportunity();
  const { data: clients, isLoading, isError } = useGetAllClients();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await createOpportunityMutation.mutateAsync({
        ...data,
        isDeleted: false,
      });
      setSuccessMessage("Opportunity created successfully");
    } catch (error) {
      setErrorMessage("Error creating opportunity");
      console.error("Error creating opportunity:", error);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography color="error">Error loading clients</Typography>;
  }

  return (
    <BaseLayout>
      <Box sx={{ width: "70%", margin: "auto", my: 4 }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "left", color: "#333" }}
        >
          Create Opportunity
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Client"
                select
                required
                {...register("clientId", {
                  required: "This field is required",
                })}
                error={!!errors.clientId}
                helperText={errors.clientId?.message}
                sx={{
                  "& .MuiInputLabel-root": { fontSize: 14 },
                  "& .MuiInputBase-root": { borderRadius: "4px" },
                  "& .MuiFormHelperText-root": { fontSize: 12 },
                }}
              >
                {clients?.map((client: ClientType) => (
                  <MenuItem key={client.id} value={client.id}>
                    {client.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Business Name"
                required
                {...register("businessName", {
                  required: "This field is required",
                })}
                error={!!errors.businessName}
                helperText={errors.businessName?.message}
                sx={{
                  "& .MuiInputLabel-root": { fontSize: 14 },
                  "& .MuiInputBase-root": { borderRadius: "4px" },
                  "& .MuiFormHelperText-root": { fontSize: 12 },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Business Line"
                select
                required
                {...register("businessType", {
                  required: "This field is required",
                })}
                error={!!errors.businessType}
                helperText={errors.businessType?.message}
                sx={{
                  "& .MuiInputLabel-root": { fontSize: 14 },
                  "& .MuiInputBase-root": { borderRadius: "4px" },
                  "& .MuiFormHelperText-root": { fontSize: 12 },
                }}
              >
                {Object.entries(opportunityBusinessTypeMap).map(
                  ([key, label]) => (
                    <MenuItem key={key} value={key}>
                      {label}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Opportunity Description"
                required
                multiline
                rows={4}
                {...register("description", {
                  required: "This field is required",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
                sx={{
                  "& .MuiInputLabel-root": { fontSize: 14 },
                  "& .MuiInputBase-root": { borderRadius: "4px" },
                  "& .MuiFormHelperText-root": { fontSize: 12 },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Estimated Value (COP)"
                required
                type="text"
                {...register("estimatedValue", {
                  required: "This field is required",
                  pattern: {
                    value: /^\d+(\.\d+)?$/, 
                    message:
                      "Please enter a valid number",
                  },
                })}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.replace(/[^0-9.]/g, "");
                }}
                error={!!errors.estimatedValue}
                helperText={errors.estimatedValue?.message}
                sx={{
                  "& .MuiInputLabel-root": { fontSize: 14 },
                  "& .MuiInputBase-root": { borderRadius: "4px" },
                  "& .MuiFormHelperText-root": { fontSize: 12 },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Estimated Completion Date"
                required
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register("estimatedDate", {
                  required: "This field is required",
                })}
                error={!!errors.estimatedDate}
                helperText={errors.estimatedDate?.message}
                sx={{
                  "& .MuiInputLabel-root": { fontSize: 14 },
                  "& .MuiInputBase-root": { borderRadius: "4px" },
                  "& .MuiFormHelperText-root": { fontSize: 12 },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Opportunity Status"
                select
                value={OpportunityStatus.OPEN}
                required
                {...register("status", {
                  required: "This field is required",
                })}
                error={!!errors.status}
                helperText={errors.status?.message}
                sx={{
                  "& .MuiInputLabel-root": { fontSize: 14 },
                  "& .MuiInputBase-root": { borderRadius: "4px" },
                  "& .MuiFormHelperText-root": { fontSize: 12 },
                }}
              >
                {Object.entries(opportunityStatusMap).map(([key, label]) => (
                  <MenuItem key={key} value={key}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  width: "100%",
                  py: 1.5,
                  borderRadius: 4,
                  fontWeight: "500",
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                Create Opportunity
              </Button>
            </Grid>
          </Grid>
        </form>

        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage("")}
        >
          <Alert onClose={() => setSuccessMessage("")} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={() => setErrorMessage("")}
        >
          <Alert onClose={() => setErrorMessage("")} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </BaseLayout>
  );
};

export default CreateOpportunity;
