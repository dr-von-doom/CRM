import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../router";
import { SIDEBAR_WIDTH } from "../../utils/const";

export interface SideBarProps {
  isMobile: boolean;
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
  setIsSideBarOpen: (isOpen: boolean) => void;
}

export const SideBar = ({
  isMobile,
  isSideBarOpen,
  toggleSideBar,
  setIsSideBarOpen,
}: SideBarProps) => {
  const location = useLocation();

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? isSideBarOpen : true}
      onClose={toggleSideBar}
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
          backgroundColor: "#283444",
          color: "white",
        },
      }}
    >
      <Toolbar>
        <Box
          display="flex"
          alignItems="center"
          sx={{ width: "100%", py: 1, px: 2 }}
        >
          <DashboardIcon fontSize="large" sx={{ color: "#38bdf8", mr: 1 }} />
          <Typography variant="h6" noWrap>
            CRM
          </Typography>
        </Box>
      </Toolbar>

      <Box sx={{ overflow: "auto" }}>
        <List>
          {routes
          .filter(({ showInNav})=> !showInNav)
          .map(({ path, name, icon }) => (
            <ListItem
              key={path}
              component={Link}
              to={path!}
              onClick={() => setIsSideBarOpen(false)}
              onMouseEnter={(e: {
                currentTarget: { style: { backgroundColor: string } };
              }) =>
                (e.currentTarget.style.backgroundColor =
                  location.pathname === path ? "#1e293a" : "#202c3f")
              }
              onMouseLeave={(e: {
                currentTarget: { style: { backgroundColor: string } };
              }) =>
                (e.currentTarget.style.backgroundColor =
                  location.pathname === path ? "#1e293a" : "transparent")
              }
              sx={{
                backgroundColor:
                  location.pathname === path ? "#1e293a" : "inherit",
                cursor: "pointer",
                textDecoration: "none",
                color: "#eeeeee",
                "&:hover": {
                  backgroundColor: "#202c3f",
                },
              }}
            >
              {icon && (
                <ListItemIcon sx={{ color: "#898f99" }}>{icon}</ListItemIcon>
              )}
              <ListItemText
                primary={name}
                primaryTypographyProps={{
                  fontSize: ".9rem",
                  fontWeight: "light",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;
