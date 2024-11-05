import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ClientType } from '../types/client.types';
import { createClient } from '../services/client.service';
import { ApiRequests } from '../types/api.types';

/**
 * Custom hook for creating a client using React Query's useMutation.
 * 
 * @returns {object}
 */
export const useCreateClient = () => {
  const queryClient = useQueryClient(); 

  return useMutation({
    mutationFn: async (clientData: ClientType) => {
      return await createClient(clientData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ApiRequests.GET_CLIENTS] });
    },
    onError: (error) => {
      console.error("Error creating client:", error);
    },
  })
};