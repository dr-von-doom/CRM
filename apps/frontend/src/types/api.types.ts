import { ClientType, ContactType } from "./client.types";
import { OpportunityType } from "./opportunity.types";

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
  /* Client routes */
  GET_CLIENTS = "GET_CLIENTS",
  GET_CLIENT_BY_ID = "GET_CLIENT_BY_ID",
  UPDATE_CLIENT = "UPDATE_CLIENT",
  CREATE_CLIENT = "CREATE_CLIENT",
  /** Contact routes */
  GET_CONTACTS = "GET_CONTACTS",
  CREATE_CONTACT = "CREATE_CONTACT",
  UPDATE_CONTACT = "UPDATE_CONTACT",
  /** Opportunity routes */
  GET_OPPORTUNITIES = "GET_OPPORTUNITIES",
  GET_OPPORTUNITY_BY_ID = "GET_OPPORTUNITY_BY_ID",
  UPDATE_OPPORTUNITY = "UPDATE_OPPORTUNITY",
  CREATE_OPPORTUNITY = "CREATE_OPPORTUNITY",
  GET_OPPORTUNITY_BY_CLIENT_ID = "GET_OPPORTUNITY_BY_CLIENT_ID",
}

export const ApiRequestPaths: Record<ApiRequests, string> = {
  [ApiRequests.CHECK_HEALTH]: "/",
  /* Client paths */
  [ApiRequests.GET_CLIENTS]: "/clients",
  [ApiRequests.GET_CLIENT_BY_ID]: "/clients/:id",
  [ApiRequests.UPDATE_CLIENT]: "/clients/:id",
  [ApiRequests.CREATE_CLIENT]: "/clients",
  /** Contact paths */
  [ApiRequests.GET_CONTACTS]: "/contacts",
  [ApiRequests.CREATE_CONTACT]: "/contacts",
  [ApiRequests.UPDATE_CONTACT]: "/contacts/:id",
  /** Opportunity paths */
  [ApiRequests.GET_OPPORTUNITIES]: "/opportunities",
  [ApiRequests.GET_OPPORTUNITY_BY_ID]: "/opportunities/:id",
  [ApiRequests.UPDATE_OPPORTUNITY]: "/opportunities/:id",
  [ApiRequests.CREATE_OPPORTUNITY]: "/opportunities",
  [ApiRequests.GET_OPPORTUNITY_BY_CLIENT_ID]: "/opportunities?clientId=:clientId",
};

export const ApiRequestMethods: Record<ApiRequests, httpMethod> = {
  [ApiRequests.CHECK_HEALTH]: httpMethod.GET,
  /* Client request methods */
  [ApiRequests.GET_CLIENTS]: httpMethod.GET,
  [ApiRequests.GET_CLIENT_BY_ID]: httpMethod.GET,
  [ApiRequests.UPDATE_CLIENT]: httpMethod.PATCH,
  [ApiRequests.CREATE_CLIENT]: httpMethod.POST,
  /** Contact request methods */
  [ApiRequests.GET_CONTACTS]: httpMethod.GET,
  [ApiRequests.CREATE_CONTACT]: httpMethod.POST,
  [ApiRequests.UPDATE_CONTACT]: httpMethod.PATCH,
  /** Opportunity request methods */
  [ApiRequests.GET_OPPORTUNITIES]: httpMethod.GET,
  [ApiRequests.GET_OPPORTUNITY_BY_ID]: httpMethod.GET,
  [ApiRequests.UPDATE_OPPORTUNITY]: httpMethod.PATCH,
  [ApiRequests.CREATE_OPPORTUNITY]: httpMethod.POST,
  [ApiRequests.GET_OPPORTUNITY_BY_CLIENT_ID]: httpMethod.GET,
};

