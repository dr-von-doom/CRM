import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { OpportunityBarChart } from "../components/overview/OpportunityBarChart";
import { OpportunityPieChart } from "../components/overview/OpportunityPieChart";
import BaseLayout from "../layout/BaseLayout";

export const HomePage = () => {
  return (
    <BaseLayout title="Overview">
      <Box
        sx={{
          marginBottom: 5,
          padding: 3,
        }}
      >
        <OpportunityBarChart />
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <OpportunityPieChart
            title="Opportunities by state"
            groupBy="status"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <OpportunityPieChart
            title="Opportunities by business type"
            groupBy="businessType"
          />
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

export default HomePage;
