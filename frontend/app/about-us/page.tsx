"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import AppAppBar from "../../components/landing-page/components/AppAppBar";
import Footer from "../../components/landing-page/components/Footer";
import AppTheme from "../../components/shared-theme/AppTheme";

const teamMembers = [
  {
    name: "Anup Banskota",
    role: "Founder & CEO",
    image: "./images/members/bb.jpg",
  },
  {
    name: "Sanam Shrestha",
    role: "COO",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=faces&fit=crop&w=400&h=400",
  },
  {
    name: "Prajwal Tamang",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=faces&fit=crop&w=400&h=400",
  },
];

const missionVision = [
  {
    title: "Our Mission",
    description:
      "To empower students and educators worldwide through a user-friendly, interactive, and accessible Learning Management System. We focus on live classes, interactive assignments, performance tracking, and analytics to enable seamless online education.",
    image: "/images/members/mi.jpg",
  },
  {
    title: "Our Vision",
    description:
      "To create a world where every learner has access to quality education and tools to succeed. Our LMS aims to bridge the gap between traditional and digital learning, making education engaging, flexible, and measurable for institutions and individuals alike.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&fit=crop&w=1200&h=600",
  },
];

export default function AboutUs() {
  return (
    <AppTheme>
      <Box>
        <AppAppBar />

        {/* Hero Section */}
        <Box
          sx={{
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
            backgroundColor: "background.paper",
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 6,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{ fontWeight: "bold", color: "text.primary" }}
              >
                About Our LMS
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 3 }}
              >
                Our Learning Management System brings the classroom online. Whether it’s live lectures, interactive assignments, or detailed analytics, our platform helps educators teach efficiently and students learn effectively.
              </Typography>
              <Button variant="contained" color="primary" size="large" href="/register">
                Get Started
              </Button>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box
                component="img"
                src="/images/members/au.jpg"
                alt="About LMS"
                sx={{ width: "100%", borderRadius: 3, boxShadow: 4 }}
              />
            </Box>
          </Container>
        </Box>

        {/* Mission & Vision */}
        <Box sx={{ py: { xs: 10, sm: 16 }, backgroundColor: "background.default" }}>
          <Container maxWidth="lg">
            <Grid container spacing={8} alignItems="center">
              {missionVision.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  key={index}
                  sx={{
                    textAlign: { xs: "center"},
                  }}
                >
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "text.primary" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", mb: 4 }}
                  >
                    {item.description}
                  </Typography>
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    sx={{ width: "100%", borderRadius: 3, boxShadow: 3 }}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Team Section */}
        <Box sx={{ py: { xs: 10, sm: 16 }, backgroundColor: "background.paper" }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              gutterBottom
              sx={{ textAlign: "center", mb: 6, color: "text.primary" }}
            >
              Meet Our Team
            </Typography>
            <Grid container spacing={6}>
              {teamMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ textAlign: "center", p: 2 }}>
                    <CardMedia
                      component="img"
                      height="280"
                      image={member.image}
                      alt={member.name}
                      sx={{ borderRadius: 3, height: 300, width: "100%" }}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="text.primary">
                        {member.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.role}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* History Section */}
        <Box sx={{ py: { xs: 10, sm: 16 }, backgroundColor: "background.default" }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              gutterBottom
              sx={{ textAlign: "center", mb: 4, color: "text.primary" }}
            >
              Our Journey
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", textAlign: "center", mb: 6 }}
            >
              Founded in 2023, our LMS started with a small team of passionate educators and developers. We envisioned a platform that bridges traditional and online education. Today, we serve students and institutions globally, continually enhancing the learning experience.
            </Typography>
            <Box
              component="img"
              src="/images/members/jr.jpg"
              alt="Our Journey"
              sx={{ width: "100%", borderRadius: 3, boxShadow: 4 }}
            />
          </Container>
        </Box>

        <Footer />
      </Box>
    </AppTheme>
  );
}
