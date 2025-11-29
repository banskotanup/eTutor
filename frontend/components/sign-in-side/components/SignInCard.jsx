"use client";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";

import ForgotPassword from "./ForgotPassword";
import { GoogleIcon, FacebookIcon, LMSIcon } from "./CustomIcons";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignInCard({ successMsg }) {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validateInputs = () => {
    let valid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters.");
      valid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    if (!validateInputs()) return;
    setLoading(true);

    try {
      const result = await login(email, password, rememberMe);

      if (result.status === "pending") {
        router.push("/verification");
        return;
      }

      if (result.status === "rejected") {
        router.push("/rejected");
        return;
      }

      if (result.status === "approved") {
        const user = result.user;
        if (user.role === "admin") router.push("/admin/dashboard");
        else if (user.role === "teacher") router.push("/teacher/dashboard");
        else router.push("/student/dashboard");
      }
    } catch (error) {
      setSubmitError(error?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <LMSIcon />
      </Box>

      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign in
      </Typography>

      {successMsg && (
        <Alert severity="success" sx={{ mt: 2, mb: 1 }}>
          {successMsg}
        </Alert>
      )}

      {submitError && <Typography color="error">{submitError}</Typography>}

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            variant="outlined"
            color={emailError ? "error" : "primary"}
          />
        </FormControl>

        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link component="button" onClick={handleClickOpen} variant="body2">
              Forgot your password?
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
          />
        </FormControl>

        {/* 🔥 FIXED REMEMBER ME */}
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          }
          label="Remember me"
        />

        <ForgotPassword open={open} handleClose={handleClose} />

        <Button type="submit" fullWidth variant="contained">
          {loading ? "Logging in..." : "Sign in"}
        </Button>

        <Typography sx={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <Link href="/register" variant="body2">
            Sign up
          </Link>
        </Typography>
      </Box>

      <Divider>or</Divider>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
          Sign in with Google
        </Button>
        <Button fullWidth variant="outlined" startIcon={<FacebookIcon />}>
          Sign in with Facebook
        </Button>
      </Box>
    </Card>
  );
}
