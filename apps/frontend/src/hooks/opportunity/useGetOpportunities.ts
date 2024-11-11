import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getOpportunities } from "../../services/opportunity.service";
import { ApiRequests } from "../../types/api.types";
import { OPPORTUNITIES_PAGE_SIZE } from "../../utils/const";

export const useGetOpportunities = (
  page: number,
  totalPage = OPPORTUNITIES_PAGE_SIZE
) => {
  return useQuery({
    queryKey: [ApiRequests.GET_OPPORTUNITIES, page, totalPage],
    queryFn: async () => {
      return await getOpportunities(page, totalPage);
    },
    placeholderData: keepPreviousData,
  });
};

export default useGetOpportunities;
