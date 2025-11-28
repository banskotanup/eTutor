"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  AppBar,
  Toolbar,
  OutlinedInput,
} from "@mui/material";
import AppTheme from "../../components/shared-theme/AppTheme";
import { LMSIcon } from "../../components/sign-in-side/components/CustomIcons";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/reset-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, token }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to reset password.");
      } else {
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppTheme>
      <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
        {/* Navbar */}
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => router.push("/")}>
              <LMSIcon sx={{ fontSize: 40, color: "primary.main", mr: 1 }} />
              <Typography variant="h6" sx={{ color: "primary.main" }}>
                LMS
              </Typography>
            </Box>
            <Button variant="outlined" color="primary" onClick={() => router.push("/")}>
              Home
            </Button>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Container maxWidth="sm" sx={{ mt: 12 }}>
          <Card sx={{ p: 4, borderRadius: 4, boxShadow: 6 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "primary.main", textAlign: "center" }}>
                Reset Password
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <OutlinedInput
                  type="password"
                  placeholder="New Password"
                  required
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <OutlinedInput
                  type="password"
                  placeholder="Confirm Password"
                  required
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
                {success && <Typography sx={{ color: "green" }}>{success}</Typography>}
                <Button type="submit" variant="contained">
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </AppTheme>
  );
}
