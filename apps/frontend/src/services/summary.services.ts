import { ApiRequests } from "../types/api.types";
import { SummaryType } from "../types/summary.types";
import { requestApi } from "./api";

/** 
 * Fetches the summaries for all clients.
 *
 * @returns {Promise<SummaryType[]>} - The summary data for all clients.
 */
export const getAllSummaries = async (): Promise<SummaryType[]> => {
  try {
    console.info("Start Fetch"); // Logging de inicio

    const response = await requestApi(ApiRequests.GET_SUMMARY);

    if (!response || !response.body) {
      throw new Error("Invalid API response: missing body");
    }

    console.info("Fetch completed"); // Logging al completar
    return response.body;
  } catch (error) {
    console.error("Error fetching summaries:", error); // Logging de error
    throw error; // Re-lanza el error para que el consumidor lo maneje
  }
};
