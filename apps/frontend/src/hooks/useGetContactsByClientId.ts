import { useQuery } from 'react-query';
import { fetchContactsByClientId } from '../services/contact.services';  

const useGetContactsByClientId = (clientId: string) => {
  return useQuery(['contacts', clientId], () => fetchContactsByClientId(clientId), {
    enabled: !!clientId, 
  });
};

export default useGetContactsByClientId;
