import { ApiRequests } from "../../types/api.types";
import { getContactsByClientId } from "../../services/contact.services";
import { useQuery } from "@tanstack/react-query";

const useGetContactsByClientId = (clientId: string) => {
  return useQuery({
    queryKey: [ApiRequests.GET_CONTACTS, clientId],
    queryFn: async () => {
      return await getContactsByClientId(clientId);
    }
  });
};

export default useGetContactsByClientId