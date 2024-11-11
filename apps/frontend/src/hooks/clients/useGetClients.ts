import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getClients } from "../../services/client.service";
import { ApiRequests } from "../../types/api.types";
import { CLIENTS_PAGE_SIZE } from "../../utils/const";

export const useGetClients = (page: number, totalPage = CLIENTS_PAGE_SIZE) => {
  return useQuery({
    queryKey: [ApiRequests.GET_CLIENTS, page, totalPage],
    queryFn: async () => {
      return await getClients(page, totalPage);
    },
    placeholderData: keepPreviousData,
  });
};

export default useGetClients;
