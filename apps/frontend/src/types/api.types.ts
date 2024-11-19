import { ClientType, ContactType } from "./client.types";
import { OpportunityType } from "./opportunity.types";
import { FollowUpType } from "./followUps.types";

// Definition of HTTP methods
export enum httpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

// Pagination type interface
export interface paginationType {
  _page?: number;
  _limit?: number;
}

// Enumeration for API requests
export enum ApiRequests {
  CHECK_HEALTH = "CHECK_HEALTH",
  /* Client routes */
  GET_CLIENTS = "GET_CLIENTS",
  GET_CLIENT_BY_ID = "GET_CLIENT_BY_ID",
  UPDATE_CLIENT = "UPDATE_CLIENT",
  CREATE_CLIENT = "CREATE_CLIENT",
  /* Contact routes */
  GET_CONTACTS = "GET_CONTACTS",
  GET_CONTACT_BY_ID = "GET_CONTACT_BY_ID",
  CREATE_CONTACT = "CREATE_CONTACT",
  UPDATE_CONTACT = "UPDATE_CONTACT",
  /* Opportunity routes */
  GET_OPPORTUNITIES = "GET_OPPORTUNITIES",
  GET_OPPORTUNITY_BY_ID = "GET_OPPORTUNITY_BY_ID",
  UPDATE_OPPORTUNITY = "UPDATE_OPPORTUNITY",
  CREATE_OPPORTUNITY = "CREATE_OPPORTUNITY",
  GET_OPPORTUNITY_BY_CLIENT_ID = "GET_OPPORTUNITY_BY_CLIENT_ID",
  /* Follow-up routes */
  GET_FOLLOW_UPS = "GET_FOLLOW_UPS",
  CREATE_FOLLOW_UP = "CREATE_FOLLOW_UP",
  UPDATE_FOLLOW_UP = "UPDATE_FOLLOW_UP",
  GET_FOLLOW_UP_BY_ID = "GET_FOLLOW_UP_BY_ID",
}

// Mapping API requests to their respective paths
export const ApiRequestPaths: Record<ApiRequests, string> = {
  [ApiRequests.CHECK_HEALTH]: "/",
  /* Client paths */
  [ApiRequests.GET_CLIENTS]: "/clients",
  [ApiRequests.GET_CLIENT_BY_ID]: "/clients/:id",
  [ApiRequests.UPDATE_CLIENT]: "/clients/:id",
  [ApiRequests.CREATE_CLIENT]: "/clients",
  /* Contact paths */
  [ApiRequests.GET_CONTACTS]: "/contacts",
  [ApiRequests.CREATE_CONTACT]: "/contacts",
  [ApiRequests.UPDATE_CONTACT]: "/contacts/:id",
  [ApiRequests.GET_CONTACT_BY_ID]: "/contacts/:id",
  /* Opportunity paths */
  [ApiRequests.GET_OPPORTUNITIES]: "/opportunities",
  [ApiRequests.GET_OPPORTUNITY_BY_ID]: "/opportunities/:id",
  [ApiRequests.UPDATE_OPPORTUNITY]: "/opportunities/:id",
  [ApiRequests.CREATE_OPPORTUNITY]: "/opportunities",
  [ApiRequests.GET_OPPORTUNITY_BY_CLIENT_ID]:
    "/opportunities?clientId=:clientId",
  /* Follow-up paths */
  [ApiRequests.GET_FOLLOW_UPS]: "/follow-ups",
  [ApiRequests.CREATE_FOLLOW_UP]: "/follow-ups",
  [ApiRequests.UPDATE_FOLLOW_UP]: "/follow-ups/:id",
  [ApiRequests.GET_FOLLOW_UP_BY_ID]: "/follow-ups/:id",
};

