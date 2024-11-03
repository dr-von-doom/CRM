import { ApiRequests } from "../types/api.types";
import { ClientType } from "../types/client.types";
import { CLIENTS_PAGE_SIZE } from "../utils/conts";
import { requestApi } from "./api";

/**
 * It fetches the clients from the API.
 *
 * @param {number} page
 * @returns {Promise<ClientType[]>}
 */
export const getClients = async (
  page: number = 1,
  totalPage = CLIENTS_PAGE_SIZE
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
 * It updates a client in the API.
 *
 * @param {string} id - The ID of the client to update
 * @param {ClientType} data - The new data for the client
 * @returns {Promise<ClientType>} - The updated client data
 */
export const updateClient = async (id: string, data: ClientType): Promise<ClientType> => {
  const { body } = await requestApi(ApiRequests.UPDATE_CLIENT, {
    body: data,
    pathParams: { id },
  });

  return body;
};
