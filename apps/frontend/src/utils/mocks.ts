import { replaceParams } from "../services/api";
import {
  ApiPathParamsType,
  ApiRequestMethods,
  ApiRequestPaths,
  ApiRequestQueryType,
  ApiRequests,
} from "../types/api.types";

const env = process.env.NODE_ENV;

const BASE_URL =
  env === "development"
    ? "http://localhost:3000"
    : "https://crm-backend-8k3c.onrender.com";

/**
 * It returns the mock data
 *
 * @param {ApiRequests} request Request type
 * @param {ApiPathParamsType} options.pathParams Path params
 * @param {ApiRequestQueryType} options.queryParams Query params
 *
 * @returns {url: string, method: string} url and method
 */
export const getMockData = <T extends ApiRequests>(
  request: T,
  options?: {
    pathParams?: ApiPathParamsType[T];
    queryParams?: ApiRequestQueryType[T];
  }
): {
  url: string;
  method: string;
} => {
  return {
    url: `${BASE_URL}${replaceParams(
      ApiRequestPaths[request],
      options?.pathParams as unknown as Record<string, string>,
      options?.queryParams as unknown as Record<string, string>
    )}`,
    method: ApiRequestMethods[request],
  };
};
