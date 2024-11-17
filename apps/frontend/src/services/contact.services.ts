import { ApiRequests } from "../types/api.types";
import { ContactType } from "../types/client.types";
import { requestApi } from "./api";

/**
 * Fetches a contact by ID from the API.
 *
 * @param {string} clientId - The ID of the client to fetch contacts for.
 * @returns {Promise<ContactType[]>} - The contacts for the client.
 */
export const getContactsByClientId = async (
  clientId: string
): Promise<ContactType[]> => {
  const { body } = await requestApi(ApiRequests.GET_CONTACTS, {
    queryParams: { clientId },
  });

  return body;
};

/**
 * Updates a contact in the API.
 *
 * @param {string} id - The ID of the contact to update.
 * @param {ContactType} contactData - The new data for the contact.
 * @returns {Promise<ContactType>} - The updated contact data.
 */
export const updateContact = async (
  id: string,
  contactData: Partial<ContactType>
): Promise<ContactType> => {
  const { clientId, firstName, lastName, email, phone, ...rest } = contactData;

  const updatedContactData: ContactType = {
    id,
    clientId: clientId ?? "",
    firstName: firstName ?? "",
    lastName: lastName ?? "",
    email: email ?? "",
    phone: phone ?? "",
    ...rest,
  };

  const options = {
    body: updatedContactData,
    pathParams: { id },
  };

  const { body } = await requestApi(ApiRequests.UPDATE_CONTACT, options);

  return body;
};
