import { ApiRequests } from "../types/api.types";
import { OpportunityType } from "../types/opportunity";
import { requestApi } from "./api";

/**
 * Fetches an opportunity by ID from the API.
 *
 * @param {string} id - Opportunity ID
 * @returns {Promise<OpportunityType>} - The opportunity data.
 */
export const getOpportunityById = async (id: string): Promise<OpportunityType> => {
  const { body } = await requestApi(ApiRequests.GET_OPPORTUNITY_BY_ID, {
    pathParams: { id },
  });

  return body;
};

/**
 * Updates an opportunity in the API.
 *
 * @param {string} id - The ID of the opportunity to update.
 * @param {Partial<OpportunityType>} opportunityData - The new data for the opportunity.
 * @returns {Promise<OpportunityType>} - The updated opportunity data.
 */
export const updateOpportunity = async (
  id: string,
  opportunityData: Partial<OpportunityType>
): Promise<OpportunityType> => {
  const options = {
    body: opportunityData,
    pathParams: { id },
  };

  const { body } = await requestApi(ApiRequests.UPDATE_OPPORTUNITY, options);

  return body;
};

export default {
  getOpportunityById,
  updateOpportunity,
};
