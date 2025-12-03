"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import AppAppBar from "../../components/landing-page/components/AppAppBar";
import Footer from "../../components/landing-page/components/Footer";
import AppTheme from "../../components/shared-theme/AppTheme";

interface Teacher {
  id: number;
  firstName: string;
}

interface Course {
  id: number;
  title: string;
  description?: string;
  price: number;
  image?: string;
  teacher?: Teacher;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)
      ? "http://192.168.1.73:8080"
      : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/subjects`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch courses: ${res.status}`);
        }

        const data = await res.json();
        setCourses(data || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [API_URL]);

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
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                mb: 3,
                color: "text.primary",
              }}
            >
              Explore Our Courses
            </Typography>

            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: "text.secondary",
                maxWidth: "700px",
                mx: "auto",
              }}
            >
              Our platform offers a variety of online subjects taught by
              experienced teachers. Learn at your own pace with live classes,
              interactive assignments, and progress tracking.
            </Typography>
          </Container>
        </Box>

        {/* Courses Section */}
        <Box
          sx={{
            py: { xs: 10, sm: 16 },
            backgroundColor: "background.default",
          }}
        >
          <Container maxWidth="lg">
            {loading ? (
              <Box sx={{ textAlign: "center", py: 10 }}>
                <CircularProgress />
              </Box>
            ) : courses.length === 0 ? (
              <Typography
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  fontSize: "1.2rem",
                }}
              >
                No courses available.
              </Typography>
            ) : (
              <Grid container spacing={4}>
                {courses.map((course) => (
                  <Grid item xs={12} sm={6} md={4} key={course.id}>
                    <Card
                      sx={{
                        height: "100%",
                        width: { xs: "100%", sm: "50%" },
                        display: "flex",
                        flexDirection: "column",
                        transition: "0.3s",
                        "&:hover": { boxShadow: 6, transform: "scale(1.03)" },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="180"
                        image={
                          course.image ||
                          "https://images.unsplash.com/photo-1555431189-0fabf2667795?fit=crop&w=800&h=500"
                        }
                        alt={course.title}
                        sx={{ borderRadius: "8px 8px 0 0", objectFit: "cover" }}
                      />

                      <CardContent sx={{ flexGrow: 1, px: 2, py: 2 }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", color: "text.primary" }}
                          gutterBottom
                        >
                          {course.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            minHeight: "50px",
                            overflow: "hidden",
                          }}
                        >
                          {course.description || "No description available."}
                        </Typography>

                        <Box sx={{ mt: 1 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{ color: "text.primary" }}
                          >
                            Price: NPR {course.price}
                          </Typography>

                          {course.teacher && (
                            <Typography
                              variant="subtitle2"
                              sx={{ color: "text.secondary" }}
                            >
                              Teacher: {course.teacher.firstName || "Unknown"}
                            </Typography>
                          )}
                        </Box>

                        <Button
                          variant="contained"
                          fullWidth
                          sx={{ mt: 2 }}
                          color="primary"
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </Box>

        <Footer />
      </Box>
    </AppTheme>
  );
}
