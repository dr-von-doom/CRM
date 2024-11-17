import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import BaseLayout from "../../layout/BaseLayout";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useCreateClient } from "../../hooks/clients/useCreateClients";
import { useCreateContact } from "../../hooks/contact/useCreateContact";
import BaseLayout from "../../layout/BaseLayout";
import { ClientType, ContactType } from "../../types/client.types";
import { Link } from "react-router-dom";

type FormValues = Omit<ClientType, "id"> & {
  contacts: Omit<ContactType, "id" | "clientId">[];
};

const CreateClientPage = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
    reset,
  } = useForm<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  const createClientMutation = useCreateClient();
  const createContactMutation = useCreateContact();

  // State for Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  // State for Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const newClient = await createClientMutation.mutateAsync({
        nit: data.nit,
        name: data.name,
        address: data.address,
        city: data.city,
        country: data.country,
        phone: data.phone,
        email: data.email,
        isActive: true,
      });
      const clientId = newClient.id as string;

      await Promise.all(
        data.contacts.map((contact) =>
          createContactMutation.mutateAsync({
            ...contact,
            clientId,
          })
        )
      );

      // Show success Snackbar
      setSnackbarMessage("Client created successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      reset({
        nit: "",
        name: "",
        address: "",
        city: "",
        country: "",
        phone: "",
        email: "",
        isActive: true,
        contacts: [],
      });
      // Show success Snackbar
      setSnackbarMessage("Client created successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      reset({
        nit: "",
        name: "",
        address: "",
        city: "",
        country: "",
        phone: "",
        email: "",
        isActive: true,
        contacts: [],
      });
    } catch (error) {
      console.error("Error creating client or contacts:", error);

      // Show error Snackbar
      setSnackbarMessage("An error occurred while creating the client.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Close Snackbar handler
  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);

      // Show error Snackbar
      setSnackbarMessage("An error occurred while creating the client.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Close Snackbar handler
  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <BaseLayout>
      <Box
        sx={{
          width: { xs: "340px", md: "600px", lg: "900px" },
          margin: "auto",
          my: 2,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: "600" }}>
          Create Client
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
          Fill out the form to create a new client.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Client fields */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nit"
                required
                {...register("nit", {
                  required: "This field is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Nit must contain only numbers",
                  },
                })}
                error={!!errors.nit}
                helperText={errors.nit?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                required
                {...register("name", { required: "This field is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                required
                {...register("address", {
                  required: "This field is required",
                })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="City"
                required
                {...register("city", { required: "This field is required" })}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Country"
                required
                {...register("country", {
                  required: "This field is required",
                })}
                error={!!errors.country}
                helperText={errors.country?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                required
                {...register("phone", {
                  required: "This field is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Phone must contain only numbers",
                  },
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                required
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email format",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            {/* Contacts section */}
            {fields.map((field, index) => (
              <Grid item xs={12} key={field.id}>
                <Typography variant="h5" sx={{ fontWeight: "600", mb: 2 }}>
                  Contact #{index + 1}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Controller
                      control={control}
                      name={`contacts.${index}.firstName`}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label="First Name"
                          required
                          {...field}
                          error={!!errors.contacts?.[index]?.firstName}
                          helperText={
                            errors.contacts?.[index]?.firstName?.message
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      control={control}
                      name={`contacts.${index}.lastName`}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label="Last Name"
                          required
                          {...field}
                          error={!!errors.contacts?.[index]?.lastName}
                          helperText={
                            errors.contacts?.[index]?.lastName?.message
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      control={control}
                      name={`contacts.${index}.email`}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label="Email"
                          required
                          {...field}
                          error={!!errors.contacts?.[index]?.email}
                          helperText={errors.contacts?.[index]?.email?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      control={control}
                      name={`contacts.${index}.phone`}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label="Phone"
                          required
                          {...field}
                          error={!!errors.contacts?.[index]?.phone}
                          helperText={errors.contacts?.[index]?.phone?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="text"
                  color="error"
                  startIcon={<FaTrashAlt />}
                  onClick={() => remove(index)}
                  sx={{ mt: 1 }}
                >
                  Remove Contact
                </Button>
              </Grid>
            ))}

            {/* Button to add contacts */}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  append({ firstName: "", lastName: "", email: "", phone: "" })
                }
              >
                Add Contact
              </Button>
            </Grid>

            {/* Submit button */}
            <Grid item xs={12}>
              <Button
                component={Link}
                type="submit"
                variant="contained"
                color="primary"
                to={"/clients"}
                sx={{
                  width: { xs: "340px", md: "600px", lg: "900px" },
                  py: 1.5,
                }}
              >
                Create
              </Button>
              {/* Snackbar for success and error messages */}
              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              >
                <Alert
                  onClose={handleCloseSnackbar}
                  severity={snackbarSeverity}
                  sx={{ width: "100%" }}
                >
                  {snackbarMessage}
                </Alert>
              </Snackbar>
              {/* Snackbar for success and error messages */}
              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              >
                <Alert
                  onClose={handleCloseSnackbar}
                  severity={snackbarSeverity}
                  sx={{ width: "100%" }}
                >
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
        </form>
      </Box>
    </BaseLayout>
  );
};

export default CreateClientPage;
