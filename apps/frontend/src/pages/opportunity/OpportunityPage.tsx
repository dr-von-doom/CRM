import { Box, Button, Toolbar, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { OpportunityTable } from "../../components/opportunity/OpportunityTable";
import BaseLayout from "../../layout/BaseLayout";

export const OpportunityPage = () => {
  const theme = useTheme();

  return (
    <BaseLayout title="Opportunity">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Toolbar
          sx={{
            paddingLeft: theme.spacing(0),
            paddingRight: theme.spacing(0),
          }}
        >
          <Typography variant="h6">Opportunities list</Typography>
          <Button
            component={Link}
            to={"#"}
            variant="contained"
            color="primary"
            sx={{ ml: "auto" }}
          >
            Create Opportunity
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
          <OpportunityTable
            onSelect={(OpportunityId: string) => {}}
            onEdit={(OpportunityId: string) => {}}
          />
        </Box>
      </Box>
    </BaseLayout>
  );
};
