import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOpportunity } from "../services/opportunity.service";
import { ApiRequests } from "../types/api.types";
import { OpportunityType } from "../types/opportunity.types";

/**
 * Custom hook for updating an opportunity using React Query's useMutation.
 */
const useUpdateOpportunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      opportunityData,
    }: {
      id: string;
      opportunityData: Partial<OpportunityType>;
    }) => {
      return await updateOpportunity(id, opportunityData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ApiRequests.GET_OPPORTUNITIES] });
    },
    onError: (error) => {
      console.error("Error updating opportunity:", error);
    },
  });
};

export default useUpdateOpportunity;
