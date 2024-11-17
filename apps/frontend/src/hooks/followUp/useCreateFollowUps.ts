import { useMutation } from "@tanstack/react-query";
import { createFollowUp } from "../../services/followups.services";
import { FollowUpType } from "../../types/followUps.types";

export const useCreateFollowUp = () => {
  return useMutation({
    mutationFn: async (followUpData: FollowUpType) => {
      return await createFollowUp(followUpData);
    },
    onError: (error) => {
      console.error("Error creating follow-up:", error);
    },
  });
};
