import { useQuery } from "@tanstack/react-query";
import { getAllClients } from "../services/client.service";
import { ApiRequests } from "../types/api.types";
import { ClientType} from "../types/client.types";  

export const useGetAllClients = () => {
  return useQuery<ClientType[]>({
    queryKey: [ApiRequests.GET_CLIENTS],  
    queryFn: async () => {
      return await getAllClients(); 
    },
  });
};

export default useGetAllClients;
