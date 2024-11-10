import { OpportunityType } from "../types/opportunities";
import { ApiRequests } from "../types/api.types";
import { requestApi } from "./api";

/*
 * Create a new opportunity in the API
 *
 * @param {OpportunityType} opportunityData - Datos de la oportunidad.
 * @returns {Promise<OpportunityType>} - Datos de la oportunidad creada.
 */
export const createOpportunity = async (opportunityData: OpportunityType): Promise<OpportunityType> => {
  const { body } = await requestApi(ApiRequests.CREATE_OPPORTUNITY, { body: opportunityData });
  return body;
};
