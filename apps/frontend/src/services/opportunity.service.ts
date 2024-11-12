import { ApiRequests } from "../types/api.types";
import { OpportunityType } from "../types/opportunity.types";
import { OPPORTUNITIES_PAGE_SIZE } from "../utils/const";
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

export const getOpportunityByClientId = async ( clientId: string ): Promise<OpportunityType[]> => {
  const { body } = await requestApi(ApiRequests.GET_OPPORTUNITY_BY_CLIENT_ID, {
    pathParams: { clientId },
  });

  return body;
};
