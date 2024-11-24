import { ApiRequests } from "../types/api.types";
import { SummaryType } from "../types/summary.types";
import { requestApi } from "./api";

export const getAllSummaries = async (): Promise<SummaryType[]> => {
  try {
    console.info("Start Fetch");

    const response = await requestApi(ApiRequests.GET_SUMMARY, {
    });

    if (!response || !response.body) {
      throw new Error("Invalid API response: missing body");
    }

    console.info("Fetch completed");
    return response.body;
  } catch (error) {
    console.error("Error fetching summaries:", error);
    throw error;
  }
};
