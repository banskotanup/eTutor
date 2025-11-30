"use client";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuButton from "./MenuButton";
import MenuContent from "./MenuContent";
import { useAuth } from "@/context/AuthContext";

interface MenuItem {
  label: string;
  href: string;
}

interface SideMenuMobileProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
  menu: MenuItem[];
  onLogout: () => void;
}

export default function SideMenuMobile({
  open,
  toggleDrawer,
  menu,
  onLogout,
}: SideMenuMobileProps) {
  const { user } = useAuth();
  console.log("User:", user);
  console.log("Menu:", menu);

  if (!user) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => toggleDrawer(false)()}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: "none",
          backgroundColor: "background.paper",
          width: "70vw",
        },
      }}
    >
      <Stack sx={{ height: "100%" }}>
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: "center", flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt={`${user.firstName} ${user.lastName}`}
              src="/static/images/avatar/7.jpg"
              sx={{ width: 24, height: 24 }}
            />
            <Typography component="p" variant="h6">
              {`${user.firstName} ${user.lastName}`}
            </Typography>
          </Stack>
          <MenuButton showBadge>
            <NotificationsRoundedIcon />
          </MenuButton>
        </Stack>

        <Divider />

        {menu && (
          <Stack sx={{ flexGrow: 1, overflowY: "auto" }}>
            <MenuContent menu={menu} />
            <Divider />
          </Stack>
        )}

        <Stack sx={{ p: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<LogoutRoundedIcon />}
            onClick={onLogout}
          >
            Logout
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
