"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container, Card, CardContent, Typography, Button, Box, AppBar, Toolbar } from "@mui/material";
import { motion } from "framer-motion";
import AppTheme from "./AppTheme";
import { LMSIcon } from "../sign-in-side/components/CustomIcons";

interface LockedPageProps {
  title: string;
  message: string;
  color?: "primary" | "error";
}

export default function LockedStatusPage({ title, message, color = "primary" }: LockedPageProps) {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.push("/login");
  };

  // Prevent user from using back button
  useEffect(() => {
    const handleBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);

  return (
    <AppTheme>
      <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
        {/* Navbar */}
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LMSIcon sx={{ fontSize: 40, color: "primary.main", mr: 1 }} />
            </Box>
            <Button variant="outlined" color="primary" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Locked Content */}
        <Container maxWidth="sm" sx={{ mt: 12 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Card sx={{ p: 4, textAlign: "center", borderRadius: 4, boxShadow: 6 }}>
              <CardContent>
                <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", color: `${color}.main` }}>
                  {title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
                  {message}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </Box>
    </AppTheme>
  );
}
