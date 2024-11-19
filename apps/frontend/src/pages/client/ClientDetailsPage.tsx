import {
  Box,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import useGetClientById from "../../hooks/clients/useGetClientById";
import useGetContactsByClientId from "../../hooks/contact/useGetContactByClientId";
import useGetOpportunitiesByClientId from "../../hooks/opportunity/useGetOpportunitiesByClientId";
import { ErrorAlert } from "../../components/common/alerts";
import BaseLayout from "../../layout/BaseLayout";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { AccountCircle, Contacts, Face } from "@mui/icons-material";
import BusinessTypeChip from "../../components/opportunity/BusinessTypeChip/BusinessTypeChip";
import OpportunityStatusChip from "../../components/opportunity/OpportunityStatusChip/OpportunityStatusChip";
import { useState } from "react";
import { FollowUpsTable } from "../../components/followUps/FollowUpsTable";

const ClientDetailsPage = () => {
  const clientId = useParams<{ id: string }>().id;
  const {
    data: client,
    isLoading,
    isError,
  } = useGetClientById(clientId as string);
  const { data: opportunities } = useGetOpportunitiesByClientId(
    clientId as string
  );
  const { data: contacts } = useGetContactsByClientId(clientId as string);
  const [opportunityId, setOpportunityId] = useState<string>();

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );

  if (isError) return <ErrorAlert />;

  if (!client) return <ErrorAlert title="Client not found" description="" />;

  return (
    <BaseLayout>
      <Box
        sx={{
          marginTop: 0.5,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          elevation={4}
          sx={{
            padding: { xs: 3, sm: 4 },
            width: "100%",
            borderRadius: 3,
            background: "linear-gradient(to bottom, #f9f9f9, #ffffff)",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 3,
                flexDirection: { xs: "column", sm: "row" },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "bold", mt: 2 }}
              >
                {client.name}
              </Typography>
              <Chip
                icon={client.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                label={client.isActive ? "Active" : "Inactive"}
                color={client.isActive ? "success" : "error"}
                variant="filled"
                sx={{ marginTop: 1 }}
              />
            </Box>
            <Divider>
              <Chip
                icon={<AccountCircle />}
                label={"Client Details"}
                color={"primary"}
                variant="filled"
                sx={{ marginLeft: 1, fontSize: "1rem" }}
              />
            </Divider>
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography variant="body2" color="textSecondary">
                <strong>NIT:</strong> {client.nit}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Address:</strong> {client.address}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>City:</strong> {client.city}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Country:</strong> {client.country}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Phone:</strong> {client.phone}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Email:</strong> {client.email}
              </Typography>
            </Box>
            {contacts && contacts.length > 0 && (
              <div>
                <Divider>
                  <Chip
                    icon={<Contacts />}
                    label={"Contacts"}
                    color={"primary"}
                    variant="filled"
                    sx={{ marginLeft: 1, fontSize: "1rem", my: 2 }}
                  />
                </Divider>
                <Box>
                  <Box>
                    {contacts?.map((contact) => (
                      <Chip
                        icon={<Face />}
                        key={contact.id}
                        label={contact.firstName + " " + contact.lastName}
                        color="default"
                        sx={{ margin: 1 }}
                      />
                    ))}
                  </Box>
                </Box>
              </div>
            )}
          </CardContent>
        </Card>
        {opportunities && opportunities.length > 0 && (
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={"bold"}>
                Opportunities
              </Typography>
              <Box sx={{ overflowX: "auto" }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Business Name</TableCell>
                        <TableCell>Business Type</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Estimated Date</TableCell>
                        <TableCell>Estimated Value</TableCell>
                        <TableCell>Follow up</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {opportunities?.map((opportunity) => (
                        <TableRow key={opportunity.id}>
                          <TableCell>{opportunity.businessName}</TableCell>
                          <TableCell>
                            <BusinessTypeChip
                              businessType={opportunity.businessType}
                            ></BusinessTypeChip>
                          </TableCell>
                          <TableCell>
                            <OpportunityStatusChip
                              status={opportunity.status}
                            ></OpportunityStatusChip>
                          </TableCell>
                          <TableCell>{opportunity.estimatedDate}</TableCell>
                          <TableCell>
                            {"COP " + opportunity.estimatedValue}
                          </TableCell>
                          <TableCell>
                            <Button
                              color="primary"
                              variant="outlined"
                              sx={{ borderRadius: 99, borderWidth: 2 }}
                              onClick={() => {
                                setOpportunityId(opportunity.id);
                              }}
                            >
                              Follow up
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>
        )}
        {opportunityId && (
          <FollowUpsTable
            opportunityId={opportunityId}
            onDelete={() => {}}
            onEdit={() => {}}
            onSelect={() => {}}
          ></FollowUpsTable>
        )}
      </Box>
    </BaseLayout>
  );
};

export default ClientDetailsPage;
