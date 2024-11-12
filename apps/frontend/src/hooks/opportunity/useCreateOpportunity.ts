import { useMutation } from "@tanstack/react-query";
import { createOpportunity } from "../../services/opportunity.service";
import { OpportunityType } from "../../types/opportunity.types";

export const useCreateOpportunity = () => {
  return useMutation({
    mutationFn: async (opportunityData: OpportunityType) => {
      return await createOpportunity(opportunityData);
    },
    onError: (error) => {
      console.error("Error creating opportunity:", error);
    },
  });
};
