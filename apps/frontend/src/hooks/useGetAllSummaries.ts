import { useQuery } from "@tanstack/react-query";
import { getAllSummaries } from "./../services/summary.services";  
import { ApiRequests } from "./../types/api.types";
import { SummaryType } from "./../types/summary.types";

export const useGetAllSummaries = () => {
  return useQuery<SummaryType[]>({
    queryKey: [ApiRequests.GET_SUMMARY],
    queryFn: async () => {
      return await getAllSummaries();
    },
  });
};

export default useGetAllSummaries;
