import { useQuery } from "@tanstack/react-query";
import { getOpportunitiesComparison } from "../../services/opportunity.service";
import { ApiRequests } from "../../types/api.types";

export const useGetOpportunitiesComparison = () => {
  return useQuery({
    queryKey: [ApiRequests.GET_OPPORTUNITIES_COMPARISON],
    queryFn: async () => {
      return await getOpportunitiesComparison();
    },
  });
};

export default useGetOpportunitiesComparison;
