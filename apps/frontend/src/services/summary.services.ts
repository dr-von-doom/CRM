import { ApiRequests } from "../types/api.types";
import { SummaryType } from "../types/summary.types";
import { requestApi } from "./api";

/** 
 * Fetches the summaries for all clients.
 *
 * @returns {Promise<SummaryType[]>} - The summary data for all clients.
 */
export const getAllSummaries = async (): Promise<SummaryType[]> => {
  const { body } = await requestApi(ApiRequests.GET_SUMMARY, {
    queryParams: undefined,  // No query parameters needed since we want all summaries
  });

  console.log("Fecth completed")
  return body;  

};
