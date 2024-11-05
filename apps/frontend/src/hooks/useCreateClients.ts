import { useMutation } from '@tanstack/react-query';
import { ClientType } from '../types/client.types';
import { createClient } from '../services/client.service';

/**
 * Custom hook for creating a client using React Query's useMutation.
 * 
 * @returns {object}
 */
export const useCreateClient = () => {

  return useMutation({
    mutationFn: async (clientData: ClientType) => {
      return await createClient(clientData);
    },
    onError: (error) => {
      console.error("Error creating client:", error);
    },
  })
};