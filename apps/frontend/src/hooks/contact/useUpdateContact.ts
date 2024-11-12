import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateContact } from "../../services/contact.services";
import { ApiRequests } from "../../types/api.types";
import { ContactType } from "../../types/client.types";

/**
 * Custom hook for updating a contact using React Query's useMutation.
 */
const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      contactData,
    }: {
      id: string;
      contactData: Partial<ContactType>;
    }) => {
      return await updateContact(id, contactData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ApiRequests.GET_CONTACTS] });
    },
    onError: (error) => {
      console.error("Error updating contact:", error);
    },
  });
};

export default useUpdateContact;
