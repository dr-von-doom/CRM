import { ClientType } from "./client.types";

export enum httpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface paginationType {
  _page?: number;
  _limit?: number;
}

export enum ApiRequests {
  CHECK_HEALTH = "CHECK_HEALTH",
  GET_CLIENTS = "GET_CLIENTS",
}

export const ApiRequestPaths: Record<ApiRequests, string> = {
  [ApiRequests.CHECK_HEALTH]: "/",
  [ApiRequests.GET_CLIENTS]: "/clients",
};

export const ApiRequestMethods: Record<ApiRequests, httpMethod> = {
  [ApiRequests.CHECK_HEALTH]: httpMethod.GET,
  [ApiRequests.GET_CLIENTS]: httpMethod.GET,
};

export type ApiRequestBodyType = {
  [ApiRequests.CHECK_HEALTH]: void;
  [ApiRequests.GET_CLIENTS]: void;
};

export type ApiRequestQueryType = {
  [ApiRequests.CHECK_HEALTH]: void;
  [ApiRequests.GET_CLIENTS]: paginationType & {};
};

export type ApiPathParamsType = {
  [ApiRequests.CHECK_HEALTH]: void;
  [ApiRequests.GET_CLIENTS]: void;
};

export type ApiResponseType = {
  [ApiRequests.CHECK_HEALTH]: { message: string };
  [ApiRequests.GET_CLIENTS]: ClientType[];
};
