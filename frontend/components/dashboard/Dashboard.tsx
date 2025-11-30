"use client";

import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import AppNavbar from "./components/AppNavbar";
import SideMenu from "./components/SideMenu";
import SideMenuMobile from "./components/SideMenuMobile";
import Header from "./components/Header";
import AppTheme from "../shared-theme/AppTheme";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { adminMenu, teacherMenu, studentMenu } from "@/components/dashboard/menus";

const xThemeComponents = {
  // custom theme components can be added here
};

interface DashboardProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [menu, setMenu] = useState<{ label: string; href: string }[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Handler to toggle mobile drawer
  const handleToggleDrawer = (newOpen: boolean) => () => {
    setMobileOpen(newOpen);
  };

  // Redirect if not logged in & set menu based on role
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      switch (user.role) {
        case "admin":
          setMenu(adminMenu);
          break;
        case "teacher":
          setMenu(teacherMenu);
          break;
        case "student":
          setMenu(studentMenu);
          break;
        default:
          setMenu([]);
      }
    }
  }, [user, router]);

  // Logout
  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login"; // redirect after logout
  };

  // Prevent layout flicker
  if (!user) return null;

  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Sidebar for desktop */}
        <SideMenu menu={menu} onLogout={logout} />

        {/* Top Navbar */}
        <AppNavbar toggleDrawer={handleToggleDrawer(true)} />

        {/* Mobile Sidebar */}
        <SideMenuMobile
          open={mobileOpen}
          toggleDrawer={handleToggleDrawer}
          menu={menu}
          onLogout={logout}
        />

        {/* Main Content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflowY: "auto",
            p: 3,
          })}
        >
          <Header />
          <Divider sx={{ mt: 1, mb: 2 }} />
          <Stack spacing={4} sx={{ mt: { xs: 5, sm: 3 } }}>
            {children}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
