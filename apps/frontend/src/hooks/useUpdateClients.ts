import { useMutation } from 'react-query';
import { ClientType } from '../types/client.types';
import { updateClient } from '../services/client.service';

/**
 * Custom hook for updating a client using React Query's useMutation.
 * 
 * @returns {object}
 */
const useUpdateClient = () => {
  const mutation = useMutation(
    async ({ id, clientData }: { id: string; clientData: ClientType }) => {
      const updatedClient = await updateClient(id, clientData);
      return updatedClient;
    },
    {
      onError: (error) => {
        console.error("Error updating client:", error);
      },
      onSuccess: (data) => {
        console.log("Client updated successfully:", data);
      },
    }
  );

  return mutation;
};

export default useUpdateClient;