// Mapping API requests to their respective HTTP methods
export const ApiRequestMethods: Record<ApiRequests, httpMethod> = {
  [ApiRequests.CHECK_HEALTH]: httpMethod.GET,
  /* Client request methods */
  [ApiRequests.GET_CLIENTS]: httpMethod.GET,
  [ApiRequests.GET_CLIENT_BY_ID]: httpMethod.GET,
  [ApiRequests.UPDATE_CLIENT]: httpMethod.PATCH,
  [ApiRequests.CREATE_CLIENT]: httpMethod.POST,
  /* Contact request methods */
  [ApiRequests.GET_CONTACTS]: httpMethod.GET,
  [ApiRequests.CREATE_CONTACT]: httpMethod.POST,
  [ApiRequests.UPDATE_CONTACT]: httpMethod.PATCH,
  [ApiRequests.GET_CONTACT_BY_ID]: httpMethod.GET,
  /* Opportunity request methods */
  [ApiRequests.GET_OPPORTUNITIES]: httpMethod.GET,
  [ApiRequests.GET_OPPORTUNITY_BY_ID]: httpMethod.GET,
  [ApiRequests.UPDATE_OPPORTUNITY]: httpMethod.PATCH,
  [ApiRequests.CREATE_OPPORTUNITY]: httpMethod.POST,
  [ApiRequests.GET_OPPORTUNITY_BY_CLIENT_ID]: httpMethod.GET,
  /* Follow-up request methods */
  [ApiRequests.GET_FOLLOW_UPS]: httpMethod.GET,
  [ApiRequests.CREATE_FOLLOW_UP]: httpMethod.POST,
  [ApiRequests.UPDATE_FOLLOW_UP]: httpMethod.PATCH,
  [ApiRequests.GET_FOLLOW_UP_BY_ID]: httpMethod.GET,
};

// Body types for API requests
export type ApiRequestBodyType = {
  [ApiRequests.CHECK_HEALTH]: void;
  /* Client body types */
  [ApiRequests.GET_CLIENTS]: void;
  [ApiRequests.GET_CLIENT_BY_ID]: void;
  [ApiRequests.UPDATE_CLIENT]: Partial<ClientType>;
  [ApiRequests.CREATE_CLIENT]: Partial<ClientType>;
  /* Contact body types */
  [ApiRequests.GET_CONTACTS]: void;
  [ApiRequests.UPDATE_CONTACT]: ContactType;
  [ApiRequests.CREATE_CONTACT]: Partial<ContactType>;
  [ApiRequests.GET_CONTACT_BY_ID]: void;
  /* Opportunity body types */
  [ApiRequests.GET_OPPORTUNITIES]: void;
  [ApiRequests.GET_OPPORTUNITY_BY_ID]: void;
  [ApiRequests.UPDATE_OPPORTUNITY]: Partial<OpportunityType>;
  [ApiRequests.CREATE_OPPORTUNITY]: OpportunityType;
  [ApiRequests.GET_OPPORTUNITY_BY_CLIENT_ID]: void;
  /* Follow-up body types */
  [ApiRequests.GET_FOLLOW_UPS]: void;
  [ApiRequests.CREATE_FOLLOW_UP]: FollowUpType;
  [ApiRequests.UPDATE_FOLLOW_UP]: Partial<FollowUpType>;
  [ApiRequests.GET_FOLLOW_UP_BY_ID]: void;
};

