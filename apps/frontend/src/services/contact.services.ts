import { ContactType } from "../types/client.types";
import { ApiRequests } from "../types/api.types";
import { requestApi } from "./api";

export const fetchContactsByClientId = async (clientId: string) => {
  const response = await fetch(`/api/clients/${clientId}/contacts`);
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  return response.json();
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
