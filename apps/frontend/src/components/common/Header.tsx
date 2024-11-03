import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { SIDEBAR_WIDTH } from "../../utils/conts";

export interface HeaderProps {
  title: string;
  isMobile: boolean;
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
}

export const Header = ({
  title,
  isMobile,
  isSideBarOpen,
  toggleSideBar,
}: HeaderProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${SIDEBAR_WIDTH}px)` },
        ml: { sm: `${SIDEBAR_WIDTH}px` }, // offset for drawer width on larger screens
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: isMobile ? "#283444" : "white",
        color: isMobile ? "#eeeeee" : "black",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        {isMobile && (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleSideBar}
              edge="start"
              sx={{ mr: 2, ...(isSideBarOpen && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="close drawer"
              onClick={toggleSideBar}
              edge="start"
              sx={{ mr: 2, display: isSideBarOpen ? "block" : "none" }}
            >
              <CloseIcon />
            </IconButton>
          </>
        )}
        <Typography noWrap component="div" variant="h6">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
