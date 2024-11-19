import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFollowUp } from "../../services/followUps.services";
import { ApiRequests } from "../../types/api.types";
import { FollowUpType } from "../../types/followUps.types";

/**
 * Custom hook for updating a follow-up using React Query's useMutation.
 */
const useUpdateFollowUps = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      followUpData,
    }: {
      id: string;
      followUpData: Partial<FollowUpType>;
    }) => {
      return await updateFollowUp(id, followUpData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ApiRequests.GET_FOLLOW_UPS] });
    },
    onError: (error) => {
      console.error("Error updating follow-up:", error);
    },
  });
};

export default useUpdateFollowUps;