import { FollowUpType } from "../types/followUps.types";
import { requestApi } from "./api";
import { ApiRequests } from "../types/api.types";

/**
 * Create a new follow-up in the API.
 *
 * @param {FollowUpType} followUpData - Follow-up data to create.
 * @returns {Promise<FollowUpType>} - Created follow-up data.
 */
export const createFollowUp = async (
  followUpData: FollowUpType
): Promise<FollowUpType> => {
  const { body } = await requestApi(ApiRequests.CREATE_FOLLOW_UP, {
    body: followUpData,
  });
  return body;
};

/**
 * It retrieves all follow-ups from the API.
 *
 * @param {string} opportunityId - Opportunity ID to filter follow-ups.
 * @returns {Promise<FollowUpType[]>} - List of follow-ups.
 */
export const getFollowUps = async (
  opportunityId?: string
): Promise<FollowUpType[]> => {
  const { body } = await requestApi(ApiRequests.GET_FOLLOW_UPS, {
    queryParams: { opportunityId },
  });
  return body;
};
