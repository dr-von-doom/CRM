import { Box, Button, Toolbar, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import ClientDetails from "../../components/clients/ClientDetails/ClientDetails";
import ClientTable from "../../components/clients/ClientTable/ClientTable";
import EditClientModal from "../../components/clients/EditClientModal/EditClientModal";
import SidePanel from "../../components/common/SidePanel";
import BaseLayout from "../../layout/BaseLayout";

const ClientPage = () => {
  const theme = useTheme();

  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (clientId?: string) => {
    setModalOpen(true);
    setSelectedClientId(clientId || null);
  };

  const openPanel = (clientId?: string) => {
    setSidePanelOpen(true);
    setSelectedClientId(clientId || null);
  };

  const closePanel = () => {
    setSidePanelOpen(false);
  };

  return (
    <BaseLayout title="Clients">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Toolbar
          sx={{
            paddingLeft: theme.spacing(0),
            paddingRight: theme.spacing(0),
          }}
        >
          <Typography variant="h6">Clients list</Typography>
          <Button
            component={Link}
            to={"/clients/create"}
            variant="contained"
            color="primary"
            sx={{ ml: "auto" }}
          >
            Create Client
          </Button>
        </Toolbar>

        <Box
          sx={{
            flex: 1,
            [theme.breakpoints.up("sm")]: {
              paddingLeft: theme.spacing(3),
              paddingRight: theme.spacing(3),
            },
          }}
        >
          <ClientTable
            onSelect={(clientId: string) => {
              openPanel(clientId);
            }}
            onEdit={(clientId: string) => {
              openModal(clientId);
            }}
          />
        </Box>

        <SidePanel
          isOpen={sidePanelOpen}
          onClose={closePanel}
          title={"Client Details"}
        >
          <ClientDetails clientId={selectedClientId!} />
        </SidePanel>

        {modalOpen && (
          <EditClientModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            clientId={selectedClientId ?? ""}
          />
        )}
      </Box>
    </BaseLayout>
  );
};

export default ClientPage;
