import { useQuery } from "@tanstack/react-query";
import { getOpportunityById } from "../../services/opportunity.service";
import { ApiRequests } from "../../types/api.types";
import { OpportunityType } from "../../types/opportunity.types";

export const useGetOpportunityById = (id: string) => {
  return useQuery<OpportunityType>({
    queryKey: [ApiRequests.GET_OPPORTUNITY_BY_ID, id],
    queryFn: async () => {
      return await getOpportunityById(id);
    },
    enabled: !!id,
  });
};

export default useGetOpportunityById;
