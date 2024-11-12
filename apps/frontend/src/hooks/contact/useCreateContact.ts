import { useMutation } from "@tanstack/react-query";
import { createContact } from "../../services/client.service";
import { ContactType } from "../../types/client.types";

/**
 * Custom hook for creating a contact using React Query's useMutation.
 */
export const useCreateContact = () => {
  return useMutation({
    mutationFn: async (contactData: Partial<ContactType>) => {
      return await createContact(contactData);
    },
    onError: (error) => {
      console.error("Error creating client:", error);
    },
  });
};
