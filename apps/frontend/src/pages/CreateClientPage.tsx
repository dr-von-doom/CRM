import { useForm, useFieldArray, SubmitHandler, Controller } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import BaseLayout from "../layout/BaseLayout";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useCreateClient } from "../hooks/useCreateClients";
import { useCreateContact } from "../hooks/useCreateContact";
import { ClientType, ContactType } from "../types/client.types";

// Función para generar UUID
const generateUUID = () => crypto.randomUUID();

type FormValues = ClientType & { contacts: Omit<ContactType, "id" | "clientId">[] };

const CreateClientPage = () => {
  const { handleSubmit, control, register } = useForm<FormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: "contacts" });

  const createClientMutation = useCreateClient();
  const createContactMutation = useCreateContact();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Crear el cliente y obtener su ID
      const newClient = await createClientMutation.mutateAsync(data);
      const clientId = newClient.id;

      // Crear contactos con ID y clientId
      await Promise.all(
        data.contacts.map((contact) =>
          createContactMutation.mutateAsync({ ...contact, clientId, id: generateUUID() })
        )
      );

      console.log("Cliente y contactos creados con éxito");
    } catch (error) {
      console.error("Error al crear cliente o contactos:", error);
    }
  };

  return (
    <BaseLayout>
      <Box sx={{ width: { xs: "340px", md: "600px", lg: "900px" }, margin: "auto", my: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "600" }}>
          Create Client
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
          Fill in the form below to create a new client.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Campos de cliente */}
            <Grid item xs={12}>
              <TextField fullWidth label="Nit" required {...register("nit")} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Full Name" required {...register("name")} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Address" required {...register("address")} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="City" required {...register("city")} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Country" required {...register("country")} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Phone" required {...register("phone")} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" required {...register("email")} />
            </Grid>

            {/* Sección de contactos */}
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
                        <TextField fullWidth label="First Name" required {...field} />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      control={control}
                      name={`contacts.${index}.lastName`}
                      render={({ field }) => (
                        <TextField fullWidth label="Last Name" required {...field} />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      control={control}
                      name={`contacts.${index}.email`}
                      render={({ field }) => (
                        <TextField fullWidth label="Email" required {...field} />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      control={control}
                      name={`contacts.${index}.phone`}
                      render={({ field }) => (
                        <TextField fullWidth label="Phone" required {...field} />
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

            {/* Botón para añadir contactos */}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => append({ firstName: "", lastName: "", email: "", phone: "" })}
              >
                Add Contact
              </Button>
            </Grid>

            {/* Botón de envío */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: { xs: "340px", md: "600px", lg: "900px" } , py: 1.5 }}
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