// Query parameter types for API requests
export type ApiRequestQueryType = {
  [ApiRequests.CHECK_HEALTH]: void;
  /* Client query types */
  [ApiRequests.GET_CLIENTS]: paginationType & Partial<ClientType>;
  [ApiRequests.GET_CLIENT_BY_ID]: void;
  [ApiRequests.UPDATE_CLIENT]: void;
  [ApiRequests.CREATE_CLIENT]: void;
  /* Contact query types */
  [ApiRequests.GET_CONTACTS]: { clientId?: string } & Partial<ContactType>;
  [ApiRequests.CREATE_CONTACT]: void;
  [ApiRequests.UPDATE_CONTACT]: void;
  [ApiRequests.GET_CONTACT_BY_ID]: void;
  /* Opportunity query types */
  [ApiRequests.GET_OPPORTUNITIES]: paginationType & Partial<OpportunityType>;
  [ApiRequests.GET_OPPORTUNITY_BY_ID]: void;
  [ApiRequests.UPDATE_OPPORTUNITY]: void;
  [ApiRequests.CREATE_OPPORTUNITY]: void;
  [ApiRequests.GET_OPPORTUNITY_BY_CLIENT_ID]: void;
  /* Follow-up query types */
  [ApiRequests.GET_FOLLOW_UPS]: Partial<FollowUpType>;
  [ApiRequests.CREATE_FOLLOW_UP]: void;
  [ApiRequests.UPDATE_FOLLOW_UP]: void;
  [ApiRequests.GET_FOLLOW_UP_BY_ID]: void;
};

// Path parameter types for API requests
export type ApiPathParamsType = {
  [ApiRequests.CHECK_HEALTH]: void;
  /* Client path params */
  [ApiRequests.GET_CLIENTS]: void;
  [ApiRequests.GET_CLIENT_BY_ID]: { id: string };
  [ApiRequests.UPDATE_CLIENT]: { id: string };
  [ApiRequests.CREATE_CLIENT]: void;
  /* Contact path params */
  [ApiRequests.GET_CONTACTS]: void;
  [ApiRequests.CREATE_CONTACT]: void;
  [ApiRequests.UPDATE_CONTACT]: { id: string };
  [ApiRequests.GET_CONTACT_BY_ID]: { id: string };
  /* Opportunity path params */
  [ApiRequests.GET_OPPORTUNITIES]: void;
  [ApiRequests.GET_OPPORTUNITY_BY_ID]: { id: string };
  [ApiRequests.UPDATE_OPPORTUNITY]: { id: string };
  [ApiRequests.CREATE_OPPORTUNITY]: void;
  [ApiRequests.GET_OPPORTUNITY_BY_CLIENT_ID]: { clientId: string };
  /* Follow-up path params */
  [ApiRequests.GET_FOLLOW_UPS]: void;
  [ApiRequests.CREATE_FOLLOW_UP]: void;
  [ApiRequests.UPDATE_FOLLOW_UP]: { id: string };
  [ApiRequests.GET_FOLLOW_UP_BY_ID]: { id: string };
};

// Response types for API requests
export type ApiResponseType = {
  [ApiRequests.CHECK_HEALTH]: { message: string };
  /* Client response types */
  [ApiRequests.GET_CLIENTS]: ClientType[];
  [ApiRequests.GET_CLIENT_BY_ID]: ClientType;
  [ApiRequests.UPDATE_CLIENT]: ClientType;
  [ApiRequests.CREATE_CLIENT]: ClientType;
  /* Contact response types */
  [ApiRequests.GET_CONTACTS]: ContactType[];
  [ApiRequests.CREATE_CONTACT]: ContactType;
  [ApiRequests.UPDATE_CONTACT]: ContactType;
  [ApiRequests.GET_CONTACT_BY_ID]: ContactType;
  /* Opportunity response types */
  [ApiRequests.GET_OPPORTUNITIES]: OpportunityType[];
  [ApiRequests.GET_OPPORTUNITY_BY_ID]: OpportunityType;
  [ApiRequests.UPDATE_OPPORTUNITY]: OpportunityType;
  [ApiRequests.CREATE_OPPORTUNITY]: OpportunityType;
  [ApiRequests.GET_OPPORTUNITY_BY_CLIENT_ID]: OpportunityType[];
  /* Follow-up response types */
  [ApiRequests.GET_FOLLOW_UPS]: FollowUpType[];
  [ApiRequests.CREATE_FOLLOW_UP]: FollowUpType;
  [ApiRequests.UPDATE_FOLLOW_UP]: FollowUpType;
  [ApiRequests.GET_FOLLOW_UP_BY_ID]: FollowUpType;
};
