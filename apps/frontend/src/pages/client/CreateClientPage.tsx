import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import BaseLayout from "../../layout/BaseLayout";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import BaseLayout from "../../layout/BaseLayout";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useCreateClient } from "../../hooks/clients/useCreateClients";
import { useCreateContact } from "../../hooks/useCreateContact";
import { useCreateContact } from "../../hooks/useCreateContact";
import { ClientType, ContactType } from "../../types/client.types";

type FormValues = Omit<ClientType, "id"> & {
  contacts: Omit<ContactType, "id" | "clientId">[];
};

const CreateClientPage = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  const createClientMutation = useCreateClient();
  const createContactMutation = useCreateContact();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  const createClientMutation = useCreateClient();
  const createContactMutation = useCreateContact();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Create client and obtain its ID
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

      // Create contacts associated with the client using clientId
      await Promise.all(
        data.contacts.map((contact) =>
          createContactMutation.mutateAsync({
            ...contact,
            clientId,
          })
        )
      );

      console.log("Client and contacts created successfully");
    } catch (error) {
      console.error("Error creating client or contacts:", error);
    }
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
            <>
              {/* Display a message to inform the user that the client was created successfully */}
              {createClientMutation.isSuccess && (
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "success.main",
                      mb: 2,
                      bgcolor: "#d2fcdd",
                      py: 2,
                      textAlign: "center",
                      borderColor: "success.main",
                      borderWidth: 2,
                      borderRadius: 1.5,
                    }}
                  >
                    Client created successfully!
                  </Typography>
                </Grid>
              )}
              {createClientMutation.isError && (
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "error.main",
                      mb: 2,
                      bgcolor: "#fcd2d2",
                      py: 2,
                      textAlign: "center",
                      borderColor: "error.main",
                      borderWidth: 2,
                      borderRadius: 1.5,
                    }}
                  >
                    An error occurred while creating the client.
                  </Typography>
                </Grid>
              )}
            </>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  width: { xs: "340px", md: "600px", lg: "900px" },
                  py: 1.5,
                }}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
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
            <>
              {/* Display a message to inform the user that the client was created successfully */}
              {createClientMutation.isSuccess && (
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "success.main",
                      mb: 2,
                      bgcolor: "#d2fcdd",
                      py: 2,
                      textAlign: "center",
                      borderColor: "success.main",
                      borderWidth: 2,
                      borderRadius: 1.5,
                    }}
                  >
                    Client created successfully!
                  </Typography>
                </Grid>
              )}
              {createClientMutation.isError && (
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "error.main",
                      mb: 2,
                      bgcolor: "#fcd2d2",
                      py: 2,
                      textAlign: "center",
                      borderColor: "error.main",
                      borderWidth: 2,
                      borderRadius: 1.5,
                    }}
                  >
                    An error occurred while creating the client.
                  </Typography>
                </Grid>
              )}
            </>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  width: { xs: "340px", md: "600px", lg: "900px" },
                  py: 1.5,
                }}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </BaseLayout>
  );
};

export default CreateClientPage;

