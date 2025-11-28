"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import AppTheme from "../../shared-theme/AppTheme";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({ open, handleClose }: ForgotPasswordProps) {
  const [email, setEmail] = React.useState("");
  const [submittedEmail, setSubmittedEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [countdown, setCountdown] = React.useState(0);

  const handleSend = async (targetEmail: string) => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setMessage("A password reset link has been sent to your email. The link is valid for 1 hour.");
        setSubmittedEmail(targetEmail); // lock email
        setCountdown(60); // start 1-minute countdown
      }
    } catch (err) {
      setError("Unable to send request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    handleSend(email);
  };

  const handleResend = () => {
    if (!submittedEmail) return;
    handleSend(submittedEmail);
  };

  React.useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  // Reset everything when dialog closes
  React.useEffect(() => {
    if (!open) {
      setEmail("");
      setSubmittedEmail("");
      setMessage("");
      setError("");
      setLoading(false);
      setCountdown(0);
    }
  }, [open]);

  return (
    <AppTheme>
      <Dialog
        open={open}
        onClose={() => {}}
        disableEscapeKeyDown
        slotProps={{
          paper: {
            component: "form",
            onSubmit: handleSubmit,
            sx: { backgroundImage: "none" },
          },
        }}
      >
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
          <DialogContentText>
            Enter your account&apos;s email address, and we&apos;ll send you a link to reset your password.
          </DialogContentText>

          <OutlinedInput
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email address"
            placeholder="Email address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!!submittedEmail && countdown > 0} // lock email during countdown
          />

          {message && <DialogContentText sx={{ color: "green", mt: 1 }}>{message}</DialogContentText>}
          {error && <DialogContentText sx={{ color: "red", mt: 1 }}>{error}</DialogContentText>}

          {countdown > 0 && (
            <DialogContentText sx={{ color: "text.secondary", mt: 1 }}>
              You can resend the link in {countdown} second{countdown > 1 ? "s" : ""}.
            </DialogContentText>
          )}
        </DialogContent>

        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>

          {countdown === 0 ? (
            <Button variant="contained" type="submit">
              {loading ? "Sending..." : "Continue"}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleResend}
              disabled={loading || countdown > 0} // disable during countdown
            >
              {loading ? "Sending..." : "Resend Link"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </AppTheme>
  );
}
