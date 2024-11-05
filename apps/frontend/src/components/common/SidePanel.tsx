import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: number; // optional width for desktop drawer
}

export const SidePanel = ({
  isOpen,
  onClose,
  title,
  children,
  width = 400,
}: SidePanelProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {!isMobile && (
        <Drawer
          anchor="right"
          open={isOpen}
          onClose={onClose}
          sx={{
            width: width,
            flexShrink: 0,
            zIndex: theme.zIndex.drawer + 2,
            [`& .MuiDrawer-paper`]: {
              width: width,
              boxSizing: "border-box",
              backgroundColor: "#f8fafc",
            },
          }}
        >
          <Toolbar>
            <IconButton onClick={onClose} sx={{ marginRight: 1 }}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
          </Toolbar>

          <Divider />

          <Box
            sx={{
              p: 2,
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
              [theme.breakpoints.up("sm")]: {
                paddingLeft: theme.spacing(3),
                paddingRight: theme.spacing(3),
              },
            }}
          >
            {children}
          </Box>
        </Drawer>
      )}

      {isMobile && (
        <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "background.default",
              zIndex: theme.zIndex.drawer + 1,
              overflow: "auto",
            }}
          >
            <Toolbar>
              <IconButton onClick={onClose}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" sx={{ ml: 2 }}>
                {title}
              </Typography>
            </Toolbar>
            <Divider />
            <Box sx={{ p: 2 }}>{children}</Box>
          </Box>
        </Slide>
      )}
    </>
  );
};

export default SidePanel;
