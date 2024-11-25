import { useQuery } from "@tanstack/react-query";
import { getOpportunitiesOverview } from "../../services/opportunity.service";
import { ApiRequests } from "../../types/api.types";
import { OpportunityType } from "../../types/opportunity.types";

export const useGetOpportunitiesOverview = (groupBy: keyof OpportunityType) => {
  return useQuery({
    queryKey: [ApiRequests.GET_OPPORTUNITIES_OVERVIEW, groupBy],
    queryFn: async () => {
      return await getOpportunitiesOverview(groupBy);
    },
  });
};

export default useGetOpportunitiesOverview;
