"use client";

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import AppAppBar from "../../components/marketing-page/components/AppAppBar";
import Footer from "../../components/marketing-page/components/Footer";
import AppTheme from "../../components/shared-theme/AppTheme";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const API_URL =
    typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)
      ? "http://192.168.1.73:8080"
      : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch(`${API_URL}/api/v1/contact-us`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setSuccess("Something went wrong, try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppTheme>
      <Box>
        <AppAppBar />

        {/* Contact Header */}
        <Box
          sx={{
            pt: { xs: 14, sm: 20 },
            pb: { xs: 6, sm: 10 },
            backgroundColor: "background.paper",
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "text.primary",
                mb: 2,
              }}
            >
              Contact Us
            </Typography>

            <Typography
              sx={{
                textAlign: "center",
                color: "text.secondary",
                maxWidth: "700px",
                mx: "auto",
              }}
            >
              Have questions or feedback? We'd love to hear from you. Fill out
              the form below and our team will get back to you shortly.
            </Typography>
          </Container>
        </Box>

        {/* Contact Form */}
        <Box
          sx={{
            py: { xs: 8, sm: 12 },
            backgroundColor: "background.default",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Container maxWidth="sm">
            <Box
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: "background.paper",
                width: "100%",
              }}
            >
              <form onSubmit={handleSubmit}>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    fontWeight: "bold",
                      textAlign: "center",
                    color: "text.primary",
                  }}
                >
                  Send us a Message
                </Typography>

                {/* NAME */}
                <TextField
                  fullWidth
                  label="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  sx={{
                    mb: 3,
                    mt: 1, // FIX label collision
                  }}
                  InputLabelProps={{
                    style: { marginTop: "-5px" }, // Adds spacing
                  }}
                  required
                />

                {/* EMAIL */}
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  sx={{
                    mb: 3,
                    mt: 1,
                  }}
                  InputLabelProps={{
                    style: { marginTop: "-5px" },
                  }}
                  required
                />

                {/* MESSAGE */}
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={1}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  sx={{
                    mb: 3,
                    mt: 1,
                  }}
                  InputLabelProps={{
                    style: { marginTop: "-5px" },
                  }}
                  required
                />

                {/* SUBMIT */}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  size="large"
                  sx={{ py: 1.3 }}
                >
                  {loading ? <CircularProgress size={24} /> : "Send Message"}
                </Button>

                {success && (
                  <Typography
                    sx={{
                      mt: 2,
                      textAlign: "center",
                      color: success.includes("successfully")
                        ? "green"
                        : "error.main",
                    }}
                  >
                    {success}
                  </Typography>
                )}
              </form>
            </Box>
          </Container>
        </Box>

        <Footer />
      </Box>
    </AppTheme>
  );
}
