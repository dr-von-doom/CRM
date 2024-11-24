import { Box, Paper, Typography, CircularProgress } from "@mui/material"; 
import { useGetAllSummaries } from "../../hooks/useGetAllSummaries"; 
import { BarChart } from '@mui/x-charts/BarChart';

const BarChartSummaries = () => {
  const { data, error, isLoading } = useGetAllSummaries();

  if (isLoading) return <CircularProgress color="primary" />;

 
  if (error) return <Typography color="error">An error occurred: {error.message}</Typography>;

  const chartData = data?.map((summary) => ({
    clientName: summary.clientName,
    totalEstimated: parseFloat(summary.totalEstimated),
    totalExecuted: parseFloat(summary.totalExecuted),
  }));

  return (
    <Box sx={{ width: "100%", paddingTop: "20px" }}>
      <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Summaries Bar Chart
        </Typography>
        <BarChart
          dataset={chartData} 
          xAxis={[
            {
              dataKey: "clientName",
              scaleType: "band", 
            },
          ]}
          yAxis={[
            {
              label: "Amount", 
            },
          ]}
          series={[
            { dataKey: "totalEstimated", label: "Total Estimated", color: "#4BC0C0" },
            { dataKey: "totalExecuted", label: "Total Executed", color: "#9966FF" },
          ]}
          height={300}
          sx={{
            width: '100%',
          }}
        />
      </Paper>
    </Box>
  );
};

export default BarChartSummaries;
