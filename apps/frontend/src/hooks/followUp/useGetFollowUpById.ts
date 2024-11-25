import { useQuery } from "@tanstack/react-query";
import { getFollowUpById } from "../../services/followUps.services.ts";
import { ApiRequests } from "../../types/api.types";
import { FollowUpType } from "../../types/followUps.types.ts";

export const useGetFollowUpById = (id: string) => {
  return useQuery<FollowUpType>({
    queryKey: [ApiRequests.GET_FOLLOW_UP_BY_ID, id],
    queryFn: async () => {
      return await getFollowUpById(id);
    },
    enabled: !!id,
  });
};

export default useGetFollowUpById;