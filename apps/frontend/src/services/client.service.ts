import { ApiRequests } from "../types/api.types";
import { ClientType, ContactType } from "../types/client.types";
import { CLIENTS_PAGE_SIZE } from "../utils/const";
import { requestApi } from "./api";

/**
 * Crea un nuevo cliente en la API.
 *
 * @param {ClientType} clientData - Datos del cliente.
 * @returns {Promise<ClientType>} - Datos del cliente creado.
 */
export const createClient = async (clientData: ClientType): Promise<ClientType> => {
  const { body } = await requestApi(ApiRequests.CREATE_CLIENT, { body: clientData });
  return body;
};

/**
 * Crea un nuevo contacto en la API.
 *
 * @param {ContactType} contactData - Datos del contacto.
 * @returns {Promise<ContactType>} - Datos del contacto creado.
 */
export const createContact = async (contactData: ContactType): Promise<ContactType> => {
  const { body } = await requestApi(ApiRequests.CREATE_CONTACT, { body: contactData });
  return body;
};

/**
 * Fetches clients from the API.
 *
 * @param {number} page - The page number to fetch.
 * @param {number} totalPage - The number of clients to fetch per page.
 * @returns {Promise<{ clients: ClientType[]; totalPage: number | null }>} - The clients and total page count.
 */
export const getClients = async (
  page: number = 1,
  totalPage: number = CLIENTS_PAGE_SIZE
): Promise<{
  clients: ClientType[];
  totalPage: number | null;
}> => {
  const { body, headers } = await requestApi(ApiRequests.GET_CLIENTS, {
    queryParams: {
      _page: page,
      _limit: totalPage,
    },
  });

  const totalCount = headers.get("X-Total-Count");
  console.log("[getClients] totalCount", totalCount);

  return {
    clients: body,
    totalPage: totalCount
      ? Math.floor(parseInt(totalCount) / CLIENTS_PAGE_SIZE)
      : null,
  };
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
