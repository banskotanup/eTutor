"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";

import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { LMSIcon } from "./components/CustomIcons";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: { width: "450px" },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100dvh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: { padding: theme.spacing(4) },
  justifyContent: "center",
  overflowY: "auto",
}));

export default function SignUp() {
  const router = useRouter();

  // form states
  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "student",
  });

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"register" | "verify">("register");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setPayload({ ...payload, [e.target.name]: e.target.value });

  const handleRoleChange = (e: any) =>
    setPayload({ ...payload, role: e.target.value });

  // -----------------------------
  // Step 1: send OTP
  // -----------------------------
  const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    // simple validation
    if (!payload.firstName || !payload.lastName) {
      setErr("Please enter your full name.");
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(payload.email)) {
      setErr("Please enter a valid email.");
      setLoading(false);
      return;
    }
    if (payload.password.length < 6) {
      setErr("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP");
      setStep("verify"); // move to OTP step
    } catch (error: any) {
      setErr(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Step 2: verify OTP
  // -----------------------------
  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: payload.email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "OTP verification failed");
      router.push(`/login?success=Registration successful. Please login to continue`); // redirect after successful registration
    } catch (error: any) {
      setErr(error.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignUpContainer direction="column">
        <Card variant="outlined">
          <LMSIcon />
          <Typography component="h1" variant="h4">
            {step === "register" ? "Sign up" : "Verify OTP"}
          </Typography>

          {err && <Typography color="error">{err}</Typography>}

          {step === "register" && (
            <Box
              component="form"
              onSubmit={handleSendOtp}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <TextField
                    id="firstName"
                    name="firstName"
                    placeholder="Jon"
                    required
                    value={payload.firstName}
                    onChange={handleChange}
                    fullWidth
                  />
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <TextField
                    id="lastName"
                    name="lastName"
                    placeholder="Snow"
                    required
                    value={payload.lastName}
                    onChange={handleChange}
                    fullWidth
                  />
                </FormControl>
              </Stack>

              <FormControl fullWidth>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={payload.email}
                  onChange={handleChange}
                  fullWidth
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel htmlFor="phone">Phone (optional)</FormLabel>
                <TextField
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(+977) 987-6543210"
                  value={payload.phone}
                  onChange={handleChange}
                  fullWidth
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••"
                  required
                  value={payload.password}
                  onChange={handleChange}
                  fullWidth
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="role-label"></InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  value={payload.role}
                  onChange={handleRoleChange}
                  fullWidth
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                </Select>
              </FormControl>

              <Button type="submit" fullWidth variant="contained">
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </Box>
          )}

          {step === "verify" && (
            <Box
              component="form"
              onSubmit={handleVerifyOtp}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl fullWidth>
                <FormLabel htmlFor="otp">Enter OTP</FormLabel>
                <TextField
                  id="otp"
                  name="otp"
                  placeholder="123456"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  fullWidth
                />
              </FormControl>
              <Button type="submit" fullWidth variant="contained">
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#1976d2" }}>
              Sign in
            </a>
          </Typography>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
