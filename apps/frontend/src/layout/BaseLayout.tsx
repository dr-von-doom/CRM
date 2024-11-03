import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Header from "../components/common/Header";
import SideBar from "../components/common/SideBar";
import { SIDEBAR_WIDTH } from "../utils/conts";

export interface BaseLayoutProps {
  title?: string;
  children?: React.ReactNode;
}

const BaseLayout = ({ title = "CRM", children }: BaseLayoutProps) => {
  const theme = useTheme();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleSideBar = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />

      <Header
        title={title}
        isMobile={isMobile}
        isSideBarOpen={isSideBarOpen}
        toggleSideBar={toggleSideBar}
      />

      <SideBar
        isMobile={isMobile}
        isSideBarOpen={isSideBarOpen}
        toggleSideBar={toggleSideBar}
        setIsSideBarOpen={setIsSideBarOpen}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 7, // offset for AppBar height
          width: { sm: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          backgroundColor: "#f7f9fc",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default BaseLayout;
