import { ApiRequests } from "../../types/api.types";
import { getOpportunityByClientId } from "../../services/opportunity.service";
import { useQuery } from "@tanstack/react-query";

const useGetOpportunitiesByClientId = (clientId: string) => {
  return useQuery({
    queryKey: [ApiRequests.GET_OPPORTUNITY_BY_CLIENT_ID, clientId],
    queryFn: async () => {
      return await getOpportunityByClientId(clientId);
    }
  });
};

export default useGetOpportunitiesByClientId;