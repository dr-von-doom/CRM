import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FollowUpType } from "../../types/followUps.types";
import { createFollowUp } from "../../services/followUps.services";
import { ApiRequests } from "../../types/api.types";

export const useCreateFollowUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (followUpData: FollowUpType) => {
      return await createFollowUp(followUpData);
    },
    onError: (error) => {
      console.error("Error creating follow-up:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ApiRequests.GET_FOLLOW_UPS] });
    },
  });
};
