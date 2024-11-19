import { useQuery } from "@tanstack/react-query";
import { ApiRequests } from "../../types/api.types";
import { getFollowUps } from "../../services/followUps.services";

export const useGetFollowUps = (opportunityId: string) => {
  return useQuery({
    queryKey: [ApiRequests.GET_FOLLOW_UPS, opportunityId],
    queryFn: async () => {
      return await getFollowUps(opportunityId);
    },
  });
};

export default useGetFollowUps;
