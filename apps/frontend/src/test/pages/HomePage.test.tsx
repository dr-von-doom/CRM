import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import * as OpportunityService from "../../services/opportunity.service";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

describe("HomePage", () => {
  beforeEach(async () => {
    jest
      .spyOn(OpportunityService, "getOpportunitiesOverview")
      .mockResolvedValue(Promise.resolve([]));

    jest
      .spyOn(OpportunityService, "getOpportunitiesComparison")
      .mockResolvedValue(Promise.resolve([]));
  });

  describe("opportunityBarChart", () => {
    test("When backend return the data, then the chart is displayed", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <Router>
            <HomePage />
          </Router>
        </QueryClientProvider>
      );

      const chart = await screen.findByTestId("opportunity-bar-chart");
      expect(chart).toBeInTheDocument();
    });

    test("When backend return an error, then a controlled error message is displayed", async () => {
      jest
        .spyOn(OpportunityService, "getOpportunitiesComparison")
        .mockRejectedValue(new Error("Backend error"));

      render(
        <QueryClientProvider client={queryClient}>
          <Router>
            <HomePage />
          </Router>
        </QueryClientProvider>
      );

      const errorMessage = await screen.findAllByText(
        "Please try again later. If the problem persists, please contact support."
      );

      expect(errorMessage.length).toBe(1);
    });
  });

  describe("opportunityPieChart", () => {
    test("[status] When backend return the data, then the chart is displayed", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <Router>
            <HomePage />
          </Router>
        </QueryClientProvider>
      );

      const chart = await screen.findByTestId(
        "opportunity-pie-chart-grouped-by-status"
      );
      expect(chart).toBeInTheDocument();
    });

    test("[businessType] When backend return the data, then the chart is displayed", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <Router>
            <HomePage />
          </Router>
        </QueryClientProvider>
      );

      const chart = await screen.findByTestId(
        "opportunity-pie-chart-grouped-by-businessType"
      );
      expect(chart).toBeInTheDocument();
    });

    test("When backend return an error, then a controlled error message is displayed", async () => {
      jest
        .spyOn(OpportunityService, "getOpportunitiesOverview")
        .mockRejectedValue(new Error("Backend error"));

      render(
        <QueryClientProvider client={queryClient}>
          <Router>
            <HomePage />
          </Router>
        </QueryClientProvider>
      );

      await waitFor(() =>
        expect(
          screen.getAllByText(
            "Please try again later. If the problem persists, please contact support."
          )
        ).toHaveLength(2)
      );
    });
  });
});
