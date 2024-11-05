import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClient } from "../services/client.service";
import { ApiRequests } from "../types/api.types";
import { ClientType } from "../types/client.types";

/**
 * Custom hook for updating a client using React Query's useMutation.
 */
const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      clientData,
    }: {
      id: string;
      clientData: Partial<ClientType>;
    }) => {
      return await updateClient(id, clientData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ApiRequests.GET_CLIENTS] });
    },
    onError: (error) => {
      console.error("Error updating client:", error);
    },
  });
};

export default useUpdateClient;
