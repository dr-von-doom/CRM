import { useMutation } from "@tanstack/react-query";
import { FollowUpType } from "../../types/followUps.types";
import { createFollowUp } from "../../services/followUps.services";

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
