import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { ApiRequestPaths } from "../../../types/api.types";
import ClientTable from "./ClientTable";

const meta: Meta<typeof ClientTable> = {
  component: ClientTable,
};

export default meta;

type StoryType = StoryObj<typeof meta>;

export const Default: StoryType = {
  args: {
    onSelect: (clientId: string) => {
      console.log("onSelect", clientId);
    },
    onEdit: (clientId: string) => {
      console.log("onEdit", clientId);
    },
    onDelete: (clientId: string) => {
      console.log("onDelete", clientId);
    },
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient(); // Create a new instance per story
      return (
        <QueryClientProvider client={queryClient}>
          {Story()}
        </QueryClientProvider>
      );
    },
  ],
  parameters: {
    msw: {
      handlers: [
        http.get(`${ApiRequestPaths.GET_CLIENTS}*`, ({ request }) => {
          console.log("[msw] GET_CLIENTS", request);

          const url = new URL(request.url);
          const _page = url.searchParams.get("_page");

          console.log("[msw] _page", _page);

          if (!_page || _page === "0")
            return HttpResponse.json(
              [
                {
                  id: "33138dfc-983c-4b98-900e-cf4403d5d006",
                  nit: "71750714",
                  name: "Dorcas",
                  address: "949 Commercial Street",
                  city: "Ronton",
                  country: "Cameroon",
                  phone: "+14535535173",
                  email: "Dean3@gmail.com",
                  isActive: true,
                },
                {
                  id: "9d8fed2b-0ff7-4fe4-b212-22cc5c01ad23",
                  nit: "77262511",
                  name: "Evangeline",
                  address: "13116 Conn Park",
                  city: "Ricoland",
                  country: "Myanmar",
                  phone: "+16914633602",
                  email: "Adelle.Spinka94@yahoo.com",
                  isActive: false,
                },
              ],
              {
                headers: {
                  "X-Total-Count": "20",
                },
              }
            );

          if (_page === "1")
            return HttpResponse.json(
              [
                {
                  id: "9f9feb08-324c-4332-a638-9d8e8c5546e8",
                  nit: "68830062",
                  name: "General",
                  address: "931 Isobel Trace",
                  city: "Anneworth",
                  country: "Cyprus",
                  phone: "+14787624289",
                  email: "Lia11@yahoo.com",
                  isActive: true,
                },
              ],
              {
                headers: {
                  "X-Total-Count": "20",
                },
              }
            );
        }),
      ],
    },
  },
};
