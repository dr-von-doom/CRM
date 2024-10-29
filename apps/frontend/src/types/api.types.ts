export enum httpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum ApiRequests {
  CHECK_HEALTH = "CHECK_HEALTH",
}

export const ApiRequestPaths: Record<ApiRequests, string> = {
  [ApiRequests.CHECK_HEALTH]: "/",
};

export const ApiRequestMethods: Record<ApiRequests, httpMethod> = {
  [ApiRequests.CHECK_HEALTH]: httpMethod.GET,
};

export type ApiRequestBodyType = {
  [ApiRequests.CHECK_HEALTH]: void;
};

export type ApiRequestQueryType = {
  [ApiRequests.CHECK_HEALTH]: void;
};

export type ApiPathParamsType = {
  [ApiRequests.CHECK_HEALTH]: void;
};

export type ApiResponseType = {
  [ApiRequests.CHECK_HEALTH]: { message: string };
};
