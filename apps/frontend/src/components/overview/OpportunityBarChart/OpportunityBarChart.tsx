import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import useGetOpportunitiesComparison from "../../../hooks/opportunity/useGetOpportunitiesComparison";
import { ErrorAlert } from "../../common/alerts";

const chartSettings = {
  height: 300,
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
      textAnchor: "end",
      transformOrigin: "center",
      transform: "rotate(-45deg)",
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
      <Box
        sx={{
          overflowX: "auto", // Enables horizontal scrolling
          width: "100%", // Optional: limit width of the container
        }}
      >
        <Box>
          <BarChart
            dataset={dataset}
            grid={{ vertical: true }}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "label",
                label: "Clients",
              },
            ]}
            borderRadius={10}
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
            width={Math.max(1200, dataset.length * 100)}
            slotProps={{
              legend: {
                direction: "row",
                position: { vertical: "top", horizontal: "left" },
                padding: 0,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OpportunityBarChart;
