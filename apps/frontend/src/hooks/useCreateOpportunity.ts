import { useMutation } from '@tanstack/react-query';
import { OpportunityType } from '../types/opportunities';
import { createOpportunity } from '../services/opportunity.service';

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
