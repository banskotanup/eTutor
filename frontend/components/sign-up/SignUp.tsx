"use client";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";

import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import {
  GoogleIcon,
  FacebookIcon,
  LMSIcon,
} from "./components/CustomIcons";

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
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100dvh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: { padding: theme.spacing(4) },
  justifyContent: "center",
  overflowY: "auto",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const { register } = useAuth();
  const router = useRouter();

  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "student",
  });

  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e: any) => {
    setPayload({ ...payload, role: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErr(null);
    setLoading(true);

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
      await register(payload);
      // Role-based redirection handled in AuthContext or here
      router.push("/login");
    } catch (error: any) {
      setErr(error.message || "Failed to register.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignUpContainer direction="column">
        <Card variant="outlined">
          <LMSIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>

          {err && <Typography color="error">{err}</Typography>}

          <Box
            component="form"
            onSubmit={handleSubmit}
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
              <InputLabel
                id="role-label"
                sx={{ mb: 20 }} // adds margin below the label
              >
              </InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={payload.role}
                onChange={handleRoleChange}
                fullWidth
                sx={{
                  px: 1, // horizontal padding inside the select
                  py: 1, // vertical padding
                }}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              {loading ? "Registering..." : "Sign up"}
            </Button>
          </Box>

          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Google")}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Sign up with Facebook
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link href="/login" variant="body2">
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
