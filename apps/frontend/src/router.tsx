import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ClientsPage from "./pages/client/ClientPage";
import CreateClientPage from "./pages/client/CreateClientPage";
import HomePage from "./pages/HomePage";
import { OpportunityPage } from "./pages/opportunity/OpportunityPage";
import OpportunityDetailPage from "./pages/opportunity/OpportunityDetailPage";
const routes = [
  {
    path: "/",
    name: "Home",
    icon: <HomeIcon />,
    element: <HomePage />,
  },
  {
    path: "/clients",
    name: "Clients",
    icon: <PeopleIcon />,
    element: <ClientsPage />,
  },
  {
    path: "/clients/create",
    element: <CreateClientPage />,
    showInNav: true,
  },
  {
    path: "/opportunities",
    name: "Opportunities",
    icon: <FlagCircleIcon />,
    element: <OpportunityPage />,
  },
  {
    path: "/opportunities/:id",
    element: <OpportunityDetailPage />,
    showInNav: true,
  },
];

const router = createBrowserRouter(routes);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export { routes };
export default AppRouter;
