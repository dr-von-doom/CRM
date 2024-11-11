import { useQuery } from "@tanstack/react-query";
import { getClientById } from "../../services/client.service";
import { ApiRequests } from "../../types/api.types";

export const useGetClientById = (id: string) => {
  return useQuery({
    queryKey: [ApiRequests.GET_CLIENT_BY_ID, id],
    queryFn: async () => {
      return await getClientById(id);
    },
  });
};

export default useGetClientById;