export type ApiRequestBodyType = {
  [ApiRequests.CHECK_HEALTH]: void;
  /** Client body types */
  [ApiRequests.GET_CLIENTS]: void;
  [ApiRequests.GET_CLIENT_BY_ID]: void;
  [ApiRequests.UPDATE_CLIENT]: Partial<ClientType>;
  [ApiRequests.CREATE_CLIENT]: Partial<ClientType>;
  /** Contact body types */
  [ApiRequests.GET_CONTACTS]: void;
  [ApiRequests.UPDATE_CONTACT]: ContactType;
  [ApiRequests.CREATE_CONTACT]: Partial<ContactType>;
  /** Opportunity body types */
  [ApiRequests.GET_OPPORTUNITIES]: void;
  [ApiRequests.GET_OPPORTUNITY_BY_ID]: void;
  [ApiRequests.UPDATE_OPPORTUNITY]: Partial<OpportunityType>;
  [ApiRequests.CREATE_OPPORTUNITY]: OpportunityType;
  [ApiRequests.GET_OPPORTUNITY_BY_CLIENT_ID]: void;
};

export type ApiRequestQueryType = {
  [ApiRequests.CHECK_HEALTH]: void;
  /** Client query types */
  [ApiRequests.GET_CLIENTS]: paginationType & Partial<ClientType>;
  [ApiRequests.GET_CLIENT_BY_ID]: void;
  [ApiRequests.UPDATE_CLIENT]: void;
  [ApiRequests.CREATE_CLIENT]: void;
  /** Contact query types */
  [ApiRequests.GET_CONTACTS]: { clientId?: string } & Partial<ContactType>;
  [ApiRequests.CREATE_CONTACT]: void;
  [ApiRequests.UPDATE_CONTACT]: void;
  /** Opportunity query types */
  [ApiRequests.GET_OPPORTUNITIES]: paginationType & Partial<OpportunityType>;
  [ApiRequests.GET_OPPORTUNITY_BY_ID]: void;
  [ApiRequests.UPDATE_OPPORTUNITY]: void;
  [ApiRequests.CREATE_OPPORTUNITY]: void;
  [ApiRequests.GET_OPPORTUNITY_BY_CLIENT_ID]: void;
};

export type ApiPathParamsType = {
  [ApiRequests.CHECK_HEALTH]: void;
  /** Client path params */
  [ApiRequests.GET_CLIENTS]: void;
  [ApiRequests.GET_CLIENT_BY_ID]: { id: string };
  [ApiRequests.UPDATE_CLIENT]: { id: string };
  [ApiRequests.CREATE_CLIENT]: void;
  /** Contact path params */
  [ApiRequests.GET_CONTACTS]: void;
  [ApiRequests.CREATE_CONTACT]: void;
  [ApiRequests.UPDATE_CONTACT]: { id: string };
  /** Opportunity path params */
  [ApiRequests.GET_OPPORTUNITIES]: void;
  [ApiRequests.GET_OPPORTUNITY_BY_ID]: { id: string };
  [ApiRequests.UPDATE_OPPORTUNITY]: { id: string };
  [ApiRequests.CREATE_OPPORTUNITY]: void;
  [ApiRequests.GET_OPPORTUNITY_BY_CLIENT_ID]: { clientId: string };
};

export type ApiResponseType = {
  [ApiRequests.CHECK_HEALTH]: { message: string };
  /** Client response types */
  [ApiRequests.GET_CLIENTS]: ClientType[];
  [ApiRequests.GET_CLIENT_BY_ID]: ClientType;
  [ApiRequests.UPDATE_CLIENT]: ClientType;
  [ApiRequests.CREATE_CLIENT]: ClientType;
  /** Contact response types */
  [ApiRequests.GET_CONTACTS]: ContactType[];
  [ApiRequests.CREATE_CONTACT]: ContactType;
  [ApiRequests.UPDATE_CONTACT]: ContactType;
  /** Opportunity response types */
  [ApiRequests.GET_OPPORTUNITIES]: OpportunityType[];
  [ApiRequests.GET_OPPORTUNITY_BY_ID]: OpportunityType;
  [ApiRequests.UPDATE_OPPORTUNITY]: OpportunityType;
  [ApiRequests.CREATE_OPPORTUNITY]: OpportunityType;
  [ApiRequests.GET_OPPORTUNITY_BY_CLIENT_ID]: OpportunityType[];
};