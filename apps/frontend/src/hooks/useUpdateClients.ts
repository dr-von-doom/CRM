import { useCallback } from 'react';
import { ClientType } from '../types/client.types';
import { updateClient } from '../services/client.service';

/**
 * Custom hook for updating a client.
 * 
 * @returns {function} updateClientHandler - A function to call to update a client
 */
const useUpdateClient = () => {
  const updateClientHandler = useCallback(
    async (id: string, clientData: ClientType) => {
      try {
        const updatedClient = await updateClient(id, clientData);
        return updatedClient;
      } catch (error) {
        console.error("Error updating client:", error);
        throw error; // Rethrow the error to be handled by the caller
      }
    },
    []
  );

  return { updateClientHandler };
};

export default useUpdateClient;
