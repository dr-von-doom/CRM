import { useQuery } from "@tanstack/react-query";
import { getContactById } from "../../services/contact.services";
import { ApiRequests } from "../../types/api.types";

export const useGetContactById = (contactId: string) => {
  return useQuery({
    queryKey: [ApiRequests.GET_CONTACT_BY_ID, contactId],
    queryFn: async () => {
      return await getContactById(contactId);
    },
  });
};

export default useGetContactById;
