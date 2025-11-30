"use client";

import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent";
import SelectContent from "./SelectContent";
import OptionsMenu from "./OptionsMenu";
import { useAuth } from "@/context/AuthContext";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

interface MenuItem {
  label: string;
  href: string;
}

interface SideMenuProps {
  menu: MenuItem[];
  onLogout: () => void;
}

export default function SideMenu({ menu, onLogout }: SideMenuProps) {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      >
        <SelectContent />
      </Box>

      <Divider />

      <Box sx={{ overflow: "auto", height: "100%", display: "flex", flexDirection: "column" }}>
        <MenuContent menu={menu} />
      </Box>

      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar
          sizes="small"
          alt={user.name}
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: "auto" }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: "16px" }}>
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              whiteSpace: "nowrap",
              overflowX: "auto",
              display: "block",
              maxWidth: 120, // adjust based on sidebar width
              "&::-webkit-scrollbar": {
                height: "4px", // smaller height for horizontal scrollbar
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(233, 230, 230, 0.3)",
                borderRadius: "2px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
            }}
          >
            {user.email}
          </Typography>
        </Box>
        <OptionsMenu onLogout={onLogout} />
      </Stack>
    </Drawer>
  );
}
