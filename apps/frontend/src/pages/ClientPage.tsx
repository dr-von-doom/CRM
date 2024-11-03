import { Box, Button, Toolbar, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import ClientTable from "../components/clients/ClientTable/ClientTable";
import SidePanel from "../components/common/SidePanel";
import BaseLayout from "../layout/BaseLayout";

enum ClientSidePanelType {
  CLIENT_DETAILS = "CLIENT_DETAILS",
  CREATE_CLIENT = "CREATE_CLIENT",
}

const panelTitle = {
  [ClientSidePanelType.CLIENT_DETAILS]: "Client Details",
  [ClientSidePanelType.CREATE_CLIENT]: "Create Client",
};

const ClientPage = () => {
  const theme = useTheme();

  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [sidePanelType, setSidePanelType] =
    useState<ClientSidePanelType | null>(null);

  const openPanel = (type: ClientSidePanelType) => {
    setSidePanelType(type);
  };

  const closePanel = () => {
    setSidePanelType(null);
  };

  const panels = {
    [ClientSidePanelType.CLIENT_DETAILS]: (
      <p>Client details {selectedClientId}</p>
    ),
    [ClientSidePanelType.CREATE_CLIENT]: <p>Create client</p>,
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
            variant="contained"
            color="primary"
            onClick={() => openPanel(ClientSidePanelType.CREATE_CLIENT)}
            sx={{ ml: "auto" }}
          >
            Create Client
          </Button>
        </Toolbar>

        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            [theme.breakpoints.up("sm")]: {
              paddingLeft: theme.spacing(3),
              paddingRight: theme.spacing(3),
            },
          }}
        >
          <ClientTable
            onSelect={(clientId) => {
              setSelectedClientId(clientId);
              openPanel(ClientSidePanelType.CLIENT_DETAILS);
            }}
          />
        </Box>

        <SidePanel
          isOpen={sidePanelType !== null}
          onClose={closePanel}
          title={sidePanelType ? panelTitle[sidePanelType] : ""}
        >
          {sidePanelType && panels[sidePanelType as ClientSidePanelType]}
        </SidePanel>
      </Box>
    </BaseLayout>
  );
};

export default ClientPage;
