import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ClientsPage from "./pages/ClientPage";
import HomePage from "./pages/HomePage";
import CreateClientPage from "./pages/CreateClientPage";

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
    name: <CreateClientPage/>,
  }
];

const router = createBrowserRouter(routes);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export { routes };
export default AppRouter;
