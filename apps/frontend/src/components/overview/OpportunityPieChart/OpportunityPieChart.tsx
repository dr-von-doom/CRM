import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { PieChart } from "@mui/x-charts/PieChart";
import useGetOpportunitiesOverview from "../../../hooks/opportunity/useGetOpportunitiesOverview";
import { OpportunityType } from "../../../types/opportunity.types";
import { ErrorAlert } from "../../common/alerts";

export interface OpportunityPieChartType {
  title: string;
  groupBy: keyof OpportunityType;
}

export const OpportunityPieChart = ({
  title,
  groupBy,
}: OpportunityPieChartType) => {
  const { data, isLoading, error } = useGetOpportunitiesOverview(groupBy);

  const size = { height: 450 };

  if (isLoading) return <CircularProgress />;

  if (error) return <ErrorAlert />;

  return (
    <Box
      data-testid={`opportunity-pie-chart-grouped-by-${groupBy}`}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 0,
        }}
      >
        {title}
      </Typography>

      <PieChart
        series={[
          {
            data: data ?? [],
            paddingAngle: 2,
            cornerRadius: 5,
            highlightScope: {
              faded: "global",
              highlighted: "item",
            },
            innerRadius: 40,
          },
        ]}
        {...size}
        margin={{ top: 80, bottom: 80, left: 80, right: 80 }}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "bottom", horizontal: "middle" },
            padding: 0,
          },
        }}
      />
    </Box>
  );
};
