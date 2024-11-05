import { ClientType } from "./client.types";

export enum httpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export interface paginationType {
  _page?: number;
  _limit?: number;
}

export enum ApiRequests {
  CHECK_HEALTH = "CHECK_HEALTH",
  GET_CLIENTS = "GET_CLIENTS",
  GET_CLIENT_BY_ID = "GET_CLIENT_BY_ID",
  UPDATE_CLIENT = "UPDATE_CLIENT",
  CREATE_CLIENT = "CREATE_CLIENT",
}

export const ApiRequestPaths: Record<ApiRequests, string> = {
  [ApiRequests.CHECK_HEALTH]: "/",
  [ApiRequests.GET_CLIENTS]: "/clients",
  [ApiRequests.GET_CLIENT_BY_ID]: "/clients/:id",
  [ApiRequests.UPDATE_CLIENT]: "/clients/:id",
  [ApiRequests.CREATE_CLIENT]: "/clients/create",
};

export const ApiRequestMethods: Record<ApiRequests, httpMethod> = {
  [ApiRequests.CHECK_HEALTH]: httpMethod.GET,
  [ApiRequests.GET_CLIENTS]: httpMethod.GET,
  [ApiRequests.GET_CLIENT_BY_ID]: httpMethod.GET,
  [ApiRequests.UPDATE_CLIENT]: httpMethod.PATCH,
  [ApiRequests.CREATE_CLIENT]: httpMethod.POST,
};

export type ApiRequestBodyType = {
  [ApiRequests.CHECK_HEALTH]: void;
  [ApiRequests.GET_CLIENTS]: void;
  [ApiRequests.GET_CLIENT_BY_ID]: void;
  [ApiRequests.UPDATE_CLIENT]: Partial<ClientType>;
  [ApiRequests.CREATE_CLIENT]: Partial<ClientType>;
};

export type ApiRequestQueryType = {
  [ApiRequests.CHECK_HEALTH]: void;
  [ApiRequests.GET_CLIENTS]: paginationType & {};
  [ApiRequests.GET_CLIENT_BY_ID]: void;
  [ApiRequests.UPDATE_CLIENT]: void;
  [ApiRequests.CREATE_CLIENT]: void;
};

export type ApiPathParamsType = {
  [ApiRequests.CHECK_HEALTH]: void;
  [ApiRequests.GET_CLIENTS]: void;
  [ApiRequests.GET_CLIENT_BY_ID]: { id: string };
  [ApiRequests.UPDATE_CLIENT]: { id: string };
  [ApiRequests.CREATE_CLIENT]: void;
};

export type ApiResponseType = {
  [ApiRequests.CHECK_HEALTH]: { message: string };
  [ApiRequests.GET_CLIENTS]: ClientType[];
  [ApiRequests.GET_CLIENT_BY_ID]: ClientType;
  [ApiRequests.UPDATE_CLIENT]: ClientType;
  [ApiRequests.CREATE_CLIENT]: ClientType;
};
