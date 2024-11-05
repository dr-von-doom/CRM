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
  UPDATE_CLIENT = "UPDATE_CLIENT", 
}

export const ApiRequestPaths: Record<ApiRequests, string> = {
  [ApiRequests.CHECK_HEALTH]: "/",
  [ApiRequests.GET_CLIENTS]: "/clients",
  [ApiRequests.UPDATE_CLIENT]: "/clients/:id", 
};

export const ApiRequestMethods: Record<ApiRequests, httpMethod> = {
  [ApiRequests.CHECK_HEALTH]: httpMethod.GET,
  [ApiRequests.GET_CLIENTS]: httpMethod.GET,
  [ApiRequests.UPDATE_CLIENT]: httpMethod.PUT, 
};

export type ApiRequestBodyType = {
  [ApiRequests.CHECK_HEALTH]: void;
  [ApiRequests.GET_CLIENTS]: void;
  [ApiRequests.UPDATE_CLIENT]: ClientType; 
};

export type ApiRequestQueryType = {
  [ApiRequests.CHECK_HEALTH]: void;
  [ApiRequests.GET_CLIENTS]: paginationType & {};
  [ApiRequests.UPDATE_CLIENT]: void; 
};

export type ApiPathParamsType = {
  [ApiRequests.CHECK_HEALTH]: void;
  [ApiRequests.GET_CLIENTS]: void;
  [ApiRequests.UPDATE_CLIENT]: { id: string }; 
};

export type ApiResponseType = {
  [ApiRequests.CHECK_HEALTH]: { message: string };
  [ApiRequests.GET_CLIENTS]: ClientType[];
  [ApiRequests.UPDATE_CLIENT]: ClientType; 
};

export type Contact = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type Client = {
  nit: string;
  fullName: string;
  address: string;
  country: string;
  city: string;
  email: string;
  phone: string;
  isActive: boolean;
};

