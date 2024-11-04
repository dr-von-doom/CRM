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
    : env === "storybook"
    ? ""
    : "https://crm-backend-8k3c.onrender.com";

console.log("[api] BASE_URL", env);
/**
 * It replaces the path params in the path
 *
 * @param {string} path - path to be replaced
 * @param {object} pathParams - path params to be replaced
 * @returns it replaces the path params in the path
 */
export const replaceParams = (
  path: string,
  pathParams?: Record<string, string>,
  queryParams?: Record<string, string>
) => {
  // Replace path params
  const route = pathParams
    ? Object.entries(pathParams).reduce(
        (acc, [key, value]) => acc.replace(`:${key}`, value),
        path
      )
    : path;

  if (!queryParams) return route;

  // Replace query params
  const _queryParams: string = queryParams
    ? new URLSearchParams(queryParams as Record<string, string>).toString()
    : "";

  return `${route}?${_queryParams}`;
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
    body?: T extends keyof ApiRequestBodyType ? ApiRequestBodyType[T] : never;
    queryParams?: T extends keyof ApiRequestQueryType ? ApiRequestQueryType[T] : never;
    pathParams?: T extends keyof ApiPathParamsType ? ApiPathParamsType[T] : never;
  }
): Promise<{
  body: ApiResponseType[T];
  headers: Headers;
}> => {
  const isFormData = (options?.body ?? {}) instanceof FormData;

  const route = `${BASE_URL}${replaceParams(
    ApiRequestPaths[request],
    options?.pathParams as unknown as Record<string, string>,
    options?.queryParams as unknown as Record<string, string>
  )}`;

  console.log(
    `[requestApi] fetching: {${ApiRequestMethods[request]}} ${route}`
  );

  const response = await fetch(route, {
    method: ApiRequestMethods[request],
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
    body: options?.body ? JSON.stringify(options?.body) : null,
  });

  if (!response.ok) {
    throw new Error(`[requestApi] HTTP error! status: ${response.status}`);
  }

  const responseBody = (await response.json()) as ApiResponseType[T];

  console.log("[requestApi] response", response);

  return {
    body: responseBody,
    headers: response.headers,
  };
};
