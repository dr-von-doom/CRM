import {
  ApiPathParamsType,
  ApiRequestBodyType,
  ApiRequestMethods,
  ApiRequestPaths,
  ApiRequestQueryType,
  ApiRequests,
  ApiResponseType,
} from "../types/api.types";

const env = process.env.NODE_ENV;

const BASE_URL =
  env === "development"
    ? "http://localhost:3000"
    : "https://exclusive-be.onrender.com";

/**
 * It replaces the path params in the path
 *
 * @param {string} path - path to be replaced
 * @param {object} pathParams - path params to be replaced
 * @returns it replaces the path params in the path
 */
export const replacePathParams = (
  path: string,
  pathParams?: Record<string, string>
) => {
  if (!pathParams) return path;

  return Object.entries(pathParams).reduce(
    (acc, [key, value]) => acc.replace(`:${key}`, value),
    path
  );
};

/**
 * It makes the api request
 *
 * @param {ApiRequests} request Request type
 * @param {ApiRequestBodyType[T]} options.body Request body
 * @param {ApiRequestQueryType[T]} options.queryParams Query params
 * @param {ApiPathParamsType[T]} options.pathParams Path params
 *
 * @returns {Promise<ApiResponseType[T]>} response
 */
export const requestApi = async <T extends ApiRequests>(
  request: T,
  options?: {
    body?: ApiRequestBodyType[T];
    queryParams?: ApiRequestQueryType[T];
    pathParams?: ApiPathParamsType[T];
  }
): Promise<ApiResponseType[T]> => {
  const isFormData = (options?.body ?? {}) instanceof FormData;

  const queryParams: string = options?.queryParams
    ? new URLSearchParams(options?.queryParams).toString()
    : "";

  const route = replacePathParams(
    ApiRequestPaths[request],
    options?.pathParams ?? {}
  );

  const ep = `${BASE_URL}${route}?${queryParams}`;
  console.log(`fetching: {${ApiRequestMethods[request]}} ${ep}`);

  const response = await fetch(ep, {
    method: ApiRequestMethods[request],
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
    body: options?.body ? JSON.stringify(options?.body) : null,
  });

  return response.json() ?? ({} as ApiResponseType[T]);
};
