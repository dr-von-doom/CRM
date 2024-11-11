import { ApiRequests } from "../types/api.types";
import { OpportunityType } from "../types/opportunity.types";
import { OPPORTUNITIES_PAGE_SIZE } from "../utils/const";
import { requestApi } from "./api";

/**
 * Fetches opportunities from the API.
 *
 * @param {number} page - The page number to fetch.
 * @param {number} totalPages - The number of opportunities to fetch per page.
 *
 * @returns {Promise<{ opportunities: OpportunityType[]; totalPage: number | null }>} - The opportunities and total page count.
 */
export const getOpportunities = async (
  page: number = 1,
  totalPages: number = OPPORTUNITIES_PAGE_SIZE
): Promise<{
  opportunities: OpportunityType[];
  totalPages: number | null;
  totalCount: number | null;
}> => {
  const { body, headers } = await requestApi(ApiRequests.GET_OPPORTUNITIES, {
    queryParams: {
      _page: page,
      _limit: totalPages,
    },
  });

  const totalCount = parseInt(headers.get("X-Total-Count") ?? "0");
  console.log("[getOpportunities] totalCount", totalCount);

  return {
    opportunities: body,
    totalPages: totalCount
      ? Math.ceil(totalCount / OPPORTUNITIES_PAGE_SIZE)
      : null,
    totalCount,
  };
};

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
