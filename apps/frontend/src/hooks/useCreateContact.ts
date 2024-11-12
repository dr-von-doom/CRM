import { useMutation } from '@tanstack/react-query';
import { ContactType } from '../types/client.types';
import { createContact } from '../services/client.service';

/**
 * Custom hook for creating a contact using React Query's useMutation.
 * 
 * @returns {object}
 */
export const useCreateContact = () => {

  return useMutation({
    mutationFn: async (contactData: ContactType) => {
      return await createContact(contactData);
    },
    onError: (error) => {
      console.error("Error creating client:", error);
    },
  })
};