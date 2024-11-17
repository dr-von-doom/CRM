import { ApiRequests } from "../types/api.types";
import { ClientType, ContactType } from "../types/client.types";
import { CLIENTS_PAGE_SIZE } from "../utils/const";
import { requestApi } from "./api";

/**
 * Create a new client in the API.
 *
 * @param {ClientType} clientData - Client data.
 * @returns {Promise<ClientType>} - Created client data.
 */
export const createClient = async (
  clientData: Partial<ClientType>
): Promise<Partial<ClientType>> => {
  const { body } = await requestApi(ApiRequests.CREATE_CLIENT, {
    body: clientData,
  });
  return body;
};

/**
 * Create a new contact in the API.
 *
 * @param {ContactType} contactData - Contact data.
 * @returns {Promise<ContactType>} - Created contact data.
 */
export const createContact = async (
  contactData: Partial<ContactType>
): Promise<Partial<ContactType>> => {
  const { body } = await requestApi(ApiRequests.CREATE_CONTACT, {
    body: contactData,
  });
  return body;
};

/**
 * Fetches clients from the API.
 *
 * @param {number} page - The page number to fetch.
 * @param {number} totalPages - The number of clients to fetch per page.
 * @returns {Promise<{ clients: ClientType[]; totalPage: number | null }>} - The clients and total page count.
 */
export const getClients = async (
  page: number = 1,
  totalPages: number = CLIENTS_PAGE_SIZE
): Promise<{
  clients: ClientType[];
  totalPages: number | null;
  totalCount: number | null;
}> => {
  const { body, headers } = await requestApi(ApiRequests.GET_CLIENTS, {
    queryParams: {
      _page: page,
      _limit: totalPages,
    },
  });

  const totalCount = parseInt(headers.get("X-Total-Count") ?? "0");
  console.log("[getClients] totalCount", totalCount);

  return {
    clients: body,
    totalPages: totalCount ? Math.ceil(totalCount / CLIENTS_PAGE_SIZE) : null,
    totalCount,
  };
};

/**
 * Fetches all clients from the API.
 *
 * @returns {Promise<ClientType[]>} - The clients data.
 */
export const getAllClients = async (
  getDeleted = false
): Promise<ClientType[]> => {
  const { body } = await requestApi(ApiRequests.GET_CLIENTS, {
    queryParams: {
      isActive: !getDeleted,
    },
  });

  return body;
};

/**
 * Fetches a client by ID from the API.
 *
 * @param {string} id Client ID
 * @returns {Promise<ClientType>} - The client data.
 */
export const getClientById = async (id: string): Promise<ClientType> => {
  const { body } = await requestApi(ApiRequests.GET_CLIENT_BY_ID, {
    pathParams: { id },
  });

  return body;
};

/**
 * Updates a client in the API.
 *
 * @param {string} id - The ID of the client to update.
 * @param {ClientType} clientData - The new data for the client.
 * @returns {Promise<ClientType>} - The updated client data.
 */
export const updateClient = async (
  id: string,
  clientData: Partial<ClientType>
): Promise<ClientType> => {
  const options = {
    body: clientData,
    pathParams: { id },
  };

  const { body } = await requestApi(ApiRequests.UPDATE_CLIENT, options);

  return body;
};
