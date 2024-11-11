import { ApiRequests } from "../../types/api.types";
import { getContactsByClientId } from "../../services/client.service";
import { useQuery } from "@tanstack/react-query";

const useGetContactsByClientId = (clientId: string) => {
  return useQuery({
    queryKey: [ApiRequests.GET_CONTACTS_BY_CLIENT_ID, clientId],
    queryFn: async () => {
      return await getContactsByClientId(clientId);
    }
  });
};

export default useGetContactsByClientId