import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Divider,
  Chip,
  Button,
  Toolbar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import useGetOpportunityById from "../../hooks/opportunity/useGetOpportunityById";
import { ErrorAlert } from "../../components/common/alerts";
import BaseLayout from "../../layout/BaseLayout";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  opportunityBusinessTypeMap,
  opportunityStatusMap,
} from "../../types/opportunity.types";
import { FollowUpsTable } from "../../components/followUps/FollowUpsTable";
import { Link } from "react-router-dom";
import CreateFollowUpModal from "../../components/followUps/CreateFollowUps/CreateFollowUps";
import React from "react";

const OpportunityDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: opportunity,
    isLoading,
    isError,
  } = useGetOpportunityById(id as string);

  const [modalOpen, setModalOpen] = React.useState(false);

  const handleOpenModal = () => setModalOpen(true);

  const handleCloseModal = () => setModalOpen(false);

  if (isLoading) {
    return (
      <BaseLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      </BaseLayout>
    );
  }

  if (isError || !opportunity) {
    return (
      <BaseLayout>
        <ErrorAlert />
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <Box
        sx={{
          padding: { xs: 2, sm: 4 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: { xs: 3, sm: 4 },
            width: "100%",
            borderRadius: 3,
            background: "linear-gradient(to bottom, #f9f9f9, #ffffff)",
          }}
        >
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
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              {opportunity.businessName}
            </Typography>
            <Chip
              icon={
                opportunity.isDeleted ? <CancelIcon /> : <CheckCircleIcon />
              }
              label={opportunity.isDeleted ? "Deleted" : "Active"}
              color={opportunity.isDeleted ? "error" : "success"}
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                marginTop: { xs: 2, sm: 0 },
              }}
            />
          </Box>

          <Divider sx={{ marginBottom: 2 }}>
            <Chip
              icon={<BusinessCenterIcon />}
              label="Opportunity Details"
              color="primary"
              sx={{ fontSize: "1rem" }}
            />
          </Divider>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              <strong>Description:</strong> {opportunity.description}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              <strong>Business Type:</strong>{" "}
              {opportunityBusinessTypeMap[opportunity.businessType]}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              <strong>Status:</strong>{" "}
              {opportunityStatusMap[opportunity.status]}
            </Typography>
          </Box>

          <Divider sx={{ marginY: 2 }} />

          <Box>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              <strong>Estimated Date:</strong>{" "}
              {new Date(opportunity.estimatedDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              <strong>Estimated Value:</strong> $
              {opportunity.estimatedValue.toLocaleString()}
            </Typography>
          </Box>
        </Paper>
      </Box>
      <Box
        sx={{
          padding: { xs: 2, sm: 4 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar
          sx={{
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <Typography variant="h6">Follow Ups</Typography>
          <Button
            component={Link}
            to={""}
            variant="contained"
            color="primary"
            sx={{ ml: "auto" }}
            onClick={handleOpenModal}
          >
            Create Follow-up
          </Button>
        </Toolbar>

        <Box sx={{ marginTop: 2}}>
          <FollowUpsTable
            opportunityId={opportunity.id}
            onEdit={() => {}}
            onSelect={() => {}}
          />
        </Box>
      </Box>

      {modalOpen && (
        <CreateFollowUpModal
          open={modalOpen}
          onClose={handleCloseModal}
          clientId={opportunity.clientId}
          opportunityId={opportunity.id}
        />
      )}
    </BaseLayout>
  );
};

export default OpportunityDetailPage;
