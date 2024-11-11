import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ClientsPage from "./pages/client/ClientPage";
import CreateClientPage from "./pages/client/CreateClientPage";
import HomePage from "./pages/HomePage";
import { OpportunityPage } from "./pages/opportunity/OpportunityPage";
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
    hidden: true,
    element: <CreateClientPage />,
  },
  {
    path: "/opportunities",
    name: "Opportunities",
    icon: <FlagCircleIcon />,
    element: <OpportunityPage />,
  },
];

const router = createBrowserRouter(routes);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export { routes };
export default AppRouter;
