import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import CircularProgress from "@mui/material/CircularProgress";
import useGetOpportunitiesComparison from "../../../hooks/opportunity/useGetOpportunitiesComparison";
import { ErrorAlert } from "../../common/alerts";
import { Typography, Box } from "@mui/material";

const chartSettings = {
  width: 1200,
  height: 600,
  yAxis: [
    {
      label: "Amount",
      labelProps: {
        dx: -50, 
      },
    },
  ],
  sx: {
    [`.${axisClasses.bottom} .${axisClasses.label}`]: {
      transform: "translate(0, 10px)", 
    },
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-10px, 0)", 
    },
  },
};

export const OpportunityBarChart = () => {
  const { data, isLoading, error } = useGetOpportunitiesComparison();

  if (isLoading) return <CircularProgress />;

  if (error) return <ErrorAlert />;

  const dataset = (data ?? []).map((item) => ({
    label: item.label,
    valueEstimated: item.valueEstimated,
    valueExecuted: item.valueExecuted || 0, 
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 2,
        }}
      >
        Estimated vs Executed Opportunities for each client
      </Typography>
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "label",
            label: "Clients",
          },
        ]}
        series={[
          {
            dataKey: "valueExecuted",
            label: "Executed Value",
            color: "#4caf50",
          },
          {
            dataKey: "valueEstimated",
            label: "Estimated Value",
            color: "#ff9800",
          },
        ]}
        {...chartSettings}
      />
    </Box>
  );
};
