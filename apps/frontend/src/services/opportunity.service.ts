import { ApiRequests } from "../types/api.types";
import { OpportunityType } from "../types/opportunity.types";
import { OverviewData, ComparisonData } from "../types/overview.types";
import {
  opportunityKeyValueMap,
  OpportunityType,
} from "../types/opportunity.types";
import { OPPORTUNITIES_PAGE_SIZE } from "../utils/const";
import { requestApi } from "./api";

/**
 * Fetches an opportunity by ID from the API.
 *
 * @param {string} id - Opportunity ID
 * @returns {Promise<OpportunityType>} - The opportunity data.
 */
export const getOpportunityById = async (
  id: string
): Promise<OpportunityType> => {
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
  totalPages: number = OPPORTUNITIES_PAGE_SIZE,
  getDeleted: boolean = false
): Promise<{
  opportunities: OpportunityType[];
  totalPages: number | null;
  totalCount: number | null;
}> => {
  const { body, headers } = await requestApi(ApiRequests.GET_OPPORTUNITIES, {
    queryParams: {
      _page: page,
      _limit: totalPages,
      isDeleted: getDeleted,
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

export const getOpportunityByClientId = async (
  clientId: string
): Promise<OpportunityType[]> => {
  const { body } = await requestApi(ApiRequests.GET_OPPORTUNITY_BY_CLIENT_ID, {
    pathParams: { clientId },
  });

  return body;
};

/**
 * Create a new opportunity in the API
 *
 * @param {OpportunityType} opportunityData - Opportunity data to create.
 * @returns {Promise<OpportunityType>} - Created opportunity data.
 */
export const createOpportunity = async (
  opportunityData: OpportunityType
): Promise<OpportunityType> => {
  const { body } = await requestApi(ApiRequests.CREATE_OPPORTUNITY, {
    body: opportunityData,
  });
  return body;
};

/**
 * It fetches the opportunities overview data from the API.
 * @param {keyof OpportunityType} groupBy - The group by filter.
 *
 * @returns {Promise<OverviewData[]>} - The opportunities overview data.
 */
export const getOpportunitiesOverview = async (
  groupBy: keyof OpportunityType
): Promise<OverviewData[]> => {
  console.log("[getOpportunitiesOverview] groupBy", groupBy);

  const { body } = await requestApi(ApiRequests.GET_OPPORTUNITIES_OVERVIEW, {
    queryParams: { groupBy },
  });

  // map labels if "groupBy" exists in opportunityKeyValueMap
  if (opportunityKeyValueMap[groupBy])
    return body.map((data) => ({
      ...data,
      label: opportunityKeyValueMap[groupBy]?.[data.label] ?? data.label,
    }));

  return body;
};

/**
 * It fetches the opportunities comparison data from the API.
 *
 * @returns {Promise<ComparisonData[]>} - The opportunities comparison data.
 */
export const getOpportunitiesComparison = async (): Promise<
  ComparisonData[]
> => {
  console.log("[getOpportunitiesComparison] Fetching data...");

  const { body } = await requestApi(
    ApiRequests.GET_OPPORTUNITIES_COMPARISON,
    {}
  );

  return body;
};

export default {
  getOpportunityById,
  updateOpportunity,
  createOpportunity,
  getOpportunities,
  getOpportunityByClientId,
  getOpportunitiesOverview,
  getOpportunitiesComparison,
};
